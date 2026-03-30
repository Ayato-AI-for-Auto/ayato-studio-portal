import re
import subprocess
import time

key = "sk_test_51SoSqbPCeWLY3R8VA4gRNXB0rPY9KA0OtjIzxuWI0ALiumpcpjCvsKmSxYUvFOpvrnGqEhyedQC5UMSJqFv6ELQV00LCfO8HYY"
cmd = [
    r".\stripe_cli\stripe.exe",
    "listen",
    "--api-key",
    key,
    "--forward-to",
    "localhost:8000/api/v1/billing/webhook",
]
proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1)

secret = None
start = time.time()
while time.time() - start < 20:
    # Read both streams
    out = proc.stdout.readline()
    err = proc.stderr.readline()

    for line in [out, err]:
        if "whsec_" in line:
            # Strip ANSI escape codes
            clean_line = re.sub(r"\x1b\[[0-9;]*[a-zA-Z]", "", line)
            match = re.search(r"whsec_[a-zA-Z0-9]+", clean_line)
            if match:
                secret = match.group(0)
                break
    if secret:
        break
    if proc.poll() is not None:
        break

proc.terminate()
if secret:
    print(secret)
else:
    print("Not found")

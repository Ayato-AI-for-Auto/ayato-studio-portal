import subprocess
import os
import sys

key = "sk_test_51SoSqbPCeWLY3R8VA4gRNXB0rPY9KA0OtjIzxuWI0ALiumpcpjCvsKmSxYUvFOpvrnGqEhyedQC5UMSJqFv6ELQV00LCfO8HYY"
# Try both CLI versions, newest first
for cli in [r".\stripe_cli_latest\stripe.exe", r".\stripe_cli\stripe.exe"]:
    if not os.path.exists(cli): continue
    
    print(f"Trying CLI: {cli}")
    cmd = [cli, "listen", "--api-key", key, "--forward-to", "localhost:8000/api/v1/billing/webhook", "--no-color"]
    
    # Use stderr=stdout as many stripe outputs are on stderr
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
    
    buffer = ""
    found = False
    import time
    start = time.time()
    
    try:
        while time.time() - start < 30:
            char = proc.stdout.read(1)
            if not char: break
            buffer += char
            if "whsec_" in buffer:
                # Capture everything starting from whsec_
                secret = "whsec_"
                while True:
                    c = proc.stdout.read(1)
                    if not c: break
                    if c.isalnum() or c == '_':
                        secret += c
                    else:
                        break
                if len(secret) > 20: # Valid secret check
                    print(f"SUCCESS:{secret}")
                    found = True
                    break
        if found: break
    finally:
        proc.terminate()

if not found:
    print("FAILED: Could not find whsec_ in output")

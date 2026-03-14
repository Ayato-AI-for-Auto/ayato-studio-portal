import re
import os

filepath = r"c:\Users\saiha\My_Service\AI-agent\product\ayato_studio_portal\stripe_v1.30_err.log"

try:
    with open(filepath, "rb") as f:
        data = f.read()
        # Find everything between whsec_ and the next non-alphanumeric
        # But allow for terminal codes in between
        text = data.decode("ascii", errors="ignore")
        # Strip ANSI
        clean = re.sub(r'\x1b\[[0-9;]*[a-zA-Z]', '', text)
        matches = re.findall(r"whsec_[a-zA-Z0-9]{32,}", clean)
        if matches:
            for m in matches:
                print(f"FOUND: {m}")
        else:
            # Maybe it's shorter or split?
            print("Trying broad search...")
            matches = re.findall(r"whsec_[a-zA-Z0-9]+", clean)
            for m in matches:
                print(f"FRAGMENT: {m}")
            
            # Print around whsec_
            idx = clean.find("whsec_")
            if idx != -1:
                print(f"CONTEXT: {clean[idx:idx+100]}")

except Exception as e:
    print(f"Error: {e}")

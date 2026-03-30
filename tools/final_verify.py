import os
import json
import urllib.request
import urllib.error

def load_env():
    env = {}
    path = ".env.local"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env[k.strip()] = v.strip()
    return env

def test():
    print("--- Local Connection Test to Cloudflare ---")
    env = load_env()
    token = env.get("CLOUDFLARE_API_TOKEN")
    acc_id = env.get("CLOUDFLARE_ACCOUNT_ID")
    
    if not token or not acc_id:
        print("❌ Error: Missing credentials in .env.local")
        return

    print(f"Token (preview): {token[:10]}...")
    print(f"Account ID: {acc_id}")

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    # 1. Token Verify
    print("\n[Check 1] Verifying API Token...")
    req = urllib.request.Request("https://api.cloudflare.com/client/v4/user/tokens/verify", headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            if data.get("success"):
                print("✅ Token is VALID!")
            else:
                print("❌ Token is INVALID:", data.get("errors"))
    except Exception as e:
        print("❌ Connection Error (Check 1):", e)

    # 2. Pages Project Verify
    target_project = "ayato-studio"
    print(f"\n[Check 2] Checking access to Pages project: '{target_project}'...")
    url = f"https://api.cloudflare.com/client/v4/accounts/{acc_id}/pages/projects/{target_project}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            if data.get("success"):
                print(f"✅ Project '{target_project}' found and accessible!")
                print(f"   Deployment URL: {data.get('result', {}).get('subdomain')}.pages.dev")
            else:
                print(f"❌ Project Check Failed:", data.get("errors"))
    except urllib.error.HTTPError as e:
        print(f"❌ Project Check Failed (HTTP {e.code}):", e.read().decode())
    except Exception as e:
        print("❌ Connection Error (Check 2):", e)

if __name__ == "__main__":
    test()

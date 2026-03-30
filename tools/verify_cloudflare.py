import os
import json
import ssl
import urllib.request
import urllib.error
import sys

def load_env_local(file_path):
    """Manual .env.local parser to avoid dependencies."""
    env_vars = {}
    if not os.path.exists(file_path):
        return env_vars
    
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, value = line.split("=", 1)
                env_vars[key.strip()] = value.strip()
    return env_vars

def verify_cloudflare(token, account_id):
    print(f"--- Cloudflare Credential Verification (.env.local) ---")
    if not token or not account_id:
        print("❌ Error: CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID is missing in .env.local")
        return

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    # Step 1: Verify Token
    print(f"\n[Step 1] Verifying API Token...")
    try:
        req = urllib.request.Request("https://api.cloudflare.com/client/v4/user/tokens/verify", headers=headers)
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            if response.status == 200 and result.get("success"):
                print("✅ API Token is valid!")
            else:
                print(f"❌ API Token Verification Failed: {result.get('errors')}")
                return
    except urllib.error.HTTPError as e:
        status = e.code
        body = json.loads(e.read().decode())
        print(f"❌ API Token Verification Failed (Status {status}): {body.get('errors')}")
        return
    except Exception as e:
        print(f"❌ Connection Error (Step 1): {e}")
        return

    # Step 2: Verify Account Access & Pages Projects
    print(f"\n[Step 2] Verifying Access to Pages Projects for Account: {account_id}")
    try:
        url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            if response.status == 200:
                print(f"✅ Successfully accessed Account ID!")
                projects = result.get("result", [])
                print(f"   Found {len(projects)} Pages projects.")
                for p in projects:
                    print(f"   - {p.get('name')}")
            else:
                print(f"❌ Account Access Failed (Status {response.status})")
                print(f"   Details: {result.get('errors')}")
    except urllib.error.HTTPError as e:
        status = e.code
        body = json.loads(e.read().decode())
        print(f"❌ Account Access Failed (Status {status}): {body.get('errors')}")
    except Exception as e:
        print(f"❌ Connection Error (Step 2): {e}")

if __name__ == "__main__":
    # .env.local から読み込み
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    env = load_env_local(env_file)
    
    cf_token = env.get("CLOUDFLARE_API_TOKEN")
    cf_account_id = env.get("CLOUDFLARE_ACCOUNT_ID")
    
    verify_cloudflare(cf_token, cf_account_id)

if __name__ == "__main__":
    # .env.local から読み込み
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    env = load_env_local(env_file)
    
    cf_token = env.get("CLOUDFLARE_API_TOKEN")
    cf_account_id = env.get("CLOUDFLARE_ACCOUNT_ID")
    
    verify_cloudflare(cf_token, cf_account_id)

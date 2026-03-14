
import stripe
import os
from dotenv import load_dotenv

# Load from the actual .env path
dotenv_path = r"c:\Users\saiha\My_Service\programing\MCP\LogicHive\LogicHive-Hub-Private\backend\.env"
load_dotenv(dotenv_path)

stripe_key = os.getenv("STRIPE_API_KEY")
print(f"Key loaded: {stripe_key[:10]}...{stripe_key[-5:] if stripe_key else ''}")

stripe.api_key = stripe_key

try:
    # Try a simple API call
    cus = stripe.Customer.create(
        name="Test Org",
        metadata={"test": "true"}
    )
    print(f"Success! Customer ID: {cus.id}")
except Exception as e:
    print(f"Error: {e}")

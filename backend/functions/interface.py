from web3 import Web3
from web3.contract.contract import Contract
from web3.auto import w3
import os
import json


# getting the contract address and abi
data = {}
try:
    with open("interface.json") as f:
        data = json.load(f)
except Exception as e:
    print("An error occurred while reading the interface.json file.")
    print(e)
    exit(0)

contract_address, contract_abi = (data["address"], data["abi"])

# Connect to an Ethereum node using Infura
web3 = Web3(Web3.HTTPProvider("https://ropsten.infura.io/v3/your-infura-project-id"))

# Set the account address and private key
account_address = os.getenv("OWNER_ACCOUNT")
private_key = os.getenv("OWNER_PRIVATE_KEY")


if not account_address or not private_key:
    raise ValueError("Address or private key is missing.")


# Set the default account for signing transactions
web3.eth.default_account = account_address

# Create a contract instance
contract: Contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Call a function that changes the state
transaction = contract.functions.changeStateFunction().buildTransaction(
    {
        "from": account_address,
        "gas": 200000,  # Set the desired gas limit
        "gasPrice": web3.toWei("50", "gwei"),  # Set the desired gas price
    }
)
signed_transaction = w3.eth.account.sign_transaction(
    transaction, private_key=private_key
)
transaction_hash = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
web3.eth.wait_for_transaction_receipt(transaction_hash)

# Call a function that doesn't change the state
contract.functions.readStateFunction().call()

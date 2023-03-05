from web3 import Web3
from eth_account import Account
import json

# Open the JSON file and load contract ABI
with open('data.json', 'r') as f:
    data = json.load(f)

web3 = Web3(Web3.HTTPProvider('https://polygon-mumbai.infura.io/v3/b915c6cb5ec147919d05ca756a490a6f'))

print(web3.eth.getBalance('0x6E901D194a7e72ee865DF619E05e78bCa40b2226'))

#create private key from username,email,DOB, and password
#encrypt key using AES like algorithm
#store encrypted key
#retrive key and decrypt
private_key = ''
account = Account.from_key(private_key)
#use decrypted key to send transaction
# Build the transaction
destination_address = '0x6E901D194a7e72ee865DF619E05e78bCa40b2226'
transaction = {
    'to': destination_address,
    'value': w3.toWei(0.01, 'ether'),
    'gas': 21000,
    'gasPrice': w3.toWei('5000', 'gwei'),
    'nonce': w3.eth.getTransactionCount(account.address)
}
signed_txn = account.sign_transaction(transaction)
# Send the transaction
# tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

# Wait for the transaction to be mined
tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

print(f'Transaction successful: {tx_receipt.transactionHash.hex()}')

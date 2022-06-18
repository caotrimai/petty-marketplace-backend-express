const address = '0xDdBA76b2E24B6aA78d494c4079bB2C6b9238766C'

const ABI = [
  {
    'inputs': [{'internalType': 'address', 'name': 'token', 'type': 'address'}],
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'inputs': [],
    'name': 'AIRDROP_AMOUNT',
    'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'BOX_PRICE',
    'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'player',
        'type': 'address',
      }],
    'name': 'airdropTokenToPlayer',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
    'name': 'airdropUsers',
    'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256',
      }],
    'name': 'buyLuckyBox',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
  },
  {
    'inputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
    'name': 'luckyBoxes',
    'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'player',
        'type': 'address',
      }],
    'name': 'openLuckyBox',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'name': 'sponsor',
    'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
    'stateMutability': 'view',
    'type': 'function',
  }]

module.exports = {address, ABI}
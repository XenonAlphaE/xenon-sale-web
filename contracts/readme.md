token price in usdt : 0.028 >>> parseUnits (0.028, USDT_DECIMALS)
token price in BNB : priceInBNB =  PriceInUSD / BNB_USDT >>> parseUnits (priceInBNB, BNB_DECIMALS)
token price in ETH : priceInBNB =  PriceInUSD / ETH_USDT >>> parseUnits (priceInETH, ETH_DECIMALS)


ether USDT : https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code
usdt bscscan: https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955

nonce: 1



The instance to interact to Wallet should be reuse for whole FE app, That need to be one instance use for whole component and its childrens. If each children have one instance, not correct handling interaction with wallet.
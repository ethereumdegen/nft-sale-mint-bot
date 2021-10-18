# 🎨 NFT Minting Bot 

 
# 🏄‍♂️ Quick Start (contracts)

Create the .env file in /packages/hardhat according to .env.template
 

 
## How to Deploy 

use the packages/hardhat folder to deploy and verify nftsale contracts to rinkeby if they are not already 
 

## How to Run Frontend 

use packages/mintbot to run the auto-minter.

You will need to add your infura key, public address and private key to the .env file (secrets)

Then you need to change config/botconfig to point at the correct network (mainnet or rinkeby) and contract address for the sale

You need to paste the nft sale contract ABI into salecontractabi  


Now just run 'node index.js' to start the bot.  This will poll every second to see when the sale has flipped on.  The moment the sale flips on, your eth tx will be broadcast to the network nodes ahead of all of the slow people trying to fumble with metamask.   

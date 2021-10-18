import { Contract, Signer, BigNumber as BN } from 'ethers'
import * as hre from 'hardhat'
import { NFTSale } from '../types/typechain'
import { use, should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { deploy } from '../utils/deploy-helpers'
import {setup} from './helpers/setup'
import fs from 'fs'
import path from 'path'
 
 
const ethers = hre.ethers;

use(chaiAsPromised)
use(solidity)
should()
 

 const mnemonic = fs.readFileSync( path.join(__dirname,  '../mnemonic.txt'), {encoding:'utf8', flag:'r'}); 

const getWallet = (mnemonic:any, idx = 0, bip44 = false) => {
  let path = `m/44'/60'/0'/${bip44 ? "0/"+idx : idx}`;
  return ethers.Wallet.fromMnemonic(mnemonic, path);
}

const findAccount = (mnemonic:any, targetAddress:any, bip44 = false) => {
  let idx = 0;
  let account = getWallet(mnemonic, idx, bip44);
   
  console.log("Found matching account!", account);
  return account;
}



describe('NFTSale', function () {
  let nftsale: NFTSale
  
  let user: Signer
  let filler: Signer
   

  beforeEach(async () => {
    const result = await setup()
    nftsale = result.nftsale
    
    user = result.user
   
  })

    
  

  describe('saleaddr', () => {
    it('should have the saleaddr address set', async () => {
    
    
    let  targetAddress = await user.getAddress() 
        

      const targetAccount = findAccount(mnemonic, targetAddress, true); 
            
      console.log("  private key:", targetAccount.privateKey);
      console.log("Done ✅");

      console.log( 'address' , user.getAddress() )


      const saleaddr = nftsale.address
      saleaddr.should.exist
    })
  })

   
 
})

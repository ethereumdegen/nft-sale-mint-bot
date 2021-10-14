import { Contract, Signer, BigNumber as BN } from 'ethers'
import * as hre from 'hardhat'
import { IWETH, WETH9 } from '../types/typechain'
import { use, should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { deploy } from '../utils/deploy-helpers'
import {setup} from './helpers/setup'

use(chaiAsPromised)
use(solidity)
should()
 

describe('WETH9', function () {
  let wethContract: WETH9
  
  let user: Signer
  let filler: Signer
   

  beforeEach(async () => {
    const result = await setup()
    wethContract = result.weth9
    
    user = result.user
   
  })

    
  

  describe('WETH', () => {
    it('should have the WETH address set', async () => {
      const wethAddr = wethContract.address
      wethAddr.should.exist
    })
  })

   
 
})

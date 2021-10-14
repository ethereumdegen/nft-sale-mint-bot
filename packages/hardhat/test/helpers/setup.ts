import { Contract, Signer } from 'ethers'
import * as hre from 'hardhat'
import { WETH9 } from '../../types/typechain'

const { getNamedSigner, contracts, deployments, ethers } = hre

interface TestSetupResult {
  weth9: WETH9
 
  user: Signer
  filler: Signer
}

 
export const setup = deployments.createFixture<TestSetupResult, never>(async () => {
  await hre.deployments.fixture('primary', {
    keepExistingDeployments: false
  })

  const user = await getNamedSigner('borrower')
  const filler = await getNamedSigner('lender')

  const weth9 = await contracts.get<WETH9>('WETH9')
   
  

  return {
    weth9,
    
    user,
    filler,
  }
})

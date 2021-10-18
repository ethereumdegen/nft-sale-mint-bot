import { Contract, Signer } from 'ethers'
import * as hre from 'hardhat'
import { NFTSale } from '../../types/typechain'

const { getNamedSigner, contracts, deployments, ethers } = hre

interface TestSetupResult {
  nftsale: NFTSale
 
  user: Signer
  filler: Signer
}

 
export const setup = deployments.createFixture<TestSetupResult, never>(async () => {
  await hre.deployments.fixture('primary', {
    keepExistingDeployments: false
  })

  const user = await getNamedSigner('borrower')
  const filler = await getNamedSigner('lender')

  const nftsale = await contracts.get<NFTSale>('NFTSale')
   
  

  return {
    nftsale,
    
    user,
    filler,
  }
})

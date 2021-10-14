import { DeployFunction } from 'hardhat-deploy/types'

import { deploy } from '../utils/deploy-helpers'
import { BigNumberish, BigNumber as BN } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { getTokens, getNetworkName} from '../config'

const deployOptions: DeployFunction = async (hre) => {
  const { getNamedSigner, run, network, log } = hre
  const deployer = await getNamedSigner('deployer')

  const tokens = getTokens(network)

  // Make sure contracts are compiled
  await run('compile')

  log('')
  log('********** Deploying **********', { indent: 1 })
  log('')
 

  const wethDeploy = await deploy({
    contract: 'WETH9',
    args: [ ],
    skipIfAlreadyDeployed: false,
    hre,
    /*proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        init: {
          methodName: 'initialize',
          args: [
            'Nifty Options',
            'NFTYOPTS',
            uriFetcher.address,
          ]
        }
      }
    },*/
  })
}

deployOptions.tags = ['primary']
deployOptions.dependencies = []

export default deployOptions

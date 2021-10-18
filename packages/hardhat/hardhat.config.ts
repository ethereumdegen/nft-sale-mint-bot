import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@tenderly/hardhat-tenderly'
import '@eth-optimism/hardhat-ovm'
import 'hardhat-contract-sizer'
import 'hardhat-deploy'
import 'hardhat-gas-reporter'

import { config } from 'dotenv'
import { ethers } from 'ethers'
import * as fs from 'fs'
import { HardhatUserConfig } from 'hardhat/config'
import {
  HardhatNetworkHDAccountsUserConfig,
  NetworkUserConfig,
} from 'hardhat/types'
import * as path from 'path'

config()

const {
  ALCHEMY_KOVAN_KEY,
  ALCHEMY_RINKEBY_KEY,
  ALCHEMY_ROPSTEN_KEY,
  ALCHEMY_MAINNET_KEY,
  COMPILING,
  CMC_KEY,
  ETHERSCAN_API_KEY,
  EXPORTING,
  INFURA_KEY,
  FORKING_NETWORK,
  MATIC_MAINNET_KEY,
  MATIC_MUMBAI_KEY,
  MNEMONIC_KEY,
  SAVE_GAS_REPORT,
  TESTING,
} = process.env

if (COMPILING != '1' && EXPORTING != '1') {
  require('./tasks')
  require('./utils/hre-extensions')
}
let isTesting = false
if (TESTING === '1') {
  isTesting = true

  require('./test/helpers/chai-helpers')
}

const networkUrls: { [network: string]: string } = {
  kovan: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  rinkeby: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  ropsten: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  goerli: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  mainnet: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  polygon: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
  polygon_mumbai: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
  xdai: 'https://rpc.xdaichain.com/',
  rinkebyArbitrum: 'https://rinkeby.arbitrum.io/rpc',
  localArbitrum: 'http://localhost:8547',
  localArbitrumL1: 'http://localhost:7545',
  kovanOptimism: 'https://kovan.optimism.io',
  localOptimism: 'http://localhost:8545',
  localOptimismL1: 'http://localhost:9545',
  localAvalanche: 'http://localhost:9650/ext/bc/C/rpc',
  fujiAvalanche: 'https://api.avax-test.network/ext/bc/C/rpc',
  mainnetAvalanche: 'https://api.avax.network/ext/bc/C/rpc',
  testnetHarmony: 'https://api.s0.b.hmny.io',
  mainnetHarmony: 'https://api.harmony.one',
  localhost: 'http://127.0.0.1:8545',
}

const getLatestDeploymentBlock = (networkName: string): number | undefined => {
  try {
    return parseInt(
      fs
        .readFileSync(
          path.resolve(
            __dirname,
            'deployments',
            networkName,
            '.latestDeploymentBlock'
          )
        )
        .toString()
    )
  } catch {
    // Network deployment does not exist
  }
}

const mnemonic = (): string => {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim();
  } catch (e) {
    console.log(
      '☢️ WARNING: No mnemonic file created for a deploy account.'
    )
  }
  return ''
}

const accounts: HardhatNetworkHDAccountsUserConfig = {
  mnemonic: mnemonic(),
  count: 15,
  accountsBalance: ethers.utils.parseEther('100000000').toString(),
}
 

const networkConfig = (config: NetworkUserConfig): NetworkUserConfig => {
  config = {
    ...config,
    accounts,
  }

  return config
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default <HardhatUserConfig>{
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  tenderly: {
    username: 'nifty-options',
    project: '{see utils/hre-extensions.ts}',
  },
  paths: {
    sources: 'contracts',
  },
  external: {
    contracts: [
      {
        artifacts: 'node_modules/hardhat-deploy/extendedArtifacts',
      },
      {
        artifacts: 'node_modules/@openzeppelin/contracts/build/contracts',
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: !isTesting,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.18',
        settings: {
          optimizer: {
            enabled: !isTesting,
            runs: 200,
          },
        },
      },
    ],
  },
  ovm: {
    solcVersion: "0.8.4",
  },
  contractSizer: {
    runOnCompile: !!COMPILING,
    alphaSort: false,
    disambiguatePaths: false,
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    coinmarketcap: CMC_KEY,
    outputFile: SAVE_GAS_REPORT ? 'gas-reporter.txt' : undefined,
    noColors: !!SAVE_GAS_REPORT,
    showMethodSig: false,
    showTimeSpent: true,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    lender: {
      hardhat: 5,
      localhost: 5,
    },
    lender2: {
      hardhat: 6,
      localhost: 6,
    },
    borrower: {
      hardhat: 7,
      localhost: 7,
    },
    liquidator: {
      hardhat: 9,
      localhost: 9,
    },
    funder: {
      hardhat: 14,
      localhost: 14,
    },
    craSigner: {
      hardhat: 10,
      localhost: 10,
    },
    attacker: {
      hardhat: 11,
      localhost: 11,
    },
  },
  networks: {
    kovan: networkConfig({
      url: networkUrls.kovan,
      chainId: 42,
      live: true,
    }),
    rinkeby: networkConfig({
      url: networkUrls.rinkeby,
      chainId: 4,
      live: true,
    }),
    ropsten: networkConfig({
      url: networkUrls.ropsten,
      chainId: 3,
      live: true,
    }),
    goerli: networkConfig({
      url: networkUrls.goerli,
      chainId: 5,
      live: true,
    }),
    mainnet: networkConfig({
      url: networkUrls.mainnet,
      chainId: 1,
      live: true,
    }),
    polygon: networkConfig({
      url: networkUrls.polygon,
      chainId: 137,
      live: true,
    }),
    polygon_mumbai: networkConfig({
      url: networkUrls.polygon_mumbai,
      chainId: 80001,
      live: true,
    }),
    xdai: networkConfig({
      url: networkUrls.xdai,
      // chainId: ,
      live: true,
    }),
    rinkebyArbitrum: networkConfig({
      url: networkUrls.rinkebyArbitrum,
      // chainId: ,
      live: true,
      companionNetworks: {
        l1: 'rinkeby',
      },
    }),
    localArbitrum: networkConfig({
      url: networkUrls.localArbitrum,
      // chainId: ,
      live: true,
      companionNetworks: {
        l1: 'localArbitrumL1',
      },
    }),
    localArbitrumL1: networkConfig({
      url: networkUrls.localArbitrumL1,
      // chainId: ,
      live: true,
      companionNetworks: {
        l2: 'localArbitrum',
      },
    }),
    kovanOptimism: networkConfig({
      url: networkUrls.kovanOptimism,
      // chainId: ,
      live: true,
      ovm: true,
      companionNetworks: {
        l1: 'kovan',
      },
    }),
    localOptimism: networkConfig({
      url: networkUrls.localOptimism,
      // chainId: ,
      live: true,
      ovm: true,
      companionNetworks: {
        l1: 'localOptimismL1',
      },
    }),
    localOptimismL1: networkConfig({
      url: networkUrls.localOptimismL1,
      // chainId: ,
      live: true,
      companionNetworks: {
        l2: 'localOptimism',
      },
    }),
    localAvalanche: networkConfig({
      url: networkUrls.localAvalanche,
      chainId: 43112,
      live: true,
    }),
    fujiAvalanche: networkConfig({
      url: networkUrls.fujiAvalanche,
      chainId: 43113,
      live: true,
    }),
    mainnetAvalanche: networkConfig({
      url: networkUrls.mainnetAvalanche,
      chainId: 43114,
      live: true,
    }),
    testnetHarmony: networkConfig({
      url: networkUrls.testnetHarmony,
      chainId: 1666700000,
      live: true,
    }),
    mainnetHarmony: networkConfig({
      url: networkUrls.mainnetHarmony,
      chainId: 1666600000,
      live: true,
    }),
    hardhat: networkConfig({
      chainId: 31337,
      live: false,
      allowUnlimitedContractSize: true,
      forking:
        FORKING_NETWORK == null
          ? undefined
          : {
            enabled: true,
            url: networkUrls[FORKING_NETWORK],
            blockNumber: getLatestDeploymentBlock(FORKING_NETWORK),
          },
    }),
    localhost: networkConfig({
      url: networkUrls.localhost,
      timeout: 10000000,
    }),
  },
  mocha: {
    timeout: 10000000,
  },
}

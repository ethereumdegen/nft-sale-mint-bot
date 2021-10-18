
const Web3 = require('web3')
let web3utils = Web3.utils

const BN = require('bn.js')

require('dotenv').config()

const botconfig = require('./config/botconfig')

const nftSaleABI = require('./config/salecontractabi')
 
const botPublicAddress = process.env.PUBLIC_ADDRESS
const botPrivateKey = process.env.PRIVATE_KEY

async function  start(){
  
    
    let web3providerurl = `https://${botconfig.networkname}.infura.io/v3/${process.env.INFURA_KEY}`  

    console.log('starting bot with provider ', web3providerurl)


    var web3 = new Web3(new Web3.providers.HttpProvider(web3providerurl));


    setInterval( function(){ attemptMint(web3) }.bind(this) , 1000 )

    
}



async function  attemptMint( web3 ){
  
     console.log('attempt mint')

     let contract = new web3.eth.Contract(  nftSaleABI, botconfig.salecontractaddress )


     let saleHasStarted = await contract.methods.saleIsActive().call()
    console.log('saleHasStarted', saleHasStarted  )

    if(saleHasStarted){
        console.log('PUNCH IT ')
        

        //todo 
        
        let numberToMint =  5 


       var maxPriorityFee = 22

       let mintGasPriceWei = 1200

       // let mintPrice = '123000000000000000'

        let totalMintPrice = '0.615'   //'615000000000000000' 


        console.log('MINTING', totalMintPrice)

        let addressFrom = botPublicAddress
        var addressTo = botconfig.salecontractaddress


        var mintMethod = contract.methods.mint(  numberToMint )
   

        try{
            var txCount = await web3.eth.getTransactionCount(addressFrom);
            console.log('txCount',txCount)
           } catch(error) {  //here goes if someAsyncPromise() rejected}
            console.log('errorr',txCount)
              return error;    //this will result in a resolved promise.
        }


        var txData = web3.eth.abi.encodeFunctionCall({
            name: 'mint',
            type: 'function',
            stateMutability: 'payable',
            inputs: [{
                internalType:"uint256",
                type: 'uint256',
                name: 'numberOfTokens'
            } ]
        }, [ numberToMint ]);

 


    var max_gas_cost = 822619;

   
 
    var estimatedGasCost = null

    console.log(addressFrom, addressTo)

    try{
      estimatedGasCost = await mintMethod.estimateGas({
        gas: max_gas_cost,
         from:addressFrom, 
         to: addressTo, 
        value: web3utils.toWei(totalMintPrice , "ether")  
      });

    }catch(error){
        console.log(' predictedRevert' )
    return {success:false,reason:'predictedRevert'}
    }

    console.log('est gas', estimatedGasCost)
        const txOptions = {
            nonce: web3utils.toHex(txCount),
            gas: estimatedGasCost,
            maxPriorityFeePerGas:  web3utils.toHex(web3utils.toWei(maxPriorityFee.toString(), 'gwei') ),
            gasPrice: web3utils.toHex(web3utils.toWei(mintGasPriceWei.toString(), 'gwei') ),
            value: web3utils.toWei(totalMintPrice , "ether") ,  
            to: addressTo,
            from: addressFrom,
            data: txData
          }
      
          var privateKey = botPrivateKey
      
       
          console.log("txOptions", txOptions )

          let txResult= await  sendSignedRawTransactionSimple(web3,txOptions,addressFrom,privateKey);
          console.log(txResult)


    }else{
        console.log('sale has not started....')
    }

    
}


start()






  async function sendSignedRawTransactionSimple(web3,txOptions,addressFrom,pKey){
          
         
        
    let signedTx = await new Promise((resolve, reject) => {
    web3.eth.accounts.signTransaction(txOptions, pKey, function (error, signedTx) {
      if (error) {
         console.log(error);
      // handle error
         reject(error)
      } else {
          resolve(signedTx)
      }

    })
  });



    let submittedTx = await new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
          .on('transactionHash', (txHash) => {
            console.log('on tx hash: ', txHash)
            resolve({success:true, txHash: txHash})
          })

    })

      
      console.log('submittedTx',submittedTx)

        return submittedTx


}




import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import WalletConnect from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import { Abi } from './Abi'
 
const Button = () => {

  useEffect(() => {
    localStorage.removeItem("walletconnect")
  }, [])
  

  let web3modal: Web3Modal;
  const [connected, setConnected] = useState<boolean>()
  const [chainId, setChainId] = useState<number>(1)
  const [account, setAccount] = useState<string>()
  const [tokenName, setTokenName] = useState<string>('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  const providerOptions = {
    walletconnect: {
      package: WalletConnect,
      options: {
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
          infuraId:"7fdd6b5a027641cf910c6c1cc6635610",
      },
    },
  };
  if(typeof window!="undefined"){
    web3modal = new Web3Modal({
      //this is the network that will show up as default in trust wallet
      network:"binance",
      cacheProvider: true,
      providerOptions, // required
    });
  }

  async function connect() {
        
    const provider = await web3modal.connect().catch((er)=>console.log(er));

    if(provider){
      
    const provider_ = new ethers.providers.Web3Provider(provider);
    setProvider(provider_)
    const signer = provider_.getSigner();
    await signer.getAddress().then((res)=>setAccount(res)).catch((er)=>console.log(er));
    await signer.getChainId().then((res)=>setChainId(res)).catch((er)=>console.log(er));
    setConnected(true)
    
    }
  }

  const tokenAddress = '0x6c7fc3Fd4a9f1Cfa2a69B83F92b9DA7EC26240A2'

  const handleCall = async()=>{

    const tokenContract = new ethers.Contract(tokenAddress, Abi, provider)
    const tokenName_ = await tokenContract.name()
    setTokenName(tokenName_)
  }

  function disconnect(){
    web3modal.clearCachedProvider()
    localStorage.removeItem("walletconnect")
    setConnected(false)
    setAccount('')
    setChainId(NaN)
  }
  return (
    <>
    <button onClick={connect}>Wallet Connect</button>
    <button onClick={disconnect}>Disconnect</button>
    <p>Connected: { connected ? "YES" : "NO" } </p>
    <p>Chain Id: { chainId } </p>
    <p>Address: { account } </p>
    <p>Token: { tokenName } </p>
    <button onClick={handleCall}>Call Token</button>
    </>
  )
}

export default Button
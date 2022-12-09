import {
  useState
} from 'react'
import {
  connectKeplr
} from '../services/keplr'
import {
  SigningCosmWasmClient,
  CosmWasmClient,
  JsonObject
} from '@cosmjs/cosmwasm-stargate'
import {
  fromBase64,
  toBase64
} from '@cosmjs/encoding'
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertFromMicroDenom
} from '../utils/conversion'

import {
  toast
} from 'react-toastify';

import {
  staking_chain
}
from '../src/constants'

export const defaultFee = {
  amount: [],
  gas: "400000",
}


export const useSigningCosmWasmClient = () => {
  const [client, setClient] = useState(null)
  const [signingClient, setSigningClient] = useState(null)

  const [walletAddress, setWalletAddress] = useState('')
  const [maxAmountValue, setMaxAmountValue] = useState(1);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const [nativeBalanceStr, setNativeBalanceStr] = useState('')
  const [nativeBalance, setNativeBalance] = useState(0)

  const [config, setConfig] = useState({
    owner: '',
    enabled: true,
    denom: null,
    treasury_amount: 0,
    flip_count: 0
  })

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    connect & disconnect   //////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const showNotification = false;
  const notify = (flag, str) => {
    if (!showNotification)
      return;

    if (flag)
      toast.success(str)
    else
      toast.error(str)
  }
  const connectWallet = async (inBackground) => {
    if (!inBackground) setLoading(true)
    try {
      await connectKeplr()
      // enable website to access kepler

      // await window.keplr.enable(PUBLIC_CHAIN_ID)

      await window.keplr.enable(staking_chain.CHAIN_ID)

      // get offline signer for signing txs
      const offlineSigner = await window.getOfflineSignerOnlyAmino(staking_chain.CHAIN_ID)

      // make client
      setClient(await CosmWasmClient.connect(staking_chain.CHAIN_RPC_ENDPOINT))

      const client = await SigningCosmWasmClient.connectWithSigner(staking_chain.CHAIN_RPC_ENDPOINT, offlineSigner)
      setSigningClient(client)

      // get user address
      const [{
        address
      }] = await offlineSigner.getAccounts()
      setWalletAddress(address)

      localStorage.setItem('address', address)

      if (!inBackground) {
        setLoading(false)
        notify(true, 'Connected Successfully')
      }
    } catch (error) {
      notify(false, `Connect error : ${error}`)
      if (!inBackground) {
        setLoading(false)
      }
    }
  }

  const disconnectwallet = () => {
    if (signingClient) {
      localStorage.removeItem('address')
      signingClient.disconnect()
    }
    setWalletAddress('')
    setIsAdmin(false)
    setSigningClient(null)
    setLoading(false)
    notify(true, `Disconnected successfully`)
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    global variables    /////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const getBalances = async () => {
    setLoading(true)
    getHoleAmount()
    try {
      const objectNative = await signingClient?.getBalance(walletAddress, staking_chain.STAKING_DENOM)
      setNativeBalanceStr(`${convertMicroDenomToDenom(objectNative.amount)} ${convertFromMicroDenom(objectNative.denom)}`)
      setNativeBalance(convertMicroDenomToDenom(objectNative.amount))
      setLoading(false)
      notify(true, `Successfully got balances`)
    } catch (error) {
      setLoading(false)
      notify(false, `GetBalances error : ${error}`)
    }
  }

  const getConfig = async () => {

    setLoading(true)
    try {
      const response = await signingClient?.queryContractSmart(staking_chain.STAKING_CONTRACT, {
        config: {}
      })
      setConfig(response)
      setIsAdmin(response.owner == walletAddress)
      setLoading(false)
      notify(true, `Successfully got config`)
    } catch (error) {
      setLoading(false)
      notify(false, `getConfig error : ${error}`)
    }
  }

  const getHoleAmount = async () => {
    return 100
    setLoading(true)

    const response = ""
    try {
      const response = await signingClient?.queryContractSmart(staking_chain.STAKING_CONTRACT, {
        get_hole_amount: {
          "address": walletAddress
        }
      })
      setLoading(false)
    } catch (error) {

      setLoading(false)
      notify(false, `getConfig error : ${error}`)
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////    Execute Flip and Remove Treasury     ////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const executeStake = async (level, index) => {
    setLoading(true)
    getHoleAmount()
    console.log("execute stake with = ", level)
    console.log("walletAddress=", walletAddress)
    console.log("index =  ", index)
    let result
    try {
      let encodedMsg = toBase64(new TextEncoder().encode(`{"stake": { "lock_type": 1 }}`))
      result = await signingClient?.execute(
        walletAddress, // sender address
        staking_chain.STAKING_TOKEN_ADDRESS, {
          "send": {
            "contract": staking_chain.STAKING_CONTRACT,
            "amount": convertDenomToMicroDenom(level),

            "msg": encodedMsg
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      // console.log("token_addr=", staking_chain.STAKING_TOKEN_ADDRESS)
      // console.log("contract_addr=", staking_chain.STAKING_CONTRACT)
      // console.log("result = ", result)
      setLoading(false)
      toast.success("Success: txHash=" + result?.transactionHash)
    } catch (error) {

      setLoading(false)
      toast.error("Failed to stake")
      notify(false, `Failed to stak : ${error}`)
      console.log(error)

    }

  }

  const executeUnStake = async () => {
    setLoading(true)
    console.log("execute Unstake with = ")
    console.log("walletAddress=", walletAddress)
    let result
    try {
      let encodedMsg = toBase64(new TextEncoder().encode(`{"stake": {}}`))
      result = await signingClient?.execute(
        walletAddress, // sender address
        staking_chain.STAKING_CONTRACT, {
          "unstake": {}
        }, // msg
        defaultFee,
        undefined,
        []
      )
      toast.success("Success: txHash=" + result?.transactionHash)
      setLoading(false)
    } catch (error) {
      // console.log("result = ", result)
      setLoading(false)
      toast.error("UnStaking failed. No staking amount")
      //console.log(error)
    }
  }
  const executeReward = async (reward) => {

    let juno_flag = true;
    let ranking = 1

    try {
      const response = await signingClient?.queryContractSmart(staking_chain.STAKING_CONTRACT, {
        list_stakers: {}
      })

      let mystaking_amount = 0
      // console.log("my walffflet address ", walletAddress)
      // console.log(response)
      // console.log("please stake with Hole Token", response.stakers.length)
      if (response.stakers.length > 0) {
        for (let i = 0; i < response.stakers.length; i++) {
          if (response.stakers[i][0]?.address == walletAddress) {
            for (let j = 0; j < response.stakers[i].length; j++) {
              mystaking_amount += parseInt(response.stakers[i][0].amount)
            }
            break;
          }
        }

        if (mystaking_amount == 0) {
          // console.log("please stake with Hole Token")
          toast.error("Please stake with Hole token")
          return
        }
        // console.log("my staking amount", mystaking_amount)
        for (let i = 0; i < response.stakers.length; i++) {
          let temp = 0
          if (response.stakers[i][0]?.address != walletAddress) {
            for (let j = 0; j < response.stakers[i].length; j++) {
              temp += parseInt(response.stakers[i][0].amount)
            }

            if (mystaking_amount <= temp)
              ranking++
          }
        }

      }
      // console.log("ranking", ranking)

    } catch (error) {
      notify(false, `getConfig error : ${error}`)
      setLoading(false)
      return
    }
    // successNotification({ title: `Current Rank ` + ranking })
    toast.success('Current Rank ' + ranking)

    if (ranking > 3)
      juno_flag = false

    const params = {
      "claim_reward": {
        "distribution": {
          "juno_reward": juno_flag,
          "artists": reward[0],
          "burn": reward[1] - reward[0],
          "charity": reward[2] - reward[1],
        }
      }
    }

    try {

      let result = await signingClient?.execute(
        walletAddress, // sender address
        staking_chain.STAKING_CONTRACT, // token escrow contract
        params,
        defaultFee,
        undefined,

      )
      toast.success("Success: txHash=" + result?.transactionHash)
      // console.log(result)
      setLoading(false)

    } catch (error) {
      toast.error("Reward failed")
      setLoading(false)
    }
  }

  const executeRemoveTreasury = async (amount) => {
    setLoading(true)
    let result
    try {

      result = await signingClient?.execute(
        walletAddress, // sender address
        staking_chain.STAKING_CONTRACT, // token escrow contract
        {
          "remove_treasury": {
            "amount": `${parseInt(convertDenomToMicroDenom(amount), 10)}`,
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )
      setLoading(false)
      getConfig()
      getBalances()
      if (result && result.transactionHash) {
        toast.success("Remove Treasury Successful: txHash=" + result?.transactionHash)
      }
      notify(true, 'Successfully executed')
    } catch (error) {
      setLoading(false)

    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  return {
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnectwallet,
    client,
    getConfig,
    config,
    isAdmin,


    getBalances,
    nativeBalanceStr,
    nativeBalance,

    executeStake,
    executeUnStake,
    executeReward,
    executeRemoveTreasury,
    getHoleAmount

  }
}
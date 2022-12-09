import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { defaultRegistryTypes, SigningStargateClient } from '@cosmjs/stargate';
import { encodePubkey, makeSignDoc, Registry } from '@cosmjs/proto-signing';
import { encodeSecp256k1Pubkey } from '@cosmjs/amino/build/encoding';
import { fromBase64, toBase64 } from '@cosmjs/encoding';
import { makeSignDoc as AminoMakeSignDoc } from '@cosmjs/amino';
import { AuthInfo, TxBody, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx';
import { getKeplr, getBalance } from "../lib/CosmosHelper";
import { config, chainConfig, IBC_TOKENS_LIST_URL, urlFetchAllowances, urlFetchIBCAccount, urlDeList, urlBuyNFT, LIST_NFT_URL } from "../src/constants";
import { isEmpty } from "./conversion";
import { convertToCamelCase } from "./strings";
import api from "../src/api";
import { customRegistry, customTypes } from '../components/registry';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [getSelectedNFT, setNFT] = useState(null);
  const [nftShow, setNFTShow] = useState(false);
  const [walletInfo, setWalletInfo] = useState({});
  const [nftsList, setNFTsList] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ibcTokensList, setIBCTokensList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [signingClient, setSigningClient] = useState(null);
  const [keys, setKeplrAccountKeys] = useState();
  const [refreshGallery, setRefreshGallery] = useState(false);
  const [showStars, setShowStars] = useState(true);

  useEffect(() => {
    fetchIBCTokensList();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isEmpty(walletInfo.address)) {
        await fetchUserInfo(walletInfo.address);
        await fetchAllowances(walletInfo.address);
      }
    })()
  }, [walletInfo]);

  const fetchUserInfo = async (address) => {
    let data = null;
    try {
      const resp1 = await axios({
        method: "get",
        url: `${api.baseUrl}${api.user}/findOne`,
        params: {
          address
        }
      })
      data = resp1.data;
      const url = `${config.DATA_LAYER}/nfts?owner=${address}&skip=0&limit=1`;
      const resp2 = await axios.get(url, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      const count = resp2.data.result.count;
      if (count != data.nft_count) {
        await axios({
          method: "post",
          url: `${api.baseUrl}${api.user}/${data._id}`,
          data: {
            count
          }
        })
        console.log('Updated the nft count')
      }
      setUserInfo({
        user_id: data._id,
        user_name: data.username,
        user_email: data.email,
        user_address: data.address,
        user_discord: data.discord,
        user_tg: data.telegram,
        user_bio: data.userBio,
        nft_count: count,
        avatar: data.avatar,
        banner: data.banner
      })
    } catch (error) {
      console.log('login failed = ', error);
    }
  }

  const fetchAllowances = async (address) => {
    const url = urlFetchAllowances(address);
    try {
      const resp = await axios.get(url, {
        headers: {
          Accept: 'application/json, text/plain, */*',
        }
      })
      setAllowances(resp.data.result);
    } catch (error) {
      console.log('Blance error: ', error);
    }
  }

  const fetchBalance = async (address) => {
    try {
      const balance = 0; //await getBalance(address);
      const resp = await axios({
        method: "get",
        url: `${config.REST_URL}/bank/balances/${address}`,
        headers: {
          Accept: 'application/json, text/plain, */*',
        }
      })
      const balances = [{
        denom: config.COIN_MINIMAL_HOLE,
        amount: balance
      }];
      balances = balances.concat(resp.data.result);
      setWalletInfo({ address: address, balance: balances });
    } catch (error) {
      console.log('Blance error: ', error);
    }
  }

  const connectAndGetBalance = async () => {
    // console.log('pollOptionId', pollOptionId)
    var keplr = await getKeplr();

    if (!window.getOfflineSigner || !window.keplr || !keplr) {
      alert("Please install keplr to continue.");
      window.open("https://www.keplr.app/", '_blank');
      return;
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain(chainConfig);
        } catch (error) {
          console.log(error)
          toast.error('Failed to suggest the chain');
          return;
        }
      } else {
        toast.warn('Please use the recent version of keplr extension');
        return;
      }
    }

    try {
      await keplr.enable(config.CHAIN_ID);
    }
    catch (err) {
      console.log(err)
      return
    }
    const offlineSigner = window.keplr.getOfflineSigner(config.CHAIN_ID);
    // // It can return the array of address/public key.
    // // But, currently, Keplr extension manages only one address/public key pair.
    // // XXX: This line is needed to set the sender address for SigningCosmosClient.
    const tempClient = await SigningCosmWasmClient.connectWithSigner(
      config.RPC_URL,
      offlineSigner
    );
    setSigningClient(tempClient);
    const accounts = await offlineSigner.getAccounts();
    //https://lcd-juno.cosmostation.io/cosmos/bank/v1beta1/balances/juno1dru5985k4n5q369rxeqfdsjl8ezutch8y9vuau?pagination.limit=1000
    //use juno tools api to find balance
    // const balances = await axios.get(`https://lcd-juno.cosmostation.io/cosmos/bank/v1beta1/balances/${accounts[0].address}?pagination.limit=1000`)

    // console.log('accounts', accounts)
    const address = accounts[0].address
    setWalletInfo({ address: address })
    await fetchBalance(address);
    const res = await window.keplr && window.keplr.getKey(config.CHAIN_ID)
    setKeplrAccountKeys(res);
    // for (var i = 0; i < balancePairs.length; i++){
    //   const pair = balancePairs[i];
    //   if (pair.denom == "ujuno"){
    //     voting_balance = pair.amount
    //   }
    // }

    // // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    // const cosmJS = new SigningCosmosClient(
    //     "https://lcd-cosmoshub.keplr.app",
    //     accounts[0].address,
    //     offlineSigner,
    // );
    // const title = document.getElementById("description").value;

    // if (balance == 0) {
    //   alert("You must hold HOLE to vote. Get it on Junoswap soon or see our Token drop page to earn HOLE. ")
    //   return
    // }
  }

  const disconnect = async () => {
    if (signingClient) {
      signingClient.disconnect();
    }
    setWalletInfo({});
  }

  const aminoSignTx = async (tx, address, cb) => {
    await window.keplr && window.keplr.enable(config.CHAIN_ID);
    const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);

    try {
      const client = await SigningStargateClient.connectWithSigner(
        config.RPC_URL,
        offlineSigner,
      );

      const account = {};
      try {
        const {
          accountNumber,
          sequence,
        } = await client.getSequence(address);
        account.accountNumber = accountNumber;
        account.sequence = sequence;
      } catch (e) {
        account.accountNumber = 0;
        account.sequence = 0;
      }

      const signDoc = AminoMakeSignDoc(
        tx.msgs ? tx.msgs : [tx.msg],
        tx.fee,
        config.CHAIN_ID,
        tx.memo,
        account.accountNumber,
        account.sequence,
      );

      offlineSigner.signAmino(address, signDoc).then((result) => {
        if (result && result.code !== undefined && result.code !== 0) {
          console.log('SignTxError 1: ', result.log || result.rawLog);
        } else {
          console.log(result);
          cb(result);
        }
      }).catch((error) => {
        console.log('SignTxError 2: ', error && error.message);
      });
    } catch (e) {
      console.log('SignTxError 3: ', e && e.message);
    }
  };

  const txSignAndBroadCast = (data, cb) => {
    const url = config.REST_URL + '/cosmos/tx/v1beta1/txs';
    axios.post(url, data, {
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    })
      .then((res) => {
        if (res.data && res.data.tx_response && (res.data.tx_response.code !== undefined) && (res.data.tx_response.code !== 0)) {
          console.log('txSignAndBroadCastError: ', res.data.tx_response.logs && res.data.tx_response.logs.length
            ? res.data.tx_response.logs
            : res.data.tx_response.raw_log)
          cb(null);
        } else {
          const message = 'Transaction Success, Waiting for the tx to be included in block';
          console.log('Success: ', res.data && res.data.tx_response, message, 'processing',
            res.data && res.data.tx_response && res.data.tx_response.txhash);
          cb(res.data && res.data.tx_response);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response &&
          error.response.data &&
          error.response.data.message
          ? error.response.data.message
          : 'txSignAndBroadCast Failed!');
        cb(null);
      });
  };


  const txSignAndBroadCastAminoSign = (data, cb) => {
    const url = config.REST_URL + '/txs';
    axios.post(url, data, {
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    })
      .then((res) => {
        if (res.data && res.data.code !== undefined && (res.data.code !== 0)) {
          console.log('SignAndBroadCastError: ', res.data.logs || res.data.raw_log);
          cb(null);
        } else {
          const message = 'Transaction Success, Waiting for the tx to be included in block';
          console.log(res.data, message, 'processing', res.data && res.data.txhash);
          cb(res.data);
        }
      })
      .catch((error) => {
        console.log(
          error.response &&
            error.response.data &&
            error.response.data.message
            ? error.response.data.message
            : 'Failed!',
        );
        cb(null);
      });
  };

  const fetchTxHash = (hash, cb) => {
    const url = config.REST_URL + '/txs/' + hash;
    axios.get(url, {
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    })
      .then((res) => {
        if (res.data && res.data.code !== undefined && res.data.code !== 0) {
          console.log(res.data.logs || res.data.raw_log);
          cb(res.data);
        } else {
          console.log('Success', hash);
          cb(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        cb(null);
      });
  };

  const fetchIBCTokensList = async () => {
    try {
      const resp = await axios.get(IBC_TOKENS_LIST_URL, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      setIBCTokensList(resp.data && resp.data.result);
    } catch (error) {

    }
  }

  const gasEstimation = (tx, pubKey, address, IBCConfig, protoType, cb) => {
    const url = urlFetchIBCAccount((IBCConfig && IBCConfig.REST_URL) || config.REST_URL, address);
    axios.get(url, {
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    }).then((response) => {
      const sequence = response && response.data && response.data.account && response.data.account.sequence;
    }).catch(() => {
      const sequence = 0;
    });
  };

  const protoBufSigning = (tx, address, cb) => {
    (async () => {
      await window.keplr && window.keplr.enable(config.CHAIN_ID);
      const offlineSigner = window.getOfflineSigner && window.getOfflineSigner(config.CHAIN_ID);
      const myRegistry = new Registry([...defaultRegistryTypes, ...customRegistry]);
      if (tx && tx.fee && tx.fee.granter && window.keplr) {
        window.keplr.defaultOptions = {
          sign: {
            disableBalanceCheck: true,
          },
        };
      } else if (window.keplr) {
        window.keplr.defaultOptions = {};
      }

      try {
        const client = await SigningStargateClient.connectWithSigner(
          config.RPC_URL,
          offlineSigner,
          { registry: myRegistry },
        );

        let account = {};
        try {
          account = await client.getAccount(address);
        } catch (e) {
          account.accountNumber = 0;
          account.sequence = 0;
        }
        const accounts = await offlineSigner.getAccounts();

        let pubkey = accounts && accounts.length && accounts[0] &&
          accounts[0].pubkey && encodeSecp256k1Pubkey(accounts[0].pubkey);
        pubkey = accounts && accounts.length && accounts[0] &&
          accounts[0].pubkey && pubkey && pubkey.value &&
          encodePubkey(pubkey);

        let authInfo = {
          signerInfos: [{
            publicKey: pubkey,
            modeInfo: {
              single: {
                mode: 1,
              },
            },
            sequence: account && account.sequence,
          }],
          fee: { ...tx.fee },
        };
        authInfo = AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();

        let msgValue = tx.msgs ? tx.msgs && tx.msgs[0] && tx.msgs[0].value : tx.msg && tx.msg.value;
        msgValue = msgValue && convertToCamelCase(msgValue);
        let typeUrl = tx.msgs ? tx.msgs && tx.msgs[0] && tx.msgs[0].typeUrl : tx.msg && tx.msg.typeUrl;

        if (tx.msgType) {
          const type = customTypes[tx.msgType].type;
          typeUrl = customTypes[tx.msgType].typeUrl;
          msgValue = type.encode(type.fromPartial(msgValue)).finish();
        } else if (typeUrl === '/ibc.applications.transfer.v1.MsgTransfer') {
          msgValue = MsgTransfer.encode(MsgTransfer.fromPartial(msgValue)).finish();
        }

        let bodyBytes = {
          messages: [{
            typeUrl: typeUrl,
            value: msgValue,
          }],
          memo: tx.memo,
        };
        bodyBytes = TxBody.encode(TxBody.fromPartial(bodyBytes)).finish();

        const signDoc = makeSignDoc(
          bodyBytes,
          authInfo,
          config.CHAIN_ID,
          account && account.accountNumber,
        );

        offlineSigner.signDirect(address, signDoc).then((result) => {
          const txRaw = TxRaw.fromPartial({
            bodyBytes: result.signed.bodyBytes,
            authInfoBytes: result.signed.authInfoBytes,
            signatures: [fromBase64(result.signature.signature)],
          });
          const txBytes = TxRaw.encode(txRaw).finish();
          if (result && result.code !== undefined && result.code !== 0) {
            console.log('SignTxError 4: ', result.log || result.rawLog)
          } else {
            cb(result, toBase64(txBytes));
          }
        }).catch((error) => {
          console.log('SignTxError 5: ', error && error.message)
        });
      } catch (error) {
        console.log('SignTxError 6: ', error && error.message)
      }
    })();
  };

  const fetchUserNFTs = async () => {
    const url = `${config.DATA_LAYER}/nfts?owner=${walletInfo?.address}`;
    try {
      const resp = await axios.get(url + `&skip=0&limit=1`, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      const count = resp.data.result.count;
      const resp2 = await axios.get(url + `&limit=${count}&sortBy=updated_at&order=desc`, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      setNFTsList(resp2.data.result.list)
    } catch (error) {
      console.log('Fetch User NFTs error : ', error);
    }
  }

  const fetchArtist = async (address) => {
    const url = `${config.DATA_LAYER}/nfts?owner=${address}&denomId=${config.ACE_DENOMID}`;
    try {
      const resp = await axios.get(url + `&skip=0&limit=1`, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      const count = resp.data.result.count;
      if (count > 0) return true;
    } catch (error) {
      console.log('Is Artist error : ', error);
    }
    return false;
  }

  const buyNFT = (data, id, cb) => {
    const url = urlBuyNFT(id);
    axios.post(url, data, {
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    })
      .then((res) => {
        cb(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response &&
          error.response.data &&
          error.response.data.message
          ? error.response.data.message
          : 'Failed!')
        cb(null);
      });
  }

  const listNFT = (data, cb) => {
    axios.post(LIST_NFT_URL, data, {
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    })
      .then((res) => {
        cb(res.data);
      })
      .catch((error) => {
        console.log(error);
        cb(null);
      });
  };

  const deListNFT = (data, id, cb) => {
    const url = urlDeList(id);
    axios.put(url, data, {
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    })
      .then((res) => {
        cb(res.data);
      })
      .catch((error) => {
        console.log(error);
        cb(null);
      });
  };

  const updateGallery = () => {
    setRefreshGallery(!refreshGallery);
  }

  return (
    <AppContext.Provider
      value={{
        getSelectedNFT,
        nftShow,
        walletInfo,
        loading,
        ibcTokensList,
        userInfo,
        allowances,
        keys,
        nftsList,
        refreshGallery,
        showStars,
        
        setNFT,
        setNFTShow,
        setLoading,
        setUserInfo,
        fetchUserInfo,
        fetchBalance,
        fetchUserNFTs,
        fetchArtist,

        disconnect,
        connectAndGetBalance,
        setShowStars,

        aminoSignTx,
        fetchTxHash,
        gasEstimation,
        txSignAndBroadCast,
        txSignAndBroadCastAminoSign,
        protoBufSigning,
        buyNFT,
        listNFT,
        deListNFT,
        updateGallery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

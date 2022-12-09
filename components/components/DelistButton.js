import React, { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { AppContext } from "../../utils/context";
import { config } from "../../src/constants";
import { customTypes } from '../registry';

const DelistButton = () => {
  const {
    walletInfo,
    allowances,
    keys,
    getSelectedNFT,
    setNFTShow,
    deListNFT,
    aminoSignTx,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
    fetchTxHash,
    fetchBalance,
    fetchUserNFTs,
    protoBufSigning,
    updateGallery
  } = useContext(AppContext);

  const handleHash = (res1) => {
    if (res1 && res1.txhash) {
      const id = toast.loading('Transaction is pending...');
      let counter = 0;
      const time = setInterval(() => {
        fetchTxHash(res1.txhash, (hashResult) => {
          if (hashResult) {
            if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
              // console.log(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
              clearInterval(time);
              return;
            }

            toast.update(id, { render: "Successfully unlisted", type: "success", isLoading: false, autoClose: 5000 });
            setNFTShow(false);
            fetchUserNFTs(walletInfo.address);
            clearInterval(time);
          }
          counter++;
          if (counter === 3) {
            if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
              // console.log(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
              clearInterval(time);
              return;
            }
            toast.update(id, { render: "Please check later", type: "warning", isLoading: false, autoClose: 5000 });
            setNFTShow(false);
            fetchUserNFTs(walletInfo.address);
            clearInterval(time);
          }
        });
      }, 5000);
    }
  }

  const handleLedgerTransaction = (data, msg, granterInfo, balance, path) => {
    if (data && data.fee && data.fee.granter && window.keplr) {
      window.keplr.defaultOptions = {
        sign: {
          disableBalanceCheck: true,
        },
      };
    } else if (window.keplr) {
      window.keplr.defaultOptions = {};
    }

    const Tx = {
      msgs: msg,
      fee: {
        amount: [{
          amount: String(5000),
          denom: config.COIN_MINIMAL_DENOM,
        }],
        gas: String(200000),
      },
      memo: '',
    };

    aminoSignTx(Tx, walletInfo.address, (result) => {
      if (result) {
        const data = {
          tx: result.signed,
          mode: 'sync',
        };
        if ((granterInfo && granterInfo.granter && !balance) ||
          (granterInfo && granterInfo.granter && balance && (balance < 0.1))) {
          data.fee_granter = granterInfo.granter;
        }
        data.tx.msg = result.signed.msgs;
        data.tx.signatures = [result.signature];
        if (data.tx.msgs) {
          delete data.tx.msgs;
        }
        txSignAndBroadCastAminoSign(data, (res1) => {
          handleHash(res1, path);
        });
      }
    });
  }

  const handleDelist = () => {
    const data = {
      base_req: {
        from: walletInfo.address,
        chain_id: config.CHAIN_ID,
      },
      owner: walletInfo.address,
    };

    deListNFT(data, getSelectedNFT && getSelectedNFT.list &&
      getSelectedNFT.list.id, (res) => {
        if (res) {
          let balance = walletInfo.balance && walletInfo.balance.length && walletInfo.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
          balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

          const Tx = {
            msgs: res.value && res.value.msg,
            msgType: 'DeListNFT',
            fee: {
              amount: [{
                amount: String(5000),
                denom: config.COIN_MINIMAL_DENOM,
              }],
              gasLimit: String(200000),
            },
            memo: '',
          };

          const type = customTypes && customTypes.DeListNFT && customTypes.DeListNFT.typeUrl;
          const granterInfo = {};
          if (allowances && allowances.length) {
            allowances.map((val) => {
              if (val && val.allowance && val.allowance.spend_limit && val.allowance.spend_limit.length) {
                const amount = val.allowance.spend_limit.find((val1) => (val1.denom === config.COIN_MINIMAL_DENOM) &&
                  val1.amount && (val1.amount > 0.1 * (10 ** config.COIN_DECIMALS)));
                if (amount && amount.amount) {
                  granterInfo.granter = val.granter;
                  granterInfo.amount = amount.amount / 10 ** config.COIN_DECIMALS;
                }
              } else if (val && val.allowance && val.allowance.allowed_messages &&
                type && val.allowance.allowed_messages.indexOf(type) > -1) {
                if (val && val.allowance && val.allowance.allowance &&
                  val.allowance.allowance.spend_limit && val.allowance.allowance.spend_limit.length) {
                  const amount = val.allowance.allowance.spend_limit.find((val1) => (val1.denom === config.COIN_MINIMAL_DENOM) &&
                    val1.amount && (val1.amount > 0.1 * (10 ** config.COIN_DECIMALS)));
                  if (amount && amount.amount) {
                    granterInfo.granter = val.granter;
                    granterInfo.amount = amount.amount / 10 ** config.COIN_DECIMALS;
                  }
                }
              }

              return null;
            });
          }

          if ((granterInfo && granterInfo.granter && !balance) ||
            (granterInfo && granterInfo.granter && balance && (balance < 0.1))) {
            Tx.fee.granter = granterInfo.granter;
          }

          if (keys && keys.isNanoLedger) {
            handleLedgerTransaction(Tx, res.value && res.value.msg, granterInfo, balance, path);
            return;
          }

          protoBufSigning(Tx, walletInfo.address, (result, txBytes) => {
            if (result) {
              const data = {
                tx_bytes: txBytes,
                mode: 'BROADCAST_MODE_SYNC',
              };
              txSignAndBroadCast(data, (res1) => {
                handleHash(res1);
              });
            } else {
              console.log('Fail');
            }
          });
        }
      });
  }

  return (
    <button className="btn-main" onClick={handleDelist}>
      Delist
    </button>
  );
};
export default DelistButton;

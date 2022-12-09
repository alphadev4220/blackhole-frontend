import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from "../../utils/context";
import { decodeFromBech32, } from "../../utils/conversion";
import { config, urlTransferNFT } from "../../src/constants";
import { customTypes } from '../registry';
import SelectCoin from './SelectCoin';

const DEF_COINS = [
  'uflix',
  'hole',
];

const ListDialog = ({ show = false, setShow, onHide }) => {
  const {
    getSelectedNFT,
    walletInfo,
    allowances,
    keys,
    aminoSignTx,
    txSignAndBroadCast,
    txSignAndBroadCastAminoSign,
    fetchTxHash,
    fetchBalance,
    fetchUserNFTs,
    protoBufSigning,
    listNFT,
    updateGallery
  } = useContext(AppContext);

  const [sellTokenPrice, setSellTokenPrice] = useState(0);
  const [denom, setDenom] = useState(config.COIN_MINIMAL_DENOM);

  const handleHash = (res1) => {
    if (res1 && res1.txhash) {
      const id = toast.loading('Transaction is pending...');
      setShow(false);
      let counter = 0;
      const time = setInterval(() => {
        fetchTxHash(res1.txhash, (hashResult) => {
          if (hashResult) {
            if (hashResult && hashResult.code !== undefined && hashResult.code !== 0) {
              // console.log(hashResult.logs || hashResult.raw_log, 'error', hashResult && hashResult.hash);
              clearInterval(time);
              return;
            }

            toast.update(id, { render: "Successfully listed", type: "success", isLoading: false, autoClose: 5000 });
            onHide();
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
            onHide();
            clearInterval(time);
          }
        });
      }, 5000);
    }
  }

  const handleLedgerTransaction = (data, msg, granterInfo, balance) => {
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
          handleHash(res1);
        });
      }
    });
  }
  
  const handleList = async () => {
    let price = null;
    if (sellTokenPrice <= 0) {
      toast.warning('Please input the valid amount');
      return;
    }
    // console.log(denom);
    if (denom === config.COIN_MINIMAL_DENOM) {
      price = (sellTokenPrice * (10 ** config.COIN_DECIMALS)) + denom;
    } else {
      toast.error('Not supported yet');
      return;
    }

    const data = {
      base_req: {
        from: walletInfo.address,
        chain_id: config.CHAIN_ID,
      },
      owner: getSelectedNFT && getSelectedNFT.owner,
      denom_id: getSelectedNFT && getSelectedNFT.denom_id,
      nft_id: getSelectedNFT && getSelectedNFT.id,
      price: price,
      split_shares: [],
    };

    if (keys && keys.isNanoLedger) {
      handleLedgerTransaction(data);
      return;
    }

    listNFT(data, (res) => {
      if (res) {
        let balance = walletInfo.balance && walletInfo.balance.length && walletInfo.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
        balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);
        const msg = res.value && res.value.msg;
        if (msg.length && msg[0] && msg[0].value) {
          if (!msg[0].value.split_shares) {
            msg[0].value.split_shares = [];
          } else {

          }
        }

        const Tx = {
          msgs: res.value && res.value.msg,
          msgType: 'ListNFT',
          fee: {
            amount: [{
              amount: String(5000),
              denom: config.COIN_MINIMAL_DENOM,
            }],
            gasLimit: String(200000),
          },
          memo: '',
        };

        const type = customTypes && customTypes.ListNFT && customTypes.ListNFT.typeUrl;
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
            console.log('Fail')
          }
        });
      }
    });
  };

  const handleChange = (e) => {
    setSellTokenPrice(Number(e.target.value));
  }

  const handleClose = () => {
    setShow(false);
  }

  const handleDenom = (e, value) => {
    setDenom(DEF_COINS[Number(value)]);
  }

  return (
    <Modal centered className="layer2_modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 className="mb-4">List "{getSelectedNFT?.name}"</h4>
        <span>Listing Price</span>
        <div className="row">
          <div className="col-md-4">
            <SelectCoin onChange={handleDenom} />
          </div>
          <div className="col-md-8">
            <input type='number' name='amount' className="form-control" onChange={handleChange} autoComplete="off" placeholder="Enter your amount" />
          </div>
        </div>
        <div className="de-flex justify-content-evenly mt-4">
          <button className="btn-main color-1" onClick={handleClose}>Cancel</button>
          <button className="btn-main" onClick={handleList}>Confirm</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ListDialog;

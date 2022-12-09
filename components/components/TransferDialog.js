import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from "../../utils/context";
import { decodeFromBech32, } from "../../utils/conversion";
import { config, urlTransferNFT } from "../../src/constants";
import { customTypes } from '../registry';

const TransferDialog = ({ show = false, setShow, onHide }) => {
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
    updateGallery
  } = useContext(AppContext);

  const [recipientAddress, setRecipientAddress] = useState('');

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

            toast.update(id, { render: "Successfully transferred", type: "success", isLoading: false, autoClose: 5000 });
            fetchBalance(walletInfo.address);
            fetchUserNFTs(walletInfo.address);
            updateGallery();
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
            fetchBalance(walletInfo.address);
            fetchUserNFTs(walletInfo.address);
            updateGallery();
            onHide();
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

  const handleTransfer = async () => {
    const data = {
      base_req: {
        from: walletInfo.address,
        memo: '',
        chain_id: config.CHAIN_ID,
      },
      sender: walletInfo.address,
      recipient: recipientAddress,
    };
    let valid = false;
    if (recipientAddress !== '') {
      valid = recipientAddress && decodeFromBech32(recipientAddress) && (recipientAddress.indexOf(config.PREFIX) > -1);
    }
    if (!valid || recipientAddress === walletInfo.address) {
      toast.warning('Invalid Address');
      return;
    }
    const denomID = getSelectedNFT.denom.id;
    const onftID = getSelectedNFT.id;
    const url = urlTransferNFT(denomID, onftID);
    const resp = await axios.post(url, data, {
      headers: {
        Accept: 'application/json, text/plain, */*'
      }
    });
    const res = resp.data;
    if (res) {
      let balance = walletInfo.balance && walletInfo.balance.length && walletInfo.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);
      balance = balance && balance.amount && balance.amount / (10 ** config.COIN_DECIMALS);

      const Tx = {
        msgs: res.value && res.value.msg,
        msgType: 'TransferONFT',
        fee: {
          amount: [{
            amount: String(5000),
            denom: config.COIN_MINIMAL_DENOM,
          }],
          gasLimit: String(200000),
        },
        memo: '',
      };

      const type = customTypes && customTypes.TransferONFT && customTypes.TransferONFT.typeUrl;
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
          console.log('Fail')
        }
      });
    }
  };

  const handleChange = (e) => {
    setRecipientAddress(e.target.value);
  }

  const handleClose = () => {
    setShow(false);
  }

  return (
    <Modal centered className="layer2_modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 className="mb-4">Transfer "{getSelectedNFT?.name}" to</h4>
        <input type='text' name='recipentAddress' className="form-control" onChange={handleChange} autoComplete="off" placeholder="Enter your recipent's account address" />
        <div className="de-flex justify-content-evenly">
          <button className="btn-main color-1" onClick={handleClose}>Cancel</button>
          <button className="btn-main" onClick={handleTransfer}>Confirm</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default TransferDialog;

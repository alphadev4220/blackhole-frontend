import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import Image from "next/image";
import Video from "react-player";
import { toast } from 'react-toastify';
import { AppContext } from "../../utils/context";
import { formatCount, getShortAddress, isEmpty } from "../../utils/conversion";
import { config, tokensList, LIST_NFT_URL } from "../../src/constants";
import BuyNFTButton from './BuyNFTButton';
import DelistButton from './DelistButton';
import { getAssetType } from "../../utils/strings";

const NFTDialog = ({ setTransferModal, setListModal }) => {
  const { getSelectedNFT, nftShow, setNFTShow, walletInfo, ibcTokensList } = useContext(AppContext);
  const [tokenType, setTokenType] = useState();
  const [ibcToken, setIBCToken] = useState();

  const handleClose = () => {
    setNFTShow(false);
  }

  useEffect(() => {
    if (nftShow && getSelectedNFT) {
      const _tokenType = getSelectedNFT.list && getSelectedNFT.list.price && getSelectedNFT.list.price.denom &&
        tokensList.find((val) => val.value === getSelectedNFT.list.price.denom);
      const _ibcToken = getSelectedNFT.list && getSelectedNFT.list.price && getSelectedNFT.list.price.denom &&
        ibcTokensList && ibcTokensList.length &&
        ibcTokensList.find((val) => val && val.ibc_denom_hash && (val.ibc_denom_hash === getSelectedNFT.list.price.denom));

      setTokenType(_tokenType);
      setIBCToken(_ibcToken);
      return;
    }
  }, [getSelectedNFT, nftShow]);

  return (
    <Modal size="lg" show={nftShow} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      {getSelectedNFT && (
        <Modal.Body className="text-center container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="nft">
                {
                  getSelectedNFT.media_type && (getAssetType(getSelectedNFT.media_type) === 'video' || getAssetType(getSelectedNFT.media_type) === 'audio') ? (
                    <video
                      loop controls
                      className="nft_item"
                      poster={getSelectedNFT.preview_uri}>
                      <source src={getSelectedNFT.media_uri} />
                    </video>
                  ) : (
                    <Image
                      className="nft_item"
                      src={getSelectedNFT.media_uri}
                      alt={getSelectedNFT.name}
                      width="100%"
                      height="100%"
                      layout="raw"
                    />
                  )
                }
              </div>
            </div>
            <div className="col-md-12">
              <div className="description">
                <table>
                  <tbody>
                    <tr>
                      <th className="text-left">Tittle:</th>
                      <td>{getSelectedNFT?.name}</td>
                    </tr>
                    {getSelectedNFT && getSelectedNFT.list && getSelectedNFT.list.price ? (
                      <tr>
                        <th className="text-left">Price:</th>
                        {ibcToken && ibcToken.network && ibcToken.network.decimals &&
                          getSelectedNFT.list.price && getSelectedNFT.list.price.amount
                          ? <td>
                            {(getSelectedNFT.list.price.amount / (10 ** ibcToken.network.decimals)) > 100
                              ? formatCount(getSelectedNFT.list.price.amount / (10 ** ibcToken.network.decimals), true)
                              : getSelectedNFT.list.price.amount / (10 ** ibcToken.network.decimals)}
                            {' ' + ((ibcToken && ibcToken.network && ibcToken.network.display_denom) || getSelectedNFT.list.price.denom)}
                          </td>
                          : <td>
                            {((getSelectedNFT.list.price && getSelectedNFT.list.price.amount) / (10 ** config.COIN_DECIMALS)) > 100
                              ? formatCount((getSelectedNFT.list.price && getSelectedNFT.list.price.amount) / (10 ** config.COIN_DECIMALS), true)
                              : (getSelectedNFT.list.price && getSelectedNFT.list.price.amount) / (10 ** config.COIN_DECIMALS)}
                            {' ' + ((tokenType && tokenType.label) || (getSelectedNFT.list.price && getSelectedNFT.list.price.denom))}
                          </td>}
                      </tr>
                    ) : (
                      <tr>
                        <th className="text-left">Price:</th>
                        <td>Not Listed</td>
                      </tr>
                    )}
                    <tr>
                      <th className="text-left">Owner:</th>
                      <td>{getShortAddress(getSelectedNFT?.owner)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Description:</th>
                      <td>{getSelectedNFT?.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row align-items-center mt-5">
            <div className="col-md-12">
              <div className="d_profile de-flex justify-content-evenly">
                <div className="field-set">
                  <button className="btn-main" onClick={handleClose}>
                    Go Back
                  </button>
                </div>
                {walletInfo.address === getSelectedNFT.owner && (
                  <div className="field-set">
                    {getSelectedNFT.list ? (
                      <DelistButton />
                    ) : (
                      <button className="btn-main" onClick={() => setListModal(true)}>
                        List
                      </button>
                    )}
                  </div>
                )}
                {walletInfo.address === getSelectedNFT.owner ? (
                  <div className="field-set">
                    <button className="btn-main" onClick={() => setTransferModal(true)} disabled={getSelectedNFT.list != undefined}>
                      Transfer
                    </button>
                  </div>
                ) : getSelectedNFT.list ? (
                  <BuyNFTButton value={getSelectedNFT} />
                ) : (
                  <div className="field-set">
                    <button className="btn-main" disabled>
                      Not listed
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
};
export default NFTDialog;

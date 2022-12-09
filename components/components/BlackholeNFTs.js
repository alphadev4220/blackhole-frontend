import React, { useContext, useState } from "react";
import { createGlobalStyle } from "styled-components";
import MySlider from "./Customslider";
import NFTGallery from './NFTGallery';
import NFTCollection from './NFTCollection';
import Image from "next/image";
import { AppContext } from "../../utils/context";
import { convertMicroDenomToDenom, getShortAddress, isEmpty } from "../../utils/conversion";
import { config } from "../../src/constants";
import CopyButton from "./CopyButton";
import TransferDialog from './TransferDialog';
import NFTDialog from './NFTDialog';
import { getAvatar } from '../../src/api';
import ListDialog from "./ListDialog";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const Colection = function () {
  const { walletInfo, userInfo, setNFTShow } = useContext(AppContext);
  const [transferModal, setTransferModal] = useState(false);
  const [listModal, setListModal] = useState(false);

  const holeBalance = walletInfo.balance && walletInfo.balance.length && walletInfo.balance.find((val) => val.denom === config.COIN_MINIMAL_HOLE);
  const flixBalance = walletInfo.balance && walletInfo.balance.length && walletInfo.balance.find((val) => val.denom === config.COIN_MINIMAL_DENOM);

  const handleClose1 = () => {
    setTransferModal(false);
    setNFTShow(false);
  }

  const handleClose2 = () => {
    setListModal(false);
    setNFTShow(false);
  }

  return (
    <div>
      <GlobalStyles />

      <section className="container main-cont">
        <div className="d_profile profile-banner">
          <div className=" de-flex ">
            <div className="profile_avatar">
              <Image
                src={getAvatar(userInfo)}
                alt=""
                width="150"
                height="150"
                objectFit="fill"
              />
              <div className="profile_name">
                <h4>
                  {userInfo.user_name ? userInfo.user_name : 'Anonymous'}
                  <span className="profile_username"></span>
                  {/* {!isEmpty(walletInfo.address) && (
                    <div className="de-flex align-items-center">
                      <span id="wallet" className="profile_wallet">
                        {getShortAddress(walletInfo.address)}
                      </span>
                      <CopyButton data={walletInfo.address}></CopyButton>
                    </div>
                  )} */}
                </h4>
              </div>
            </div>
          </div>
          <div className="de-flex gap-3">
            <div style={{ display: walletInfo.address ? 'inline' : 'none' }}  >
              <span className="de-flex justify-content-between align-items-center gap-2">
                <Image
                  src="./img/flix.png"
                  alt="FLIX"
                  width="40"
                  height="40"
                  objectFit="contain"
                />
                <span className="coin_balance">
                  <span className="coin_value">{convertMicroDenomToDenom(flixBalance?.amount).toFixed(1)}</span>
                  <span className="coin_denom">{config.COIN_DENOM}</span>
                </span>
              </span>
            </div>
            <div style={{ display: walletInfo.address ? 'inline' : 'none' }}  >
              <span className="de-flex justify-content-between align-items-center gap-2">
                <Image
                  src="./img/hole.png"
                  alt="HOLE"
                  width="40"
                  height="40"
                  objectFit="contain"
                />
                <span className="coin_balance">
                  <span className="coin_value">{convertMicroDenomToDenom(holeBalance?.amount).toFixed(1)}</span>
                  <span className="coin_denom">{config.COIN_HOLE}</span>
                </span>
              </span>
            </div>
          </div>
        </div>


        <div className="spacer-60"></div>
        <div className="de-flex">
          <div className="profile_name">
            <h2> My NFTs </h2>
          </div>
        </div>
        <div className="row">
          <MySlider />
        </div>

        <div className="spacer-60"></div>

        <div className="de-flex">
          <div className="profile_name">
            <h2>Artist Collection</h2>
          </div>
        </div>
        <div className="row">
          <NFTCollection />
        </div>

        <div className="spacer-60"></div>

        <div className="de-flex">
          <div className="profile_name">
            <h2>NFT Gallery</h2>
          </div>
        </div>
        <div className="row">
          <NFTGallery wallet={walletInfo.address} />
        </div>

        <NFTDialog setTransferModal={setTransferModal} setListModal={setListModal} />
        <TransferDialog show={transferModal} setShow={setTransferModal} onHide={handleClose1} />
        <ListDialog show={listModal} setShow={setListModal} onHide={handleClose2} />
      </section>
    </div>
  );
};
export default Colection;

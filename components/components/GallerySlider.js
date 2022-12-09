import React, { useContext, useState } from "react";
import Image from "next/image";
import { AppContext } from "../../utils/context";
import axios from "axios";
import { useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Slider from './OwlCarousel';
import { config } from "../../src/constants";
import api from '../../src/api';
import { getAssetType } from "../../utils/strings";

export default function GallerySlider({ id = '', nfts = [] }) {
  const { setNFTShow, setNFT, refreshGallery } = useContext(AppContext);

  const handleClick = (nft) => {
    setNFT(nft);
    setNFTShow(true);
  };

  const renderSlides = () =>
    nfts?.length > 0 && nfts?.map((nft, index) => (
      <div className="item" key={index}>
        <div className="nft_pic">
          <span className="nft_pic_info" onClick={(e) => handleClick(nft)}>
            <span className="nft_pic_title">{nft.name}</span>
          </span>
          {nft.list && (
            <span className="list_icon">
              <VisibilityIcon />
            </span>
          )}
          <div className="nft_pic_wrap">
            {
              nft.preview_uri && (
                <Image
                  className="lazy img-fluid"
                  src={(nft.media_type && getAssetType(nft.media_type) === 'image') ? nft.media_uri : nft.preview_uri}
                  alt={nft.name}
                  width={300}
                  height={300}
                />
              )
            }
          </div>
        </div>
      </div>
    ));

  return (
    <div className="nft-big">
      <Slider lazyLoad={true} nav={true} dots={false} autoWidth={true}>{renderSlides()}</Slider>
    </div>
  );
}

import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Slider from './OwlCarousel';
import { AppContext } from "../../utils/context";
import { config } from "../../src/constants";
import { isEmpty, getShortAddress } from "../../utils/conversion";
import { getAssetType } from "../../utils/strings";

const CustomSlide = () => {
  const { setNFT, setNFTShow, walletInfo, nftsList, fetchUserNFTs } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if (!isEmpty(walletInfo)) {
        await fetchUserNFTs();
      }
    })();
  }, [walletInfo]);

  const handleClick = (nft) => {
    setNFT(nft);
    setNFTShow(true);
  };

  const renderSlides = () =>
    nftsList?.length > 0 && nftsList?.map((nft, index) => (
      <div className="itm" key={index}>
        <div className="nft_pic">
          <span className="nft_pic_info" onClick={(e) => handleClick(nft)}>
            <span className="nft_pic_title">{nft.name}</span>
            {/* <span className="nft_pic_by">{getShortAddress(nft.owner)}</span> */}
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
                  width={500}
                  height={500}
                  layout="raw"
                />
              )
            }
          </div>
        </div>
      </div>
    ));

  return (
    <div className="my-nfts">
      {nftsList.length > 0 ? (
        <Slider lazyLoad={true} nav={true} dots={false} autoWidth={true}>{renderSlides()}</Slider>
      ) : (
        <h4 className="mt-4 text-center">No Data</h4>
      )}
    </div>
  );
}

export default CustomSlide;
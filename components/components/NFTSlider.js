import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AppContext } from "../../utils/context";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Slider from './OwlCarousel';
import { toast } from "react-toastify";
import { getAssetType } from "../../utils/strings";
import { config } from "../../src/constants";

export default function NFTSlider({ denomId = '', name = '', nftsList = [], claimed, onClaim, onUnClaim }) {
  const { setNFTShow, setNFT, fetchArtist, walletInfo } = useContext(AppContext);
  const [artist, setArtist] = useState(false);

  useEffect(() => {
    (async () => {
      if (walletInfo && walletInfo.address) {
        const resp = await fetchArtist(walletInfo.address);
        setArtist(resp);
      }
    })()
  }, [walletInfo])

  const handleClick = (nft) => {
    setNFT(nft);
    setNFTShow(true);
  };

  const handleClaim = async () => {
    if (!artist) {
      toast.warning("You can't claim this collection because you aren't an artist.");
      return;
    }
    await onClaim(denomId, name);
  }

  const handleUnClaim = async () => {
    if (walletInfo.address !== config.CALIM_ADDRESS) {
      toast.warning("You can't unclaim this collection because you aren't an admin.");
      return;
    }
    await onUnClaim(denomId);
  }

  const renderSlides = () =>
    nftsList?.length > 0 && nftsList?.map((nft, index) => (
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
      <div className="collection_title">
        <span className="text-white">{name}</span>
        {!claimed && (
          <button className="btn-main color-1" onClick={handleClaim}>Claim</button>
        )}
        {(walletInfo.address === config.CALIM_ADDRESS && claimed) && (
          <button className="btn-main color-1" onClick={handleUnClaim}>Unclaim</button>
        )}
      </div>
      <Slider lazyLoad={true} nav={true} dots={false} autoWidth={true}>{renderSlides()}</Slider>
    </div>
  );
}

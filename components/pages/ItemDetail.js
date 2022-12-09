import React, {useState, createRef} from "react";
import Clock from "../components/Clock";
import BidForm from "./BidForm";
import Footer from '../components/footer';

import { createGlobalStyle } from 'styled-components';
import Link from 'next/link'

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const string = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return string
}

const NFTDetail = function(props) {
const nft = props.nft;



const [openMenu, setOpenMenu] = useState(true);
const [openMenu1, setOpenMenu1] = useState(false);
const handleBtnClick = () => {
  setOpenMenu(!openMenu);
  setOpenMenu1(false);
  document.getElementById("Mainbtn").classList.add("active");
  document.getElementById("Mainbtn1").classList.remove("active");
};
const handleBtnClick1 = () => {
  setOpenMenu1(!openMenu1);
  setOpenMenu(false);
  document.getElementById("Mainbtn1").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
};

var auctionTimerJSX = <div>This auction has ended.</div>

if (!props.nft.auction_ended){
  auctionTimerJSX = <div>
  Auctions ends in 
  <div className="de_countdown">
    <Clock deadline={nft.auction_end_time} />
  </div>
  </div>
}

return (
<div>
<GlobalStyles/>
  <section className='container'>
    <div className='row mt-md-5 pt-md-4'>
    <div className="col-md-6 text-center">
    
                            <img src={nft.image_url} className="img-fluid img-rounded mb-sm-30" alt=""/>
                            <div>
      <BidForm nft={nft} />
                            </div>
                                    
                        </div>
                        
                        <div className="col-md-6">
                            <div className="item_info">
                                {auctionTimerJSX}
                                <h2>{nft.title} </h2>
                                {/* <div className="item_info_counts">
                                    <div className="item_info_type"><i className="fa fa-image"></i>Art</div>
                                    <div className="item_info_views"><i className="fa fa-eye"></i>250</div>
                                    <div className="item_info_like"><i className="fa fa-heart"></i>18</div>
                                </div> */}
                                <p>{nft.description} </p>
                                <h3>{nft.bids.length > 0 ? "Current Bid: " : "Minimum Bid: "}{ nft.current_bid + " XRP"}</h3>
                                    
                                    
                                <h6>Creator</h6>
                                <div className="item_author">                                    
                                    <div className="author_list_pp">
                                        <span>
                                            <img className="lazy" src={nft.author_image_url} alt=""/>
                                            <i className="fa fa-check"></i>
                                        </span>
                                    </div>                                    
                                    <div className="author_list_info">
                                        <span>XRP Army</span>
                                    </div>
                                </div>

                                <div className="spacer-40"></div>

                                <div className="de_tab">
    
                                <ul className="de_nav">
                                    <li id='Mainbtn' className="active"><span>Bids</span></li>
                                </ul>
                                <div className="tab-1 onStep fadeIn">
                                <div className="p_list">
                                { nft.bids.map( bid => (
                                    <div key={bid._id}>
                                    <div className="p_list_pp">
                                    <span>
                                        <img className="lazy" src="./img/author/author-1.jpg" alt=""/>
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>                                    
                                <div className="p_list_info">
                                    <div> Bid <b>{ bid.max_bid } XRP</b> from <b>{ bid.xrp_address }</b> at {formatDate(nft.created_at)  } </div>
                                </div>
                                    </div>
                                ))}
                                </div>
                                </div>
                                <div className="de_tab_content">

                                    
                                    
                                </div>
                                
                            </div>
                                
                            </div>
                        </div>

    </div>
  </section>

  <Footer />
</div>
);
}
export default NFTDetail;
import React, { useEffect, useState, useRef, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import EmailIcon from '@mui/icons-material/Email';
import ReactLoading from "react-loading";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import DeleteIcon from '@mui/icons-material/Delete';
import WebIcon from '@mui/icons-material/Web';
import { FaDiscord, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from "react-toastify";
import GallerySlider from "./GallerySlider";
import { getShortAddress, getLongAddress, copyToClipboard } from "../../utils/conversion";
import { config, DEFAULT_SKIP, DEFAULT_LIMIT } from "../../src/constants";
import api, { getAvatar } from "../../src/api";
import { AppContext } from "../../utils/context";

export default function NFTGallery({ wallet = '' }) {
  const { userInfo, walletInfo } = useContext(AppContext);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [copied, setCopied] = useState(false);
  const usersRef = useRef([]);
  const usersSkip = useRef(0);
  const loading = useRef(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    (async () => {
      await fetchUsers();
    })();
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const fetchUsers = async (skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT) => {
    if (usersSkip.current != DEFAULT_SKIP && usersSkip.current >= skip) {
      return;
    }
    loading.current = true;
    try {
      const response = await axios({
        method: "get",
        url: `${api.baseUrl}${api.user}/findAll`,
        params: {
          skip,
          limit
        }
      })
      const list = response.data;
      let nfts = [];
      for (var i = 0; i < list.length; i++) {
        let user = list[i];
        const resp = await fetchNFTs(user.address, user.nft_count);
        user.nfts = resp;
        nfts.push(user);
      }

      usersRef.current = usersRef.current.concat(nfts);
      setUsers(usersRef.current);
      usersSkip.current = skip;
      setRefresh(!refresh);
    } catch (error) {
      console.log('fetch all failed');
    }
    loading.current = false;
  }
  
  const fetchNFTs = async (owner, nftCount) => {
    try {
      const url = `${config.DATA_LAYER}/nfts?owner=${owner}`;
      const resp = await axios.get(url + `&skip=0&limit=1`, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      const count = resp.data.result.count;
      if (count !== nftCount) {
        await axios({
          method: "post",
          url: `${api.baseUrl}${api.user}/${id}`,
          data: {
            count
          }
        })
        // console.log(id, count, nftCount)
        // console.log(`Updated the ${owner} nft count`)
        if (count === 0) return [];
      }
      const resp2 = await axios.get(url + `&limit=${count}&sortBy=updated_at&order=desc`, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      return resp2.data.result.list;
    } catch (error) {
      // console.log('Fetch User NFTs error : ', error);
    }
    return [];
  }

  const handleScroll = async (e) => {
    if ((usersRef.current.length !== 0 && usersRef.current.length % DEFAULT_LIMIT === 0) &&
      (window.innerHeight + document.documentElement.scrollTop >= (document.documentElement.offsetHeight - window.innerHeight)) &&
      !loading.current) {
      await fetchUsers(usersSkip.current + DEFAULT_LIMIT, DEFAULT_LIMIT);
    }
  }

  const handleCopy = (e, data) => {
    copyToClipboard(data);

    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleClose = () => {
    setShow(false);
  }

  const onClickUser = (artist) => {
    setSelectedUser(artist);
    setShow(true);
  }

  const onDeleteUser = async (user_id) => {
    if (!userInfo || (userInfo && !userInfo.user_id)) {
      toast.warning("You need to register profile.");
      return;
    }
    if (walletInfo && (walletInfo.address !== config.CALIM_ADDRESS)) {
      toast.warning("You can't delete this user because you aren't an admin.");
      return;
    }
    if (confirm('Are you sure you want to delete this collection from the database?')) {
      // Save it!
      await axios({
        method: "delete",
        url: `${api.baseUrl}${api.user}/${user_id}`,
      })
      usersRef.current = [];
      usersSkip.current = 0;
      await fetchUsers();
    } else {
      // Do nothing!

    }
  }

  const renderSlides = () =>
    users?.length > 0 && users?.map((user, index) => {
      return (
        <div key={index}>
          {user.address !== wallet && (
            <div className="d-md-flex justify-content-between align-items-center gap-5 mt-4">
              <div className="text-center collection_artist">
                <div className="collection_pic" onClick={() => onClickUser(user)}>
                  <div className="collection_pic_wrap">
                    <Image
                      className="lazy img-fluid"
                      src={getAvatar(user)}
                      alt={user.username}
                      width={300}
                      height={300}
                      objectFit="fill"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <span className="collection_pic_title">{user.username}</span>
                  {walletInfo?.address === config.CALIM_ADDRESS && (
                    <button className="btn-trash mx-2" onClick={() => onDeleteUser(user._id)}>
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              </div >

              <div
                className="gallery-slider-wrap"
                style={{ width: '80%' }}
              >
                <GallerySlider id={user._id} nfts={user.nfts}></GallerySlider>
              </div>
            </div >
          )}
        </div>
      )
    });
  return (
    <div className="col-md-12">
      {loading.current && (
        <div className={users.length > 0 ? "de-loading with-content" : "de-loading"}>
          <ReactLoading type={'spin'} color="#fff" />
        </div>
      )}
      {renderSlides()}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        {selectedUser && (
          <Modal.Body className="text-center container">
            <div className="row">
              <div className="col-md-12 position-relative">
                <div className="artist_banner">
                  <Image
                    className="lazy img-fluid"
                    src={selectedUser.banner ? api.imgUrl + selectedUser.banner : "/img/background/1.jpg"}
                    alt={selectedUser.username}
                    width="100%"
                    height="400px"
                  />
                </div>
                <div className="artist_info">
                  <h2 className="artist_name">{selectedUser.username}</h2>
                  <h4 className="artist_address" onClick={(e) => handleCopy(e, selectedUser.address)}>
                    <span className={copied ? 'profile_wallet blur' : 'profile_wallet'}> {getLongAddress(selectedUser.address)}</span>
                    <ContentCopyIcon />
                    {copied && (
                      <span className="copied">Copied!</span>
                    )}
                  </h4>
                </div>
              </div>
              <div className="col-md-4 position-relative">
                <div className="artist_avatar">
                  <Image
                    src={getAvatar(selectedUser)}
                    alt={selectedUser.username}
                    width="150px"
                    height="150px"
                    radius="50%"
                    objectFit="fill"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="row mt-4">
                  <div className="col-md-4 text-label">
                    <span className="de-flex justify-content-start align-items-center gap-1">
                      <EmailIcon />
                      <span>Email:</span>
                    </span>
                  </div>
                  <div className="col-md-8 text-label">
                    <span className="text-desc">{selectedUser.email}</span>
                  </div>
                  <div className="col-md-4 text-label">
                    <span className="de-flex justify-content-start align-items-center gap-1">
                      <FaDiscord />
                      <span>Discord:</span>
                    </span>
                  </div>
                  <div className="col-md-8 text-label">
                    <a href={selectedUser.discord} className="text-desc" target='_blank' rel="noreferrer">{selectedUser.discord}</a>
                  </div>
                  <div className="col-md-4 text-label">
                    <span className="de-flex justify-content-start align-items-center gap-1">
                      <FaTelegramPlane />
                      <span>Telegram:</span>
                    </span>
                  </div>
                  <div className="col-md-8 text-label">
                    <a href={selectedUser.telegram} className="text-desc" target='_blank' rel="noreferrer">{selectedUser.telegram}</a>
                  </div>
                  <div className="col-md-4 text-label">
                    <span className="de-flex justify-content-start align-items-center gap-1">
                      <FaInstagram />
                      <span>Instagram:</span>
                    </span>
                  </div>
                  <div className="col-md-8 text-label">
                    <a href={selectedUser.instagram} className="text-desc" target='_blank' rel="noreferrer">{selectedUser.instagram}</a>
                  </div>
                  <div className="col-md-4 text-label">
                    <span className="de-flex justify-content-start align-items-center gap-1">
                      <WebIcon />
                      <span>Website:</span>
                    </span>
                  </div>
                  <div className="col-md-8 text-label">
                    <a href={selectedUser.website} className="text-desc" target='_blank' rel="noreferrer">{selectedUser.website}</a>
                  </div>
                  
                  <div className="col-md-4 text-label">
                    <span className="de-flex justify-content-start align-items-center gap-1">
                      <DescriptionIcon />
                      <span>Description:</span>
                    </span>
                  </div>
                  <div className="col-md-8 text-label">
                    <span className="text-desc">{selectedUser.userBio}</span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        )}

        <Modal.Footer>
          <div className="container de-flex justify-content-end">
            <button className="btn-main" onClick={handleClose}>
              Go Back
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

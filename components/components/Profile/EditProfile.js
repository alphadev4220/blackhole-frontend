import React, { useContext, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import ImageUpload from './ImageUpload';
import api, { getAvatar } from '../../../src/api';
import { AppContext } from '../../../utils/context';
import { isEmpty, validateEmail } from '../../../utils/conversion';
import { config } from '../../../src/constants';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  #profile_banner {
    padding: 0;
    .mainbreadcumb {
      padding: 92px 0 0;
    }
  }
  @media only screen and (max-width: 1199px) {
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const EditProfile = () => {
  const [logo_image, setLogoImage] = useState({});
  const [banner_image, setBannerImage] = useState({});
  const [user, setUser] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    user_address: '',
    user_discord: '',
    user_tg: '',
    user_instagram: '',
    user_website: '',
    user_bio: ''
  });
  const [selectAvatar, setSelectAvatar] = useState('');
  const [selectBanner, setSelectBanner] = useState('');
  const [error, setError] = useState({
    logo_image: false,
    banner_image: false,
    user_name: false,
    user_email: false,
    user_tg: false,
    user_discord: false,
    user_instagram: false,
    user_website: false,
    user_bio: false
  });
  const [refresh, setRefresh] = useState(false);
  const [nftCount, setNFTCount] = useState('');

  const { walletInfo, fetchUserInfo, userInfo } = useContext(AppContext);

  useEffect(() => {
    const logo_preview = { preview: getAvatar(userInfo) };
    const banner_preview = { preview: userInfo.banner ? api.imgUrl + userInfo.banner : "/img/background/1.jpg" };
    setLogoImage(logo_preview);
    setBannerImage(banner_preview);
    if (!isEmpty(userInfo.user_id)) {
      setUser({ ...userInfo });
    }
  }, [userInfo])

  useEffect(() => {
    if (walletInfo && walletInfo.address) {
      fetchNFTCount(walletInfo.address);
    }
  }, [walletInfo])

  const fetchNFTCount = async (address) => {
    try {
      const url = `${config.DATA_LAYER}/nfts?owner=${address}&skip=0&limit=1`;
      const resp2 = await axios.get(url, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });
      setNFTCount(resp2.data.result.count);
    } catch (error) {
      console.log(error);
    }
  }

  const addLogoImages = file => {
    setLogoImage(Object.assign(file[0], {
      preview: URL.createObjectURL(file[0])
    }));
    setSelectAvatar(file[0]);
    setError({ ...error, logo_image: false });
  };

  const addBannerImage = file => {
    setBannerImage(Object.assign(file[0], {
      preview: URL.createObjectURL(file[0])
    }));
    setSelectBanner(file[0]);
    setError({ ...error, banner_image: false });
  };

  const handleChange = (event) => {
    if (event.target.value) {
      const errors = error;
      errors[event.target.name] = false;
      setError(errors);
    }
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const saveItem = async (params) => {
    try {
      if (isEmpty(user.user_id)) {
        const resp = await axios({
          method: "post",
          url: `${api.baseUrl}${api.user}/create`,
          data: params
        })
        toast.success(resp.data.message);
      } else {
        const resp = await axios({
          method: "put",
          url: `${api.baseUrl}${api.user}/${user.user_id}`,
          data: params
        })
        toast.success(resp.data.message);
      }
      await fetchUserInfo(params.address);
      setRefresh(!refresh);
    } catch (error) {
      // console.log(error?.response?.data);
      toast.error(error?.response?.data?.message)
    }
  }

  const validiation = () => {
    if (isEmpty(walletInfo.address)) {
      toast.warning('Please connect wallet');
      return false;
    }
    if (Number(nftCount) <= 0) {
      toast.warning(`You will need to purchase some NFTs to register your profile.`);
      return false;
    }
    let result = true;
    let errors = error;
    if (isEmpty(user.user_name)) {
      errors.user_name = true;
      result = false;
    }
    if (isEmpty(user.user_email)) {
      errors.user_email = true;
      result = false;
    }
    if (!validateEmail(user.user_email)) {
      errors.user_email = true;
      result = false;
    }
    if (!isEmpty(user.user_discord) && user.user_discord.indexOf('https://discord.gg/') < 0) {
      errors.user_discord = true;
      result = false;
    }
    if (!isEmpty(user.user_tg) && user.user_tg.indexOf('https://t.me/') < 0) {
      errors.user_tg = true;
      result = false;
    }
    if (!isEmpty(user.user_instagram) && user.user_instagram.indexOf('https://instagram.com/') < 0) {
      errors.user_instagram = true;
      result = false;
    }
    if (!isEmpty(user.user_website) && user.user_discord.indexOf('https://') < 0) {
      errors.user_website = true;
      result = false;
    }
    if (isEmpty(user.user_bio)) {
      errors.user_bio = true;
      result = false;
    }
    if (Object.keys(logo_image).length === 0) {
      errors.logo_image = true;
      result = false;
    }
    setError({ ...error, ...errors });
    return result;
  }

  const onClickUpdate = async () => {
    if (!validiation()) return;

    const params = {
      avatar: user.avatar,
      banner: user.banner
    };
    if (selectAvatar) {
      const formData = new FormData();
      formData.append("itemFile", selectAvatar);
      formData.append("authorId", "artist");
      try {
        const response = await axios({
          method: "post",
          url: `${api.baseUrl}${api.utils}/upload_file`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
        params.avatar = response.data.path;
      } catch (error) {
        console.log('[Upload error]: ', error);
        toast.error('Upload image error: ' + error);
        return;
      }
    }

    if (selectBanner) {
      const formData = new FormData();
      formData.append("itemFile", selectBanner);
      formData.append("authorId", "artist");
      try {
        const response = await axios({
          method: "post",
          url: `${api.baseUrl}${api.utils}/upload_file`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
        params.banner = response.data.path;
      } catch (error) {
        console.log('[Upload error]: ', error);
        toast.error('Upload image error: ' + error);
      }
    }
    params.username = user.user_name;
    params.email = user.user_email;
    params.address = walletInfo.address;
    params.userBio = user.user_bio;
    params.discord = user.user_discord;
    params.telegram = user.user_tg;
    params.instagram = user.user_instagram;
    params.website = user.user_website;
    params.nft_count = 0;
    saveItem(params);
  }
  return (
    <div>
      <GlobalStyles />

      <section id='profile_banner' className='jumbotron no-bg'>
        <div className=''>
          <ImageUpload addFile={addBannerImage} file={banner_image} width="100%" height="400px" />
        </div>
      </section>

      <section className='container register-container'>
        <div className="row">
          <div className='col-md-4 offset-md-1'>
            <div className="d-flex flex-column align-items-center justify-content-center text-center mb-3">
              <ImageUpload addFile={addLogoImages} file={logo_image} width="150px" height="150px" radius="50%" />
              <h4 className='mt-2 mb-1'>Profile Photo</h4>
              <span>We recommend an image of at least 400x400.</span>
              <span className='text-error mb-2'>{error.logo_image ? 'Please upload an image.' : ''}</span>
            </div>
          </div>
          <div className="col-md-6">
            <h3>Don't have an account? Register now.</h3>
            {isEmpty(walletInfo.address) ? (
              <p className='connect_wallet'>Please connect the wallet</p>
            ) : (!isEmpty(nftCount) && Number(nftCount) <= 0) && (
              <p className='connect_wallet'>You will need to buy some NFTs to register your profile.</p>
            )}
            <div className="spacer-10"></div>

            <div name="contactForm" id='contact_form' className="form-border">

              <div className="row">

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Name *</label>
                    <input type='text' name='user_name' id='name' className="form-control" value={user.user_name || ''} onChange={handleChange} autoComplete="off" />
                    <span className='text-error mb-2'>{error.user_name ? 'Please insert a vaild value.' : ''}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Email *</label>
                    <input type='text' name='user_email' id='email' className="form-control" value={user.user_email || ''} onChange={handleChange} autoComplete="off" />
                    <span className='text-error mb-2'>{error.user_email ? 'Please insert a vaild value.' : ''}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Discord</label>
                    <input type='text' name='user_discord' id='discord' className="form-control" placeholder='https://discord.gg/' value={user.user_discord || ''} onChange={handleChange} autoComplete="off" />
                    <span className='text-error mb-2'>{error.user_discord ? 'Please insert a vaild link.' : ''}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Telegram</label>
                    <input type='text' name='user_tg' id='tg' className="form-control" placeholder='https://t.me/' value={user.user_tg || ''} onChange={handleChange} autoComplete="off" />
                    <span className='text-error mb-2'>{error.user_tg ? 'Please insert a vaild link.' : ''}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Instagram</label>
                    <input type='text' name='user_instagram' id='instagram' placeholder='https://instagram.com/' className="form-control" value={user.user_instagram || ''} onChange={handleChange} autoComplete="off" />
                    <span className='text-error mb-2'>{error.user_instagram ? 'Please insert a vaild link.' : ''}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Website</label>
                    <input type='text' name='user_website' id='website' placeholder='https://' className="form-control" value={user.user_website || ''} onChange={handleChange} autoComplete="off" />
                    <span className='text-error mb-2'>{error.user_website ? 'Please insert a vaild link.' : ''}</span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="field-set">
                    <label>Wallet Address *</label>
                    <input type='text' name='user_address' id='address' className="form-control" value={walletInfo.address || ''} disabled autoComplete="off" />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="field-set">
                    <label>Description *</label>
                    <textarea type='text' name='user_bio' id='bio' className="form-control" value={user.user_bio || ''} onChange={handleChange} />
                    <span className='text-error mb-2'>{error.user_bio ? 'Please insert a vaild value.' : ''}</span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="pull-left">
                    <button className='btn-main color-2 mt-3' onClick={onClickUpdate}>
                      {(user && user.user_id) ? (
                        'Update Now'
                      ) : (
                        'Register Now'
                      )}
                    </button>
                  </div>

                  <div className="clearfix"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </div>

  )
};

export default EditProfile;
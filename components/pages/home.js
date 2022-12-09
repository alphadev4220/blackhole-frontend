import React from 'react';
import SliderCarousel from '../components/SliderCarousel';
import FeatureBox from '../components/FeatureBox';
import CarouselCollection from '../components/CarouselCollection';
import ColumnNew from '../components/ColumnNew';
import AuthorList from '../components/authorList';
import Footer from '../components/footer';
import Select from 'react-select'

import { createGlobalStyle } from 'styled-components';

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#212428",
    color: "#fff",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#16181b",
    }
  }),
  menu: base => ({
    ...base,
    background: "transparent",
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    padding: 0
  }),
  control: (base, state) => ({
    ...base,
    padding: 2
  })
};

const options = [
  { value: 'All categories', label: 'All categories' },
  { value: 'Art', label: 'Art' },
  { value: 'Music', label: 'Music' },
  { value: 'Domain Names', label: 'Domain Names' }
]
const options1 = [
  { value: 'Buy Now', label: 'Buy Now' },
  { value: 'On Auction', label: 'On Auction' },
  { value: 'Has Offers', label: 'Has Offers' }
]
const options2 = [
  { value: 'All Items', label: 'All Items' },
  { value: 'Single Items', label: 'Single Items' },
  { value: 'Bundles', label: 'Bundles' }
]



const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: transparent;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
`;

const homethree= (props) => (
  <div>
  <GlobalStyles />
      
      <section className='container' style={{marginTop: 30}}>

      <div className='row'>
          <div className='col-lg-12'>
              <h2 className='style-2'>Get Your XRP Army NFTs Here.</h2>
          </div>
        </div>
        <div className='container px-0'>
          <FeatureBox/>
        </div>

      <div className='row'>
          <div className='col-lg-12'>
              <div className="items_filter">
                <div className='dropdownSelect one'><Select className='select1' styles={customStyles} menuContainerStyle={{'zIndex': 999}} defaultValue={options[0]} options={options} /></div>
                <div className='dropdownSelect two'><Select className='select1' styles={customStyles} defaultValue={options1[0]} options={options1} /></div>
                <div className='dropdownSelect three'><Select className='select1' styles={customStyles} defaultValue={options2[0]} options={options2} /></div>
                <form className="row form-dark" id="form_quick_search" name="form_quick_search">
                    <div className="col">
                        <input className="form-control" id="name_1" name="name_1" placeholder="search item here..." type="text" />
                         <button id="btn-submit"><i className="fa fa-search bg-color-secondary"></i></button>
                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
          </div>
        </div>

       <ColumnNew nftListings={props.nftListings} />

      </section>


    

  </div>
);
export default homethree;
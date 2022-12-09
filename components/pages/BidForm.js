import React, { useState, useRef } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'
import constants from '../../src/constants'

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    
  }
  .box-login p{
    color: #a2a2a2 !important;
  }
  .box-login{
    border-radius: 3px;
    padding: 10px 10px;
  }
`;

export default function BidForm(props) {
    // console.log('API_URL')
    // console.log(constants.API_URL)
    const recaptchaRef = useRef();
    const [captchaPassed, setCaptchaPassed] = useState(0);
    const [form, setForm] = useState({});
    const onChange = (event) => {
        setCaptchaPassed(1)
        return true
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(form);
        // if (!captchaPassed){
        //     alert("Please check the captcha to bid.")
        //     return false
        // }
        // console.log('apiurl')
        // console.log(constants.API_URL + '/api/bid')
        var formObj = form
        formObj['nft_listing_id'] = props.nft._id.$oid
        axios.post(constants.API_URL + 'api/bid', formObj).then(response => {
            // console.log(response)
            if (response.data.error){
              alert(response.data.error)
            }
            else {
              window.location.reload();
            }
        })

        return false
    }
    const handleChange = (event) => {
        const nameString = event.target.name;
        var obj = form
        obj[nameString] = event.target.value
        setForm(obj);
      };
    
    return (
<div>
<GlobalStyles/>

  <section className='' style={{padding: 0, backgroundImage: `url(${'./img/background/6.jpg'})`}}>
    <div className='mainbreadcumb'>
      <div className='container' style={{padding: 0}}>
        <div className='row align-items-center px-0'>
          
            <div className="box-login" style={{padding: '10, 10'}}>
              <h3 className="mb10">Place Your Bid</h3>
              <form onSubmit={(e) => {e.preventDefault();handleSubmit(e)}} name="contactForm" id='contact_form' className="form-border" >

              

                  <div className="field-set">
                      <input required onChange={handleChange} type='text' name='email' id='email' className="form-control" placeholder="Email"/>
                  </div>
                
                 <div className="field-set">
                     <input required onChange={handleChange} type='text' name='xrp_address' id='xrp_address' className="form-control" placeholder="XRP Address"/>
                  </div>

                  <div className="field-set">
                     <input type="number" step="0.01" required onChange={handleChange} name='max_bid' id='max_bid' className="form-control" placeholder={"Bid in XRP (" + props.nft.minimum_bid_number + " or more)"}/>
                  </div>
                  
                  <div className="field-set" style={{marginTop: 10, marginBottom: 10}}>
                  <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6Le-HKYdAAAAAMnJsAA13PS_32T1q2DRCRtTGpzT"
        onChange={onChange}
      />  
      </div>
                <div className="field-set">
                  <input onSubmit={(e) => {e.preventDefault();handleSubmit(e)}} type='submit' id='send_message' value='Place Bid' className="btn btn-main btn-fullwidth color-2"/>
                </div>
                
                <div className="clearfix"></div>  
                  
                  <div className="spacer-half"></div>
              </form>
            </div>
          </div>
      </div>
    </div>
  </section>

</div>

)};
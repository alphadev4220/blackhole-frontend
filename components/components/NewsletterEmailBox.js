
import React, { useRef, useState } from 'react';
import Footer from '../components/footer';
import Reveal from 'react-awesome-reveal';
import axios from 'axios';
import constants from '../../src/constants';
import { createGlobalStyle } from 'styled-components';
import { fadeIn, fadeInUp, grow, customStyles } from '../../lib/CssHelper'

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    
  }
  .box-login p{
    color: #a2a2a2 !important;
  }
  .box-login{
    border-radius: 3px;
    padding: 40px 50px;
  }
`;

const NewletterEmailBox = ({message}) => {

  const votingMessageRef = useRef(null);
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState(true);
  const closeMessage = () => {setShowEmailBox(false);}
  const closeMessage2 = () => {setShowEmailMessage(false);}
    

    const submitNewsletterEmail = (e) => {
        e.preventDefault()
        var email = document.getElementById('email').value;
        
        var formObj = { 
            email: email
        }
        // console.log()
        axios.post(constants.API_URL + '/api/users/', formObj).then(response => {
            // console.log(response)
            if (response.data.error){
              alert(response.data.error)
            }
            else {
                // alert("Submitted")
                setShowEmailBox(true);
            //   window.location.reload();
            }
        })
    }



    return (
<div className='row align-items-center px-0'>
<div className="col-lg-8 offset-lg-8 m-auto px-0">
  <div className="box-login">
    {/* <h3 className="col-white">Get Started</h3> */}
    <p>Stay informed and be ready when votes begin, end and when to collect the vote drop.</p>
    <form onSubmit={submitNewsletterEmail} name="contactForm" id='contact_form' className="form-border" action='#'>
       <div className="field-set" style={{marginTop: 20}}>
            <input required type='email' name='email' id='email' className="form-control" placeholder="email"/>
        </div>
      <div className="field-set" style={{marginTop: 20}} >
        <input type='submit' id='send_message' value='Register Email' className="btn btn-main btn-fullwidth color-2"/>
      </div>

      <div className='row' ref={votingMessageRef} >
          <div className='col-lg-12'>
          </div>
        </div>
        <div  style={{display: showEmailBox ? 'inline' : 'none'}} >
          <Reveal className='onStep' keyframes={grow} delay={0} duration={500} triggerOnce >
            <div onClick={closeMessage} style={{marginTop: 30}}className="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                Check your email for your login link. 
            </div>
          </Reveal>
        </div>
        
          <div  style={{display: showEmailMessage && message != "" ? 'inline' : 'none'}} >
            <Reveal className='onStep' keyframes={grow} delay={0} duration={500} triggerOnce >
              <div onClick={closeMessage2} style={{marginTop: 30}}className="blink_me alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                  {message}
              </div>
            </Reveal>
          </div>

    </form>
  </div>
</div>
</div>)
}
export default NewletterEmailBox;
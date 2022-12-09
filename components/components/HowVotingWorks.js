import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import Link from 'next/link'
import { fadeIn } from '../../lib/CssHelper';
import ProfileWallet from './ProfileWallet';
import NewsletterEmailBox from './NewsletterEmailBox';
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;

const HowVotingWorks= ({message}) => (
 <div className="container main-cont" style={{marginTop: 160}}>
    <div className="row align-items-center">
          <div className="col-md-6">
            <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
              <h2 className="col-white">How Voting Works</h2>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
                <p className="lead col-white">
                    Blackhole is a way to support you can vote on the crytpo projects you love. 
                    To vote, you must first acquire $HOLE. 
                    Once you have $HOLE, and you login with email, you will be able to cast your vote for an active poll. 
                    The $HOLE in your wallet will determine the amount of votes you have. 
                    More details coming soon on voting drops and the reward for the winning project.  
                </p>
              </Reveal>
              <div className="spacer-10"></div>
              <div style={{display: 'flex'}}>
              </div>
              <Reveal className='onStep d-inline' keyframes={inline} delay={900} duration={1200} triggerOnce>
              <div className="row">
                  <div className="spacer-single"></div>
              </div>
              </Reveal>  
          </div>
          <div className="col-md-6">
            {/* <ProfileWallet /> */}
            <NewsletterEmailBox message={message} />
          </div>
      </div>
    </div>
);
export default HowVotingWorks;
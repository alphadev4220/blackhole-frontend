import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import PollCountdown from './PollCountdown'

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

const SliderVoting = ({ pollCampaign }) => (
 <div className="container" style={{marginTop: 0}}>
    <div className="row align-items-center">
          <div className="col-md-12">
              <div className="spacer-single"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={900} triggerOnce>
                <h2 className="col-white">Blackhole Voting</h2>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={900} triggerOnce>
                <p className="lead col-white" >
                  Each HOLE you hold in your wallet equals 1 vote. Only your latest vote will count.  Your HOLE token balance at the end of the voting period will be the number of votes cast for you. You will be voting with the Keplr Wallet.[Maybe other wallets] If you’d like to vote for multiple Burns you can hold HOLE in multiple wallets, then you may choose to vote with each wallet.
                </p>

              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='onStep d-inline' keyframes={inline} delay={900} duration={1200} triggerOnce>
              <div className="row">
                <div className="spacer-single"></div>
              </div>
              </Reveal>
          </div>
          {/* <div className="col-md-6">
            <Reveal className='onStep d-inline' keyframes={inline} delay={300} duration={1200} triggerOnce>
                <PollCountdown pollCampaign={pollCampaign} />
            </Reveal>
          </div> */}
      </div>
    </div>
);
export default SliderVoting;
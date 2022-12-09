import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import Countdown from 'react-countdown';
import BlackholeWallet from './BlackholeWallet'
// import FancyCountdown from './components/FancyCountdown'

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <div></div>;
    } else {
      // Render a countdown
      return (
      <div className='countdown-container' >
        <div className='countdown-box' >
          <div className='elementor-countdown-digits'>
            {days}
          </div>
          <div className='elementor-countdown-label'>
            Days
          </div>
        </div>
        <div className='countdown-box' >
          <div className='elementor-countdown-digits'>
            {hours}
          </div>
          <div className='elementor-countdown-label'>
            Hours
          </div>
        </div>
        <div className='countdown-box' >
          <div className='elementor-countdown-digits'>
          {minutes}
          </div>
          <div className='elementor-countdown-label'>
            Mins
          </div>
        </div>
        <div className='countdown-box' >
          <div className='elementor-countdown-digits'>
            {seconds}
          </div>
          <div className='elementor-countdown-label'>
            Secs
          </div>
        </div>
      </div>
      )
    }
  };

const PollCountdown = ({ pollCampaign }) => (
    <div className='col-lg-12'>
        { pollCampaign.is_current_poll && 
            <div>
                {/* <Countdown date={pollCampaign.end_time} renderer={renderer} /> */}
                {/* <FancyCountdown pollCampaign={pollCampaign}/> */}
                <h3 className='col-white' style={{textAlign: 'center', marginTop: 20}}>
                    Character Here
                </h3>
                <BlackholeWallet />
            </div>
        }
        { !pollCampaign.is_current_poll && 
        <div>
            {/* <Countdown date={pollCampaign.start_time} renderer={renderer} /> */}
            {/* <FancyCountdown pollCampaign={pollCampaign}/> */}
            <h3 className='col-white' style={{textAlign: 'center'}}>
                Time Till Next Poll
            </h3>
        </div>
        }
    </div>
);
export default PollCountdown;
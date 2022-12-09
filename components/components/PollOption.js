import React, { useState } from 'react';
import Reveal from 'react-awesome-reveal';
// import { keyframes } from "@emotion/react";
import { fadeInUp } from '../../lib/CssHelper';

export default function PollOption({castVote, pollOption, toolTipText="Click to Vote"}) {
    const [isOpen, setOpen] = useState(false);
    const index = 2;
    // console.log('pollOption', pollOption)
    return (
        <div onMouseLeave={() => setOpen(false)} onMouseEnter={() => setOpen(true)} className='poll-opt' onClick={() => castVote(pollOption.id)} >
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} >
                <div className="tooltip-label" style={{display: isOpen ? 'inline' : 'none', position: 'absolute'}}>
                  {toolTipText}
                </div>
              </Reveal>
                <div className='vote-container' style={{zIndex: 999999999}}>
                <div style={{position: 'relative' }}>
                  <div style={{position: 'absolute', top: 10, left: 10}}>
                  </div>
                  <svg width="150" height="100%" viewBox="0 0 40 40" className="donut" style={{width: 100, fill: 'transparent', zIndex: 999}}>
                  <circle className="donut-hole poll-option-circle" cx="20" cy="20" r="15.91549430918954" fill="#202631"></circle>
                  <circle className="donut-ring poll-option-circle" cx="20" cy="20" r="15.91549430918954" fill="transparent" strokeWidth="3.5"></circle>
                  <circle className={"poll-option-circle donut-segment donut-segment-" + index%4 } cx="20" cy="20" r="15.91549430918954" fill="transparent" strokeWidth="3.5" strokeDasharray={pollOption.weighted_percent + " " + (100 - pollOption.weighted_percent)} strokeDashoffset="25"></circle>
            </svg>
                <img className='poll-option-image' src={pollOption.thumbnail_url} height={100} /> 
                
              </div>
              <div className='poll-opt-label' >
                      {pollOption.description} {pollOption.weighted_percent}%
                    </div>
              </div>
        </div>
    )
    
}
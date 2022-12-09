import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import Link from 'next/link'
import { fadeIn } from '../../lib/CssHelper';
import { config } from '../../src/constants';

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

const slidermainhome = () => (
  <div className="container main-cont">
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="spacer-single"></div>

        <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
          <h1 className="col-white">Something Big is Coming</h1>
        </Reveal>
        <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
          <p className="lead col-white">
            Welcome to BlackHole on Juno! A black hole is biggest object in the universe. In fact, when the universe is all gone, there will only be black holes. Whitepaper 2.0 is en route. Stay tuned on socials for its release.
          </p>
        </Reveal>
        <div className="spacer-10"></div>
        <div className='buttons-cont' >
          <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
            <Link href="https://blackholedrops.app" >
              <span className="btn-main inline lead">Claim Drop</span>
            </Link>
            {/* <Link href="./V1_BLACKHOLE_LLC_WHITEPAPER.pdf" download="V1_BLACKHOLE_LLC_WHITEPAPER" target="_blank">
                  <span className="btn-main inline lead">View Whitepaper</span>
                </Link> */}
          </Reveal>
        </div>
        <Reveal className='onStep d-inline' keyframes={inline} delay={900} duration={1200} triggerOnce>
          <div className="row">
            <div className="spacer-single"></div>
          </div>
        </Reveal>
      </div>
      <div className="col-md-6">
        <Reveal className='onStep d-inline' keyframes={fadeIn} delay={0} duration={3500} triggerOnce>
          <img src="../img/spaceman5.png" className='spaceman-img' />
        </Reveal>
      </div>
    </div>
  </div>
);
export default slidermainhome;
import React, { useState, useRef } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import '../src/stylesheets/App.css'
import HomePage from '../components/pages/home'
import PollResultsTable from '../components/components/PollResultsTable'
import DonutChartPollResults from '../components/components/DonutChartPollResults'

import PollOption from '../components/components/PollOption'
import StarryGalaxy from '../components/components/StarryGalaxy'

import Collection from '../components/pages/colection'
import axios from 'axios'
import BiddyHeader from '../components/menu/BiddyHeader';
import constants from '../src/constants';
import Countdown from 'react-countdown';
import Footer from '../components/components/footer';
import SliderVoting from '../components/components/SliderVoting'
import HowVotingWorks from '../components/components/HowVotingWorks'
import FancyCountdown from '../components/components/FancyCountdown'
import Reveal from 'react-awesome-reveal';
import { fadeIn, fadeInUp, grow, customStyles } from '../lib/CssHelper'
import { getBalance, getKeplr } from '../lib/CosmosHelper'
import BlackholeWallet from '../components/components/BlackholeWallet'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';// import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useRouter } from "next/router";
import lscache from 'lscache';


export default function Loginwithemail(props) {

  const { query } = useRouter();

  // React.useEffect(() => {
    if ((typeof window !== 'undefined')){
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      lscache.remove('voting_key');
      lscache.set('voting_key', params.voting_key)
      window.location = '/voting'
    }
  // }
  // , [])
    

  return (
    <div>
</div>
  )
}

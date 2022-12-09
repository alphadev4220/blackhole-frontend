import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import StarryGalaxy from '../components/components/StarryGalaxy';
import Footer from '../components/components/footer';
import BlackholeHeader from '../components/menu/BlackholeHeader';
import HeaderMetaTags from '../components/components/HeaderMetaTags';
import HoleStaking from '../components/components/HoleStaking';

export default function Staking() {
  // const [nftListings, setNftListings] = useState([]);
  useEffect(() => {
  }, []);
  return (
    <div>
      <Head>
        <title>BlackHole | Cleaning Digital Space</title>
        <HeaderMetaTags />
      </Head>
      <StarryGalaxy />
      <section className='container' style={{marginTop: -50}}>
      <BlackholeHeader />
      </section>
    
        < HoleStaking / >
    </div>
  )
}

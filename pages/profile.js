import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import StarryGalaxy from '../components/components/StarryGalaxy';
import Footer from '../components/components/footer';
import BlackholeHeader from '../components/menu/BlackholeHeader';
import HeaderMetaTags from '../components/components/HeaderMetaTags';
import BlackholeProfile from '../components/components/BlackholeProfile';

export default function Profile() {
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
      <section style={{marginTop: -150}}>
        <BlackholeProfile />
      </section>
      <Footer />

    </div>
  )
}

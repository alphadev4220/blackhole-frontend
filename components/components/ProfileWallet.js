import React, { useState, useRef } from 'react';
import Reveal from 'react-awesome-reveal';
import { fadeIn, displayAddress } from '../../lib/CssHelper'
import { getBalance, getKeplr } from '../../lib/CosmosHelper'
import { isMobile } from '../../lib/BrowserHelper';
import { useContext } from 'react';
import { AppContext } from '../../utils/context';


const ProfileWallet = () => {
  // const walletInfo = useState(null);
  const { connectAndGetBalance } = useContext(AppContext);
  const [walletInfo, setWalletInfo] = useState(null);
  const [displayVortex, setDisplayVortex] = useState(false);
  React.useEffect(() => {
    if ((typeof window !== 'undefined')) {
      // console.log("runnning")
      //   if (!isMobile()){
      //     // run()
      //   }
      //   else {

      //     var doc = document.getElementById('canvas')
      //     if (doc) {
      //       doc.style.display = 'none'
      //     }

      //   }
      // setDisplayVortex(!isMobile())

    }
  }, [])

  return (
    <div>
      <div>
        <div className='wallet-container' >
          <div className='center-wallet-cont'>
            <div id='keplr-logo' style={{ zIndex: 99999999, cursor: 'pointer', display: walletInfo ? 'none' : 'inline' }} onClick={connectAndGetBalance}>
              <img style={{ width: 50, margin: 'auto' }} src="./img/keplr-logo.png" alt="" />
              <div style={{ fontSize: 12, marginTop: 10, color: '#ffffff' }}>
                Connect Keplr
              </div>
            </div>
            <div style={{ marginTop: -23, display: walletInfo ? 'inline' : 'none' }}  >
              <div style={{ fontSize: 28, marginTop: -6, color: '#ffffff', fontWeight: 800 }}>
                {0}
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#ffffff' }}>
                HOLE
              </div>
              <div style={{ fontSize: 12, color: 'rgb(54,135,182)', marginTop: 10 }}>
                {walletInfo && displayAddress(walletInfo.address)}
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
};
export default ProfileWallet;
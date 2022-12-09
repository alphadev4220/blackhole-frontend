import "../assets/animated.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/elegant-icons/style.css";
import "../node_modules/et-line/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import '../node_modules/bootstrap/dist/js/bootstrap.js';
import "../assets/style.scss";
import "../styles/globals.css";
import Script from "next/script";

import React, { useRef, useState } from "react";

import "../src/stylesheets/Roadmap.css";
import "../components/menu/BlackholeHeader.css";
import "../src/stylesheets/App.css";
import "../src/stylesheets/DonutChart.css";
import "../src/stylesheets/FancyCountdown.css";
import "../src/stylesheets/TreeRoadmap.scss";
import "swiper/css";
import "../src/stylesheets/Slider.scss";
import "../src/stylesheets/Hover.scss";
import "../src/stylesheets/Hover2.css";
import "../src/stylesheets/Copybutton.css";
import HeaderMetaTags from "../components/components/HeaderMetaTags";
import { DefaultAppSeo } from "../components/components/DefaultAppSeo";
import { AppProvider } from "../utils/context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SigningCosmWasmProvider } from '../contexts/cosmwasm';

// function getWindowDimensions() {
//   const { innerWidth: width, innerHeight: height } = window;
//   return {
//     width,
//     height
//   };
// }

function MyApp({ Component, pageProps }) {
  const ref = useRef(null);
  const [width, setWidth] = useState("100%");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // width = window.clientWidth
      addEventListener("resize", (event) => {
        setWidth(screen.availWidth);
        console.log("window.availWidth resize", window.innerWidth);
      });
      console.log("window.availWidth", window.innerWidth);
      setWidth(window.innerWidth);
    }
  }, []);
  console.log("width", width);
  // if ((typeof window !== 'undefined')){
  //   width = window.clientWidth
  // }
  // console.log('width'B, width)
  return (
    <div>
      <Script src="https://www.google-analytics.com/analytics.js" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/scrollReveal.js/4.0.0-beta.26/scrollreveal.js"
        strategy="beforeInteractive"
      />
      <HeaderMetaTags />
      <DefaultAppSeo />
      <SigningCosmWasmProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </SigningCosmWasmProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default MyApp;

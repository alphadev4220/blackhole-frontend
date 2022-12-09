import React from 'react';
import constants from "../../src/constants"
const HeaderMetaTags = () => {
    return (
        <>
          <meta name="description" content="" />
          <link href="/img/favicon/favicon.ico" rel="shortcut icon" />
          <link href="/img/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/img/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/img/favicon/site.webmanifest" rel="manifest" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="#F0827D" name="theme-color" />
          <meta content={constants.APP_NAME} name="application-name" />
          <link href="/img/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/img/favicon/android-chrome-192x192.png" rel="apple-touch-icon" sizes="192x192" />
          <link href="/img/favicon/android-chrome-512x512.png" rel="apple-touch-icon" sizes="512x512" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
          <meta content={constants.APP_NAME} name="apple-mobile-web-app-title" />
          {/*
          <link
            href="/assets/apple-touch-startup-image-1792x828.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-1242x2688.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2688x1242.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-1242x2208.png"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2208x1242.png"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-1284x2778.png"
            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2778x1284.png"
            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-1536x2048.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2048x1536.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-1620x2160.png"
            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2160x1620.png"
            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-1668x2388.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2388x1668.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-1668x2224.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2224x1668.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2048x2732.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/assets/apple-touch-startup-image-2732x2048.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            rel="apple-touch-startup-image"
          /> */}
          <meta content="#000000" name="msapplication-TileColor" />
          <meta content="/img/favicon/android-chrome-192x192.png" name="msapplication-TileImage" />
          {/* <meta content="/assets/browserconfig.xml" name="msapplication-config" /> */}
          {/* <link href="/assets/yandex-browser-manifest.json" rel="yandex-tableau-widget" /> */}
        </>
      )
}
export default HeaderMetaTags;
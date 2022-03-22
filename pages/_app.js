import {useEffect } from "react";
import Router from 'next/router';
import { UserProvider } from "../context";
import Head from "next/head";
import NProgress from 'nprogress';
import OneSignal from 'react-onesignal';
import "antd/dist/antd.css";

Router.events.on('routeChangeStart', (url) => {
     console.log(`Loading: ${url}`)
     NProgress.start()
   })
   Router.events.on('routeChangeComplete', () => NProgress.done())
   Router.events.on('routeChangeError', () => NProgress.done())
   


function MyApp({Component,pageProps}){

  useEffect(() => {
    OneSignal.init({
      appId: "e38dac00-878e-490e-8ecb-5472eaca2784",
    });
  }, []);

    return (

       <UserProvider>
       <Head>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css?ver=5.3.2" rel="stylesheet" type="text/css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />
            <link href="https://kit-pro.fontawesome.com/releases/v5.11.2/css/pro.min.css?ver=5.3.2" rel="stylesheet" type="text/css" />
            <link href="https://unpkg.com/nprogress@0.2.0/nprogress.css" rel="stylesheet" type="text/css" />
			      <link rel="stylesheet" href="/css/dashboard-main.css" /> 
            <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
       </Head>
            <Component {...pageProps} />
       </UserProvider>
    );
}

export default MyApp;

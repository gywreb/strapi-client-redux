import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/react-hooks";
import { Layout } from "antd";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import AppFooter from "../src/components/AppFooter/AppFooter";
import AppHeader from "../src/components/AppHeader/AppHeader";
import AuthProvider from "../src/components/AuthProvider/AuthProvider";
import store from "../src/store";
import "../styles/global.scss";

NProgress.configure({
  trickleSpeed: 100,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export interface AppPageProps {
  tokenInCookie: string;
}

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_BASEURL}/graphql`,
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const tokenInCookie = Cookies.get("token");

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AnimatePresence exitBeforeEnter>
            <AuthProvider>
              <Layout style={{ background: "#fff" }}>
                <AppHeader />
                <Layout.Content>
                  <Component {...pageProps} tokenInCookie={tokenInCookie} />
                </Layout.Content>
                <AppFooter />
              </Layout>
            </AuthProvider>
          </AnimatePresence>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default MyApp;

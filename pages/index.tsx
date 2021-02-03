import Head from "next/head";
import Animator from "../src/components/Animator/Animator";

const HomePage = () => {
  return (
    <Animator motion="fadeIn">
      <Head>
        <title>GWShop | Home</title>
      </Head>
    </Animator>
  );
};

export default HomePage;

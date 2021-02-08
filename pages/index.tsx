import Head from "next/head";
import Animator from "../src/components/utils/Animator/Animator";

const HomePage = () => {
  return (
    <Animator motion="fadeIn">
      <Head>
        <title>GWShop | Home</title>
      </Head>
      <div style={{ height: "500px" }}></div>
    </Animator>
  );
};

export default HomePage;

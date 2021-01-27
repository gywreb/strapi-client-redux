import Head from "next/head";
import Particles from "react-tsparticles";
import Animator from "../src/components/Animator/Animator";
import LoginForm from "../src/components/LoginForm/LoginForm";
import options from "../tsparticle.config.json";

const LoginPage = () => {
  return (
    <Animator motion="fadeIn">
      <div className="main-bg">
        <Head>
          <title>GWShop | Sign In</title>
        </Head>
        <Animator motion="fadeIn">
          <Particles id="tsparticles" options={options} />
        </Animator>
        <Animator motion="slideLeftIn">
          <LoginForm />
        </Animator>
      </div>
    </Animator>
  );
};

export default LoginPage;

import Head from "next/head";
import Particles from "react-tsparticles";
import LoginForm from "../src/components/auth/LoginForm/LoginForm";
import Animator from "../src/components/utils/Animator/Animator";
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

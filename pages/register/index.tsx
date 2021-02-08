import Head from "next/head";
import Particles from "react-tsparticles";
import RegisterForm from "../../src/components/auth/RegisterForm/RegisterForm";
import Animator from "../../src/components/utils/Animator/Animator";
import options from "../../tsparticle.config.json";

const RegisterPage = () => {
  return (
    <Animator motion="fadeIn">
      <div className="main-bg">
        <Head>
          <title>GWShop | Sign Up</title>
        </Head>
        <Animator motion="fadeIn">
          <Particles id="tsparticles" options={options} />
        </Animator>
        <Animator motion="slideRightIn">
          <RegisterForm />
        </Animator>
      </div>
    </Animator>
  );
};

export default RegisterPage;

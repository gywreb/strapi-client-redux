import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Particles from "react-tsparticles";
import RegisterSuccess from "../../src/components/auth/RegisterSuccess/RegisterSuccess";
import LoadingIndicator from "../../src/components/layout/LoadingIndicator/LoadingIndicator";
import Animator from "../../src/components/utils/Animator/Animator";
import { RootState } from "../../src/store/types";
import options from "../../tsparticle.config.json";

const RegisterSuccessPage = () => {
  const isConfirmed = useSelector<RootState, boolean>(
    (state) => state.register.isConfirmed
  );

  const router = useRouter();

  useEffect(() => {
    if (!isConfirmed) router.push("/register");
  }, [isConfirmed]);

  if (isConfirmed)
    return (
      <div className="main-bg">
        <Head>
          <title>GWShop | SignUp | Success</title>
        </Head>
        <Animator motion="fadeIn">
          <Particles id="tsparticles" options={options} />
        </Animator>
        <Animator motion="slideLeftIn">
          <RegisterSuccess />
        </Animator>
      </div>
    );
  else return <LoadingIndicator />;
};

export default RegisterSuccessPage;

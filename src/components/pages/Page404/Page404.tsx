import { Typography } from "antd";
import Head from "next/head";
import React from "react";

const Page404 = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <div className="centerize overlay">
        <Typography.Title>404 | Page not found!</Typography.Title>
      </div>
    </>
  );
};

export default Page404;

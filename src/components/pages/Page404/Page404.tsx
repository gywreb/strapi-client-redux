import { Typography } from "antd";
import Head from "next/head";
import React from "react";

const Page404 = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <div
        className="centerize overlay"
        style={{ background: "#fff", zIndex: 903, width: "100vw" }}
      >
        <Typography.Title>404 | Page not found!</Typography.Title>
      </div>
    </>
  );
};

export default Page404;

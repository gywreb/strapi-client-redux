import Head from "next/head";
import { useState } from "react";
import Animator from "../src/components/Animator/Animator";

const HomePage = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <Animator motion="fadeIn">
      <Head>
        <title>GWShop | Home</title>
      </Head>
      {/* <div className="container-fluid">
        <Row>
          <Col>
            <div className="search">
              <InputGroup>
                <InputGroupAddon addonType="append">Search</InputGroupAddon>
                <Input
                  onChange={(e) =>
                    setKeyword(e.target.value.toLocaleLowerCase())
                  }
                  value={keyword}
                />
              </InputGroup>
            </div>
            <RestaurantList search={keyword} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div> */}
    </Animator>
  );
};

export default HomePage;

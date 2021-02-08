import { CheckOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

export interface PromoOverlay {
  title: string;
  content: string;
  memberIncludes: { content: string }[];
  promoCompany: {
    url: string;
  };
}

const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

const PromoOverlay = () => {
  const [promoOverlay, setOverlayPromo] = useState<PromoOverlay | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromoOverlay = async () => {
      try {
        const { data } = await axios({
          baseURL,
          url: `/promo-overlay`,
          method: "GET",
        });
        setOverlayPromo(data);
      } catch (error) {
        setError("error");
      }
    };
    fetchPromoOverlay();
  }, []);

  if (error) return <h1>Section not found!</h1>;
  if (!promoOverlay)
    return (
      <div className="centerize">
        <Loader type="TailSpin" color="#00c2cb" height={200} width={200} />
      </div>
    );
  else {
    const { title, content, memberIncludes, promoCompany } = promoOverlay;
    return (
      <div className="promoSection_overlay">
        <div className="promoSection_overlay__body">
          <Typography.Title level={3} className="promoSection_overlay__title">
            {title}
          </Typography.Title>
          <div className="promoSection_overlay__text">{content}</div>
        </div>
        <div className="centerize">
          <Button type="primary" className="promoSection_overlay__button">
            Start Learning
          </Button>
        </div>
        <div className="promoSection_overlay__memberInclude">
          <Typography.Text className="promoSection_overlay__memberInclude-text">
            MEMBERSHIP INCLUDES
          </Typography.Text>
          {memberIncludes.length
            ? memberIncludes.map((item, index) => (
                <div className="d-flex a-center">
                  <CheckOutlined className="promoSection_overlay__memberInclude-icon" />
                  <Typography.Text>
                    {item.content}{" "}
                    {index === memberIncludes.length - 1 ? (
                      <Link href="/">Learn More</Link>
                    ) : null}
                  </Typography.Text>
                </div>
              ))
            : null}
        </div>
        <div className="centerize">
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASEURL}${promoCompany.url}`}
            alt=""
            className="promoSection_overlay__image"
          />
        </div>
      </div>
    );
  }
};

export default PromoOverlay;

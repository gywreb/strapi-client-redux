import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../src/components/layout/Banner/Banner";
import LoadingIndicator from "../../src/components/layout/LoadingIndicator/LoadingIndicator";
import CourseOverview from "../../src/components/pages/OverviewPage/CourseOverview/CourseOverview";
import Page404 from "../../src/components/pages/Page404/Page404";
import Animator from "../../src/components/utils/Animator/Animator";
import { overviewPageAction } from "../../src/store/action";
import { RootState } from "../../src/store/types";
import { OverviewPageState } from "../../src/store/types/overviewPage.type";

const OverviewPage = () => {
  const dispatch = useDispatch();
  const { loading, error, page } = useSelector<RootState, OverviewPageState>(
    (state) => state.overviewPage
  );

  const router = useRouter();

  useEffect(() => {
    if (router.query.currentPage)
      dispatch(overviewPageAction.getPage(router.query.currentPage as string));
  }, [router, dispatch]);

  if (error) return <Page404 />;
  if (!loading && page) {
    return (
      <>
        <Head>
          <title>{page.title}</title>
        </Head>
        <Animator motion="fadeIn" duration={0.6}>
          <div className="banner">
            {page.body.banner
              ? page.body.banner.map((banner) => <Banner banner={banner} />)
              : null}
          </div>
          <div className="container">
            {page.body["course-overview"]
              ? page.body["course-overview"].map((section) => (
                  <CourseOverview section={section} page={page} />
                ))
              : null}
          </div>
        </Animator>
      </>
    );
  } else return <LoadingIndicator />;
};

export default OverviewPage;

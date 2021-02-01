import { Dropdown, Menu } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigationAction } from "../../store/action";
import {
  NavigationBarState,
  NavigationRouterQuery,
  RootState,
} from "../../store/types";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import styles from "./NavigationBar.module.scss";

const NavigationBarREST = () => {
  const dispatch = useDispatch();
  const { loading, error, navigationBar, activeNav, activeMenu } = useSelector<
    RootState,
    NavigationBarState
  >((state) => state.navigation);

  const router = useRouter();

  useEffect(() => {
    dispatch(
      navigationAction.getNavigationBar(router.query as NavigationRouterQuery)
    );
  }, [router.query, dispatch]);

  //   console.log(navigationBar);
  if (error) return <h1>Error getting nav bar</h1>;
  if (loading) return <LoadingIndicator />;
  if (navigationBar) {
    // console.log(navigationBar);

    return (
      <div
        className={styles.nav}
        style={{ background: "#2c3f50", color: "#fff" }}
      >
        <div className="container-fluid">
          <div className="centerize pt-1 pb-1">
            {navigationBar.body.map((item) => {
              return item.menu ? (
                <Link href={item.path ? `/${item.path}` : "/"}>
                  <Dropdown
                    overlay={
                      <Menu>
                        {item.menu.links.map((link) => (
                          <Menu.Item key={link.label}>
                            <Link
                              href={
                                link.path ? `/${item.path}/${link.path}` : "/"
                              }
                            >
                              <span
                                className={
                                  !activeMenu
                                    ? styles.nav_item__menu
                                    : link.path === activeMenu
                                    ? clsx(styles.nav_item__menu, styles.active)
                                    : styles.nav_item__menu
                                }
                              >
                                {link.label}
                              </span>
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                    key={item.label}
                  >
                    <span
                      className={
                        !activeNav
                          ? styles.nav_item
                          : item.label === activeNav
                          ? clsx(styles.nav_item, styles.active)
                          : styles.nav_item
                      }
                      onClick={() =>
                        dispatch({
                          type: navigationAction.SET_ACTIVE_NAV,
                          payload: item.label,
                        })
                      }
                    >
                      {item.label.toUpperCase()}
                    </span>
                  </Dropdown>
                </Link>
              ) : (
                <Link href="/">
                  <span
                    className={
                      !activeNav
                        ? styles.nav_item
                        : item.label === activeNav
                        ? clsx(styles.nav_item, styles.active)
                        : styles.nav_item
                    }
                    onClick={() =>
                      dispatch({
                        type: navigationAction.SET_ACTIVE_NAV,
                        payload: item.label,
                      })
                    }
                  >
                    {item.label.toUpperCase()}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else return <h1>No navigation found</h1>;
};

export default NavigationBarREST;

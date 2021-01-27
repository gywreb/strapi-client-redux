import { useQuery } from "@apollo/react-hooks";
import { Dropdown, Menu } from "antd";
import { gql } from "apollo-boost";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import styles from "./NavigationBar.module.scss";

const GET_NAVIGATION_BAR = gql`
  {
    navigationBar {
      id
      body {
        __typename
        ... on ComponentNavigationDropdown {
          label
          url
          menu {
            label
            links {
              label
              url
            }
          }
        }
      }
    }
  }
`;

interface NavigationLink {
  label: string;
  url: string;
}

interface NavigationMenu {
  label: string;
  links: NavigationLink[];
}

interface NavigationItem {
  label: string;
  url: string;
  menu: NavigationMenu;
}

interface NavigationBar {
  navigationBar: {
    body: NavigationItem[];
  };
}

const NavigationBar = () => {
  const { loading, error, data } = useQuery<NavigationBar>(GET_NAVIGATION_BAR);
  if (error) return <h1>Error getting nav bar</h1>;
  if (loading) return <LoadingIndicator />;
  if (data) {
    // console.log(data.navigationBar.body[0].menu.links);
    return (
      <div
        className="container-fluid"
        style={{ background: "#2c3f50", color: "#fff" }}
      >
        <div className="centerize pt-1 pb-1">
          {data.navigationBar.body.map((item) => {
            return item.menu ? (
              <Dropdown
                overlay={
                  <Menu>
                    {item.menu.links.map((link) => (
                      <Menu.Item key={link.label}>
                        <a className={styles.nav_item__menu}>{link.label}</a>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                key={item.label}
              >
                <a className={styles.nav_item}>{item.label.toUpperCase()}</a>
              </Dropdown>
            ) : (
              <a key={item.label} className={styles.nav_item} href="">
                {item.label.toUpperCase()}
              </a>
            );
          })}
        </div>
      </div>
    );
  } else return <h1>No navigation found</h1>;
};

export default NavigationBar;

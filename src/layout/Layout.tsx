//@ts-ignore
import searchIcon from "../assets/search.svg";
//@ts-ignore
import bellIcon from "../assets/bell.svg";
//@ts-ignore
import logo from "../assets/logo.svg";
//@ts-ignore
import wallet from "../assets/wallet.svg";
import { Link, Outlet } from "react-router-dom";
import Profile from "../components/Profile";

const sideMenu = [
  {
    icon: wallet,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: wallet,
    name: "Transactions",
    link: "/transactions",
  },
  {
    icon: wallet,
    name: "Wallet",
    link: "/wallet",
  },
  {
    icon: wallet,
    name: "Analytics",
    link: "/analytics",
  },
  {
    icon: wallet,
    name: "Personal",
    link: "/personal",
  },
  {
    icon: wallet,
    name: "Message",
    link: "/message",
  },
  {
    icon: wallet,
    name: "Setting",
    link: "/setting",
  },
];

const Layout = () => {
  return (
    <div className="w-screen h-screen bg-secondary_la">
      <div className="flex w-full h-full">
        <div className="w-[17%] flex flex-col items-center  h-full bg-primary_la">
          <img src={logo} className="mt-10 mb-4" alt="logo" />
          <ol>
            {sideMenu.map((menu,ind) => (
              <li key={menu.name+ind} className=" my-6 cursor-pointer  text-lightgrey_la text-text-nwf2">
                <Link className="flex items-center gap-4" to={menu.link}>
                  <img src={menu.icon} alt="sideMenu icon" />
                  <span>{menu.name}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center px-8 h-[10vh] bg-primary_la">
            <p className="text-text-bwf1 text-white_la">Dashboard</p>
            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  className="text-text-nwf1 h-[35px] text-grey_la bg-secondary_la py-2 w-[200px] rounded-md pl-4 pr-8"
                  placeholder="Search..."
                />
                <img
                  src={searchIcon}
                  alt="search-icon"
                  className="absolute top-2 right-2"
                />
              </div>
              <img alt="bell" src={bellIcon} />
              <Profile img_src="https://thispersondoesnotexist.com"/>
            </div>
          </div>
          <div className="h-[90vh] overflow-auto">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { LOG_OUT } from "../../redux/User/userTypes";
import companyLogo from "./3BS-Logo.png";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const locations = [
  "All Locations",
  "Peshawar",
  "Karachi",
  "Lahore",
  "Islamabad",
];

const navigation = [
  { name: "Buy", visitTo: "/", current: true },
  { name: "Bartering", visitTo: "/exchangeproducts", current: false },
  { name: "Bidding", visitTo: "/biddedproducts", current: false },
  { name: "Rent", visitTo: "/rentproducts", current: false },
  { name: "Buyer Request", visitTo: "/buyerrequestproducts", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);

  // handle logout
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: LOG_OUT });
  };

  // fetch unread notifications
  useEffect(() => {
    const getNotifications = async () => {
      const gotNotifications = await publicRequest.get(
        `/notifications/unread/${user?._id}`
      );
      setNotifications(gotNotifications.data);
    };
    if (user) {
      getNotifications();
    }
  }, [user]);

  return (
    <div className="bg-gray-800 sticky top-0 z-50 drop-shadow-md">
      <div className="top-0 w-full bg-gray-800 z-40">
        <Disclosure
          as="nav"
          className="bg-gray-800 sticky top-0 z-50 drop-shadow-md"
        >
          {({ open }) => (
            <>
              <div className="w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center mx-12">
                      <Link to="/">
                        <img
                          className="h-12 w-auto rounded-md overflow-hidden"
                          src={companyLogo}
                          alt="Logo"
                        />
                      </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.visitTo}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <button
                              disabled={!user}
                              style={{ cursor: !user ? "not-allowed" : "" }}
                            >
                              {item.name}
                            </button>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <NavLink to="/analytics">
                      <button
                        disabled={!user}
                        style={{ cursor: !user ? "not-allowed" : "" }}
                        className="mx-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </NavLink>

                    <NavLink to="/chatbox">
                      <button
                        disabled={!user}
                        style={{ cursor: !user ? "not-allowed" : "" }}
                        type="button"
                        className="mx-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ChatBubbleOvalLeftEllipsisIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </NavLink>

                    <NavLink to="/notifications" className="notifi__icon">
                      <button
                        disabled={!user}
                        style={{ cursor: !user ? "not-allowed" : "" }}
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {notifications.length > 0 && <div></div>}
                      </button>
                    </NavLink>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      {/* User Login Check: */}
                      {!user ? (
                        <div>
                          <NavLink to="/login">
                            <button
                              type="button"
                              className="mx-3 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">
                                Navigate to login / register
                              </span>
                              <UserCircleIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </NavLink>
                        </div>
                      ) : (
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              src={user.profileImage}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                      )}
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/currentuserprofile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Link to="/currentusersell">
                      <div className="display flex gap-2 w-24 cursor-pointer mx-2 rounded-full bg-green-600 p-2 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        SELL
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <div className=" top-12 w-full px-2 sm:px-6 lg:px-8 mt-4 border-b-4 border-gray-500 bg-gray-100 z-30">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative md:w-1/4 flex items-center">
            <RoomOutlinedIcon className="text-gray-500 mr-2" />
            <select
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
              className="appearance-none w-full py-2 pl-3 pr-8 bg-white border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 8l4 4 4-4H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="relative md:w-3/4">
            <div className="searchbox flex items-center w-full  overflow-hidden">
              <input
                type="text"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 pl-3 pr-10 bg-white focus:outline-none"
              />
              <Link
                to={`/search?location=${encodeURIComponent(
                  selectedLocation
                )}&product=${searchProduct}`}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <div className="bg-gray-500 p-2">
                  <SearchIcon className="text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

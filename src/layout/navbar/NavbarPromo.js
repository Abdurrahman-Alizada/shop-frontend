import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
//internal import
import { pages } from "@utils/data";
import Category from "@component/category/Category";
import { notifyError } from "@utils/toast";

const NavbarPromo = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { locale } = router;
  const [data, setData] = useState([]);
  const [currentLang, setCurrentLang] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getAllLanguages();
        setData(res);

        const result = res?.find((lang) => lang?.iso_code === locale);
        setCurrentLang(result);
      } catch (err) {
        notifyError(err);
        // console.log("error on getting lang", err);
      }
    })();
  }, []);

  const solutions = [
    {
      name: "Insights",
      description: "Measure actions your users take",
      href: "##",
      icon: IconOne,
    },
    {
      name: "Automations",
      description: "Create your own targeted content",
      href: "##",
      icon: IconTwo,
    },
  ];

  function IconOne() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function IconTwo() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <>
      <div className="hidden lg:block xl:block bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  <Popover.Group
                    as="nav"
                    className="md:flex space-x-10 items-center"
                  >
                    <Popover className="relative font-serif">
                      <Popover.Button className="group inline-flex items-center py-2 hover:text-emerald-600 focus:outline-none">
                        <span className="font-serif text-sm font-medium">
                          {t("common:Categories")}
                        </span>
                        <ChevronDownIcon
                          className="ml-1 h-3 w-3 group-hover:text-emerald-600"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="overflow-hidden mt-2 flex-grow absolute z-10 transform w-screen  bg-white lg:max-w-sm rounded-lg">
                        <Category />
                       
                          {/* <div className="overflow-auto flex-grow w-full h-full rounded-lg shadow-lg ring-1 ring-black/5">
                            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                              {solutions.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                    <item.icon aria-hidden="true" />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                            <div className="bg-gray-50 p-4">
                              <a
                                href="##"
                                className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                              >
                                <span className="flex items-center">
                                  <span className="text-sm font-medium text-gray-900">
                                    Documentation
                                  </span>
                                </span>
                                <span className="block text-sm text-gray-500">
                                  Start integrating products and tools
                                </span>
                              </a>
                            </div>
                          </div> */}
                        </Popover.Panel>
                      </Transition>

                    </Popover>

                    <Link href="/about-us">
                      <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                        {t("common:About Us")}
                      </a>
                    </Link>
                    <Link href="/contact-us">
                      <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                        {t("common:Contact Us")}
                      </a>
                    </Link>
                    <Link href="/faq">
                      <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                        {t("FAQ")}
                      </a>
                    </Link>
                    {/* <Popover className="relative font-serif">
                      <Popover.Button className="group inline-flex items-center py-2 text-sm font-medium hover:text-emerald-600 focus:outline-none">
                        <span>{t("More")}</span>
                        <ChevronDownIcon
                          className="ml-1 h-3 w-3 group-hover:text-emerald-600"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs bg-white">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                            <div className="relative grid gap-2 px-6 py-6">
                              {pages.map((item) => (
                                <span
                                  key={item.title}
                                  className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                                >
                                  <item.icon
                                    className="flex-shrink-0 h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  <Link href={item.href}>
                                    <a className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                                      {t(`common:${item.title}`)}
                                    </a>
                                  </Link>
                                </span>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover> */}
                    <Link href="/offer">
                      <a className="relative inline-flex items-center h-6 bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium text-red-500 hover:text-emerald-600">
                        {t("common:Offers")}
                        <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </div>
                      </a>
                    </Link>
                  </Popover.Group>
                </div>
              </div>
            </Popover>
          </div>
          <div className="flex">
            {/* flag */}
            <div className="dropdown">
              <div
                className={`flot-l flag ${currentLang?.flag?.toLowerCase()}`}
              ></div>
              <button className="dropbtn">
                {currentLang?.name}
                &nbsp;<i className="fas fa-angle-down"></i>
              </button>
              <div className="dropdown-content">
                {data.map((language, i) => {
                  console.log("first", language);
                  return (
                    <Link key={i + 1} href="/" locale={`${language.iso_code}`}>
                      <a onClick={() => setCurrentLang(language)}>
                        <div
                          className={`flot-l flag ${language?.flag?.toLowerCase()}`}
                        ></div>
                        {language?.name}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link href="/privacy-policy">
              <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                {t("common:Privacy Policy")}
              </a>
            </Link>
            <Link href="/terms-and-conditions">
              <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                {t("common:Terms & Conditions")}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;

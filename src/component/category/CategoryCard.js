import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

//internal import
import { SidebarContext } from "@context/SidebarContext";
import useTranslation from "next-translate/useTranslation";
import { showingTranslateValue } from "@utils/translate";

const CategoryCard = ({ title, icon, nested, id }) => {
  const router = useRouter();
  const { closeCategoryDrawer, isLoading, setIsLoading } =
    useContext(SidebarContext);
  const { lang } = useTranslation("ns1"); // default namespace (optional)

  // react hook
  const [show, setShow] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState({
    id: "",
    show: false,
  });

  // handle show category
  const showCategory = (id, categoryName) => {
    const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    setShow(!show);
    router.push(`/search?category=${name}&_id=${id}`);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  // handle sub nested category
  const handleSubNestedCategory = (id, categoryName) => {
    const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    setShowSubCategory({ id: id, show: showSubCategory.show ? false : true });
    router.push(`/search?category=${name}&_id=${id}`);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  const handleSubCategory = (id, categoryName) => {
    const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");

    router.push(`/search?category=${name}&_id=${id}`);
    closeCategoryDrawer;
    setIsLoading(!isLoading);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <a
          onClick={() => showCategory(id, title)}
          role="button"
          className="-m-3 w-full flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
            {icon ? (
              <Image src={icon} width={28} height={28} alt="Category" />
            ) : (
              <Image
                src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                width={28}
                height={28}
                alt="category"
              />
            )}
          </div>
          <div className="ml-4 inline-flex items-center justify-between w-full">
            <p className="text-sm font-medium text-gray-900">{title}</p>
          </div>
        </a>
        {nested?.length > 0 && (
          <span onClick={()=>setShow(!show)} className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
            {show ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
          </span>
        )}
      </div>
      {show && nested.length > 0 && (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {nested.map((children) => (
            <li key={children._id}>
              {children.children.length > 0 ? (
                <a
                  onClick={() =>
                    handleSubNestedCategory(
                      children._id,
                      showingTranslateValue(children.name, lang)
                    )
                  }
                  className="flex items-center font-serif pr-2 text-sm text-gray-600 hover:text-emerald-600 py-1 cursor-pointer"
                >
                  <span className="text-xs text-gray-500">
                    <IoRemoveSharp />
                  </span>

                  <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full hover:text-emerald-600">
                    {showingTranslateValue(children.name, lang)}

                    {children.children.length > 0 ? (
                      <span className="transition duration-700 ease-in-out inline-flex loading-none items-end text-gray-400">
                        {showSubCategory.id === children._id &&
                        showSubCategory.show ? (
                          <IoChevronDownOutline />
                        ) : (
                          <IoChevronForwardOutline />
                        )}
                      </span>
                    ) : null}
                  </div>
                </a>
              ) : (
                <a
                  onClick={() =>
                    handleSubCategory(
                      children._id,
                      showingTranslateValue(children.name, lang)
                    )
                  }
                  className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
                >
                  <span className="text-xs text-gray-500 pr-2">
                    <IoRemoveSharp />
                  </span>
                  {showingTranslateValue(children.name, lang)}
                </a>
              )}

              {showSubCategory.id === children._id &&
              showSubCategory.show === true ? (
                <ul className="pl-6 pb-3">
                  {children.children.map((subChildren) => (
                    <li key={subChildren._id}>
                      <a
                        onClick={() =>
                          handleSubCategory(
                            subChildren._id,
                            showingTranslateValue(subChildren?.name, lang)
                          )
                        }
                        className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
                      >
                        <span className="text-xs text-gray-500 pr-2">
                          <IoRemoveSharp />
                        </span>
                        {showingTranslateValue(subChildren?.name, lang)}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoryCard;

import Link from "next/link";
import { IoMoonSharp, IoSearch, IoSearchSharp } from "react-icons/io5";
import { BsBarChartSteps } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LuSun } from "react-icons/lu";
import useFetchData from "@/hooks/useFetchData";

const Header = () => {
  const [searchopen, setSearchopen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  const [searchquery, setSearchquery] = useState("");

  const OpenSearch = () => {
    setSearchopen(!searchopen);
  };

  const CloseSearch = () => {
    setSearchopen(false);
  };

  const OpenSidebar = () => {
    setSidebar(true);
  };

  const CloseSidebar = () => {
    setSidebar(false);
  };

  const handleLinkClick = () => {
    setSidebar(false);
  };

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkmode(darkmode);
  }, []);

  useEffect(() => {
    if (darkmode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkmode]);

  const toggleDarkmode = () => {
    setDarkmode(!darkmode);
  };

  const { alldata, loading } = useFetchData(
    "http://localhost:3000/api/getblog"
  );

  const publishedblog = alldata.filter((blog) => blog.status === "publish");
  const filteredblog =
    searchquery.trim() === ""
      ? publishedblog
      : publishedblog.filter((blog) =>
          blog.title.toLowerCase().includes(searchquery.toLowerCase())
        );

  return (
    <>
      <div className="header_sec">
        <div className="container header">
          <div className="logo">
            <Link href="/">
              <h1>ObiTech</h1>
            </Link>
          </div>

          <div className="searchbar">
            <IoSearchSharp />
            <input
            value={searchquery}
            onChange={(e) => setSearchquery(e.target.value)}
              onClick={OpenSearch}
              type="search"
              placeholder="Discover news, articles and more"
            />
          </div>

          <div className="nav_list_dark">
            <ul>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
            </ul>

            <div className="navlist_mobile_ul">
              <button onClick={toggleDarkmode}>
                {darkmode ? <LuSun /> : <IoMoonSharp />}
              </button>
              <button onClick={OpenSearch}>
                <IoSearch />
              </button>
              <button onClick={OpenSidebar}>
                <BsBarChartSteps />
              </button>
            </div>

            <div className="darkmode">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkmode}
                  onChange={toggleDarkmode}
                />
                <span className="slider_header"></span>
              </label>
            </div>
          </div>
        </div>
        <div className={`search_click ${searchopen ? "open" : ""}`}>
          <div className="searchab_input">
            <IoSearchSharp />
            <input
              value={searchquery}
              onChange={(e) => setSearchquery(e.target.value)}
              type="search"
              placeholder="Discover news, articles and more"
            />
          </div>
          <div className="search_data text-center">
            {loading ? (
              <div className="wh_100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {searchquery ? (
                  <>
                    {filteredblog.slice(0, 3).map((blog) => {
                      return (
                        <div className="blog" key={blog._id}>
                          <div className="bloginfo">
                            <Link href={`/blog/${blog.slug}`}>
                              <h3>{blog.title}</h3>
                            </Link>
                            <p>
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Modi quo nobis non ut eius cum,
                              sapiente nesciunt ducimus facere fugiat. Optio vel
                              sit suscipit, qui dolorem eius ut a excepturi
                              eligendi ullam accusantium iure illo mollitia
                              asperiores quaerat. Assumenda labore libero
                              perferendis inventore a iusto velit dolores quam
                              repellat corrupti.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>No Search Result</div>
                )}
              </>
            )}
          </div>
          <div className="exit_search" onClick={CloseSearch}>
            <div>
              <FaXmark />
            </div>
            <h4>ESC</h4>
          </div>
        </div>

        <div className={sidebar ? "navlist_mobile open" : "navlist_mobile "}>
          <div className="navlist_m_title flex flex-sb">
            <h1>ObiTech</h1>
            <button onClick={CloseSidebar}>
              <FaXmark />
            </button>
          </div>
          <hr />
          <h3 className="mt-3">Main Menu</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href={"/"}>Home</Link>
            </li>{" "}
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
          </ul>

          <hr />
          <h3 className="mt-3">Topics</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href={"/topics/htmlcssjs"}>Html Css Js</Link>
            </li>{" "}
            <li>
              <Link href={"/topics/nextjs"}>Next Js</Link>
            </li>
            <li>
              <Link href={"/topics/database"}>Database</Link>
            </li>
            <li>
              <Link href={"/topics/deployment"}>Deployment</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;

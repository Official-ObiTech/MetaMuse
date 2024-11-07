"use server";

import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FaHtml5 } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Home() {
  const [currentpage, setCurrentpage] = useState(1);
  const [perPage] = useState(4);

  const { alldata, loading } = useFetchData(
    "/api/getblog"
  );

  const paginate = (pageNumber) => {
    setCurrentpage(pageNumber);
  };

  const indexOfLastBlog = currentpage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstBlog, indexOfLastBlog);

  const allblog = alldata.length;
  const Publishedblog = currentBlogs.filter(
    (blog) => blog.status === "publish"
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  return (
    <>
      <Head>
        <title>ObiTech Blog Website </title>
        <meta
          name="description"
          content="ObiTech Blog Website create by next app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>
              Hey, I'm <span>ObiTech</span>. <br /> Full-Stack Web Developer{" "}
            </h1>
            <h3>Specialized on Front-End and Framework</h3>
            <div className="flex gap-2">
              <Link href={"/contact"}>
                <button>Contact</button>
              </Link>
              <Link href={"/about"}>
                <button>About</button>
              </Link>
            </div>
          </div>

          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="./images/obiTech.jpg" alt="ObiTech" />
          </div>
        </div>
      </section>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>

            <div className="blogs_sec">
              {loading ? (
                <div className="wh_100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {Publishedblog.map((blog) => {
                    const firstImageUrl = extractFirstImageUrl(
                      blog.description
                    );
                    return (
                      <div className="blog" key={blog._id}>
                        <div className="blogimg">
                          <Link href={`/blog/${blog.slug}`}>
                            <img
                              src={firstImageUrl || "./images/no_image.jpg"}
                              alt={blog.title}
                            />
                          </Link>
                        </div>

                        <div className="bloginfo">
                          <Link href={`/tag/${blog.tags[0]}`}>
                            <div className="blogtag">{blog.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${blog.slug}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <p>
                            lorem ipsum dolor sit amet, con con la dictum dolore
                            magna aliquet lore mauris sed diam non pro id elit.
                          </p>

                          <div className="blogauthor flex gap-1">
                            <div className="blogaimg">
                              <img src="/images/obiTech.jpg" alt="obitech" />
                            </div>

                            <div className="flex flex-col flex-left gap-05">
                              <h4> Obi Tech</h4>
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className="blogpagination">
              <button
                onClick={() => paginate(currentpage - 1)}
                disabled={currentpage === 1}
              >
                Prev
              </button>

              {pageNumbers
                .slice(
                  Math.max(currentpage - 3, 0),
                  Math.min(currentpage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${currentpage === number ? "active" : ""}`}
                  >
                    {number}
                  </button>
                ))}

              <button
                onClick={() => paginate(currentpage + 1)}
                disabled={currentBlogs.length < perPage}
              >
                Next
              </button>
            </div>
          </div>

          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href={"/topics/htmlcssjs"}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3>Html, Css & JavaScript</h3>
                  </div>
                </Link>
                <Link href={"/topics/nextjs"}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3>Next Js & React Js</h3>
                  </div>
                </Link>
                <Link href={"/topics/database"}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3>Database</h3>
                  </div>
                </Link>
                <Link href={"/topics/deployment"}>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>Deployment</h3>
                  </div>
                </Link>
              </div>
            </div>

            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href={`/tag/html`}>#Html</Link>
                <Link href={`/tag/css`}>#Css</Link>
                <Link href={`/tag/javascript`}>#JavaScript</Link>
                <Link href={`/tag/nextjs`}>#Next Js</Link>
                <Link href={`/tag/reactjs`}>#React Js</Link>
                <Link href={`/tag/database`}>#Database</Link>
              </div>
            </div>

            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>

              <div className="talk_sec">
                <h4>
                  Want to find out how i can solve problems specific to your
                  business? let's talk.
                </h4>

                <div className="social_talks flex flex-center ap-1 mt-2">
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                  <div className="st_icon">
                    <FaTwitter />
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

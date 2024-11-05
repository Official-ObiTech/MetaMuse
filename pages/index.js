import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [currentpage, setCurrentpage] = useState(1);

  const { alldata, loading } = useFetchData(
    "http://localhost:3000/api/getblog"
  );

  const Publishedblog = alldata.filter((blog) => blog.status === "publish");

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }

    const regex = /|\[.*?\]\((.*?)\)/;
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
            <h3>Specialized on Front-End and Frame-Wrok </h3>
            <div className="flex gap-2">
              <Link href={"/contact"}>
                <button>Contact</button>{" "}
              </Link>
              <Link href={"/about"}>
                <button>About</button>{" "}
              </Link>
            </div>
          </div>

          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="./images/obiTech.jpg" />
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
                          <Link href={`/tag/${blog.slug}`}>
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

            <div className="blogpagination"></div>
          </div>
        </div>
      </section>
    </>
  );
}

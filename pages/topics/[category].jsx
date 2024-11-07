import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);

  const [currentpage, setCurrentpage] = useState(1);
  const [perpage] = useState(4);

  const router = useRouter();

  const { category } = router.query;

  useEffect(() => {
    const fetchblogdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getblog?blogcategory=${category}`
        );
        const alldata = res.data;
        setBlog(alldata);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog data", err);
        setLoading(false);
      }
    };

    if (category) {
      fetchblogdata();
    } else {
      router.push("/404");
     
    }
  }, [category]);

  const paginate = (pageNumber) => {
    setCurrentpage(pageNumber);
  };

  const indexOfLastBlog = currentpage * perpage;
  const indexOfFirstBlog = indexOfLastBlog - perpage;
  const currentblogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);

  const publishedblog = currentblogs.filter(
    blog => blog.status === "publish"
  );

  const allblog = blog.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perpage); i++) {
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
      <div className="blogpage">
        <div className="category_slug">
          <div className="container">
            <div className="category_title">
              <div className="flex gap-1">
                <h1>
                 {loading ? (
                <div>Loading...</div>
              ) : (
                publishedblog && publishedblog[0]?.blogcategory
              )}
                </h1>
                <span>
                  {loading ? (
                    <div>0</div>
                  ) : (
                    publishedblog.filter((blog) => blog.blogcategory).length
                  )}
                </span>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                quae, natus adipisci, nulla blanditiis quasi impedit provident
                eaque dolor iste quod sunt, tenetur at qui dolorem veritatis
                explicabo sit eius.
              </p>
            </div>

            <div className="category_blogs mt-3">
              {loading ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {publishedblog.map((item) => {
                    const firstImageUrl = extractFirstImageUrl(
                      item.description
                    );
                    return (
                      <div className="cate_blog" key={item._id}>
                        <Link href={`/blog/${item.slug}`}>
                          <img
                            src={firstImageUrl || "/images/no_image.jpg"}
                            alt={item.title}
                          />
                        </Link>

                        <div className="bloginfo mt-2">
                          <Link href={`/tag/${item.tags[0]}`}>
                            <div className="blogtag">{item.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${item.slug}`}>
                            <h3>{item.title}</h3>
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
                                {new Date(item.createdAt).toLocaleDateString(
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
                disabled={currentblogs.length < perpage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default CategoryPage;

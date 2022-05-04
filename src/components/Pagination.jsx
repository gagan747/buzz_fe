import { useContext, useEffect, useState } from "react";
import { feedContext } from "./Feed";

function Pagination() {
  const [render, setRender] = useState(false);
 
  let arr = [];
  const feedcontext = useContext(feedContext);
  const [active, setActive] = useState(feedcontext.pageIndex);
  let countPage = feedcontext.feedCount / feedcontext.pageLimit;
  let remPagePost = feedcontext.feedCount % feedcontext.pageLimit;
  if (remPagePost !== 0) countPage += 1;

  for (let i = 1; i <= countPage; i++) {
    arr.push(
      <li
        className={(active === i && "page-item active") || "page-item"}
        key={i}
        onClick={() => {
          feedcontext.getFeeds(i);
          setActive(i);
        }}
      >
        <div className="page-link">{i}</div>
      </li>
    );
  }
  useEffect(() => {
    setActive(feedcontext.pageIndex);
  }, [feedcontext.pageIndex]);
  return (
    <>
      <div className=" m-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination">{arr}</ul>
        </nav>
      </div>
    </>
  );
}

export default Pagination;

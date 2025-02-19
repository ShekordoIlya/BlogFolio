import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, selectPost } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchPosts,
  setOrdering,
  setPage,
  setSearchQuery,
} from "../../store/pagination";
import styles from "./Posts.module.scss";
import { styled } from "styled-components";

const Posts = () => {
  // const Btn = styled.button`
  //   width: 100px;
  //   height: 100px;
  //   color: red;
  // `;
  const dispatch = useDispatch();
  const {
    posts,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    searchQuery,
    ordering,
  } = useSelector((state) => state.pagination);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      fetchPosts({
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        searchQuery: searchQuery,
        ordering: ordering,
      })
    );
  }, [currentPage, ordering]);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const renderPageNumber = () => {
    const pageNumber = [];
    const maxPageNumber = 10;
    const startPage = Math.max(currentPage - Math.floor(maxPageNumber / 2), 1);
    const endPage = Math.min(startPage + maxPageNumber - 1, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      pageNumber.push(
        <button
          style={{ color: i === currentPage ? "red" : "#fff" }}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumber;
  };
  console.log("totalItems", totalItems);
  const handlerSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchPosts({
        limit: itemsPerPage,
        offset: 0,
        searchQuery: searchQuery,
        ordering: ordering,
      })
    );
    dispatch(setPage(1));
  };
  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setSearchQuery(value));
  };
  const handlerOrdering = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target);
    dispatch(setOrdering(e.target.value));
  };
  return (
    <div>
      {/* <Btn>Btn</Btn> */}
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          placeholder="Search Posts"
          value={searchQuery}
          onChange={handlerInput}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <label>Order by:</label>
        <select value={ordering} onChange={handlerOrdering}>
          <option value={""}>default</option>
          <option value={"title"}>Title</option>
          <option value={"date"}>date</option>
        </select>
      </div>
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <div
            className={`${styles.post} ${
              index <= 5 ? `${styles.normalCard}` : `${styles.smalCard}`
            }`}
            key={post.id}
          >
            <h3>{post.title}</h3>
            <h4>{post.id}</h4>
            <button
              onClick={() => {
                dispatch(selectPost(post));
                navigate("/favorite");
              }}
            >
              Add to Favorite
            </button>
          </div>
        ))}
      </div>
      <div className={styles.numbersWrapper}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <div className={styles.pageNubmers}>{renderPageNumber()}</div>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Posts;

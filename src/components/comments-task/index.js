import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CommentItem from "./commentItem";
import "./index.css";

const colorsList = [
  "#0284c7",
  "#f59e0b",
  "#f97316",
  "#10b981",
  "#b91c1c",
  "#0ea5e9",
  "#334155",
];

const CommentsApp = () => {
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const changeUserName = (event) => {
    setUserName(event.target.value);
  };

  const changeCommentText = (event) => {
    setCommentText(event.target.value);
  };

  const submitTheComment = (event) => {
    event.preventDefault();
    if (userName !== "" && commentText !== "") {
      const randomIndex = Math.ceil(Math.random() * colorsList.length) - 1;
      const randomColor = colorsList[randomIndex];
      const commentObject = {
        id: uuidv4(),
        userName,
        commentText,
        dateTime: Date.now(),
        isLiked: false,
        randomBackGroundColor: randomColor,
      };
      setCommentsList([...commentsList, commentObject]);
      setUserName("");
      setCommentText("");
    }
  };

  const likedTheComment = (id) => {
    setCommentsList((prevState) =>
      prevState.map((eachItem) => {
        if (eachItem.id === id) {
          return { ...eachItem, isLiked: !eachItem.isLiked };
        }
        return eachItem;
      })
    );
  };

  const deleteCommentFromList = (id) => {
    setCommentsList((prevList) =>
      prevList.filter((eachItem) => eachItem.id !== id)
    );
  };

  return (
    <div className="comments-bg-container">
      <h1 className="comments-main-heading">Comments</h1>
      <div className="container-fluid mt-3 mb-3">
        <div className="d-flex align-items-stretch justify-content-between row">
          <form
            className="comments-inputs-main-container col-12 col-md-6"
            onSubmit={submitTheComment}
          >
            <h3 className="comments-inputs-main-heading">
              Say something about 4.0 technologies
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              className="comments-name-input"
              value={userName}
              onChange={changeUserName}
            />
            <textarea
              className="comments-textarea"
              rows={10}
              cols={55}
              placeholder="Your Comment"
              value={commentText}
              onChange={changeCommentText}
            ></textarea>
            <button
              type="submit"
              className="btn btn-primary mt-2 mb-4 align-self-start"
            >
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="commentsImage"
            className="comments-image mb-4 d-none d-md-block col-md-5"
          />
        </div>
      </div>
      <hr className="hr-line-comments" />
      <div className="d-flex align-items-center mt-3 mb-3s">
        <p className="comments-count">{commentsList.length}</p>
        <p className="comments-count-text">Comments</p>
      </div>
      <ul className="comments-list-main-container">
        {commentsList.map((eachComment) => (
          <CommentItem
            key={eachComment.id}
            commentDetials={eachComment}
            likedTheComment={likedTheComment}
            deleteCommentFromList={deleteCommentFromList}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentsApp;

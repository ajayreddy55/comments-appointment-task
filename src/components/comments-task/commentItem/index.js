import "./index.css";
import { formatDistanceToNow } from "date-fns";

const CommentItem = (props) => {
  const {
    commentDetials,
    likedTheComment,
    backGroundColorsList,
    deleteCommentFromList,
  } = props;
  const { id, userName, commentText, dateTime, isLiked } = commentDetials;

  const randomIndex =
    Math.ceil(Math.random() * backGroundColorsList.length) - 1;
  const randomColor = backGroundColorsList[randomIndex];

  const logoLetter = userName.slice(0, 1).toUpperCase();
  const formattedDate = formatDistanceToNow(dateTime);

  const deleteComment = () => {
    deleteCommentFromList(id);
  };

  const likeComment = () => {
    likedTheComment(id);
  };

  const likedImage = isLiked
    ? "https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
    : "https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png";

  const likedTextStyle = isLiked ? "liked-style-comments" : "";

  return (
    <li className="comments-list-item">
      <div className="d-flex align-items-start mb-2 mt-2">
        <div
          className="comments-list-logo-container"
          style={{ backgroundColor: randomColor }}
        >
          <h1 className="comments-list-logo">{logoLetter}</h1>
        </div>
        <div className="d-flex flex-column ml-2">
          <div className="d-flex align-items-center mb-1">
            <h3 className="comments-list-name">{userName}</h3>
            <p className="comments-list-time">{formattedDate} ago</p>
          </div>
          <p className="comments-list-comment">{commentText}</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
        <div className="d-flex align-items-center">
          <img
            src={likedImage}
            alt="likeImage"
            className="comments-like-image"
          />
          <button
            type="button"
            className={`comments-like-button ${likedTextStyle}`}
            onClick={likeComment}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="comments-delete-button"
          onClick={deleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="comments-delete-image"
            alt="deleteImage"
          />
        </button>
      </div>
      <hr className="comments-hr-line-list" />
    </li>
  );
};

export default CommentItem;

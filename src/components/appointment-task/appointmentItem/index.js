import "./index.css";
import { format } from "date-fns";

const AppointmentItem = (props) => {
  const { appointmentDetails, isStarIconClicked } = props;

  const { id, appointmentType, appointmentDate, isStarred } =
    appointmentDetails;

  const starIcon = isStarred
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";

  const toggleFavorite = () => {
    isStarIconClicked(id);
  };

  const formattedDate = format(new Date(appointmentDate), "dd MMMM yyyy, EEEE");

  return (
    <li className="appointment-list-item-container col-12 col-md-5 col-lg-3">
      <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
        <h3 className="appointment-list-item-type">{appointmentType}</h3>
        <img
          src={starIcon}
          alt="star"
          className="appointment-star-image"
          onClick={toggleFavorite}
        />
      </div>
      <p className="appointment-list-item-date">Date: {formattedDate}</p>
    </li>
  );
};

export default AppointmentItem;

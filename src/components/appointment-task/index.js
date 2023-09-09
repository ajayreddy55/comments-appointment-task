import { useState } from "react";
import AppointmentItem from "./appointmentItem";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const AppointmentApp = () => {
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);
  const [isStarredButtonClicked, setIsStarredButtonClicked] = useState(false);

  const changeAppointmentType = (event) => {
    setAppointmentType(event.target.value);
  };

  const changeAppointmentDate = (event) => {
    setAppointmentDate(event.target.value);
  };

  const submitTheForm = (event) => {
    event.preventDefault();
    if (appointmentType !== "" && appointmentDate !== "") {
      const appointmentObject = {
        id: uuidv4(),
        appointmentType,
        appointmentDate,
        isStarred: false,
      };
      setAppointmentList((prevList) => [...prevList, appointmentObject]);
      setAppointmentDate("");
      setAppointmentType("");
    }
  };

  const getFilteredList = () => {
    return appointmentList.filter((eachItem) => eachItem.isStarred === true);
  };

  const favoriteButtonClicked = () => {
    setIsStarredButtonClicked(!isStarredButtonClicked);
  };

  const isStarIconClicked = (id) => {
    setAppointmentList((prevList) =>
      prevList.map((eachItem) => {
        if (eachItem.id === id) {
          return { ...eachItem, isStarred: !eachItem.isStarred };
        }
        return eachItem;
      })
    );
  };

  const filteredList = getFilteredList();

  const displayList = isStarredButtonClicked ? filteredList : appointmentList;

  const starredButtonStyle = isStarredButtonClicked
    ? "active-starred-button-appointments"
    : "";

  return (
    <div className="appointment-bg-container">
      <div className="appointment-card">
        <h1 className="appointment-main-heading">Add Appointment</h1>
        <div className="container-fluid mt-3 mb-3">
          <div className="row d-flex justify-content-between align-items-stretch">
            <form
              className="d-flex flex-column justify-content-center w-100 col-12 col-md-6"
              onSubmit={submitTheForm}
            >
              <div className="d-flex flex-column mt-2 mb-2">
                <label
                  className="appointment-label-title"
                  htmlFor="appointmentTitleInput"
                >
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="appointment-title-input"
                  id="appointmentTitleInput"
                  value={appointmentType}
                  onChange={changeAppointmentType}
                />
              </div>
              <div className="d-flex flex-column mt-2 mb-2">
                <label
                  className="appointment-label-date"
                  htmlFor="appointmentDateInput"
                >
                  TITLE
                </label>
                <input
                  type="date"
                  className="appointment-date-input"
                  id="appointmentDateInput"
                  value={appointmentDate}
                  onChange={changeAppointmentDate}
                />
              </div>
              <button type="submit" className="appointment-add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image d-none d-md-block col-md-5"
            />
          </div>
        </div>
        <hr className="appointment-hr-line" />
        <div className="d-flex align-items-center justify-content-between flex-wrap mt-3 mb-3">
          <h2 className="appointments-section-heading">Appointments</h2>
          <button
            className={`appointments-starred-button ${starredButtonStyle}`}
            type="button"
            onClick={favoriteButtonClicked}
          >
            Starred
          </button>
        </div>
        <div className="container-fluid mt-3 mb-3">
          <ul className="appointment-list-container row">
            {displayList.map((eachItem) => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                isStarIconClicked={isStarIconClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppointmentApp;

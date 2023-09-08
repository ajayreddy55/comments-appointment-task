import CommentsApp from "./components/comments-task";
import AppointmentApp from "./components/appointment-task";
import MoneyManagerApp from "./components/money-manager-task";
import "./App.css";

const App = () => {
  return (
    <>
      <CommentsApp />
      <AppointmentApp />
      <MoneyManagerApp />
    </>
  );
};

export default App;

import FlightDetails from "../FlightData/FlightDetails";
import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // console.log(localStorage.getItem);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Datatable</h1>
        <h2>Flight details...</h2>
        {/* <p>{localStorage.getItem}</p> */}

        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <FlightDetails />
    </div>
  );
};

export default Main;

import CountriesTable from "../FlightData/CountriesTables";
import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Datatable</h1>
				<h2>Flight details...</h2>

				
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			< CountriesTable/>

		</div>
	);
};

export default Main;

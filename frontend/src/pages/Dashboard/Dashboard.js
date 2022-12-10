import "./Dashboard.css"
import { Routes, Outlet } from "react-router-dom" 

function Dashboard() {
  return (
    <>
      <div className="d-flex position-relative main">
        <div className='drower position-absolute' >
          <ul>
            <li>
              <a href="dashboard/createactivity">Zapis na zajęcia</a>
            </li>
            <li><a href="dashboard/weekCalendar">Kalendarz</a></li>
          </ul>
        </div>
        <div style={{height: "100%", width: "100%", backgroundColor: "red", padding: "50px 50px 50px 100px"}}>
          <div style={{height: "100%", width: "100%", backgroundColor: "green"}}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;


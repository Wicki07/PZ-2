import "./Dashboard.css"
import { Outlet } from "react-router-dom" 
import { useEffect, useState } from 'react';

function Dashboard() {
  const [ user, setUser ] = useState({})

  useEffect(() => {
    const userData = localStorage.getItem("user") === "undefined" ? "{}" : localStorage.getItem("user");
    setUser(JSON.parse(userData))
  }, [])
  return (
    <>
      <div className="d-flex position-relative main">
        <div className='drower position-absolute' >
          <ul>
            {user.role === 'business' &&
              <li>
                <a href="/dashboard/createactivity">Utwórz zajęcia</a>
              </li>
            }
            <li>
              <a href="/dashboard/weekCalendar">Kalendarz</a>
            </li>
          </ul>
        </div>
        <div style={{height: "100%", width: "100%", padding: "50px 50px 50px 100px"}}>
          <div className="panel">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;


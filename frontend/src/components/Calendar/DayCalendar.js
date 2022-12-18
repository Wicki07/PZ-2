import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getMonthName, getWeekDayName } from "../../helpers/helpers";

function DayCalendar(props) {
  const today = new Date();
  const [activities, setActivities] = useState(null);

  const getActivities = async ({ start, end }) => {
    await fetch(
      `http://localhost:8000/api/activity?start=${start}&end=${end}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
            ? "Token " + localStorage.getItem("token")
            : null,
        },
      }
    ).then(async (res) => {
      const data = await res.json();
      if (res.status === 200) {
        console.log(res);
        console.log(data);
        setActivities(data);
        console.log(activities);
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (!activities) {
        await getActivities({
          start: today.toISOString().slice(0, 10),
          end: today.toISOString().slice(0, 10),
        });
      }
    }
    fetchData();
    console.log("update");
  });

  const Day = (date, activities = [1, 2, 3]) => {
    const opacity = today.getMonth() === date.date.month ? 1 : 0.5;

    const events = [];
    console.log("day");
    console.log(activities);
    if (!activities) {
      activities.forEach((el) =>
        events.push(
          <div
            onClick={() => {
              console.log(el);
            }}
            className="rounded my-1 p-2 bg-primary text-white"
          >
            <b>Test</b>
            <br />
            <i>Imie nazwisko</i>
            <br />
            <i>Imie nazwisko</i>
            <br />
            <font size="2">OD</font> 10:00 <font size="2">DO</font> 12:00
          </div>
        )
      );
    }
    return <div style={{ opacity: opacity }}>{/* {events} */}</div>;
  };
  const CalendarMenu = () => {
    const [windowsize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    return (
      <div
        id="CalendarMenu"
        className="w-100 shadow"
        style={{ zIndex: "1001" }}
      >
        <div
          className="bg-primary text-white text-center row shadow"
          style={{ height: "3rem", marginLeft: "0", marginRight: "0" }}
        >
          <span className="col my-auto">
            {new Date().getDate()}{" "}
            {getWeekDayName(windowsize.width, new Date().getDate() % 7)},{" "}
            {getMonthName()} {new Date().getFullYear()}
          </span>
        </div>
      </div>
    );
  };

  // onWindowResize((event) => {
  //   setWindowSize({width:window.innerWidth, height:window.innerHeight})
  // })
  return (
    <>
      <CalendarMenu />
      <Container
        style={{
          minHeight: "calc(100% - 3rem + 1px)",
          minWidth: "100%",
          display: "grid",
          padding: 0,
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr",
        }}
        fluid
      >
        <div style={{ border: "1px solid #eee", padding: "0.25rem" }}>
          {activities?.length && <Day date={new Date().getDate()} />}
        </div>
      </Container>
    </>
  );
}

export default DayCalendar;

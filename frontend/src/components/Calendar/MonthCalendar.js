import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
// import { useGlobalEvent } from "beautiful-react-hooks";
import { getMonthName, getWeekDayName } from "../../helpers/helpers"

function MonthCalendar(props) {

  const prepareCalendar = () => {
    // Dzisiejsza data
    let today = new Date() 
    // Pobieramy pierwszy dzień miesiaca
    let monthStart = new Date(today.getFullYear(), today.getMonth())
    // Pobieramy index pierwszego dnia miesiąca (odejmujemy 1 aby zaczynac od poniedziałku)
    let monthStartDayIndex = monthStart.getDay() - 1
    // will fill with sub arrays for each week
    let weeksArray = []
    let week = 1

    // Ustawiamy datę rozpoczęcia miesiąca
    var calendarStartDay = new Date(monthStart);
    // Ustawiamy datę na niezielę tygodnia poprzedzającego ten w którym jest dzień rozpoczynający nasz miesiąc
    calendarStartDay.setDate(monthStart.getDate() - monthStartDayIndex)

    // Budujemy tablicę tygodni a w nich numery dni miesiąca
    var dayCount = 0
    while (week < 7) {
      if(dayCount === 0){
        weeksArray.push([])
      }
      weeksArray[week-1].push({number: calendarStartDay.getDate(), month: calendarStartDay.getMonth(),day: dayCount});
      dayCount++;
      calendarStartDay.setDate(calendarStartDay.getDate() + 1);
      if (dayCount === 7) {
        week++;
        dayCount = 0
      }
    }

    // Zwracamy przygotowaną tablicę
    return weeksArray
  }

  const [monthdays] = useState(prepareCalendar())
  const [windowsize] = useState({width:window.innerWidth, height:window.innerHeight})

  const Day = (date, activities) => {
    let today = new Date() 
    // Ustawienie dzi poza zakresem berzącego miesiąca na półprzezroczyste
    let opacity = today.getMonth() === date.date.month ? 1 : 0.5
    return (
      <div style={{opacity:opacity}}>
        <font className={date.date.day > 4 ? 'text-danger': 'text-dark'}><b>{date.date.number}</b></font>
        <div onClick={()=>{console.log('test')}}className="rounded my-1 p-1 bg-primary text-white text-overflow">Test</div>
        <div onClick={()=>{console.log('test')}}className="rounded my-1 p-1 bg-primary text-white text-overflow">Test</div>
      </div>
    )
  } 

  const CalendarMenu = () => {
    return(
      <div className="w-100 shadow" style={{zIndex:'999'}}>
        <div className="bg-primary text-white text-center row" style={{height:'3rem', marginLeft: "0", marginRight: "0"}}>
          <span className="col my-auto">{ getMonthName() } { new Date().getFullYear() }</span>
        </div>
        <Container style={{
          width: '100%',
          display: 'grid',
          overflow:'hidden',
          padding:'0',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
          gridTemplateRows: '3rem'
        }} className="shadow" fluid>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayName(windowsize.width, 0)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayName(windowsize.width, 1)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayName(windowsize.width, 2)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayName(windowsize.width, 3)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayName(windowsize.width, 4)}</div></div>
          <div className="bg-danger w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayName(windowsize.width, 5)}</div></div>
          <div className="bg-danger w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayName(windowsize.width, 6)}</div></div>
        </Container>
      </div>
    )
  }

  // onWindowResize((event) => {
  //   setWindowSize({width:window.innerWidth, height:window.innerHeight})
  // })


  return (
    <>
      <CalendarMenu/>
      <Container style={{
        minHeight:'calc(100% - 6rem + 1px)',
        minWidth:'100%',
        display: 'grid',
        padding:0,
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr '
      }} fluid>
        {
          monthdays?.map((week) => {
            return week.map((day, index) => {
              // Zaznaczenie dzisiejszego dnia
              let today = new Date()
              let dateToCheck = new Date(today.getFullYear(), day.month, day.number, today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
              let backgroundToSet = today.getTime() === dateToCheck.getTime() ? 'lightblue' : 'transparent'
              // Rysowanie dni
              return(<div style={{border:'1px solid #eee',padding:'0.25rem', backgroundColor:backgroundToSet}} key={index}><Day date={day}/></div>)
            })
          })
        } 
      </Container>
    </>
  );
}

export default MonthCalendar;

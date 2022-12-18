import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
// import { useGlobalEvent } from "beautiful-react-hooks";
import { getMonthName, getWeekNumber } from "../../helpers/helpers"

function WeekCalendar(props) {

  const [activities, setActivities] = useState([])

  const getActivities = async ({start, end}) => {
    await fetch(`http://localhost:8000/api/activity?start=${start}&end=${end}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json', 
        "Accept": "application/json", 
        "Authorization": localStorage.getItem("token")
      ? "Token " + localStorage.getItem("token")
      : null,},
    }).then(async (res) => {
      const data = await res.json();
      if(res.status === 200) {
        setActivities(data)
      }
    })
  }

  const prepareCalendar = () => {
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
      weeksArray[week-1].push({number: calendarStartDay.getDate(), month: calendarStartDay.getMonth(),day: dayCount, date: calendarStartDay.toISOString().slice(0,10)});
      dayCount++;
      calendarStartDay.setDate(calendarStartDay.getDate() + 1);
      if (dayCount === 7) {
        week++;
        dayCount = 0
      }
    }

    if(!activities.length){
      getActivities({start: weeksArray[0][0].date, end: weeksArray[weeksArray.length - 1][6].date})
    }
    // Zwracamy przygotowaną tablicę
    return weeksArray
  }

  const [monthdays] = useState(prepareCalendar())
  const [windowsize] = useState({width:window.innerWidth, height:window.innerHeight})
  // const onWindowResize = useGlobalEvent("resize")

  const Day = ({date}) => {
    let today = new Date() 
    // Ustawienie dzi poza zakresem berzącego miesiąca na półprzezroczyste
    let opacity = today.getMonth() === date.month ? 1 : 0.5

    const events = [];
    activities.filter(el => el.date === date.date).forEach(el => events.push(
      <div onClick={()=>{console.log(el)}}className="rounded my-1 p-1 bg-primary text-white text-overflow">{el.name}</div>
    ))
    return (
      <div style={{opacity:opacity}}>
        <font className={date.day > 4 ? 'text-danger': 'text-dark'}><b>{date.number}</b></font>
        {events}
      </div>
    )
  } 
  const getWeekDayNameAndNumber = (dayNumber) =>{
    const daysNames = ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela']
    const daysNamesShort = ['Pn','Wt','Śr','Cz','Pt','Sb','Nd']
    console.log()
    return <>{monthdays[getWeekNumber()][dayNumber].number} <font size="2">{(windowsize.width >= 872 ? daysNames[dayNumber] : daysNamesShort[dayNumber])}</font></>
  }

  const CalendarMenu = () =>{
    return(
      <div id='CalendarMenu' className="w-100 shadow" style={{zIndex:'1001'}}>
        <div className="bg-primary text-white text-center row" style={{height:'3rem', marginLeft: "0", marginRight: "0"}}>
          <span className="col my-auto">{ getMonthName() } { new Date().getFullYear() }</span>
          {/* <Button onClick={()=>props.changeDisplayMode('day')} style={{marginRight:'1rem'}}>Dzisiaj</Button>
          <Button onClick={()=>props.changeDisplayMode('week')} style={{marginRight:'1rem'}}>Tydzień</Button>
          <Button onClick={()=>props.changeDisplayMode('month')} style={{marginRight:'1rem'}}>Miesiąc</Button> */}
        </div>
        <Container style={{
          minHeight:'calc(100% - 3rem + 1px)',
          width: '100%',
          display: 'grid',
          overflow:'hidden',
          padding:'0',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
          gridTemplateRows: '3rem'
        }} className="shadow" fluid>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayNameAndNumber(0)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayNameAndNumber(1)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayNameAndNumber(2)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayNameAndNumber(3)}</div></div>
          <div className="bg-dark w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayNameAndNumber(4)}</div></div>
          <div className="bg-danger w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayNameAndNumber(5)}</div></div>
          <div className="bg-danger w-100 mx-auto text-white text-center row overflow-hidden"><div className="col my-auto">{getWeekDayNameAndNumber(6)}</div></div>
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
        gridTemplateRows: '1fr'
      }} fluid>
        {
          monthdays[getWeekNumber()]?.map((day, index) => {
            // Zaznaczenie dzisiejszego dnia
            let today = new Date()
            let dateToCheck = new Date(today.getFullYear(), day.month, day.number, today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds())
            let backgroundToSet = today.getTime() === dateToCheck.getTime() ? 'lightblue' : 'transparent'
            // Rysowanie dni
            return(<div style={{border:'1px solid #eee',padding:'0.25rem', backgroundColor:backgroundToSet}} key={index}><Day date={day}/></div>)
          })
        } 
      </Container>
    </>
  );
}

export default WeekCalendar;

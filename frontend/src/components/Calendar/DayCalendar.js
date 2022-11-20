import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import { getMonthName, getWeekDayName } from "../../helpers/helpers"

function DayCalendar(props) {

  const Day = (date, activities = [1,2,3]) => {
    const today = new Date() 
    const opacity = today.getMonth() === date.date.month ? 1 : 0.5

    return (
      <div style={{opacity:opacity}}>
        <div onClick={()=>{console.log('test1')}} className="rounded my-1 p-2 bg-primary text-white"><b>Test</b><br/><i>Imie nazwisko</i><br/><i>Imie nazwisko</i><br/><font size='2'>OD</font> 10:00 <font size='2'>DO</font> 12:00</div>
        <div onClick={()=>{console.log('test2')}} className="rounded my-1 p-2 bg-primary text-white"><b>Test</b><br/><i>Imie nazwisko</i><br/><i>Imie nazwisko</i><br/><font size='2'>OD</font> 10:00 <font size='2'>DO</font> 12:00</div>
        <div onClick={()=>{console.log('test3')}} className="rounded my-1 p-2 bg-primary text-white"><b>Test</b><br/><i>Imie nazwisko</i><br/><i>Imie nazwisko</i><br/><font size='2'>OD</font> 10:00 <font size='2'>DO</font> 12:00</div>
      </div>
    )
  } 
  const CalendarMenu = () => {
    
  const [windowsize] = useState({width:window.innerWidth, height:window.innerHeight})
    return(
      <div id='CalendarMenu' className="position-fixed w-100 shadow" style={{zIndex:'1001'}}>
        <div className="bg-primary text-white text-center row shadow" style={{height:'3rem'}}>
          <span className="col my-auto">{new Date().getDate()} {getWeekDayName(windowsize.width, new Date().getDate() % 7)}, {getMonthName()} {new Date().getFullYear()}</span>
        </div>
      </div>
    )
  }

  // onWindowResize((event) => {
  //   setWindowSize({width:window.innerWidth, height:window.innerHeight})
  // })
  return (
    <>
      <CalendarMenu/>
      <div className="bg-primary text-white text-center row" style={{height:'3rem'}}></div>
      <Container style={{
        minHeight:'calc(100% - 3rem + 1px)',
        minWidth:'100%',
        display: 'grid',
        padding:0,
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr'
      }} fluid>
        <div style={{border:'1px solid #eee',padding:'0.25rem'}}><Day date={new Date().getDate()}/></div>
      </Container>
    </>
  );
}

export default DayCalendar;

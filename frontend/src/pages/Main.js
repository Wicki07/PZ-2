import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

function App() {
  return (
    <>
      <Header />
      <div className='p-5 d-flex flex-row' style={{backgroundImage: `url("./img/card-bg.png")`, height: '400px'}}>
        <div className='m-5 d-flex flex-wrap' style={{flexGrow: "1", minWidth: '500px'}}>
          <div>
            <h3 style={{width: "90%"}}>Zapisz się na zajęcia i zorganizuj je razem z projektem PZ-2</h3>
            <h5 style={{width: "60%"}}>Organizer jakiego potrzebujesz! Wszystkie Twoje zajęcie w jednym miejscu </h5>
          </div>
          <Button size="sm" variant="primary">Zacznij korzystać od zaraz</Button>
        </div>
        <div className='d-flex flex-wrap' style={{flexGrow: "1"}}>
          <Image src={'https://wac-cdn.atlassian.com/dam/jcr:4ddaea11-b00e-4546-8241-25f45689fed6/hero-illustration.png?cdnVersion=600'} style={{border: 'none'}} thumbnail />
        </div>
      </div>
    </>
  );
}

export default App;
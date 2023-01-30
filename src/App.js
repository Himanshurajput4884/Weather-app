import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from './components/FrontPage';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import BasicMap from './components/BasicMap'

function App() {
  const [isToggled, setIsToggled] = useState(true);
  let v1 = isToggled ? "Map" : "City";

  return (
    <div>
      <Navbar/>
      <div className='container pt-5'>
      <Button onClick={()=> setIsToggled(!isToggled)} variant="success">{v1}</Button>{' '}
      </div>
      {isToggled && <FrontPage/>}
      {!isToggled && <BasicMap/>}
    </div>
    );
}

export default App;

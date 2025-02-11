import { Outlet } from 'react-router-dom';
import './App.css';
import NavbarComponent from './components/navbar/index.tsx';

function App() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}

export default App;

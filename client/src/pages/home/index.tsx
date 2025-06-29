import reactLogo from '../../assets/react.svg';
// import NavbarComponent from '../../components/navbar';
import viteLogo from '../../../public/vite.svg';
import '../../App.css';
import { useState, useRef, useCallback } from 'react';

function HomePageComponent() {
  const [count, setCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleButtonClick = useCallback(async () => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    try {
      let token = localStorage.getItem('ID_TOKEN');
      // console.log('token', token);

      if (!token) {
        const loginResponse = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: '',
            password: '',
          }),
          signal, // Add abort signal
        });
        
        if (!loginResponse.ok) {
          throw new Error(`Login failed: ${loginResponse.status}`);
        }
        
        const loginData = await loginResponse.json();
        token = loginData.token;
        if (token) {
          localStorage.setItem('ID_TOKEN', token);
        }
      }

      /* for testing 01 - /api/users/getUsers */
      /* for testing 02 - /db-test/ */
      const usersResponse = await fetch('/db-test/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal, // Add abort signal
      });
      
      if (!usersResponse.ok) {
        throw new Error(`Users request failed: ${usersResponse.status}`);
      }
      
      const usersData = await usersResponse.json();
      console.log(usersData);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was cancelled');
      } else {
        console.error('Request failed:', error);
      }
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <button
          className="btn"
          type="button"
          onClick={async () => {
            // console.log(data);
            handleButtonClick();
          }}
        >
          Click me to test the DB API
        </button>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className=" read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default HomePageComponent;

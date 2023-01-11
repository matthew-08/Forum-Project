import './global.css';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Homepage from './Pages/Homepage/Homepage';
import Subcategory from './Pages/subCategory/Subcategory';
import CreateThread from './Pages/CreateThread/CreateThread';
import Navbar from './Navbar/Navbar';
import Thread from './Pages/Thread/Thread';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      }
    });
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/:id"
        >
          <Route
            index
            element={
              <Subcategory />
          }
          />
          <Route
            path=":id"
            element={(
              <Thread
                user={user}
              />
)}
          />
          <Route
            path="createThread"
            element={<CreateThread />}
          />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

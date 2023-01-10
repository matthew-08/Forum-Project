import './global.css';
import {
  BrowserRouter as Router, Route, Routes, useLocation,
} from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Subcategory from './Pages/subCategory/Subcategory';
import CreateThread from './Pages/CreateThread/CreateThread';
import Navbar from './Navbar/Navbar';
import Thread from './Pages/Thread/Thread';

function App() {
  console.log('app render');
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
            element={<Thread />}
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

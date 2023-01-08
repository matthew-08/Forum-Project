import './global.css';
import {
  BrowserRouter as Router, Route, Routes, useLocation,
} from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Subcategory from './Pages/subCategory/Subcategory';
import CreateThread from './Pages/CreateThread/CreateThread';
import Navbar from './Navbar/Navbar';

function App() {
  console.log('app render');
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/:id"
          element={<Subcategory />}
        />
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/createThread"
          element={<CreateThread />}
        />
      </Routes>
    </Router>
  );
}

export default App;

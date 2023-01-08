import './global.css';
import {
  BrowserRouter as Router, Route, Routes, useLocation,
} from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Subcategory from './Pages/subCategory/Subcategory';

function App() {
  console.log('app render');
  return (
    <Router>
      <Routes>
        <Route
          path="/:id"
          element={<Subcategory />}
        />
        <Route
          path="/"
          element={<Homepage />}
        />
      </Routes>
    </Router>
  );
}

export default App;

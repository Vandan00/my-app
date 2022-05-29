import './App.css';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/" element={<Register />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
  );
}

export default App;

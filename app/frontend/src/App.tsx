import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './view/home/pages/HomePage';
import PatientPage from './view/patient/pages/PatientPage';
// import DoctorPage from "./pages/DoctorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patient" element={<PatientPage />} />
        {/* <Route path="/doctor" element={<DoctorPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

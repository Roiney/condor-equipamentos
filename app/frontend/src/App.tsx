import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DoctorPatientDetailsPage from './view/doctor/pages/DoctorPatientDetailsPage';
import DoctorPatientListPage from './view/doctor/pages/DoctorPatientListPage';
import HomePage from './view/home/pages/HomePage';
import PatientPage from './view/patient/pages/PatientPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/doctor" element={<DoctorPatientListPage />} />
        <Route
          path="/doctor/patient/:id"
          element={<DoctorPatientDetailsPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;

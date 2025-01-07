import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import ViewCapsule from './pages/ViewCapsule';

export function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/capsule/:capsuleId" element={<ViewCapsule />} />
      </Routes>
    </div>
  );
}

export default App;

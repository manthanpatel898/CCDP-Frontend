import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../pages/Navbar/Navbar'; // Import the Navbar

export default function PublicLayout() {
  const token: string | null = localStorage.getItem("token");

  return (
    <div>
      <Navbar />  {/* Include the Navbar on all public routes */}
      {token ? <Navigate to="/dashboard" /> : <Outlet />}  {/* Redirect to dashboard if token exists */}
    </div>
  );
}

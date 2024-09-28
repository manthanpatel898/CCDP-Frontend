import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../pages/Navbar/Navbar';
export default function PrivateLayout() {
  const token: string | null = localStorage.getItem("token");
  // return token ? <Outlet /> : <Navigate to="/login" />;
  return (
    <div>
      <Navbar />  {/* Include the Navbar on all public routes */}
      {token ? <Outlet /> : <Navigate to="/login" />}  {/* Redirect to dashboard if token exists */}
    </div>
  );
}

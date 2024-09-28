import { Navigate, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  const token: string | null = localStorage.getItem("token");

  return (
    <div>
      {token ? <Navigate to="/dashboard" /> : <Outlet />}  {/* Redirect to dashboard if token exists */}
    </div>
  );
}

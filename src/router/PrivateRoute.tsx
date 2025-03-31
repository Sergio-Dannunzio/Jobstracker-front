import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isValidToken = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000; // Tiempo actual en segundos
    return decoded.exp > now; // Devuelve true si el token no ha expirado
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false; // Token inválido o mal formado
  }
};

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  return isValidToken(token) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
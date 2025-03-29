import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login";
//import Register from "../pages/Register";


function AppRoutes() {
  //const location = useLocation();
  //const { token } = useAuth();

  /*const showHeaderFooterRoutes = [
    /^\/home$/,
    /^\/group$/,
    /^\/access-group$/,
    /^\/crowdfunding$/,
    /^\/mercadopago$/,
    /^\/payment$/,
    /^\/create-trip$/,
    /^\/destinations$/,
    /^\/activities$/,
    /^\/restaurants$/,
    /^\/activity\/\d+$/,
    /^\/trip-component+$/,
  ];

  const shouldShowHeaderFooter = () => {
    return showHeaderFooterRoutes.some((pattern) => pattern.test(location.pathname));
  };*/

  return (
    <>
      <Routes>

        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default AppWrapper;

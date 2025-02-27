import { JSX } from "react";
import { Route, Navigate, Routes, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";


const RedirectToCorrectPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return <Navigate to={user ? "/dashboard" : "/signin"} />;
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return user ? element : <Navigate to="/signin" />;
};

const GetRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RedirectToCorrectPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            </Routes>
        </Router>
    );
}

export default GetRoutes;

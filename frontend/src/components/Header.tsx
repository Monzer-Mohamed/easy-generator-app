
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {handleSignout}  from "../services/auth";
import { RootState } from "../store";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user); 
    const handleOnClick = async () => {
        await handleSignout(dispatch, navigate,user);
    };

    return (
        <header className="header">
            <nav className="nav">
                <h1 className="logo">Easy Gen</h1>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <button onClick={handleOnClick} className="nav-link logout">
                        <FaSignOutAlt className="logout-icon" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;

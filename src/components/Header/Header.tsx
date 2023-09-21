import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav>
        <Link to={"/"} className="logo">
          <img src="/gallery.png" alt="logo" />
          <div>Image Gallery</div>
        </Link>

        <div className="other_links">
          <div>see below</div>
          {currentUser ? (
            <button className="log_out" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <Link to={"/sign-in"}>Log In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

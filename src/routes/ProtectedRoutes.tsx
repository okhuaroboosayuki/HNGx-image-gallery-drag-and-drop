import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useContext } from "react";

type ProtectedRouteProps = {
    children: any;
  };

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();


  //check if user is logged in through local storage, if not redirect to login page
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (!isUserLoggedIn) {
      navigate("/sign-in");
    } else return;
  }, [currentUser, navigate]);

  return <>{children}</>;
}

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp } from "../components";
import { AuthContextProvider } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthContextProvider>
            <SignUp />
          </AuthContextProvider>
        }
      />
      <Route
        path="/sign-in"
        element={
          <AuthContextProvider>
            <SignIn />
          </AuthContextProvider>
        }
      />
    </Route>
  )
);

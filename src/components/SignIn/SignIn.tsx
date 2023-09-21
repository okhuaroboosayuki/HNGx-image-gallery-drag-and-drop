import "./../SignUp/sign-up.scss";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BtnLoader } from "..";

export const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError("");
      try {
        const email = values.email;
        const password = values.password;

        // create a new user in firebase auth
        await login({ auth, email, password });

        navigate("/");
      } catch (error: any) {
        if (error.code === "auth/invalid-login-credentials") {
          setError("Wrong Credentials");
        } else if (error.code === "auth/network-request-failed") {
          setError("Network error. Check your internet connection");
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many requests. Try again later");
        } else {
          setError("Something went wrong. Try again later");
        }
      }
    },
    // use yup to validate the form
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("An email address is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      //check if password and confirm password match
    }),
  });

  const handlePasswordVisibility = () => {
    if (formik.values.password.length < 1) {
      return;
    } else {
      setPasswordVisibility(!passwordVisibility);

      if (passwordVisibility) {
        document.getElementById("password")?.setAttribute("type", "password");
      } else {
        document.getElementById("password")?.setAttribute("type", "text");
      }
    }
  };

  return (
    <section className="sign_up">
      <form onSubmit={formik.handleSubmit}>
        <h2>Log In</h2>
        {error && <div className="main_error">{error}</div>}
        <div className="wrapper_container">
          <div className="input_wrapper">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="email_input"
              placeholder="Johndoe@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={
                formik.errors.email && formik.touched.email
                  ? { border: "1px solid red" }
                  : { border: "1px solid #ced4da" }
              }
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>

        <div className="wrapper_container">
          <div className="input_wrapper">
            <label htmlFor="password">Password</label>
            <div
              className="input"
              style={
                formik.errors.email && formik.touched.email
                  ? { border: "1px solid red" }
                  : { border: "1px solid #ced4da" }
              }
            >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {passwordVisibility ? (
                <VisibilityOutlinedIcon
                  className="visibility_icon"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="visibility_icon"
                  onClick={handlePasswordVisibility}
                />
              )}
            </div>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>

        <div className="submit_btn">
          {formik.isSubmitting ? (
            <BtnLoader />
          ) : (
            <button type="submit">Log In</button>
          )}
        </div>

        <div className="or_sign_in">
          <p>don't have an account?</p>
          <Link to={"/sign-up"} className="sign_in_link">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
};

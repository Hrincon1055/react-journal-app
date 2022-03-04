import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
// Mis componentes
import { useForm } from "../../hooks/useForm";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
// Inicio
export const LoginScreen = () => {
  // hooks
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);
  const [{ email, password }, handleInputChange] = useForm({
    email: "ana@correo.com",
    password: "123456",
  });
  // funciones
  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };
  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid."));
      return false;
    } else if (password.length < 5) {
      dispatch(setError("Password should be at least 6 characteres."));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch(startGoogleLogin());
  };
  return (
    <>
      <h3 className="auth__title">Login</h3>
      {msgError && <div className="auth__alert-error">{msgError}</div>}
      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};

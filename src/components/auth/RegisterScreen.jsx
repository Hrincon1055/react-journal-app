import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
// Mis componentes
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

// Inicio
export const RegisterScreen = () => {
  // hooks
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [{ name, email, password, confirm }, handleInputChange] = useForm({
    name: "Ana Rincon",
    email: "ana@correo.com",
    password: "123456",
    confirm: "123456",
  });
  // funciones
  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required."));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid."));
      return false;
    } else if (password !== confirm || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characteres and match each other."
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };
  // render
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          type="password"
          placeholder="Confirm"
          name="confirm"
          className="auth__input"
          value={confirm}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Login
        </button>

        <Link to="/auth/login" className="link ">
          Already registered?
        </Link>
      </form>
    </>
  );
};

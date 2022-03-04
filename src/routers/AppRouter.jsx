import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
// Mis componentes
import { JournalScreen } from "../components/journal/JournalScreen";
import { firebase } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";
// Inicio
export const AppRouter = () => {
  // hooks
  const dispatch = useDispatch();
  // state
  const [cheking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // effect
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setCheking(false);
    });
  }, [dispatch, setCheking, setIsLoggedIn]);
  // render
  if (cheking) return <p>Loading...</p>;
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            isAuthenticated={isLoggedIn}
            component={AuthRouter}
          />
          <PrivateRoute
            path="/"
            isAuthenticated={isLoggedIn}
            component={JournalScreen}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

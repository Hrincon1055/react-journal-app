import { Provider } from "react-redux";
import { AppRouter } from "./routers/AppRouter";
import { store } from "./store/store";

// Inicio
export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

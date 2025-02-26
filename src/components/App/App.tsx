import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { AppContent } from "components"; 

export const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

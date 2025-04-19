import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { AppContent } from "components";
import GlobalStyle, * as S from "./App.styles";

export const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppContent />
    </Provider>
  );
};

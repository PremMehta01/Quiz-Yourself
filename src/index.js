import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import Main from "./router";
import { theme } from "./utils/theme";

const Home = () => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  </StoreProvider>
);

export default Home;

import React from "react";
import { createAppContainer } from "react-navigation";

import { Appbar } from "../components";

import { DeckAdd, DeckSingle, CardAdd, Quiz } from "../screens";
import { createStackNavigator } from "react-navigation-stack";
import NavigationDrawer from "./NavigationDrawer";

const screens = {
  DeckAdd: {
    screen: DeckAdd,
    title: "Add New Category"
  },
  DeckSingle: {
    screen: DeckSingle,
    title: "Category Actions"
  },
  CardAdd: {
    screen: CardAdd,
    title: "Add New Question"
  },
  Quiz: {
    screen: Quiz,
    title: "Quiz"
  }
};

const routes = Object.keys(screens)
  .map(id => ({ id, item: screens[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item.screen;
    const Screen = props => <Comp {...props} />;
    Screen.navigationOptions = ({ navigation }) => ({
      header: <Appbar menu={false} title={item.title} navigation={navigation} />
    });
    return {
      ...acc,
      [id]: { screen: Screen }
    };
  }, {});

const NavigationStack = createStackNavigator(
  {
    Drawer: {
      screen: NavigationDrawer,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Appbar
            menu={true}
            title="Quiz Yourself"
            navigation={navigation}
          />
        )
      })
    },
    ...routes
  },
  {
    initialRouteName: "Drawer"
  }
);

const Main = createAppContainer(NavigationStack);

export default Main;

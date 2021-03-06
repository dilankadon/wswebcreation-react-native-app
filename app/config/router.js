import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../screens/Home';
import WebViewScreen from '../screens/Webview';
import Chats from '../screens/Chats';
import ChatBox from '../screens/ChatBox';
import WebViewSelection from '../screens/WebviewSelection';
import StorybookInApp from '../../storybook/storybook.app';
import { APP_URI, ENVIRONMENT, IS_IOS, TESTING_ENVIRONMENTS } from './Constants';
import { testProperties } from './TestProperties';
import * as labels from './labels.json';

const Tabs = TabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: labels.tabNavigator.home,
        tabBarIcon: ({ tintColor }) =>
          <View {...testProperties(labels.tabNavigator.home)}>
            <Icon
              name="ios-home-outline"
              type="ionicon"
              size={25}
              color={tintColor}
            />
          </View>,
        tabBarTestIDProps: {
          ...testProperties(labels.tabNavigator.home),
        },
      },
    },
    Webview: {
      screen: WebViewSelection,
      navigationOptions: {
        tabBarLabel: labels.tabNavigator.webview,
        tabBarIcon: ({ tintColor }) =>
          <View {...testProperties(labels.tabNavigator.webview)}>
            <Icon
              name="ios-globe-outline"
              type="ionicon"
              size={25}
              color={tintColor}
            />
          </View>,
        tabBarTestIDProps: {
          ...testProperties(labels.tabNavigator.webview),
        },
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarLabel: labels.tabNavigator.chats,
        tabBarIcon: ({ tintColor }) =>
          <View {...testProperties(labels.tabNavigator.chats)}>
            <Icon
              name="ios-chatbubbles-outline"
              type="ionicon"
              size={25}
              color={tintColor}
            />
          </View>,
        tabBarTestIDProps: {
          ...testProperties(labels.tabNavigator.chats),
        },
      },
    },
  },
  {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#2980b9',
      inactiveTintColor: '#999999',
      style: {
        backgroundColor: '#ffffff',
        ...Platform.select({
          android: {
            height: 60,
          },
        }),
      },
      indicatorStyle: {
        backgroundColor: 'white'
      },
    }
  }
);

const Routes = {
  Root: {
    screen: Tabs,
  },
  ChatBox: {
    screen: ChatBox,
    path:'chatbox/:person',
  },
  WebViewScreen: {
    screen: WebViewScreen,
  },
};

if (TESTING_ENVIRONMENTS.includes(ENVIRONMENT)) {
  Routes.StoryBook = {
    screen: StorybookInApp,
    navigationOptions: {
      header: null
    },
    path: 'storybook/'
  }
}

const Router = StackNavigator(Routes, {
  navigationOptions: {
    headerTitleStyle: {
      alignSelf: 'center',
      color: '#000',
      textAlign: 'center',
    },
  }
});

export class StackMainNavigation extends Component {
  render() {
    return (
      <Router
        uriPrefix={IS_IOS ? `${APP_URI}://` : `${APP_URI}://${APP_URI}/`}
      />
    );
  }
}

import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Games from './components/Games';
import LeaderBoard from './components/LeaderBoard';
import Runs from './components/Runs';

const AppNavigator = createStackNavigator({
  Games: {screen: Games, navigationOptions: {
      title: 'Games',
    }},
  LeaderBoard: {screen: LeaderBoard, navigationOptions: {
      title: 'LeaderBoard',
    }},
  Runs: {screen: Runs, navigationOptions: {
      title: 'Runs',
    }},
},
    {
      defaultNavigationOptions: {
        title: "Crazy Raccing",
        headerStyle: {
          backgroundColor: '#272a30',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize: 20,
        },
      }
});

export default createAppContainer(AppNavigator);

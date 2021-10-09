import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import FreeDriving from './src/screens/FreeDriving';
import Payment from './src/screens/Payment';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Free Driving">
        <Drawer.Screen name="Free Driving" component={FreeDriving} />
        <Drawer.Screen name="Payment" component={Payment} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

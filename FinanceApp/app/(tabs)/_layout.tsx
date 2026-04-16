import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { CustomTabBar } from '../../components/customTabBar/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
          },
          default: {},
        }),
      }}
      initialRouteName="home/index"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      
    </Tabs>
  );
}


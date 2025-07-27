import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { CustomTabBar } from '../../components/customTabBar/CustomTabBar'; // ajuste o caminho se necessário

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
      <Tabs.Screen name="home/index" options={{ title: 'Home' }} />
      <Tabs.Screen name="ganhos/index" options={{ title: 'Conteúdo' }} />
      <Tabs.Screen name="perfil/index" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}

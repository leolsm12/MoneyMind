import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tabIcons: Record<string, { name: string; label: string }> = {
  'home/index': { name: 'home', label: 'Home' },
  'ganhos/index': { name: 'cash-outline', label: 'ganhos' },
  'gastos/index': { name: 'receipt-outline', label: 'gastos' },
  'perfil/index': { name: 'person-circle-outline', label: 'Perfil' },
};

const tabOrder = ['home/index', 'ganhos/index', 'gastos/index', 'perfil/index'];

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const orderedRoutes = tabOrder
    .map(name => state.routes.find(route => route.name === name))
    .filter(Boolean);

  return (
    <View style={styles.container}>
      {orderedRoutes.map((route, index) => {
        const routeIndex = state.routes.findIndex(r => r.key === route?.key);
        const isFocused = state.index === routeIndex;

        const iconData = tabIcons[route!.name] ?? { name: 'help', label: route!.name };

        return (
          <TouchableOpacity
            key={route!.key}
            onPress={() => navigation.navigate(route!.name)}
            style={styles.button}
          >
            <View style={[styles.iconCircle, isFocused && styles.iconCircleActive]}>
              <Ionicons
                name={iconData.name as any}
                size={24}
                color={isFocused ? '#293241' : '#98C1D9'}
              />
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {iconData.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,  
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#3D5A80',
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
  button: {
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#E0FBFC',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconCircleActive: {
    backgroundColor: '#E0FBFC',
    borderWidth: 2,
    borderColor: '#293241',
  },
  label: {
    fontSize: 12,
    color: '#98C1D9',
  },
  labelActive: {
    color: '#293241',
    fontWeight: 'bold',
  },
});

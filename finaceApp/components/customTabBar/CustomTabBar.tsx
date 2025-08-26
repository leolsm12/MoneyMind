import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tabIcons: Record<string, { name: string; label: string }> = {
  'home/index': { name: 'home', label: 'Home' },
  'ganhos/index': { name: 'cash-outline', label: 'Ganhos' },
  'gastos/index': { name: 'receipt-outline', label: 'Gastos' },
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
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Ionicons
                name={iconData.name as any}
                size={22}
                color={isFocused ? '#FF8300' : '#A0A4A8'}
              />
             
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {iconData.label}
            </Text>
            {isFocused && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Para mudar a altura da barra, ajuste o paddingTop, paddingBottom ou adicione height
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 5, // aumente/diminua para alterar a altura inferior
    paddingTop: 5,    // aumente/diminua para alterar a altura superior
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    //height: 50, // opcional: defina uma altura fixa se preferir
  },
  button: {
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    marginBottom: 2,
  },
  indicator: {
    alignItems: 'center',
    bottom: 0,
    left: '8%',
    transform: [{ translateX: -8 }],
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FF8300',
  },
  label: {
    fontSize: 11,
    color: '#A0A4A8',
    marginTop: -2,
  },
  labelActive: {
    color: '#FF8300',
    fontWeight: 'bold',
  },
});

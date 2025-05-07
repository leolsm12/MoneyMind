import React, { useState } from 'react';
import { Animated, Text, TouchableWithoutFeedback } from 'react-native';

interface Props {
  title: string;
  color: string;
  onPress: () => void;
}

const CustomButton: React.FC<Props> = ({ title, color, onPress }) => {
  const [scale] = useState(new Animated.Value(1));

  // Função para animar o botão ao pressionar
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // "Afunda" o botão
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Restaura o botão ao tamanho original
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={{
          backgroundColor: color,
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ scale }],
          elevation: 5, // Sombras para efeito 3D
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

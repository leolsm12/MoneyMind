import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { styles } from './_Login_style';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Lógica real vai depois
    router.replace('/(tabs)/Home/Home_Index');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}


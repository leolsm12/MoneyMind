// components/BarChartResumo.tsx
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;
const data = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [
    {
      data: [3500, 1200, 1800, 2000, -1500, -2500, 3000]
    }
  ]
};

interface BarChartResumoProps {
  data: {
    labels: string[];
    datasets: { data: number[] }[];
  };
}

const BarChartResumo: React.FC<BarChartResumoProps> = ({ data }) => {
  return (
    <View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
          Resumo semanal
        </Text>
        <LineChart
          data={data}
          width={screenWidth} // from react-native
          height={220}
          yAxisLabel="R$"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#bfbbb8",
            backgroundGradientTo: "#94918e",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "1",
              stroke: "#000"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
    </View>
  );
};

export default BarChartResumo;

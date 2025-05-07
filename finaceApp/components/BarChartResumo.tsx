// components/BarChartResumo.tsx
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const BarChartResumo = () => {
  return (
    <View>
      <Text style={{ marginLeft: 16, fontWeight: 'bold' }}>Resumo da Semana</Text>
      <BarChart
        data={{
          labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
          datasets: [
            {
              data: [2500, 1200, 1800, 2000, 1500],
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisLabel="R$"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          labelColor: () => '#333',
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default BarChartResumo;

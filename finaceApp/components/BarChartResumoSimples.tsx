import React from 'react';
import { Text, View } from 'react-native';
import { Rect, Svg } from 'react-native-svg';

interface Props {
  ganhos: number;
  gastos: number;
}

const BarChartResumoSimples: React.FC<Props> = ({ ganhos, gastos }) => {
  // Calcular o saldo atual (o que resta após os gastos)
  const saldo = ganhos - gastos;

  // Total da barra (é o valor total que a barra terá, que é o valor dos ganhos)
  const total = ganhos;

  // Largura total da barra e a altura
  const barWidth = 300; // Largura total da barra
  const height = 30; // Altura da barra

  // Calcular as larguras proporcionais das seções da barra
  const gastoWidth = (gastos / total) * barWidth; // Porção dos gastos
  const saldoWidth = (saldo / total) * barWidth; // Porção do saldo

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ marginLeft: 8, marginBottom: 8, fontWeight: 'bold', fontSize: 16 }}>
        Comparativo Financeiro
      </Text>
      <Svg height={height} width={barWidth}>
        {/* Barra de Gastos */}
        <Rect
          x="0"
          y="0"
          width={gastoWidth}
          height={height}
          fill="#e74c3c" // Vermelho para gastos
        />
        {/* Barra de Saldo */}
        <Rect
          x={gastoWidth}
          y="0"
          width={saldoWidth}
          height={height}
          fill="#3498db" // Azul para saldo
        />
      </Svg>
    </View>
  );
};

export default BarChartResumoSimples;

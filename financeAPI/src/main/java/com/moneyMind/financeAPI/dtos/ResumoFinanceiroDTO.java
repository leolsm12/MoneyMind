package com.moneyMind.financeAPI.dtos;

import java.math.BigDecimal;
/**
 * Carrega os dados consolidados para a tela Home do aplicativo.
 *
 * O saldoAtual é calculado no Service, não no banco:
 * saldoAtual = totalReceitas - totalDespesas
 *
 * Separar esses 3 valores permite que o app:
 * 1. Exiba o saldo no card principal.
 * 2. Mostre o card de "Receitas do Mês" com a cor verde.
 * 3. Mostre o card de "Despesas do Mês" com a cor vermelha.
 */

public record ResumoFinanceiroDTO(
        BigDecimal saldoAtual,
        BigDecimal totalReceitas,
        BigDecimal totalDespesas
) {}

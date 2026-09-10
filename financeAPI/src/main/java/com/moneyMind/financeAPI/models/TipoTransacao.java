package com.moneyMind.financeAPI.models;

/**
 * Representa a natureza da transação financeira.
 * O uso de Enum traz 'Type Safety' (segurança de tipo), impedindo
 * que qualquer texto inválido seja salvo no banco de dados.
 */

public enum TipoTransacao {
    RECEITA,
    DESPESA
}

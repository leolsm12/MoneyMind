package com.moneyMind.financeAPI.dtos;

import com.moneyMind.financeAPI.models.TipoTransacao;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
/**
 * Note que o campo 'usuario' NÃO está aqui.
 * Por dois motivos:
 * 1. Segurança: nunca expor dados do usuário (como CPF, senha hash, etc.) desnecessariamente.
 * 2. Redundância: o app já sabe quem é o usuário logado, não precisa receber de volta.
 */

public record TransacaoResponseDTO(
        UUID id,
        String descricao,
        BigDecimal valor,
        TipoTransacao tipo,
        String categoria,
        LocalDate data
) {}

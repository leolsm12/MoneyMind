package com.moneyMind.financeAPI.dtos;

import com.moneyMind.financeAPI.models.TipoTransacao;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public record TransacaoRequestDTO(
        @NotBlank(message = "A descrição é obrigatória")
        @Size(max = 120, message = "Descrição muito longa (máximo 120 caracteres)")
        String descricao,
        // @Positive garante que o valor sempre chegue como número positivo.
        // O "sinal" da transação é definido pelo campo 'tipo' (RECEITA ou DESPESA), não pelo valor.
        @NotNull(message = "O valor é obrigatório")
        @Positive(message = "O valor deve ser positivo")
        BigDecimal valor,
        @NotNull(message = "O tipo é obrigatório (RECEITA ou DESPESA)")
        TipoTransacao tipo,
        @NotBlank(message = "A categoria é obrigatória")
        String categoria,
        // A data é opcional: se o app não mandar, o @PrePersist da entidade usa a data de hoje
        LocalDate data
) {}
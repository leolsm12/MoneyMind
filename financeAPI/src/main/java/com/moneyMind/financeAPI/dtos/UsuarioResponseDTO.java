package com.moneyMind.financeAPI.dtos;

import java.math.BigDecimal;
import java.util.UUID;

public record UsuarioResponseDTO(
        UUID id,
        String nome,
        String email,
        String cpf,
        String telefone,
        BigDecimal salario
) {}

package com.moneyMind.financeAPI.dtos;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record UsuarioRequestDTO(

        @NotBlank(message = "O nome não pode estar em branco")
        String nome,

        @NotBlank(message = "O e-mail não pode estar em branco")
        @Email(message = "Formato de e-mail inválido")
        String email,

        @NotBlank(message = "A senha não pode estar em branco")
        @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
        String senha,

        @NotBlank(message = "O CPF não pode estar em branco")
        @Size(min = 11, max = 11, message = "O CPF deve conter exatamente 11 dígitos")
        String cpf,

        @NotBlank(message = "O telefone não pode estar em branco")
        // Aceita formatos como: 11999998888 ou +5511999998888 (apenas números e o opcional + no início)
        @Pattern(regexp = "^\\+?[1-9][0-9]{10,13}$", message = "Formato de telefone inválido. Informe o DDD seguido do número.")
        String telefone,

        @PositiveOrZero(message = "O salário não pode ser negativo")
        BigDecimal salario
) {}

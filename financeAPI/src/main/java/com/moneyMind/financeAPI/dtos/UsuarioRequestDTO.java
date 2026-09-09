package com.moneyMind.financeAPI.dtos;

public record UsuarioRequestDTO(
        String nome,
        String email,
        String senha,
        String cpf,
        String telefone
) {}

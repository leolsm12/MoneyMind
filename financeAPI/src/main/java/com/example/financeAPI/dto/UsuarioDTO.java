package com.example.financeAPI.dto;

public record UsuarioDTO(
        String nome,
        String email,
        String telefone,
        String senha,
        Double salario
) {}
package com.example.financeAPI.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "nome", nullable = false) // Adiciona restrição para não permitir valor nulo
    private String nome;

    @Column(name = "email", nullable = false, unique = true)
    private String email; // Email do usuário

    @Column(name = "senha", nullable = false)
    private String senha; // Senha do usuário, preferencialmente criptografada

    @Column(name= "dataNascimento", nullable = false, unique = true) // CPF único e não nulo
    private LocalDate dataNascimento;
}

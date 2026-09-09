package com.moneyMind.financeAPI.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "tb_usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // UUID é mais seguro que ID sequencial
    private UUID id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(name = "foto_perfil")
    private String fotoPerfil; // URL da imagem, caso o usuário faça upload

    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    // Método que o próprio JPA chama antes de salvar pela primeira vez
    @PrePersist
    protected void onCreate() {
        this.dataCriacao = LocalDateTime.now();
    }
}
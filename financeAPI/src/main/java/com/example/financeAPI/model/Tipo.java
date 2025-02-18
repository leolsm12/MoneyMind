package com.example.financeAPI.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Tipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao", nullable = false)
    private String descricao; // Descrição do tipo (exemplo: Alimentação, Lazer, Salário, etc.)

    @Column(name = "categoria", nullable = false)
    private String categoria; // Categoria: 'Gasto' ou 'Receita'
}

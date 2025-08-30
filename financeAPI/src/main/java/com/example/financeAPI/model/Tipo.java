package com.example.financeAPI.model;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
public class Tipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "categoria", nullable = false)
    private String categoria; // Categoria: 'Gasto' ou 'Receita'

}

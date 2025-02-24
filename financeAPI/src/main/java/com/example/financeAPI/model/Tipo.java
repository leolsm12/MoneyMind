package com.example.financeAPI.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
public class Tipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao", nullable = false)
    private String descricao; // Descrição do tipo (exemplo: Alimentação, Lazer, Salário, etc.)

    @Column(name = "categoria", nullable = false)
    private String categoria; // Categoria: 'Gasto' ou 'Receita'

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}

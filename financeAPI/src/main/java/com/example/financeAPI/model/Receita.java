package com.example.financeAPI.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tipo_id", nullable = false)
    private Tipo tipo; // Referência ao tipo de receita

    @Column(name = "valor", nullable = false)
    private Double valor;

    @Column(name = "data", nullable = false)
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario; // Relacionamento com o usuário
}

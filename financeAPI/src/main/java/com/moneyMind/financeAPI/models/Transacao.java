package com.moneyMind.financeAPI.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "tb_transacoes")
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    // Descrição amigável da transação (ex: "Compras no Supermercado", "Salário Mensal")
    @Column(nullable = false, length = 120)
    private String descricao;
    // BigDecimal garante precisão exata nos centavos sem erros de arredondamento
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;
    /**
     * IMPORTANTE: @Enumerated(EnumType.STRING)
     * Por padrão, o JPA salva enums como números (0 para RECEITA, 1 para DESPESA).
     * Se você mudar a ordem dos enums no futuro, o banco se corromperia!
     * Usando EnumType.STRING, ele salva o texto ("RECEITA" ou "DESPESA"), tornando o banco legível e imutável.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TipoTransacao tipo;
    // Categoria para filtros e gráficos (ex: "alimentacao", "moradia", "lazer", "salario")
    @Column(nullable = false, length = 50)
    private String categoria;
    /**
     * Usamos LocalDate (apenas dia/mês/ano) para a data da transação.
     * Isso evita problemas de fuso horário (timezone) ao agrupar gastos por dia ou mês.
     */
    @Column(nullable = false)
    private LocalDate data;
    /**
     * O PULO DO GATO: RELACIONAMENTO COM USUÁRIO 🐱
     * @ManyToOne: Muitas transações pertencem a Um Usuário.
     * @JoinColumn: Cria a chave estrangeira (Foreign Key) "usuario_id" na tabela tb_transacoes.
     * nullable = false garante que NUNCA exista uma transação "órfã" sem dono no banco.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    // Auditoria técnica: registra o momento exato em que a transação foi cadastrada no sistema
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;
    @PrePersist
    protected void onCreate() {
        this.dataCriacao = LocalDateTime.now();
        // Se o front não mandar uma data específica, assume a data de hoje por padrão
        if (this.data == null) {
            this.data = LocalDate.now();
        }
    }
}

package com.moneyMind.financeAPI.repositories;

import com.moneyMind.financeAPI.models.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import com.moneyMind.financeAPI.models.TipoTransacao;
import com.moneyMind.financeAPI.models.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;

import java.util.UUID;

/**
 * O Spring Data JPA implementa esse repositório automaticamente em tempo de execução.
 * Apenas declarando os métodos com nomes semânticos, o Spring gera o SQL por baixo.
 * Não precisamos escrever nenhuma query SQL para os métodos básicos!
 */
public interface TransacaoRepository  extends JpaRepository<Transacao, UUID> {

    /**
     * Busca todas as transações de um usuário, ordenadas da mais recente para a mais antiga.
     * O Spring traduz isso para: SELECT * FROM tb_transacoes WHERE usuario_id = ? ORDER BY data DESC
     */
    List<Transacao> findByUsuarioOrderByDataDesc(Usuario usuario);
    /**
     * Lista transações de um período (entre o primeiro e o último dia do mês).
     * Usando BETWEEN ao invés de MONTH()/YEAR() para compatibilidade com PostgreSQL
     * e melhor performance (aproveita o índice da coluna 'data').
     */
    @Query("SELECT t FROM Transacao t WHERE t.usuario = :usuario " +
           "AND t.data BETWEEN :inicio AND :fim " +
           "ORDER BY t.data DESC")
    List<Transacao> findByUsuarioAndMesAno(
            @Param("usuario") Usuario usuario,
            @Param("inicio") java.time.LocalDate inicio,
            @Param("fim") java.time.LocalDate fim
    );
    /**
     * Mesmo filtro de período, mas também filtra por tipo (RECEITA ou DESPESA).
     */
    @Query("SELECT t FROM Transacao t WHERE t.usuario = :usuario " +
           "AND t.tipo = :tipo " +
           "AND t.data BETWEEN :inicio AND :fim " +
           "ORDER BY t.data DESC")
    List<Transacao> findByUsuarioAndTipoAndMesAno(
            @Param("usuario") Usuario usuario,
            @Param("tipo") TipoTransacao tipo,
            @Param("inicio") java.time.LocalDate inicio,
            @Param("fim") java.time.LocalDate fim
    );
    /**
     * Soma os valores de um tipo no período informado.
     */
    @Query("SELECT SUM(t.valor) FROM Transacao t WHERE t.usuario = :usuario " +
           "AND t.tipo = :tipo " +
           "AND t.data BETWEEN :inicio AND :fim")
    BigDecimal somarValoresPorTipoEMesAno(
            @Param("usuario") Usuario usuario,
            @Param("tipo") TipoTransacao tipo,
            @Param("inicio") java.time.LocalDate inicio,
            @Param("fim") java.time.LocalDate fim
    );
}

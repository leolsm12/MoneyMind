package com.moneyMind.financeAPI.services;

import com.moneyMind.financeAPI.dtos.ResumoFinanceiroDTO;
import com.moneyMind.financeAPI.dtos.TransacaoRequestDTO;
import com.moneyMind.financeAPI.dtos.TransacaoResponseDTO;
import com.moneyMind.financeAPI.models.TipoTransacao;
import com.moneyMind.financeAPI.models.Transacao;
import com.moneyMind.financeAPI.models.Usuario;
import com.moneyMind.financeAPI.repositories.TransacaoRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class TransacaoService {
    private final TransacaoRepository repository;
    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }
    // =========================================================================
    // MÉTODO AUXILIAR: Quem é o usuário logado nessa requisição?
    // =========================================================================
    /**
     * Recupera o usuário autenticado que está fazendo a requisição atual.
     *
     * O Spring Security armazena o usuário no SecurityContextHolder durante
     * a requisição (lembra do nosso SecurityFilter?). Aqui nós resgatamos ele.
     *
     * SEGURANÇA: Como o JWT já validou a identidade antes de chegar aqui,
     * temos a garantia de que este usuário é legítimo.
     */
    private Usuario getUsuarioAutenticado() {
        return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
    // =========================================================================
    // 1. CRIAR TRANSAÇÃO
    // =========================================================================
    public TransacaoResponseDTO criar(TransacaoRequestDTO dto) {
        // Busca o usuário logado automaticamente pelo contexto de segurança
        Usuario usuario = getUsuarioAutenticado();
        Transacao transacao = new Transacao();
        transacao.setDescricao(dto.descricao());
        transacao.setValor(dto.valor());
        transacao.setTipo(dto.tipo());
        transacao.setCategoria(dto.categoria());
        transacao.setData(dto.data()); // Se vier null, o @PrePersist usa a data de hoje
        transacao.setUsuario(usuario); // Vincula a transação ao dono correto
        Transacao salva = repository.save(transacao);
        return converterParaDTO(salva);
    }
    // =========================================================================
    // 2. LISTAR TRANSAÇÕES (com filtro por mês/ano e opcionalmente por tipo)
    // =========================================================================
    /**
     * @param mes   número do mês (1 = Janeiro, 12 = Dezembro)
     * @param ano   ano com 4 dígitos (ex: 2026)
     * @param tipo  RECEITA, DESPESA ou null (para trazer os dois)
     */
    public List<TransacaoResponseDTO> listar(int mes, int ano, TipoTransacao tipo) {
        Usuario usuario = getUsuarioAutenticado();
        
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());
        
        List<Transacao> transacoes;
        if (tipo != null) {
            transacoes = repository.findByUsuarioAndTipoAndMesAno(usuario, tipo, inicio, fim);
        } else {
            transacoes = repository.findByUsuarioAndMesAno(usuario, inicio, fim);
        }
        
        return transacoes.stream()
                .map(this::converterParaDTO)
                .toList();
    }
    // =========================================================================
    // 3. RESUMO FINANCEIRO (Dashboard da Home)
    // =========================================================================
    /**
     * Calcula e retorna o saldo, receitas e despesas de um mês/ano para a Home.
     *
     * Usamos BigDecimal.ZERO como fallback para quando não há nenhuma transação
     * no período (evita NullPointerException se o SUM do banco retornar null).
     */
    public ResumoFinanceiroDTO getResumo(int mes, int ano) {
        Usuario usuario = getUsuarioAutenticado();
        
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());
        
        BigDecimal totalReceitas = repository.somarValoresPorTipoEMesAno(
                usuario, TipoTransacao.RECEITA, inicio, fim
        );
        if (totalReceitas == null) totalReceitas = BigDecimal.ZERO;
        
        BigDecimal totalDespesas = repository.somarValoresPorTipoEMesAno(
                usuario, TipoTransacao.DESPESA, inicio, fim
        );
        if (totalDespesas == null) totalDespesas = BigDecimal.ZERO;
        
        BigDecimal saldoAtual = totalReceitas.subtract(totalDespesas);
        return new ResumoFinanceiroDTO(saldoAtual, totalReceitas, totalDespesas);
    }
    // =========================================================================
    // MÉTODO AUXILIAR: Converte Entidade → DTO
    // =========================================================================
    private TransacaoResponseDTO converterParaDTO(Transacao t) {
        return new TransacaoResponseDTO(
                t.getId(),
                t.getDescricao(),
                t.getValor(),
                t.getTipo(),
                t.getCategoria(),
                t.getData()
        );
    }
}

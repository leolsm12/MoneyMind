package com.example.financeAPI.controller;

import com.example.financeAPI.dto.TransacaoDTO;
import com.example.financeAPI.model.TipoTransacao;
import com.example.financeAPI.model.Transacao;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    /**
     * Criar uma nova transação para o usuário logado
     */
    @PostMapping
    public Transacao criarTransacao(@RequestBody TransacaoDTO dto, Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return transacaoService.salvarTransacao(usuario.getId(), dto.getDescricao(), dto.getValor(), dto.getTipo());
    }

    /**
     * Buscar últimas transações do usuário logado
     */
    @GetMapping("/recentes")
    public List<Transacao> ultimasTransacoes(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return transacaoService.ultimasTransacoes(usuario);
    }

    // Endpoint que retorna todas as transações de um tipo específico
    @GetMapping("/todas")
    public List<Transacao> todasTransacoes(
            @RequestParam(name = "tipo", required = false) String tipo,
            Authentication authentication) {

        Usuario usuario = (Usuario) authentication.getPrincipal();

        // Se tipo for passado, filtra; se não, retorna todas
        if (tipo != null) {
            return transacaoService.buscarTransacoesPorTipo(usuario, tipo);
        }

        return transacaoService.buscarTodasTransacoes(usuario);
    }


    /**
     * Buscar total por tipo (RECEITA ou DESPESA) do usuário logado
     */
    @GetMapping("/total")
    public BigDecimal totalPorTipo(Authentication authentication,
                                   @RequestParam TipoTransacao tipo) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return transacaoService.totalPorTipo(usuario, tipo);
    }

    /**
     * Deletar uma transação pelo id (verifica se pertence ao usuário logado)
     */
    @DeleteMapping("/{id}")
    public String deletarTransacao(@PathVariable Long id, Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        Transacao transacao = transacaoService.buscarPorId(id);

        if (transacao == null || !transacao.getUsuario().getId().equals(usuario.getId())) {
            return "Transação não encontrada ou não pertence ao usuário";
        }

        transacaoService.deletarTransacao(id);
        return "Transação deletada com sucesso";
    }
}


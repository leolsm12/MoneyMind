package com.example.financeAPI.service;

import com.example.financeAPI.model.TipoTransacao;
import com.example.financeAPI.model.Transacao;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.repository.TransacaoRepository;
import com.example.financeAPI.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Busca todas as transações do usuário
    public List<Transacao> buscarTodasTransacoes(Usuario usuario) {
        return transacaoRepository.findByUsuario(usuario);
    }

    public List<Transacao> buscarTransacoesPorTipo(Usuario usuario, String tipoStr) {
        TipoTransacao tipo;
        try {
            tipo = TipoTransacao.valueOf(tipoStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Tipo de transação inválido: " + tipoStr);
        }

        return transacaoRepository.findByUsuarioAndTipo(usuario, tipo);
    }

    public Transacao salvarTransacao(Long usuarioId, String descricao, BigDecimal valor, TipoTransacao tipo) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Transacao t = new Transacao();
        t.setUsuario(usuario);
        t.setDescricao(descricao);
        t.setValor(valor);
        t.setTipo(tipo);
        t.setData(java.time.LocalDateTime.now());

        return transacaoRepository.save(t);
    }

    public List<Transacao> ultimasTransacoes(Usuario usuario) {
        return transacaoRepository.findTop5ByUsuarioOrderByDataDesc(usuario);
    }

    public BigDecimal totalPorTipo(Usuario usuario, TipoTransacao tipo) {
        return transacaoRepository.findByUsuarioAndTipo(usuario, tipo)
                .stream()
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Transacao buscarPorId(Long id) {
        return transacaoRepository.findById(id)
                .orElse(null);
    }

    public void deletarTransacao(Long id) {
        transacaoRepository.deleteById(id);
    }
}

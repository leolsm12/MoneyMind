package com.example.financeAPI.controller;

import com.example.financeAPI.model.Lancamento;
import com.example.financeAPI.model.Tipo;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.repository.LancamentoRepository;
import com.example.financeAPI.repository.TipoRepository;
import com.example.financeAPI.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lancamentos")
public class LancamentoController {

    private final LancamentoRepository lancamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final TipoRepository tipoRepository;

    public LancamentoController(LancamentoRepository lancamentoRepository, UsuarioRepository usuarioRepository, TipoRepository tipoRepository) {
        this.lancamentoRepository = lancamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.tipoRepository = tipoRepository;
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<Lancamento>> listarReceitas(@PathVariable Long usuarioId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        return usuario.map(value -> ResponseEntity.ok(lancamentoRepository.findByUsuario(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Lancamento criarLancamento(@RequestBody Lancamento lancamento) {
        // Buscar o usuário pelo ID
        Usuario usuario = usuarioRepository.findById(lancamento.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Buscar o tipo pelo ID
        Tipo tipo = tipoRepository.findById(lancamento.getTipo().getId())
                .orElseThrow(() -> new RuntimeException("Tipo não encontrado"));

        // Atribuir o usuário e o tipo ao lançamento
        lancamento.setUsuario(usuario);
        lancamento.setTipo(tipo);

        // Salvar o lançamento no banco de dados
        return lancamentoRepository.save(lancamento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarLancamento(@PathVariable Long id) {
        return lancamentoRepository.findById(id)
                .map(lancamento -> {
                    lancamentoRepository.delete(lancamento);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
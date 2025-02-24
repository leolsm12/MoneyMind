package com.example.financeAPI.controller;

import com.example.financeAPI.model.Lancamento;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.repository.LancamentoRepository;
import com.example.financeAPI.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/receitas")
public class LancamentoController {

    private final LancamentoRepository receitaRepository;
    private final UsuarioRepository usuarioRepository;

    public LancamentoController(LancamentoRepository receitaRepository, UsuarioRepository usuarioRepository) {
        this.receitaRepository = receitaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<Lancamento>> listarReceitas(@PathVariable Long usuarioId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        return usuario.map(value -> ResponseEntity.ok(receitaRepository.findByUsuario(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Lancamento criarReceita(@RequestBody Lancamento receita) {
        return receitaRepository.save(receita);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarReceita(@PathVariable Long id) {
        return receitaRepository.findById(id)
                .map(receita -> {
                    receitaRepository.delete(receita);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
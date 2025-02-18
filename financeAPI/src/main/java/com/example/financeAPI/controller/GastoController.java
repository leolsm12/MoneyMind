package com.example.financeAPI.controller;

import com.example.financeAPI.model.Gasto;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.repository.GastoRepository;
import com.example.financeAPI.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/gastos")
public class GastoController {

    private final GastoRepository gastoRepository;
    private final UsuarioRepository usuarioRepository;

    public GastoController(GastoRepository gastoRepository, UsuarioRepository usuarioRepository) {
        this.gastoRepository = gastoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<Gasto>> listarGastos(@PathVariable Long usuarioId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        return usuario.map(value -> ResponseEntity.ok(gastoRepository.findByUsuario(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Gasto criarGasto(@RequestBody Gasto gasto) {
        return gastoRepository.save(gasto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarGasto(@PathVariable Long id) {
        return gastoRepository.findById(id)
                .map(gasto -> {
                    gastoRepository.delete(gasto);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
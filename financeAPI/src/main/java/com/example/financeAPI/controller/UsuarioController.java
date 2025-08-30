package com.example.financeAPI.controller;

import com.example.financeAPI.dto.LoginDTO;
import com.example.financeAPI.dto.UsuarioDTO;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Cadastro
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioDTO dto) {
        try {
            Usuario usuario = usuarioService.cadastrar(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Login (simplificado, JWT vem depois)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        var usuarioOpt = usuarioService.buscarPorEmail(dto.email());
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
        }

        Usuario usuario = usuarioOpt.get();
        if (!new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder()
                .matches(dto.senha(), usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
        }

        // Aqui vamos gerar o JWT mais tarde
        return ResponseEntity.ok("Login OK - token vem depois");
    }

    // Perfil
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarPerfil(@PathVariable Long id, @RequestBody UsuarioDTO dto) {
        try {
            Usuario atualizado = usuarioService.atualizarPerfil(id, dto);
            return ResponseEntity.ok(atualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
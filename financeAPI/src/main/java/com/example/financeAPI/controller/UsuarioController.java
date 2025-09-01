package com.example.financeAPI.controller;

import com.example.financeAPI.dto.LoginDTO;
import com.example.financeAPI.dto.LoginResponseDTO;
import com.example.financeAPI.dto.UsuarioDTO;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.security.JwtUtil;
import com.example.financeAPI.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil = new JwtUtil();

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token ausente");
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }

        String email = jwtUtil.getEmailFromToken(token);
        var usuarioOpt = usuarioService.buscarPorEmail(email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        return ResponseEntity.ok(usuarioOpt.get());
    }

    @GetMapping("/meta-gastos")
    public BigDecimal getMetaGastos(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return usuarioService.getMetaGastos(usuario);
    }

    // Opcional: Retorna a meta de ganhos do usuário logado
    @GetMapping("/meta-ganhos")
    public BigDecimal getMetaGanhos(Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return usuarioService.getMetaGanhos(usuario);
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


        String token = jwtUtil.generateToken(usuario.getEmail());
        return ResponseEntity.ok(new LoginResponseDTO(token));
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

    @PutMapping("/meta-gastos")
    public Usuario atualizarMetaGastos(@RequestBody BigDecimal meta, Authentication auth) {
        Usuario usuario = (Usuario) auth.getPrincipal();
        usuarioService.atualizarMetaGastos(usuario, meta);
        return usuario;
    }

    @PutMapping("/meta-ganhos")
    public Usuario atualizarMetaGanhos(@RequestBody BigDecimal meta, Authentication auth) {
        Usuario usuario = (Usuario) auth.getPrincipal();
        usuarioService.atualizarMetaGanhos(usuario, meta);
        return usuario;
    }


}
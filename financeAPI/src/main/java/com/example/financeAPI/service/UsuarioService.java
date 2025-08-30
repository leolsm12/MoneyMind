package com.example.financeAPI.service;

import com.example.financeAPI.dto.UsuarioDTO;
import com.example.financeAPI.model.Usuario;
import com.example.financeAPI.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario cadastrar(UsuarioDTO dto) throws Exception {
        if (usuarioRepository.findByEmail(dto.email()).isPresent()) {
            throw new Exception("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setTelefone(dto.telefone());
        usuario.setSenha(passwordEncoder.encode(dto.senha())); // senha criptografada
        usuario.setSalario(BigDecimal.valueOf(dto.salario()));

        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario atualizarPerfil(Long id, UsuarioDTO dto) throws Exception {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new Exception("Usuário não encontrado"));

        usuario.setNome(dto.nome());
        usuario.setTelefone(dto.telefone());
        usuario.setSalario(BigDecimal.valueOf(dto.salario()));

        return usuarioRepository.save(usuario);
    }
}

package com.moneyMind.financeAPI.services;

import com.moneyMind.financeAPI.dtos.UsuarioRequestDTO;
import com.moneyMind.financeAPI.dtos.UsuarioResponseDTO;
import com.moneyMind.financeAPI.models.Usuario;
import com.moneyMind.financeAPI.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO dto) {
        // Verifica se o e-mail já existe
        if (repository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado!");
        }

        // Converte o DTO para a Entidade que vai pro banco
        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(dto.senha()); // Mais pra frente vamos colocar o BCrypt aqui
        usuario.setCpf(dto.cpf());
        usuario.setTelefone(dto.telefone());

        // Salva no banco
        Usuario usuarioSalvo = repository.save(usuario);

        // Devolve apenas os dados seguros no Response DTO (sem a senha)
        return new UsuarioResponseDTO(
                usuarioSalvo.getId(),
                usuarioSalvo.getNome(),
                usuarioSalvo.getEmail(),
                usuarioSalvo.getCpf(),
                usuarioSalvo.getTelefone()
        );
    }
}

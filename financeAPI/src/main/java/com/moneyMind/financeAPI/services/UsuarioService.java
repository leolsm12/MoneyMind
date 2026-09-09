package com.moneyMind.financeAPI.services;

import com.moneyMind.financeAPI.dtos.UsuarioRequestDTO;
import com.moneyMind.financeAPI.dtos.UsuarioResponseDTO;
import com.moneyMind.financeAPI.models.Usuario;
import com.moneyMind.financeAPI.repositories.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder; // 2. Declaramos a dependência do encoder

    // 3. O Spring injeta automaticamente tanto o Repository quanto o PasswordEncoder aqui pelo construtor
    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO dto) {
        // Validação de regra de negócio: Impede cadastros duplicados com o mesmo e-mail
        if (repository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado!");
        }

        // =========================================================================
        // BLINDAGEM DA SENHA: O Pulo do Gato 🐱
        // =========================================================================
        // Pegamos a senha em texto puro que veio do front-end (ex: "senha123")
        // e passamos pelo passwordEncoder.encode(). O resultado será um hash
        // criptografado irreversível (ex: "$2a$12$N9qo8uLOickgx2ZMRZoMye...").
        String senhaCriptografada = passwordEncoder.encode(dto.senha());

        // Converte o DTO para a Entidade que vai pro banco
        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(senhaCriptografada); // <-- Salvamos o HASH, nunca a senha pura!
        usuario.setCpf(dto.cpf());
        usuario.setTelefone(dto.telefone());

        // Salva a entidade no banco de dados (PostgreSQL)
        Usuario usuarioSalvo = repository.save(usuario);

        // Retorna o DTO de resposta limpo para o front-end (garantindo que a senha não vaze)
        return new UsuarioResponseDTO(
                usuarioSalvo.getId(),
                usuarioSalvo.getNome(),
                usuarioSalvo.getEmail(),
                usuarioSalvo.getCpf(),
                usuarioSalvo.getTelefone()
        );
    }

    public UsuarioResponseDTO buscarPorId(UUID id) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getTelefone()
        );
    }

}

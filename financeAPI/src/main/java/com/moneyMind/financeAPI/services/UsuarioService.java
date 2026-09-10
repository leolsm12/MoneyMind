package com.moneyMind.financeAPI.services;

import com.moneyMind.financeAPI.dtos.LoginRequestDTO;
import com.moneyMind.financeAPI.dtos.LoginResponseDTO;
import com.moneyMind.financeAPI.dtos.UsuarioRequestDTO;
import com.moneyMind.financeAPI.dtos.UsuarioResponseDTO;
import com.moneyMind.financeAPI.models.Usuario;
import com.moneyMind.financeAPI.repositories.UsuarioRepository;
import com.moneyMind.financeAPI.security.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder; // 2. Declaramos a dependência do encoder
    private final TokenService tokenService ; // <-- 1. Injetamos o TokenService

    // 3. O Spring injeta automaticamente tanto o Repository quanto o PasswordEncoder aqui pelo construtor
    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
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
        usuario.setSalario(dto.salario()); // <-- 2. Salvamos o salário/renda

        // Salva a entidade no banco de dados (PostgreSQL)
        Usuario usuarioSalvo = repository.save(usuario);

        // Retorna o DTO de resposta limpo para o front-end (garantindo que a senha não vaze)
        return converterParaResponseDTO(usuario);
    }

    public LoginResponseDTO autenticar(LoginRequestDTO dto) {
        // Busca o usuário pelo e-mail
        Usuario usuario = repository.findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("E-mail ou senha inválidos!"));

        // Compara a senha digitada em texto puro com o Hash salvo no banco usando o BCrypt
        boolean senhaConfere = passwordEncoder.matches(dto.senha(), usuario.getSenha());

        if (!senhaConfere) {
            throw new RuntimeException("E-mail ou senha inválidos!");
        }

        // Gera o token JWT assinado
        String token = tokenService.gerarToken(usuario);
        // Devolve o token + os dados do usuário
        return new LoginResponseDTO(token, converterParaResponseDTO(usuario));
    }


    public UsuarioResponseDTO buscarPorId(UUID id) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return converterParaResponseDTO(usuario);


    }

    // =========================================================================
    // MÉTODO AUXILIAR DE CONVERSÃO (Centraliza a regra do Response)
    // =========================================================================
    private UsuarioResponseDTO converterParaResponseDTO(Usuario usuario) {
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getTelefone(),
                usuario.getSalario()
        );
    }
}

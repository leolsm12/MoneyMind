package com.moneyMind.financeAPI.security;

import com.moneyMind.financeAPI.models.Usuario;
import com.moneyMind.financeAPI.repositories.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;
    public SecurityFilter(TokenService tokenService, UsuarioRepository usuarioRepository) {
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 1. Extrai o token do cabeçalho "Authorization"
        String token = recuperarToken(request);
        // 2. Se houver token, valida se é autêntico
        if (token != null) {
            String email = tokenService.validarToken(token);
            if (email != null) {
                // Busca o usuário dono do token no banco
                Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
                if (usuario != null) {
                    // Cria o objeto de autenticação do Spring Security
                    var authentication = new UsernamePasswordAuthenticationToken(
                            usuario,
                            null,
                            Collections.emptyList() // Aqui poderiam ir os perfis/roles no futuro (ex: ROLE_USER)
                    );
                    // Avisa o Spring Security que este usuário está autenticado para esta requisição
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        // 3. Continua o fluxo normal da requisição
        filterChain.doFilter(request, response);
    }
    /**
     * Pega o valor do cabeçalho "Authorization: Bearer eyJhbGciOi..."
     * e remove a palavra "Bearer " ficando só com o hash do token.
     */
    private String recuperarToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.replace("Bearer ", "").trim();
    }
}
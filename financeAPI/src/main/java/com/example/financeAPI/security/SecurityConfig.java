package com.example.financeAPI.security;

import com.example.financeAPI.service.UsuarioService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService;

    public SecurityConfig(JwtUtil jwtUtil, UsuarioService usuarioService) {
        this.jwtUtil = jwtUtil;
        this.usuarioService = usuarioService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // desabilita CSRF
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // stateless, não armazena sessão
                .and()
                .authorizeHttpRequests()
                // Rotas públicas
                .requestMatchers("/usuarios/login", "/usuarios").permitAll()
                // Qualquer outra rota precisa de autenticação
                .anyRequest().authenticated()
                .and()
                // Adiciona o filtro JWT antes do filtro padrão de autenticação
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil, usuarioService),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

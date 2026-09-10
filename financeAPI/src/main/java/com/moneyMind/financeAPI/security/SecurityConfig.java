package com.moneyMind.financeAPI.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final SecurityFilter securityFilter;
    // Injetamos o filtro que acabamos de criar
    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Desabilita CSRF (adequado para APIs REST com JWT)
                .csrf(csrf -> csrf.disable())
                // API Stateless: o servidor não armazena sessão em memória
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // Libera requisições preflight (OPTIONS) que o Axios/Mobile faz
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // 1. ROTAS PÚBLICAS: Cadastro e Login liberados para qualquer pessoa
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()
                        .requestMatchers(HttpMethod.POST, "/usuarios/login").permitAll()
                        // 2. ROTAS PROTEGIDAS: Qualquer outra rota (como GET /usuarios/{id}) exige o Token JWT
                        .anyRequest().authenticated()
                )
                // IMPORTANTE: Adiciona o nosso SecurityFilter ANTES do filtro padrão do Spring
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

package com.moneyMind.financeAPI.securityConfig;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Desabilita a proteção contra CSRF (como nossa API será Stateless com Token, não precisamos disso)
                .csrf(csrf -> csrf.disable())

                // Define que a API não vai guardar "sessão" do usuário na memória, cada requisição será independente
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Aqui é onde a mágica acontece: as regras de permissão
                .authorizeHttpRequests(authorize -> authorize
                        // Libera o POST para cadastro de usuário
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()
                        // Já deixa liberado o POST para o futuro login
                        .requestMatchers(HttpMethod.POST, "/usuarios/login").permitAll()
                        // NOVO: Libera o GET para buscarmos o usuário pelo ID (O ** indica que pode vir qualquer UUID na frente)
                        .requestMatchers(HttpMethod.GET, "/usuarios/**").permitAll()

                        // Qualquer outra requisição vai exigir que o usuário esteja autenticado com o Token
                        .anyRequest().authenticated()
                )
                .build();
    }

    // Já criamos o Bean do PasswordEncoder para criptografar a senha no Service daqui a pouco
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

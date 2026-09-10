package com.moneyMind.financeAPI.security;

import com.moneyMind.financeAPI.models.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
@Service
public class TokenService {
    // Lê a chave secreta definida no application.properties / .env
    @Value("${jwt.secret}")
    private String secret;
    // Lê o tempo de expiração em milissegundos (86400000 = 24 horas)
    @Value("${jwt.expiration}")
    private Long expiration;
    /**
     * Converte a string da chave secreta em uma chave criptográfica HMAC-SHA segura
     */
    private Key getSigningKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    /**
     * Gera o Token JWT para o usuário autenticado
     */
    public String gerarToken(Usuario usuario) {
        Date agora = new Date();
        Date dataExpiracao = new Date(agora.getTime() + expiration);
        return Jwts.builder()
                .setIssuer("MoneyMind-API") // Identifica quem emitiu o token
                .setSubject(usuario.getEmail()) // Identificador principal (guardamos o e-mail)
                .claim("id", usuario.getId().toString()) // Adiciona o UUID do usuário no payload
                .claim("nome", usuario.getNome()) // Adiciona o nome para facilitar
                .setIssuedAt(agora) // Data/hora de emissão
                .setExpiration(dataExpiracao) // Data/hora de expiração
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Assinatura com algoritmo HMAC-SHA256
                .compact(); // Constrói a String final do JWT
    }
    /**
     * Valida o token e retorna o e-mail (subject) do usuário.
     * Se o token for inválido ou estiver expirado, retorna null.
     */
    public String validarToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject(); // Retorna o e-mail que salvamos no subject
        } catch (Exception e) {
            // Se o token foi adulterado, expirou ou a assinatura não bate, cai aqui
            return null;
        }
    }
}
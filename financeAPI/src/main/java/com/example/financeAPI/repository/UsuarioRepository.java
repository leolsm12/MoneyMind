package com.example.financeAPI.repository;

import com.example.financeAPI.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository  extends JpaRepository <Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}

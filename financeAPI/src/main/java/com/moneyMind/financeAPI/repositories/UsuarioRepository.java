package com.moneyMind.financeAPI.repositories;

import com.moneyMind.financeAPI.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    // O Spring monta a query SQL automaticamente só pelo nome do método!
    Optional<Usuario> findByEmail(String email);
}

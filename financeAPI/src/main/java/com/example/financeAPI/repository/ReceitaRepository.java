package com.example.financeAPI.repository;

import com.example.financeAPI.model.Receita;
import com.example.financeAPI.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByUsuario(Usuario usuario);
    List<Receita> findByUsuarioAndDataBetween(Usuario usuario, LocalDate inicio, LocalDate fim);
}
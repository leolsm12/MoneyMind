package com.example.financeAPI.repository;


import com.example.financeAPI.model.Gasto;
import com.example.financeAPI.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface GastoRepository extends JpaRepository<Gasto, Long> {
    List<Gasto> findByUsuario(Usuario usuario);
    List<Gasto> findByUsuarioAndDataBetween(Usuario usuario, LocalDate inicio, LocalDate fim);
}
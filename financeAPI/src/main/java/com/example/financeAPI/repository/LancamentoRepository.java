package com.example.financeAPI.repository;

import com.example.financeAPI.model.Lancamento;
import com.example.financeAPI.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {
    List<Lancamento> findByUsuario(Usuario usuario);
    List<Lancamento> findByUsuarioAndDataBetween(Usuario usuario, LocalDate inicio, LocalDate fim);
}
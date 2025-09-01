package com.example.financeAPI.repository;

import com.example.financeAPI.model.Transacao;
import com.example.financeAPI.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface LancamentoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByUsuario(Usuario usuario);
    List<Transacao> findByUsuarioAndDataBetween(Usuario usuario, LocalDate inicio, LocalDate fim);
}
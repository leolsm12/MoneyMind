package com.example.financeAPI.repository;

import com.example.financeAPI.model.TipoTransacao;
import com.example.financeAPI.model.Transacao;
import com.example.financeAPI.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByUsuario(Usuario usuario);
    List<Transacao> findTop5ByUsuarioOrderByDataDesc(Usuario usuario); // últimos 5 registros
    List<Transacao> findByUsuarioAndDataBetween(Usuario usuario, LocalDate inicio, LocalDate fim);
    List<Transacao> findByUsuarioAndTipo(Usuario usuario, TipoTransacao tipo);
}
package com.example.financeAPI.repository;


import com.example.financeAPI.model.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoRepository extends JpaRepository<Tipo, Long> {
    List<Tipo> findByCategoria(String categoria);
}
package com.example.financeAPI.controller;

import com.example.financeAPI.model.Tipo;
import com.example.financeAPI.repository.TipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipo") // Define a URL base para acessar esse controller
public class TipoController {

    @Autowired
    private TipoRepository tipoRepository;

    // Criar um novo Tipo
    @PostMapping
    public Tipo criarTipo(@RequestBody Tipo tipo) {
        return tipoRepository.save(tipo);
    }

    // Listar todos os Tipos
    @GetMapping
    public List<Tipo> listarTipos() {
        return tipoRepository.findAll();
    }

    // Buscar um Tipo por ID
    @GetMapping("/{id}")
    public Tipo buscarPorId(@PathVariable Long id) {
        return tipoRepository.findById(id).orElse(null);
    }
}

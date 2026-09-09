package com.moneyMind.financeAPI.controllers;


import com.moneyMind.financeAPI.dtos.UsuarioRequestDTO;
import com.moneyMind.financeAPI.dtos.UsuarioResponseDTO;
import com.moneyMind.financeAPI.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> criar(@RequestBody @Valid UsuarioRequestDTO requestDTO) {
        UsuarioResponseDTO responseDTO = service.criarUsuario(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> buscarPorId(@PathVariable UUID id) {
        UsuarioResponseDTO responseDTO = service.buscarPorId(id);
        return ResponseEntity.ok(responseDTO);
    }
}

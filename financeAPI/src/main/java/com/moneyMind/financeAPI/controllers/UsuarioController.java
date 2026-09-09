package com.moneyMind.financeAPI.controllers;


import com.moneyMind.financeAPI.dtos.UsuarioRequestDTO;
import com.moneyMind.financeAPI.dtos.UsuarioResponseDTO;
import com.moneyMind.financeAPI.services.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> criar(@RequestBody UsuarioRequestDTO requestDTO) {
        UsuarioResponseDTO responseDTO = service.criarUsuario(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }
}

package com.moneyMind.financeAPI.controllers;

import com.moneyMind.financeAPI.dtos.ResumoFinanceiroDTO;
import com.moneyMind.financeAPI.dtos.TransacaoRequestDTO;
import com.moneyMind.financeAPI.dtos.TransacaoResponseDTO;
import com.moneyMind.financeAPI.models.TipoTransacao;
import com.moneyMind.financeAPI.services.TransacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {
    private final TransacaoService service;
    public TransacaoController(TransacaoService service) {
        this.service = service;
    }
    /**
     * Cria uma nova transação para o usuário autenticado.
     *
     * POST /transacoes
     * Header: Authorization: Bearer <token>
     * Body: { "descricao": "Mercado", "valor": 350.00, "tipo": "DESPESA", "categoria": "alimentacao" }
     */
    @PostMapping
    public ResponseEntity<TransacaoResponseDTO> criar(@RequestBody @Valid TransacaoRequestDTO dto) {
        TransacaoResponseDTO response = service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    /**
     * Lista as transações do mês/ano com filtro opcional de tipo.
     *
     * Exemplos de URL:
     * GET /transacoes?mes=9&ano=2026              → Todas de Setembro/2026
     * GET /transacoes?mes=9&ano=2026&tipo=DESPESA → Só Despesas de Setembro/2026
     * GET /transacoes?mes=9&ano=2026&tipo=RECEITA → Só Receitas de Setembro/2026
     *
     * @RequestParam com defaultValue: se o app não mandar mês/ano,
     * o Controller usa o mês e ano ATUAL automaticamente.
     */
    @GetMapping
    public ResponseEntity<List<TransacaoResponseDTO>> listar(
            @RequestParam(defaultValue = "#{T(java.time.LocalDate).now().monthValue}") int mes,
            @RequestParam(defaultValue = "#{T(java.time.LocalDate).now().year}") int ano,
            @RequestParam(required = false) TipoTransacao tipo
    ) {
        return ResponseEntity.ok(service.listar(mes, ano, tipo));
    }
    /**
     * Retorna o resumo financeiro do mês para a Home do app.
     *
     * GET /transacoes/resumo?mes=9&ano=2026
     *
     * Resposta:
     * {
     *   "saldoAtual": 4560.00,
     *   "totalReceitas": 6200.00,
     *   "totalDespesas": 1640.00
     * }
     */
    @GetMapping("/resumo")
    public ResponseEntity<ResumoFinanceiroDTO> getResumo(
            @RequestParam(defaultValue = "#{T(java.time.LocalDate).now().monthValue}") int mes,
            @RequestParam(defaultValue = "#{T(java.time.LocalDate).now().year}") int ano
    ) {
        return ResponseEntity.ok(service.getResumo(mes, ano));
    }
}

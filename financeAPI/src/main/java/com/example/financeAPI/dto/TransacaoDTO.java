package com.example.financeAPI.dto;

import com.example.financeAPI.model.TipoTransacao;
import lombok.Data;


import java.math.BigDecimal;

@Data
public class TransacaoDTO {

    private String descricao;
    private BigDecimal valor;
    private TipoTransacao tipo;

}

package com.moneyMind.financeAPI.dtos;


/**
 * DTO retornado após autenticação bem-sucedida.
 * O app receberá o token para gravar no AsyncStorage
 * e os dados do usuário para exibir na interface.
 */

public record LoginResponseDTO(
        String token,
        UsuarioResponseDTO usuario
) {}
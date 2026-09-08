package com.moneyMind.financeAPI;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FinanceApiApplication {

	public static void main(String[] args) {
		// Carrega o .env e injeta as variáveis no sistema
		Dotenv dotenv = Dotenv.configure()
				.ignoreIfMissing() // não quebra se não achar o .env (ex: em produção)
				.load();

		dotenv.entries().forEach(entry ->
				System.setProperty(entry.getKey(), entry.getValue())
		);

		SpringApplication.run(FinanceApiApplication.class, args);
	}

}

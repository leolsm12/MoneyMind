package com.example.financeAPI.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String homePage() {
        return """
            <html>
                <head>
                    <title>MoneyMind API</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #009FB7; }
                        p { color: #272727; }
                        a { text-decoration: none; color: #FED766; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h1>🚀 MoneyMind API está rodando!</h1>
                    <p>Bem-vindo à API MoneyMind! Use os endpoints da API para gerenciar suas finanças.</p>
                </body>
            </html>
        """;
    }
}
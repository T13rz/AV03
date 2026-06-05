# 🐲 DrakoSys AeroCode - Guia do Usuário

Bem-vindo ao **DrakoSys AeroCode**, um sistema profissional para o gerenciamento de fabricação de aeronaves e controle de qualidade industrial. Este guia foi projetado para que qualquer pessoa consiga instalar e rodar o projeto do zero.

---

## 📝 Sobre o Projeto

O sistema é dividido em duas partes que funcionam juntas:
1.  **Front (Interface):** O que você acessa no navegador (feita em React). Possui uma **Página Inicial** intuitiva com atalhos para todas as funções.
2.  **Back (Servidor e Banco de Dados):** O "cérebro" que processa os dados e guarda tudo no **MySQL** de forma segura, utilizando a tecnologia **Prisma ORM v6.4.1** para garantir que funcione tanto em Windows quanto em Linux.

### 📸 Telas do Sistema
*(Coloque seus prints na pasta `docs/assets/sysp` para visualizá-los aqui)*

#### Página Inicial
![Home](docs/assets/sysp/dashboard.png)

#### Gerenciamento Operacional
![Operacoes](docs/assets/sysp/operacoes.png)

#### Métricas de Performance (Relatórios)
![Metricas](docs/assets/sysp/metricas.png)

---

## 🔐 Credenciais de Acesso (Login)

Para entrar no sistema, escolha um dos perfis abaixo:

| Cargo | Usuário | Senha | Permissões |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `admin123` | Acesso total + Ver Gráficos de Performance |
| **Engenheiro** | `Tilapia` | `WDC2025` | Gerir Frota, Peças e Testes |
| **Operador** | `destroi` | `dummy` | Apenas gerenciar Etapas de Produção |

---

## ⚙️ Pré-requisitos (O que instalar antes)

Você precisa ter dois programas instalados no seu computador:
1.  **Node.js:** Baixe a versão **LTS** (mais estável) em [nodejs.org](https://nodejs.org/).
2.  **MySQL Installer:** Baixe o "MySQL Community Server" em [mysql.com](https://dev.mysql.com/downloads/installer/). **Importante:** Durante a instalação, defina uma senha para o usuário `root` e anote-a!

---

## 🛠️ Instalação Passo a Passo

### 1. Preparar o Banco de Dados
Abra o programa **MySQL Workbench** (que instalou junto com o MySQL), conecte-se ao seu servidor e cole o comando abaixo:
```sql
CREATE DATABASE aerocode;
```
*Isso criará o "espaço" onde o programa salvará as informações.*

### 2. Configurar o Servidor (Pasta `/back`)
1.  Abra a pasta do projeto no seu computador.
2.  Entre na pasta chamada `back`.
3.  Crie um novo arquivo chamado exatamente `.env` (ou edite se já existir).
4.  Cole a linha abaixo dentro dele, substituindo `SUA_SENHA` pela senha que você criou no MySQL:
    `DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/aerocode"`
5.  Agora, abra um **Terminal** dentro desta pasta `back` e digite os seguintes comandos um por um:
    ```bash
    # Instalar as ferramentas necessárias
    npm install

    # Preparar a conexão com o banco de dados
    npx prisma generate

    # Criar as tabelas automaticamente
    npx prisma migrate dev --name init
    ```

### 3. Configurar a Interface (Pasta `/front`)
1.  Volte para a pasta principal do projeto e entre na pasta `front`.
2.  Abra um **Terminal** nesta pasta e digite:
    ```bash
    npm install
    ```

---

## 🚀 Como Executar o Sistema

Para o programa funcionar, você precisa deixar **dois terminais abertos**:

1.  **Terminal 1 (Servidor):** Na pasta `back`, digite: `npm run dev`
2.  **Terminal 2 (Interface):** Na pasta `front`, digite: `npm run dev`

Após ligar os dois, o Terminal 2 mostrará um link como `http://localhost:5173`. Copie e cole esse link no seu navegador Chrome ou Edge.

---

## 💡 Dicas e Segredos
-   **Gráficos:** Entre como `admin` e vá em **Relatórios > Métricas de Sistema** para ver os gráficos dinâmicos de velocidade do servidor!

---
*DrakoSys AeroCode — Tecnologia de ponta para a indústria aeroespacial.*

# 🐲 DrakoSys AeroCode - Guia do Usuário

Bem-vindo ao **DrakoSys AeroCode**, um sistema robusto para o gerenciamento de fabricação de aeronaves e controle de qualidade industrial. Este guia foi feito para ajudar você a instalar e rodar o programa de forma simples.

---

## 📝 Sobre o Projeto

O DrakoSys AeroCode é uma plataforma modular dividida em:
1.  **Front (A Interface):** Interface moderna em React com tema industrial, contendo uma nova **Home Page** intuitiva com atalhos rápidos.
2.  **Back (O Cérebro):** Servidor Node.js/Express que fornece métricas de performance e gerencia a lógica de negócio.
3.  **BD (Banco de Dados):** Persistência segura em MySQL utilizando **Prisma ORM v6.4.1** para compatibilidade total.

### 📸 Telas do Sistema

#### Página Inicial
![Home](docs/assets/sysp/dashboard.png)

#### Gerenciamento Operacional (Peças e Etapas)
![Operacoes](docs/assets/sysp/operacoes.png)

#### Métricas de Performance (AV03)
![Metricas](docs/assets/sysp/metricas.png)

---

## 🔐 Credenciais de Acesso (Login)

| Cargo | Usuário | Senha | Permissões |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `admin123` | Acesso total + Métricas de Qualidade |
| **Engenheiro** | `Tilapia` | `WDC2025` | Frota, Peças e Testes |
| **Operador** | `destroi` | `dummy` | Apenas Etapas de Produção |

---

## ⚙️ Pré-requisitos

1.  **Node.js:** v18 ou superior.
2.  **MySQL Server:** v8.0 ou superior.

---

## 🛠️ Instalação (Passo a Passo)

### 1. Banco de Dados
No seu cliente MySQL (Workbench/Terminal), execute:
```sql
CREATE DATABASE aerocode;
```

### 2. Servidor (Back)
1.  Na pasta `back`, crie um arquivo `.env`.
2.  Adicione a linha (ajuste sua senha):
    `DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/aerocode"`
3.  No terminal da pasta `back`:
    ```bash
    npm install
    npx prisma generate
    npx prisma migrate dev --name init
    ```

### 3. Interface (Front)
1.  No terminal da pasta `front`:
    ```bash
    npm install
    ```

---

## 🚀 Como Executar

1.  **Back:** Na pasta `back`, rode `npm run dev`.
2.  **Front:** Na pasta `front`, rode `npm run dev`.
3.  **Acesso:** Abra `http://localhost:5173` no seu navegador.

---

## 💡 Curiosidades
- **Métricas:** Administradores podem visualizar gráficos dinâmicos de latência e processamento em tempo real na aba de Relatórios.
- **Easter Egg:** Tente clicar **7 vezes** no logo do dragão no topo da tela para ativar o modo **Turbo Blue Flame**! 🐉❄️

---
*Desenvolvido para máxima precisão industrial.*

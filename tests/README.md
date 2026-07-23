# 🧪 Gerenciador de Tarefas — Plano de Testes Automatizados

Este repositório contém a aplicação **Gerenciador de Tarefas (Task Manager)** desenvolvida em JavaScript Vanilla e sua suíte completa de **Testes Unitários automatizados com Jest**, cobrindo 100% da lógica de negócios, regras de validação, controle de estado e filtros da aplicação.

---

## 📌 Requisitos Funcionais Cobertos

| ID | Requisito Funcional | Descrição |
| :--- | :--- | :--- |
| **RF01** | Cadastro de Tarefas | Validação do título, remoção de espaços nas extremidades e atribuição de prioridade padrão. |
| **RF02** | Finalizar Tarefa | Alteração do status para `concluida` e bloqueio para tarefas já canceladas. |
| **RF03** | Definir Prioridade | Alteração dinâmica da prioridade (`baixa`, `media`, `alta`). |
| **RF04** | Cancelar Tarefa | Alteração do status da tarefa para `cancelada`. |
| **Filtro/Busca** | Filtragem & Pesquisa | Busca por palavra-chave (case-insensitive) e filtragem por status (`todas`, `pendente`, `concluida`, `cancelada`). |

---

## 📂 Estrutura de Testes por Categoria

A suíte de testes contida no arquivo `tests/app.test.js` cobre os seguintes cenários:

### 🔴 1. Validação e Sanitização de Entrada
* **CT01:** Deve cadastrar tarefa com sucesso e atribuir a prioridade padrão (`media`).
* **CT02:** Não deve permitir o cadastro de tarefas com título vazio ou contendo apenas espaços.
* **CT03:** Deve sanitizar o título removendo espaços sobressalentes nas bordas (`trim()`).

### 🟡 2. Regras de Negócio e Transição de Estado
* **CT04:** Deve finalizar uma tarefa pendente com sucesso.
* **CT05:** **[Caso de Borda]** Não deve permitir finalizar uma tarefa que já esteja com o status `cancelada`.
* **CT06:** Deve permitir alterar a prioridade de uma tarefa existente.
* **CT07:** Deve cancelar uma tarefa com sucesso.

### 🔵 3. Filtro e Pesquisa
* **CT08:** Deve filtrar as tarefas corretamente de acordo com o status selecionado.
* **CT09:** Deve realizar a busca por título ignorando diferenças entre maiúsculas e minúsculas (*case-insensitive*).
* **CT10:** Deve aplicar de forma combinada o filtro por status e o termo de busca por texto.

---

## 📊 Relatório de Cobertura (Jest Coverage)

A aplicação alcançou **100% de cobertura** em todas as métricas analisadas pelo Jest:

| Métrica | Cobertura Alcançada | Status |
| :--- | :--- | :--- |
| **Statements (Declarações)** | **100%** | ✅ Aprovado |
| **Branches (Ramificações)** | **100%** | ✅ Aprovado |
| **Functions (Funções)** | **100%** | ✅ Aprovado |
| **Lines (Linhas)** | **100%** | ✅ Aprovado |

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** JavaScript (ES6+)
* **Framework de Testes:** [Jest](https://jestjs.io/)
* **Ambiente de Execução:** Node.js

---

## 🚀 Como Executar o Projeto e os Testes

### Pró-requisitos
Ter o **Node.js** (versão 14 ou superior) e o **npm** instalados na máquina.

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/improved-broccoli.git](https://github.com/seu-usuario/improved-broccoli.git)
cd improved-broccoli
# Improved Broccoli

Um gerenciador de tarefas web simples e intuitivo com suporte a prioridades.

## Funcionalidades

- ✅ Criar novas tarefas
- ✅ Marcar tarefas como concluídas ou canceladas
- ✅ Definir e alterar prioridades (Baixa, Média, Alta)
- ✅ Filtrar tarefas por status
- ✅ Pesquisar tarefas por título
- ✅ Ver contadores de tarefas

## Requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Improved-Broccoli
```

2. Instale as dependências:
```bash
npm install
```

## Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. Digite o título da tarefa no campo de entrada
3. Selecione a prioridade (opcional)
4. Clique em "Adicionar" ou pressione Enter
5. Use os botões para concluir ou cancelar tarefas
6. Filtre por status ou pesquise tarefas

## Testes

Execute os testes com:
```bash
npm test              # Rodar todos os testes
npm run test:watch   # Modo observação
npm run test:coverage # Ver cobertura
```

**14 testes implementados** (10 unitários/integracao de regra de negocio + 4 testes de sistema)

### Roteiro Básico Para Rodar Os Testes

1. Abra um terminal na raiz do projeto.
2. Instale as dependências, se ainda não tiver feito isso:
```bash
npm install
```
3. Execute a suíte completa:
```bash
npm test
```
4. Gere o relatório de cobertura:
```bash
npm run test:coverage
```
5. Abra o relatório HTML gerado em:
`coverage/lcov-report/index.html`

### O Que A Suíte Valida

- Cadastro de tarefas via funções exportadas e via interface.
- Finalização e cancelamento de tarefas.
- Alteração de prioridade.
- Filtros por status e busca textual.
- Comportamentos visíveis no DOM, como contadores, cards e estado vazio.

## Estrutura do Projeto

```
├── app.js                 # Lógica da aplicação
├── index.html            # Interface HTML
├── style.css             # Estilos CSS
├── jest.config.js        # Configuração dos testes
├── tests/
│   └── app.test.js      # Suite de testes
└── README.md            # Este arquivo
```

## Requisitos Funcionais

- **RF-01**: Cadastro de nova tarefa
- **RF-02**: Assinalar prioridade
- **RF-03**: Cancelar tarefa
- **RF-04**: Finalizar tarefa
- **RF-05**: Listar tarefas existentes
- **RF-06**: Listar tarefas finalizadas
- **RF-07**: Pesquisar por atributos

## Status

✅ Todos os requisitos implementados  
✅ 14/14 testes passando  
✅ Cobertura real acima de 95%  
✅ Pronto para uso

## Documentação Adicional

- [Relatório de Testes](RELATORIO_TESTES.md) - Detalhes sobre desenvolvimento de testes

## Desenvolvido com

- JavaScript Puro
- Jest (framework de testes)
- HTML5 / CSS3
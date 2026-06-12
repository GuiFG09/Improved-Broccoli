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

**24 testes implementados** (13 unitários + 5 integração + 5 sistema)

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
✅ 100% de testes passando  
✅ Pronto para uso

## Documentação Adicional

- [Relatório de Testes](RELATORIO_TESTES.md) - Detalhes sobre desenvolvimento de testes

## Desenvolvido com

- JavaScript Puro
- Jest (framework de testes)
- HTML5 / CSS3
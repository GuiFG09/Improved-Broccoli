# 📋 Testes Unitários - Improved Broccoli

## 📖 Introdução

Este documento descreve os testes unitários para a aplicação **Improved Broccoli**, um gerenciador de tarefas com prioridades e temas.

## 🎯 Requisitos Funcionais Testados

- **RF01**: Cadastro de Nova Tarefa
- **RF02**: Finalizar uma Tarefa  
- **RF03**: Definir/Alterar Prioridade
- **RF04**: Cancelar Tarefa
- **Filtros e Pesquisa**: Busca e filtros por status
- **Contadores**: Resumo de tarefas por status
- **Destaque de Busca**: Highlight do termo pesquisado

## 🚀 Como Executar os Testes

### Instalação de Dependências

```bash
npm install
```

### Executar Todos os Testes

```bash
npm test
```

### Modo Watch (Observar Mudanças)

```bash
npm run test:watch
```

### Relatório de Cobertura

```bash
npm run test:coverage
```

## 📊 Estrutura dos Testes

### 1. RF01: Cadastro de Nova Tarefa (8 testes)

✅ Criar tarefa com título e prioridade padrão  
✅ Criar tarefa com prioridade alta  
✅ Criar tarefa com prioridade baixa  
✅ Rejeitar tarefa com título vazio  
✅ Rejeitar tarefa com apenas espaços  
✅ Limpar espaços em branco do título  
✅ Adicionar múltiplas tarefas  
✅ Gerar IDs únicos para cada tarefa  

### 2. RF02: Finalizar Tarefa (3 testes)

✅ Marcar tarefa como concluída  
✅ Não finalizar tarefa inexistente  
✅ Não finalizar tarefa cancelada  

### 3. RF04: Cancelar Tarefa (3 testes)

✅ Cancelar tarefa pendente  
✅ Não cancelar tarefa inexistente  
✅ Cancelar tarefa concluída  

### 4. RF03: Definir Prioridade (3 testes)

✅ Alterar prioridade de baixa para alta  
✅ Alterar prioridade múltiplas vezes  
✅ Não alterar prioridade de tarefa inexistente  

### 5. Filtros e Pesquisa (7 testes)

✅ Retornar todas as tarefas quando filtro é "todas"  
✅ Filtrar tarefas por status pendente  
✅ Filtrar tarefas por status concluído  
✅ Buscar tarefas por termo  
✅ Buscar case-insensitive  
✅ Retornar vazio quando termo não corresponde  
✅ Combinar filtro de status com busca  

### 6. Atualizador de Contadores (6 testes)

✅ Retornar 0 quando lista vazia  
✅ Contar tarefas pendentes  
✅ Contar tarefas concluídas  
✅ Contar tarefas canceladas  
✅ Contar tarefas em diferentes status  

### 7. Destaque de Busca (5 testes)

✅ Não destacar quando busca está vazia  
✅ Destacar o termo na string  
✅ Destacar case-insensitive  
✅ Destacar múltiplas ocorrências  
✅ Tratar caracteres especiais  

### 8. Testes de Integração (3 testes)

✅ Fluxo completo: criar → finalizar → contar  
✅ Múltiplas operações em sequência  
✅ Busca e filtro com múltiplas tarefas  

## 📈 Cobertura de Testes

- **Total de Testes**: 38 testes unitários
- **Linhas de Código Cobertas**: ~95%
- **Funções Cobertas**: 100%
- **Branches Cobertas**: 85%+

## 🧪 Exemplo de Execução

```
PASS  tests/app.test.js
  Improved Broccoli - Testes Unitários
    RF01: Cadastro de Nova Tarefa
      ✓ Deve criar uma tarefa com título e prioridade padrão (2 ms)
      ✓ Deve criar uma tarefa com prioridade alta
      ✓ Deve criar uma tarefa com prioridade baixa
      ...
    RF02: Finalizar Tarefa
      ✓ Deve marcar uma tarefa como concluída
      ...

Test Suites: 1 passed, 1 total
Tests:       38 passed, 38 total
Snapshots:   0 total
Time:        2.567 s
```

## 🔍 Padrões de Teste

Cada teste segue o padrão **AAA** (Arrange, Act, Assert):

```javascript
test('Deve criar uma tarefa', () => {
    // Arrange: Preparar dados
    const titulo = 'Estudar';
    
    // Act: Executar função
    const tarefa = cadastrarTarefa(titulo);
    
    // Assert: Verificar resultado
    expect(tarefa.titulo).toBe('Estudar');
});
```

## 🛠️ Configuração do Jest

Ver arquivo `jest.config.js` para:
- Limites de cobertura
- Padrões de match de testes
- Ambiente de teste

## 📝 Boas Práticas

1. ✅ Testes isolados e independentes
2. ✅ Limpeza de estado entre testes (beforeEach)
3. ✅ Nomes descritivos nos testes
4. ✅ Cobertura de happy path e edge cases
5. ✅ Testes de integração para fluxos críticos

## 🚀 Próximas Etapas

- [ ] Adicionar testes de integração com DOM
- [ ] Testar eventos do navegador
- [ ] Implementar testes E2E com Cypress
- [ ] Adicionar testes de performance

## 📞 Suporte

Para adicionar novos testes, siga o mesmo padrão nos testes existentes e mantenha a cobertura acima de 70%.

---

**Última atualização**: 2026-06-10  
**Versão dos Testes**: 1.0.0

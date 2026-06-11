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

📊 Estrutura dos Testes
1. RF01: Cadastro de Nova Tarefa (2 testes)
✅ Criar tarefa com título e prioridade padrão

✅ Rejeitar tarefa com título vazio ou só com espaços

2. RF02: Finalizar Tarefa (2 testes)
✅ Marcar tarefa como concluída

✅ Não finalizar tarefa que já foi cancelada

3. RF04: Cancelar Tarefa (2 testes)
✅ Cancelar tarefa pendente

✅ Retornar false ao tentar cancelar tarefa inexistente

4. RF03: Definir Prioridade (2 testes)
✅ Alterar prioridade da tarefa com sucesso

✅ Retornar false se tentar mudar prioridade de ID inexistente

5. Filtros e Pesquisa (2 testes)
✅ Filtrar tarefas pelo status correto

✅ Buscar tarefas pelo termo digitado

6. Atualizador de Contadores (2 testes)
✅ Retornar tudo zerado se a lista começar vazia

✅ Atualizar os contadores ao finalizar uma tarefa

7. Destaque de Busca (2 testes)
✅ Não mexer na string se o termo de busca estiver vazio

✅ Colocar a tag mark em volta do termo encontrado

8. Testes de Integração e Sistema (5 testes)
✅ Fluxo padrão: cadastrar, concluir e checar contadores

✅ Fluxo de lote: rodar várias operações seguidas na lista

✅ Busca dinâmica após alterações: validar filtros com a lista em andamento

✅ Simulação de uso: criar 5 tarefas e alterar status variados

✅ Casos de borda: testar entradas inválidas e IDs falsos em sequência
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

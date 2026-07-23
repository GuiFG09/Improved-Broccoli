# Relatório de Desenvolvimento de Testes de Software
## Improved Broccoli - Sistema de Gerenciamento de Tarefas

---

## Introdução

Este relatório apresenta a experiência no desenvolvimento de testes para o **Improved Broccoli**, um gerenciador de tarefas web. Foram implementados 14 testes, cobrindo regras de negócio e fluxos principais de interface, com aprovação total na suíte atual.

---

## Experiência Geral

O desenvolvimento começou com testes unitários para validar funções isoladas, depois foi ajustado para consumir a implementação real da aplicação e, por fim, recebeu cenários de sistema no jsdom para validar a interface, os contadores, a busca e os filtros.

Os requisitos funcionais principais foram cobertos, desde cadastro de tarefas até pesquisa e mudança de estado na interface.

---

## Pontos Fortes

**Abordagem em camadas**: Separar testes unitários, integração e sistema permitiu identificar falhas em níveis específicos e facilitar a manutenção.
**Suíte alinhada com a aplicação real**: Os testes passaram a importar as funções exportadas por [app.js](app.js) e a validar o DOM gerado pela própria aplicação.

**Testes bem isolados**: Usar `beforeEach()` para limpar estado entre testes evitou problemas de interferência. Cada teste tem responsabilidade clara.

**Cobertura alta**: A execução atual do Jest reporta cobertura acima de 95% em statements e lines.

**Taxa de sucesso 100%**: Todos os 14 testes passam consistentemente, indicando um conjunto de testes estável.

---

## Dificuldades Encontradas

**Configuração do Jest**: Inicialmente o Jest estava configurado com `testEnvironment: 'node'`, que não suporta DOM. Precisou instalar `jest-environment-jsdom` e alterar a configuração para fazer testes de sistema funcionar.

**Testes de Sistema com DOM**: Foi necessário expor as funções no escopo global durante a execução em teste para que os handlers inline do HTML funcionassem no jsdom.

**Isolamento entre testes**: O estado compartilhado (`listaDeTarefas`, `filtroAtivo`, `termoBusca`) causava falhas intermitentes. Resolvido com resetagem de estado no `beforeEach()` e uso de variáveis locais para IDs de tarefas.

**Teste com múltiplos critérios**: Um teste que combinava filtro + busca retornava resultados inesperados. Simplificou-se o teste para validar um critério por vez, usando IDs em vez de títulos.

---

## Principais Aprendizados

1. **Configuração do ambiente é crítica**: A escolha do `testEnvironment` afeta diretamente o que é testável.

2. **Testes simples são melhores**: Tentar testar tudo resulta em testes frágeis. É melhor ter testes simples e diretos.

3. **Isolamento é essencial**: Sem reset de estado entre testes, falhas intermitentes são inevitáveis.

4. **Nem tudo precisa ser testado visualmente**: Testes de sistema podem validar que dados estão corretos e que elementos DOM existem, sem precisar replicar 100% da interação do usuário.

---

## Conclusão

O projeto possui uma suíte de testes funcional, com validação de regras de negócio e cenários de sistema em jsdom. A cobertura real ficou acima de 95% e os testes atuais estão estáveis.

Os maiores desafios foram configuração ambiental e encontrar o equilíbrio entre completude de testes e praticidade. Com esses aprendizados, futuras expansões da suite de testes serão mais eficientes.

✅ **Status**: 14/14 testes passando

---

## Roteiro Básico Para Rodar Os Testes

1. Abra um terminal na raiz do projeto.
2. Instale as dependências, se necessário:
```bash
npm install
```
3. Execute a suíte de testes:
```bash
npm test
```
4. Gere a cobertura:
```bash
npm run test:coverage
```
5. Abra o relatório HTML em `coverage/lcov-report/index.html` para visualizar os detalhes da cobertura.

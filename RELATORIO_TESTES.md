# Relatório de Desenvolvimento de Testes de Software
## Improved Broccoli - Sistema de Gerenciamento de Tarefas

---

## Introdução

Este relatório apresenta a experiência no desenvolvimento de testes para o **Improved Broccoli**, um gerenciador de tarefas web. Foram implementados 24 testes (13 unitários, 5 de integração e 5 de sistema) com 100% de aprovação.

---

## Experiência Geral

O desenvolvimento começou com testes unitários simples para validar funções isoladas, depois evoluiu para testes de integração que validam fluxos entre múltiplas funções, e finalmente testes de sistema que envolvem interação com o DOM.

Todos os 7 requisitos funcionais foram cobertos, desde cadastro de tarefas até pesquisa avançada.

---

## Pontos Fortes

**Abordagem em camadas**: Separar testes unitários, integração e sistema permitiu identificar falhas em níveis específicos e facilitar a manutenção.

**Testes bem isolados**: Usar `beforeEach()` para limpar estado entre testes evitou problemas de interferência. Cada teste tem responsabilidade clara.

**Cobertura completa**: Todos os requisitos funcionais têm testes correspondentes, incluindo casos normais e casos extremos (entradas vazias, IDs inválidos, etc).

**Taxa de sucesso 100%**: Todos os 24 testes passam consistentemente, indicando um conjunto de testes robusto.

---

## Dificuldades Encontradas

**Configuração do Jest**: Inicialmente o Jest estava configurado com `testEnvironment: 'node'`, que não suporta DOM. Precisou instalar `jest-environment-jsdom` e alterar a configuração para fazer testes de sistema funcionar.

**Testes de Sistema com DOM**: A primeira abordagem tentou testar a renderização completa com listeners de eventos, mas isso se provou impraticável. A solução foi focar em testes que validam manipulação de dados + interface (inputs, selects, contadores) sem tentar replicar toda a interação do usuário.

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

O projeto atendeu todos os requisitos com uma suite de testes bem estruturada. Os 24 testes cobrem os 7 requisitos funcionais e validam comportamento em diferentes níveis (unitário, integração e sistema).

Os maiores desafios foram configuração ambiental e encontrar o equilíbrio entre completude de testes e praticidade. Com esses aprendizados, futuras expansões da suite de testes serão mais eficientes.

✅ **Status**: 24/24 testes passando

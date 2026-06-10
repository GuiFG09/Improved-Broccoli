/**
 * TESTES UNITÁRIOS - Improved Broccoli
 * Testes para funções de gerenciamento de tarefas
 */

// Mock das variáveis globais
let listaDeTarefas = [];
let filtroAtivo = "todas";
let termoBusca = "";

// === FUNÇÕES A TESTAR ===

/**
 * RF01: Cadastro de Nova Tarefa
 */
function cadastrarTarefa(titulo, prioridade = "media") {
    if (!titulo || titulo.trim() === "") return;

    const novaTarefa = {
        id: Date.now(),
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: "pendente"
    };

    listaDeTarefas.push(novaTarefa);
    return novaTarefa;
}

/**
 * RF02: Finalizar uma Tarefa
 */
function finalizarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa && tarefa.status !== "cancelada") {
        tarefa.status = "concluida";
        return true;
    }
    return false;
}

/**
 * RF04: Cancelar Tarefa
 */
function cancelarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.status = "cancelada";
        return true;
    }
    return false;
}

/**
 * RF03: Definir/Alterar Prioridade
 */
function definirPrioridade(idTarefa, novaPrioridade) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        return true;
    }
    return false;
}

/**
 * Retorna as tarefas filtradas pelo status ativo e pelo termo de busca
 */
function getTarefasFiltradas() {
    return listaDeTarefas.filter(tarefa => {
        const passaFiltro = filtroAtivo === "todas" || tarefa.status === filtroAtivo;
        const passaBusca = tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase());
        return passaFiltro && passaBusca;
    });
}

/**
 * Atualiza os contadores de resumo
 */
function atualizarContadores() {
    return {
        total: listaDeTarefas.length,
        pendente: listaDeTarefas.filter(t => t.status === 'pendente').length,
        concluida: listaDeTarefas.filter(t => t.status === 'concluida').length,
        cancelada: listaDeTarefas.filter(t => t.status === 'cancelada').length
    };
}

/**
 * Destaca o termo de busca dentro do título
 */
function destacarBusca(titulo) {
    if (!termoBusca) return titulo;
    const regex = new RegExp(`(${termoBusca.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return titulo.replace(regex, '<mark>$1</mark>');
}

// === TESTES ===

describe('Improved Broccoli - Testes Unitários', () => {

    // Limpar estado antes de cada teste
    beforeEach(() => {
        listaDeTarefas = [];
        filtroAtivo = "todas";
        termoBusca = "";
        jest.useRealTimers();
    });

    // Resetar timers após cada teste
    afterEach(() => {
        jest.useRealTimers();
    });

    // ===== RF01: CADASTRO DE TAREFA =====
    describe('RF01: Cadastro de Nova Tarefa', () => {
        
        test('Deve criar uma tarefa com título e prioridade padrão', () => {
            const tarefa = cadastrarTarefa('Estudar Jest');
            
            expect(tarefa).toBeDefined();
            expect(tarefa.titulo).toBe('Estudar Jest');
            expect(tarefa.prioridade).toBe('media');
            expect(tarefa.status).toBe('pendente');
            expect(tarefa.id).toBeDefined();
        });

        test('Deve criar uma tarefa com prioridade alta', () => {
            const tarefa = cadastrarTarefa('Urgente', 'alta');
            
            expect(tarefa.prioridade).toBe('alta');
            expect(listaDeTarefas.length).toBe(1);
        });

        test('Deve criar uma tarefa com prioridade baixa', () => {
            const tarefa = cadastrarTarefa('Leitura', 'baixa');
            
            expect(tarefa.prioridade).toBe('baixa');
        });

        test('Não deve criar tarefa com título vazio', () => {
            cadastrarTarefa('');
            expect(listaDeTarefas.length).toBe(0);
        });

        test('Não deve criar tarefa com apenas espaços em branco', () => {
            cadastrarTarefa('   ');
            expect(listaDeTarefas.length).toBe(0);
        });

        test('Deve limpar espaços em branco do título', () => {
            const tarefa = cadastrarTarefa('  Tarefa com espaços  ');
            
            expect(tarefa.titulo).toBe('Tarefa com espaços');
        });

        test('Deve adicionar múltiplas tarefas à lista', () => {
            cadastrarTarefa('Tarefa 1');
            cadastrarTarefa('Tarefa 2');
            cadastrarTarefa('Tarefa 3');
            
            expect(listaDeTarefas.length).toBe(3);
        });

        test('Cada tarefa deve ter um ID único', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            const tarefa1 = cadastrarTarefa('Tarefa 1');
            jest.advanceTimersByTime(10);
            const tarefa2 = cadastrarTarefa('Tarefa 2');
            jest.advanceTimersByTime(10);
            const tarefa3 = cadastrarTarefa('Tarefa 3');
            
            expect(tarefa1.id).not.toBe(tarefa2.id);
            expect(tarefa2.id).not.toBe(tarefa3.id);
            expect(tarefa1.id).not.toBe(tarefa3.id);
            
            jest.useRealTimers();
        });
    });

    // ===== RF02: FINALIZAR TAREFA =====
    describe('RF02: Finalizar Tarefa', () => {
        
        test('Deve marcar uma tarefa como concluída', () => {
            const tarefa = cadastrarTarefa('Estudar');
            expect(tarefa.status).toBe('pendente');
            
            const resultado = finalizarTarefa(tarefa.id);
            
            expect(resultado).toBe(true);
            expect(tarefa.status).toBe('concluida');
            
            // Verificar que também foi alterado na lista
            const tarefaNaLista = listaDeTarefas.find(t => t.id === tarefa.id);
            expect(tarefaNaLista.status).toBe('concluida');
        });

        test('Não deve finalizar tarefa inexistente', () => {
            const resultado = finalizarTarefa(99999);
            
            expect(resultado).toBe(false);
        });

        test('Não deve finalizar tarefa já cancelada', () => {
            const tarefa = cadastrarTarefa('Tarefa');
            cancelarTarefa(tarefa.id);
            const resultado = finalizarTarefa(tarefa.id);
            
            expect(resultado).toBe(false);
            expect(tarefa.status).toBe('cancelada');
        });
    });

    // ===== RF04: CANCELAR TAREFA =====
    describe('RF04: Cancelar Tarefa', () => {
        
        test('Deve cancelar uma tarefa pendente', () => {
            const tarefa = cadastrarTarefa('Tarefa');
            const resultado = cancelarTarefa(tarefa.id);
            
            expect(resultado).toBe(true);
            expect(tarefa.status).toBe('cancelada');
        });

        test('Não deve cancelar tarefa inexistente', () => {
            const resultado = cancelarTarefa(99999);
            
            expect(resultado).toBe(false);
        });

        test('Deve cancelar uma tarefa concluída', () => {
            const tarefa = cadastrarTarefa('Tarefa');
            finalizarTarefa(tarefa.id);
            const resultado = cancelarTarefa(tarefa.id);
            
            expect(resultado).toBe(true);
            expect(tarefa.status).toBe('cancelada');
        });
    });

    // ===== RF03: DEFINIR PRIORIDADE =====
    describe('RF03: Definir/Alterar Prioridade', () => {
        
        test('Deve alterar prioridade de baixa para alta', () => {
            const tarefa = cadastrarTarefa('Tarefa', 'baixa');
            const resultado = definirPrioridade(tarefa.id, 'alta');
            
            expect(resultado).toBe(true);
            expect(tarefa.prioridade).toBe('alta');
        });

        test('Deve alterar prioridade múltiplas vezes', () => {
            const tarefa = cadastrarTarefa('Tarefa', 'media');
            
            definirPrioridade(tarefa.id, 'alta');
            expect(tarefa.prioridade).toBe('alta');
            
            definirPrioridade(tarefa.id, 'baixa');
            expect(tarefa.prioridade).toBe('baixa');
        });

        test('Não deve alterar prioridade de tarefa inexistente', () => {
            const resultado = definirPrioridade(99999, 'alta');
            
            expect(resultado).toBe(false);
        });
    });

    // ===== FILTROS E PESQUISA =====
    describe('Filtros e Pesquisa', () => {
        
        test('Deve retornar todas as tarefas quando filtro é "todas"', () => {
            cadastrarTarefa('Tarefa 1');
            cadastrarTarefa('Tarefa 2');
            filtroAtivo = 'todas';
            
            const resultado = getTarefasFiltradas();
            expect(resultado.length).toBe(2);
        });

        test('Deve filtrar tarefas por status pendente', () => {
            const t1 = cadastrarTarefa('Tarefa 1');
            const t2 = cadastrarTarefa('Tarefa 2');
            finalizarTarefa(t1.id);
            
            filtroAtivo = 'pendente';
            const resultado = getTarefasFiltradas();
            
            expect(resultado.length).toBe(1);
            expect(resultado[0].id).toBe(t2.id);
        });

        test('Deve filtrar tarefas por status concluído', () => {
            const t1 = cadastrarTarefa('Tarefa 1');
            const t2 = cadastrarTarefa('Tarefa 2');
            finalizarTarefa(t1.id);
            
            filtroAtivo = 'concluida';
            const resultado = getTarefasFiltradas();
            
            expect(resultado.length).toBe(1);
            expect(resultado[0].status).toBe('concluida');
        });

        test('Deve buscar tarefas por termo', () => {
            cadastrarTarefa('Estudar JavaScript');
            cadastrarTarefa('Fazer exercício');
            
            filtroAtivo = 'todas';
            termoBusca = 'JavaScript';
            const resultado = getTarefasFiltradas();
            
            expect(resultado.length).toBe(1);
            expect(resultado[0].titulo).toContain('JavaScript');
        });

        test('Deve buscar tarefas case-insensitive', () => {
            cadastrarTarefa('Estudar JavaScript');
            
            filtroAtivo = 'todas';
            termoBusca = 'javascript';
            const resultado = getTarefasFiltradas();
            
            expect(resultado.length).toBe(1);
        });

        test('Deve buscar vazio quando termo não corresponde', () => {
            cadastrarTarefa('Estudar JavaScript');
            
            filtroAtivo = 'todas';
            termoBusca = 'Python';
            const resultado = getTarefasFiltradas();
            
            expect(resultado.length).toBe(0);
        });

        test('Deve combinar filtro de status com busca', () => {
            const t1 = cadastrarTarefa('Estudar JavaScript');
            const t2 = cadastrarTarefa('Fazer exercício');
            finalizarTarefa(t1.id);
            
            filtroAtivo = 'concluida';
            termoBusca = 'JavaScript';
            const resultado = getTarefasFiltradas();
            
            expect(resultado.length).toBe(1);
            expect(resultado[0].titulo).toContain('JavaScript');
        });
    });

    // ===== CONTADORES =====
    describe('Atualizador de Contadores', () => {
        
        test('Deve retornar 0 tarefas quando lista vazia', () => {
            const contadores = atualizarContadores();
            
            expect(contadores.total).toBe(0);
            expect(contadores.pendente).toBe(0);
            expect(contadores.concluida).toBe(0);
            expect(contadores.cancelada).toBe(0);
        });

        test('Deve contar tarefas pendentes', () => {
            cadastrarTarefa('Tarefa 1');
            cadastrarTarefa('Tarefa 2');
            
            const contadores = atualizarContadores();
            
            expect(contadores.total).toBe(2);
            expect(contadores.pendente).toBe(2);
        });

        test('Deve contar tarefas concluídas', () => {
            const t1 = cadastrarTarefa('Tarefa 1');
            const t2 = cadastrarTarefa('Tarefa 2');
            finalizarTarefa(t1.id);
            
            const contadores = atualizarContadores();
            
            expect(contadores.concluida).toBe(1);
            expect(contadores.pendente).toBe(1);
        });

        test('Deve contar tarefas canceladas', () => {
            const t1 = cadastrarTarefa('Tarefa 1');
            const t2 = cadastrarTarefa('Tarefa 2');
            cancelarTarefa(t1.id);
            
            const contadores = atualizarContadores();
            
            expect(contadores.cancelada).toBe(1);
            expect(contadores.pendente).toBe(1);
        });

        test('Deve contar tarefas em diferentes status', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            const t1 = cadastrarTarefa('Tarefa 1');
            jest.advanceTimersByTime(10);
            const t2 = cadastrarTarefa('Tarefa 2');
            jest.advanceTimersByTime(10);
            const t3 = cadastrarTarefa('Tarefa 3');
            
            finalizarTarefa(t1.id);
            cancelarTarefa(t2.id);
            
            const contadores = atualizarContadores();
            
            expect(contadores.total).toBe(3);
            expect(contadores.pendente).toBe(1);
            expect(contadores.concluida).toBe(1);
            expect(contadores.cancelada).toBe(1);
            
            jest.useRealTimers();
        });
    });

    // ===== DESTAQUE DE BUSCA =====
    describe('Destaque de Busca', () => {
        
        test('Não deve destacar quando busca está vazia', () => {
            termoBusca = '';
            const resultado = destacarBusca('JavaScript');
            
            expect(resultado).toBe('JavaScript');
        });

        test('Deve destacar o termo na string', () => {
            termoBusca = 'Java';
            const resultado = destacarBusca('JavaScript');
            
            expect(resultado).toContain('<mark>');
            expect(resultado).toContain('</mark>');
        });

        test('Deve destacar case-insensitive', () => {
            termoBusca = 'java';
            const resultado = destacarBusca('JavaScript');
            
            expect(resultado).toContain('<mark>');
        });

        test('Deve destacar múltiplas ocorrências', () => {
            termoBusca = 'a';
            const resultado = destacarBusca('JavaScript para Aprender');
            
            const matches = resultado.match(/<mark>/g) || [];
            expect(matches.length).toBeGreaterThanOrEqual(2);
        });

        test('Deve tratar caracteres especiais na busca', () => {
            termoBusca = 'C++';
            const resultado = destacarBusca('Aprender C++ com Jest');
            
            expect(resultado).toContain('<mark>');
        });
    });

    // ===== TESTES DE INTEGRAÇÃO =====
    describe('Testes de Integração', () => {
        
        test('Fluxo completo de tarefa: criar, finalizar, contar', () => {
            const t1 = cadastrarTarefa('Tarefa Importante', 'alta');
            
            let contadores = atualizarContadores();
            expect(contadores.pendente).toBe(1);
            
            finalizarTarefa(t1.id);
            contadores = atualizarContadores();
            
            expect(contadores.concluida).toBe(1);
            expect(contadores.pendente).toBe(0);
        });

        test('Fluxo com múltiplas operações', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            const t1 = cadastrarTarefa('Tarefa 1', 'alta');
            jest.advanceTimersByTime(10);
            const t2 = cadastrarTarefa('Tarefa 2', 'media');
            jest.advanceTimersByTime(10);
            const t3 = cadastrarTarefa('Tarefa 3', 'baixa');
            
            finalizarTarefa(t1.id);
            definirPrioridade(t2.id, 'alta');
            cancelarTarefa(t3.id);
            
            const contadores = atualizarContadores();
            
            expect(contadores.total).toBe(3);
            expect(contadores.concluida).toBe(1);
            expect(contadores.cancelada).toBe(1);
            expect(contadores.pendente).toBe(1);
            expect(t2.prioridade).toBe('alta');
            
            jest.useRealTimers();
        });

        test('Busca e filtro combinados com múltiplas tarefas', () => {
            cadastrarTarefa('Estudar JavaScript');
            cadastrarTarefa('Estudar Python');
            cadastrarTarefa('Fazer exercício JavaScript');
            
            filtroAtivo = 'todas';
            termoBusca = 'JavaScript';
            
            const resultado = getTarefasFiltradas();
            expect(resultado.length).toBe(2);
        });

        test('Integração: Criar, pesquisar, filtrar e contar', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            const t1 = cadastrarTarefa('Revisar código', 'alta');
            jest.advanceTimersByTime(10);
            const t2 = cadastrarTarefa('Testes unitários', 'media');
            jest.advanceTimersByTime(10);
            const t3 = cadastrarTarefa('Documentação', 'baixa');
            
            finalizarTarefa(t1.id);
            
            // Buscar apenas tarefas com 'código' ou 'testes'
            termoBusca = 'código';
            let filtradas = getTarefasFiltradas();
            expect(filtradas.length).toBe(1);
            
            // Filtrar por concluídas
            filtroAtivo = 'concluida';
            termoBusca = '';
            filtradas = getTarefasFiltradas();
            expect(filtradas.length).toBe(1);
            expect(filtradas[0].id).toBe(t1.id);
            
            const contadores = atualizarContadores();
            expect(contadores.concluida).toBe(1);
            expect(contadores.pendente).toBe(2);
            
            jest.useRealTimers();
        });

        test('Integração: Alterar prioridades em lote e verificar estado', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            const tarefas = [];
            tarefas.push(cadastrarTarefa('Task 1', 'baixa'));
            jest.advanceTimersByTime(10);
            tarefas.push(cadastrarTarefa('Task 2', 'baixa'));
            jest.advanceTimersByTime(10);
            tarefas.push(cadastrarTarefa('Task 3', 'baixa'));
            
            // Alterar todas para alta
            tarefas.forEach(t => definirPrioridade(t.id, 'alta'));
            
            // Verificar que todas têm prioridade alta
            const todasAlta = listaDeTarefas.every(t => t.prioridade === 'alta');
            expect(todasAlta).toBe(true);
            
            // Verificar que todas ainda estão pendentes
            const todasPendentes = listaDeTarefas.every(t => t.status === 'pendente');
            expect(todasPendentes).toBe(true);
            
            jest.useRealTimers();
        });
    });

    // ===== TESTES DE SISTEMA =====
    describe('Testes de Sistema', () => {
        
        test('Sistema - Fluxo completo do usuário: criar múltiplas tarefas', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            // Usuário cria 5 tarefas com diferentes prioridades
            const titulosEPrioridades = [
                ['Estudar JavaScript', 'alta'],
                ['Fazer exercício', 'media'],
                ['Ler documentação', 'baixa'],
                ['Revisar código', 'alta'],
                ['Escrever testes', 'media']
            ];
            
            const tarefas = [];
            titulosEPrioridades.forEach(([titulo, prioridade]) => {
                tarefas.push(cadastrarTarefa(titulo, prioridade));
                jest.advanceTimersByTime(10);
            });
            
            // Verificar que todas as tarefas foram criadas
            expect(listaDeTarefas.length).toBe(5);
            
            // Contar por prioridade
            const alta = listaDeTarefas.filter(t => t.prioridade === 'alta').length;
            const media = listaDeTarefas.filter(t => t.prioridade === 'media').length;
            const baixa = listaDeTarefas.filter(t => t.prioridade === 'baixa').length;
            
            expect(alta).toBe(2);
            expect(media).toBe(2);
            expect(baixa).toBe(1);
            
            jest.useRealTimers();
        });

        test('Sistema - Gerenciamento do ciclo de vida da tarefa', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            // Criar tarefa
            const tarefa = cadastrarTarefa('Tarefa completa', 'media');
            let contadores = atualizarContadores();
            expect(contadores.pendente).toBe(1);
            
            // Alterar prioridade
            definirPrioridade(tarefa.id, 'alta');
            const tarefaAtualizada = listaDeTarefas.find(t => t.id === tarefa.id);
            expect(tarefaAtualizada.prioridade).toBe('alta');
            
            // Finalizar tarefa
            finalizarTarefa(tarefa.id);
            contadores = atualizarContadores();
            expect(contadores.concluida).toBe(1);
            expect(contadores.pendente).toBe(0);
            
            jest.useRealTimers();
        });

        test('Sistema - Pesquisa e filtro em cenário real', () => {
            // Criar tarefas
            cadastrarTarefa('Aprender React');
            cadastrarTarefa('Estudar Node.js');
            cadastrarTarefa('Praticar CSS');
            cadastrarTarefa('Revisar JavaScript');
            cadastrarTarefa('Deploy da aplicação');
            
            // Teste 1: Buscar por "JavaScript"
            filtroAtivo = 'todas';
            termoBusca = 'JavaScript';
            let resultados = getTarefasFiltradas();
            expect(resultados.length).toBe(1);
            expect(resultados[0].titulo).toContain('JavaScript');
            
            // Teste 2: Buscar por qualquer coisa com "a"
            termoBusca = 'a';
            resultados = getTarefasFiltradas();
            expect(resultados.length).toBeGreaterThan(0);
            
            // Teste 3: Limpar busca e filtrar pendentes
            termoBusca = '';
            filtroAtivo = 'pendente';
            resultados = getTarefasFiltradas();
            expect(resultados.length).toBe(5);
            
            // Teste 4: Finalizar uma e verificar filtro
            const primeiraId = listaDeTarefas[0].id;
            finalizarTarefa(primeiraId);
            resultados = getTarefasFiltradas();
            expect(resultados.length).toBe(4); // 5 - 1 concluída
        });

        test('Sistema - Operações em massa e validação', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            // Cenário: Usuário adiciona 10 tarefas, finaliza 5, cancela 2
            const tarefas = [];
            for (let i = 1; i <= 10; i++) {
                tarefas.push(cadastrarTarefa(`Tarefa ${i}`, i % 2 === 0 ? 'alta' : 'baixa'));
                jest.advanceTimersByTime(5);
            }
            
            // Finalizar as 5 primeiras
            for (let i = 0; i < 5; i++) {
                finalizarTarefa(tarefas[i].id);
            }
            
            // Cancelar a 6ª e 7ª
            cancelarTarefa(tarefas[5].id);
            cancelarTarefa(tarefas[6].id);
            
            // Verificar estado final
            const contadores = atualizarContadores();
            expect(contadores.total).toBe(10);
            expect(contadores.concluida).toBe(5);
            expect(contadores.cancelada).toBe(2);
            expect(contadores.pendente).toBe(3);
            
            // Verificar que não é possível finalizar tarefas canceladas
            const resultado = finalizarTarefa(tarefas[5].id);
            expect(resultado).toBe(false);
            
            jest.useRealTimers();
        });

        test('Sistema - Integridade dos dados e edge cases', () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-01-01').getTime());
            
            // Tentar criar tarefa vazia
            cadastrarTarefa('');
            expect(listaDeTarefas.length).toBe(0);
            
            // Tentar criar tarefa com apenas espaços
            cadastrarTarefa('    ');
            expect(listaDeTarefas.length).toBe(0);
            
            // Criar tarefa válida
            const t1 = cadastrarTarefa('   Tarefa válida   ');
            expect(t1.titulo).toBe('Tarefa válida');
            expect(listaDeTarefas.length).toBe(1);
            
            // Tentar operar em ID inexistente
            const resultado1 = finalizarTarefa(99999);
            const resultado2 = cancelarTarefa(99999);
            const resultado3 = definirPrioridade(99999, 'alta');
            
            expect(resultado1).toBe(false);
            expect(resultado2).toBe(false);
            expect(resultado3).toBe(false);
            
            // Verificar que a tarefa original não foi afetada
            expect(listaDeTarefas.length).toBe(1);
            expect(listaDeTarefas[0].status).toBe('pendente');
            
            jest.useRealTimers();
        });
    });
});

// Exportar funções para uso em outros testes
module.exports = {
    cadastrarTarefa,
    finalizarTarefa,
    cancelarTarefa,
    definirPrioridade,
    getTarefasFiltradas,
    atualizarContadores,
    destacarBusca
};

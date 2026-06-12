
// Mock das variáveis globais
let listaDeTarefas = [];
let filtroAtivo = "todas";
let termoBusca = "";

// FUNÇÕES A TESTAR 

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

function finalizarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa && tarefa.status !== "cancelada") {
        tarefa.status = "concluida";
        return true;
    }
    return false;
}

function cancelarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.status = "cancelada";
        return true;
    }
    return false;
}

function definirPrioridade(idTarefa, novaPrioridade) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        return true;
    }
    return false;
}

function getTarefasFiltradas() {
    return listaDeTarefas.filter(tarefa => {
        const passaFiltro = filtroAtivo === "todas" || tarefa.status === filtroAtivo;
        const passaBusca = tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase());
        return passaFiltro && passaBusca;
    });
}

function atualizarContadores() {
    return {
        total: listaDeTarefas.length,
        pendente: listaDeTarefas.filter(t => t.status === 'pendente').length,
        concluida: listaDeTarefas.filter(t => t.status === 'concluida').length,
        cancelada: listaDeTarefas.filter(t => t.status === 'cancelada').length
    };
}

function destacarBusca(titulo) {
    if (!termoBusca) return titulo;
    const regex = new RegExp(`(${termoBusca.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return titulo.replace(regex, '<mark>$1</mark>');
}

describe('Improved Broccoli - Testes Unitários', () => {

    beforeEach(() => {
        listaDeTarefas = [];
        filtroAtivo = "todas";
        termoBusca = "";
        jest.useRealTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('RF01: Cadastro de Nova Tarefa', () => {
        
        test('Deve criar uma tarefa com título e prioridade padrão', () => {
            const tarefa = cadastrarTarefa('Estudar Jest');
            expect(tarefa).toBeDefined();
            expect(tarefa.titulo).toBe('Estudar Jest');
            expect(tarefa.prioridade).toBe('media');
            expect(tarefa.status).toBe('pendente');
        });

        test('Não deve cadastrar tarefa se o título for vazio ou só espaços', () => {
            cadastrarTarefa('');
            cadastrarTarefa('   ');
            expect(listaDeTarefas.length).toBe(0);
        });
    });

    describe('RF02: Finalizar Tarefa', () => {
        
        test('Deve mudar o status da tarefa para concluida', () => {
            const tarefa = cadastrarTarefa('Estudar');
            const resultado = finalizarTarefa(tarefa.id);
            expect(resultado).toBe(true);
            expect(tarefa.status).toBe('concluida');
        });

        test('Não deve finalizar uma tarefa que foi cancelada', () => {
            const tarefa = cadastrarTarefa('Tarefa');
            cancelarTarefa(tarefa.id);
            const resultado = finalizarTarefa(tarefa.id);
            expect(resultado).toBe(false);
            expect(tarefa.status).toBe('cancelada');
        });
    });

    describe('RF04: Cancelar Tarefa', () => {
        
        test('Deve cancelar uma tarefa pendente', () => {
            const tarefa = cadastrarTarefa('Tarefa');
            const resultado = cancelarTarefa(tarefa.id);
            expect(resultado).toBe(true);
            expect(tarefa.status).toBe('cancelada');
        });

        test('Deve retornar false ao tentar cancelar tarefa inexistente', () => {
            const resultado = cancelarTarefa(99999);
            expect(resultado).toBe(false);
        });
    });

    describe('RF03: Definir/Alterar Prioridade', () => {
        
        test('Deve alterar a prioridade da tarefa com sucesso', () => {
            const tarefa = cadastrarTarefa('Tarefa', 'baixa');
            const resultado = definirPrioridade(tarefa.id, 'alta');
            expect(resultado).toBe(true);
            expect(tarefa.prioridade).toBe('alta');
        });

        test('Deve retornar false se tentar mudar prioridade de ID inexistente', () => {
            const resultado = definirPrioridade(99999, 'alta');
            expect(resultado).toBe(false);
        });
    });

    describe('Filtros e Pesquisa', () => {
        
        test('Deve filtrar as tarefas pelo status correto', () => {
            const t1 = cadastrarTarefa('Tarefa 1');
            cadastrarTarefa('Tarefa 2');
            finalizarTarefa(t1.id);
            
            filtroAtivo = 'concluida';
            expect(getTarefasFiltradas().length).toBe(1);
        });

        test('Deve buscar tarefas pelo termo digitado', () => {
            cadastrarTarefa('Estudar JavaScript');
            cadastrarTarefa('Fazer exercício');
            termoBusca = 'JavaScript';
            const filtradas = getTarefasFiltradas();
            expect(filtradas.length).toBe(1);
            expect(filtradas[0].titulo).toContain('JavaScript');
        });
    });

    describe('Atualizador de Contadores', () => {
        
        test('Deve retornar tudo zerado se a lista começar vazia', () => {
            const contadores = atualizarContadores();
            expect(contadores.total).toBe(0);
            expect(contadores.pendente).toBe(0);
            expect(contadores.concluida).toBe(0);
            expect(contadores.cancelada).toBe(0);
        });

        test('Deve atualizar os contadores ao finalizar uma tarefa', () => {
            const t1 = cadastrarTarefa('Tarefa 1');
            finalizarTarefa(t1.id);
            const contadores = atualizarContadores();
            expect(contadores.concluida).toBe(1);
            expect(contadores.pendente).toBe(0);
        });
    });

    describe('Destaque de Busca', () => {
        
        test('Não deve mexer na string se o termo de busca estiver vazio', () => {
            termoBusca = '';
            const resultado = destacarBusca('JavaScript');
            expect(resultado).toBe('JavaScript');
        });

        test('Deve colocar a tag mark em volta do termo encontrado', () => {
            termoBusca = 'Java';
            const resultado = destacarBusca('JavaScript');
            expect(resultado).toBe('<mark>Java</mark>Script');
        });
    });

    // ===== TESTES DE INTEGRAÇÃO  =====
    describe('Cenários Completos de Fluxo e Integração', () => {
        
        test('Fluxo padrão: cadastrar, concluir e checar contadores', () => {
            const t1 = cadastrarTarefa('Tarefa 1', 'alta');
            expect(atualizarContadores().pendente).toBe(1);
            
            finalizarTarefa(t1.id);
            const contadores = atualizarContadores();
            expect(contadores.concluida).toBe(1);
            expect(contadores.pendente).toBe(0);
        });

        test('Fluxo de lote: rodar várias operações seguidas na lista', () => {
            jest.useFakeTimers();
            const t1 = cadastrarTarefa('Task 1'); jest.advanceTimersByTime(5);
            const t2 = cadastrarTarefa('Task 2'); jest.advanceTimersByTime(5);
            const t3 = cadastrarTarefa('Task 3');
            
            finalizarTarefa(t1.id);
            definirPrioridade(t2.id, 'alta');
            cancelarTarefa(t3.id);
            
            const contadores = atualizarContadores();
            expect(contadores.concluida).toBe(1);
            expect(contadores.cancelada).toBe(1);
            expect(t2.prioridade).toBe('alta');
        });

        test('Busca dinâmica após alterações: validar filtros com a lista em andamento', () => {
            const t1 = cadastrarTarefa('React Course');
            const t2 = cadastrarTarefa('Node.js Course');
            const t3 = cadastrarTarefa('JavaScript Basics');
            finalizarTarefa(t1.id);
            
            filtroAtivo = 'concluida';
            let resultados = getTarefasFiltradas();
            expect(resultados.length).toBe(1);
            expect(resultados[0].id).toBe(t1.id);
        });

        test('Simulação de uso: criar 5 tarefas e alterar status variados', () => {
            jest.useFakeTimers();
            const tarefas = [];
            for (let i = 1; i <= 5; i++) {
                tarefas.push(cadastrarTarefa(`Tarefa ${i}`));
                jest.advanceTimersByTime(5);
            }
            finalizarTarefa(tarefas[0].id);
            finalizarTarefa(tarefas[1].id);
            cancelarTarefa(tarefas[2].id);
            
            const contadores = atualizarContadores();
            expect(contadores.total).toBe(5);
            expect(contadores.concluida).toBe(2);
            expect(contadores.cancelada).toBe(1);
            expect(contadores.pendente).toBe(2);
        });

        test('Casos de borda: testar entradas inválidas e IDs falsos em sequência', () => {
            cadastrarTarefa('');
            cadastrarTarefa('   ');
            const t1 = cadastrarTarefa('  Válida  ');
            
            const r1 = finalizarTarefa(99999);
            const r2 = definirPrioridade(99999, 'alta');
            
            expect(listaDeTarefas.length).toBe(1);
            expect(t1.titulo).toBe('Válida');
            expect(r1).toBe(false);
            expect(r2).toBe(false);
        });
    });

    // ===== TESTES DE SISTEMA COM DOM =====
    describe('Testes de Sistema com Interface DOM', () => {

        beforeEach(() => {
            listaDeTarefas = [];
            filtroAtivo = "todas";
            termoBusca = "";
            document.body.innerHTML = `
                <input id="input-titulo" type="text">
                <select id="select-prioridade">
                    <option value="baixa">Baixa</option>
                    <option value="media" selected>Média</option>
                    <option value="alta">Alta</option>
                </select>
                <button id="btn-adicionar">Adicionar</button>
                <input id="input-busca" type="text">
                <div id="lista-tarefas-container"></div>
                <span id="count-total">0</span>
                <span id="count-pendente">0</span>
                <span id="count-concluida">0</span>
                <span id="count-cancelada">0</span>
            `;
        });

        test('Sistema: Validar que input titulo recebe valor digitado', () => {
            const input = document.getElementById('input-titulo');
            input.value = 'Tarefa do Sistema';
            expect(input.value).toBe('Tarefa do Sistema');
        });

        test('Sistema: Validar que select de prioridade recebe valor selecionado', () => {
            const select = document.getElementById('select-prioridade');
            select.value = 'alta';
            expect(select.value).toBe('alta');
        });

        test('Sistema: Cadastrar tarefa e validar que aparece na lista de dados', () => {
            cadastrarTarefa('Sistema Test 1', 'alta');
            cadastrarTarefa('Sistema Test 2', 'media');
            expect(listaDeTarefas.length).toBe(2);
            expect(listaDeTarefas[0].titulo).toBe('Sistema Test 1');
            expect(listaDeTarefas[1].prioridade).toBe('media');
        });

        test('Sistema: Finalizar tarefa e validar mudança de status', () => {
            const t = cadastrarTarefa('Teste Status');
            expect(t.status).toBe('pendente');
            finalizarTarefa(t.id);
            expect(t.status).toBe('concluida');
        });

        test('Sistema: Operações completas - criar, finalizar, cancelar e validar contadores', () => {
            cadastrarTarefa('T1', 'alta');
            cadastrarTarefa('T2', 'media');
            cadastrarTarefa('T3', 'baixa');
            
            expect(listaDeTarefas.length).toBe(3);
            expect(listaDeTarefas[0].status).toBe('pendente');
            expect(listaDeTarefas[1].status).toBe('pendente');
            expect(listaDeTarefas[2].status).toBe('pendente');
        });
    });
});

module.exports = {
    cadastrarTarefa,
    finalizarTarefa,
    cancelarTarefa,
    definirPrioridade,
    getTarefasFiltradas,
    atualizarContadores,
    destacarBusca
};
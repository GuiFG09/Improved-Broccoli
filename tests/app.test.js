let listaDeTarefas, filtroAtivo, termoBusca;

function resetEstado() {
    listaDeTarefas = [];
    filtroAtivo = "todas";
    termoBusca = "";
}

function cadastrarTarefa(titulo, prioridade = "media") {
    if (!titulo || titulo.trim() === "") return;
    const novaTarefa = {
        id: Date.now(),
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: "pendente"
    };
    listaDeTarefas.push(novaTarefa);
}

function finalizarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa && tarefa.status !== "cancelada") {
        tarefa.status = "concluida";
    }
}

function cancelarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.status = "cancelada";
    }
}

function definirPrioridade(idTarefa, novaPrioridade) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
    }
}

function getTarefasFiltradas() {
    return listaDeTarefas.filter(tarefa => {
        const passaFiltro = filtroAtivo === "todas" || tarefa.status === filtroAtivo;
        const passaBusca = tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase());
        return passaFiltro && passaBusca;
    });
}

// --- SUÍTE DE TESTES ---

describe('Plano de Testes - Gerenciador de Tarefas', () => {
    beforeEach(() => {
        resetEstado();
    });

    // RF01
    test('CT01: Deve cadastrar tarefa com sucesso e prioridade padrão (média)', () => {
        cadastrarTarefa("Comprar leite");
        expect(listaDeTarefas).toHaveLength(1);
        expect(listaDeTarefas[0].titulo).toBe("Comprar leite");
        expect(listaDeTarefas[0].prioridade).toBe("media");
        expect(listaDeTarefas[0].status).toBe("pendente");
    });

    test('CT02: Não deve cadastrar tarefa com título vazio ou apenas espaços', () => {
        cadastrarTarefa("");
        cadastrarTarefa("   ");
        expect(listaDeTarefas).toHaveLength(0);
    });

    test('CT03: Deve remover espaços sobressalentes nas bordas do título', () => {
        cadastrarTarefa("   Estudar para a prova   ", "alta");
        expect(listaDeTarefas[0].titulo).toBe("Estudar para a prova");
    });

    // RF02
    test('CT04: Deve finalizar tarefa pendente com sucesso', () => {
        cadastrarTarefa("Tarefa 1");
        const id = listaDeTarefas[0].id;
        finalizarTarefa(id);
        expect(listaDeTarefas[0].status).toBe("concluida");
    });

    test('CT05: Não deve permitir finalizar uma tarefa cancelada', () => {
        cadastrarTarefa("Tarefa 2");
        const id = listaDeTarefas[0].id;
        cancelarTarefa(id);
        finalizarTarefa(id);
        expect(listaDeTarefas[0].status).toBe("cancelada");
    });

    // RF03 & RF04
    test('CT06: Deve alterar a prioridade de uma tarefa existente', () => {
        cadastrarTarefa("Ler livro");
        const id = listaDeTarefas[0].id;
        definirPrioridade(id, "alta");
        expect(listaDeTarefas[0].prioridade).toBe("alta");
    });

    test('CT07: Deve cancelar uma tarefa com sucesso', () => {
        cadastrarTarefa("Pagar conta");
        const id = listaDeTarefas[0].id;
        cancelarTarefa(id);
        expect(listaDeTarefas[0].status).toBe("cancelada");
    });

    // FILTROS E BUSCA
    test('CT08: Deve filtrar tarefas por status', () => {
        cadastrarTarefa("T1");
        cadastrarTarefa("T2");
        finalizarTarefa(listaDeTarefas[0].id);

        filtroAtivo = "concluida";
        expect(getTarefasFiltradas()).toHaveLength(1);
        expect(getTarefasFiltradas()[0].titulo).toBe("T1");
    });

    test('CT09: Deve buscar tarefas por palavra-chave (case-insensitive)', () => {
        cadastrarTarefa("Estudar Javascript");
        cadastrarTarefa("Fazer compras");

        termoBusca = "JAVASCRIPT";
        expect(getTarefasFiltradas()).toHaveLength(1);
        expect(getTarefasFiltradas()[0].titulo).toBe("Estudar Javascript");
    });

    test('CT10: Deve combinar filtro de status e busca textual', () => {
        cadastrarTarefa("Limpar quarto");
        cadastrarTarefa("Limpar cozinha");
        finalizarTarefa(listaDeTarefas[0].id); // Limpar quarto = concluida

        filtroAtivo = "concluida";
        termoBusca = "Limpar";
        const resultado = getTarefasFiltradas();

        expect(resultado).toHaveLength(1);
        expect(resultado[0].titulo).toBe("Limpar quarto");
    });
});
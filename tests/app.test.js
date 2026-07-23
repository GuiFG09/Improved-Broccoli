const buildDom = () => {
    document.body.innerHTML = `
        <button id="btn-adicionar">+ Adicionar</button>
        <input id="input-titulo" type="text" />
        <select id="select-prioridade">
            <option value="baixa">Baixa</option>
            <option value="media" selected>Média</option>
            <option value="alta">Alta</option>
        </select>
        <input id="input-busca" type="text" />
        <button id="btn-limpar-busca">Limpar</button>
        <button class="btn-filtro ativo" data-filtro="todas">Todas</button>
        <button class="btn-filtro" data-filtro="pendente">Pendentes</button>
        <button class="btn-filtro" data-filtro="concluida">Concluídas</button>
        <button class="btn-filtro" data-filtro="cancelada">Canceladas</button>
        <span id="count-total"></span>
        <span id="count-pendente"></span>
        <span id="count-concluida"></span>
        <span id="count-cancelada"></span>
        <div id="lista-titulo-label"></div>
        <div id="lista-tarefas-container"></div>
        <div id="estado-vazio" class="hidden">
            <span class="estado-vazio-icone"></span>
            <p class="estado-vazio-texto"></p>
            <p class="estado-vazio-sub"></p>
        </div>
    `;
};

describe('Plano de Testes - Gerenciador de Tarefas', () => {
    let app;

    beforeEach(() => {
        buildDom();
        jest.resetModules();
        app = require('../app.js');
        app.resetEstado();
        app.renderizarTarefas();
    });

    test('CT01: Deve cadastrar tarefa com sucesso e prioridade padrão (média)', () => {
        app.cadastrarTarefa('Comprar leite');
        expect(app.getTarefasFiltradas()).toHaveLength(1);
        expect(app.getTarefasFiltradas()[0].titulo).toBe('Comprar leite');
        expect(app.getTarefasFiltradas()[0].prioridade).toBe('media');
        expect(app.getTarefasFiltradas()[0].status).toBe('pendente');
    });

    test('CT02: Não deve cadastrar tarefa com título vazio ou apenas espaços', () => {
        app.cadastrarTarefa('');
        app.cadastrarTarefa('   ');
        expect(app.getTarefasFiltradas()).toHaveLength(0);
    });

    test('CT03: Deve remover espaços sobressalentes nas bordas do título', () => {
        app.cadastrarTarefa('   Estudar para a prova   ', 'alta');
        expect(app.getTarefasFiltradas()[0].titulo).toBe('Estudar para a prova');
    });

    test('CT04: Deve finalizar tarefa pendente com sucesso', () => {
        app.cadastrarTarefa('Tarefa 1');
        const id = app.getTarefasFiltradas()[0].id;
        app.finalizarTarefa(id);
        expect(app.getTarefasFiltradas()[0].status).toBe('concluida');
    });

    test('CT05: Não deve permitir finalizar uma tarefa cancelada', () => {
        app.cadastrarTarefa('Tarefa 2');
        const id = app.getTarefasFiltradas()[0].id;
        app.cancelarTarefa(id);
        app.finalizarTarefa(id);
        expect(app.getTarefasFiltradas()[0].status).toBe('cancelada');
    });

    test('CT06: Deve alterar a prioridade de uma tarefa existente', () => {
        app.cadastrarTarefa('Ler livro');
        const id = app.getTarefasFiltradas()[0].id;
        app.definirPrioridade(id, 'alta');
        expect(app.getTarefasFiltradas()[0].prioridade).toBe('alta');
    });

    test('CT07: Deve cancelar uma tarefa com sucesso', () => {
        app.cadastrarTarefa('Pagar conta');
        const id = app.getTarefasFiltradas()[0].id;
        app.cancelarTarefa(id);
        expect(app.getTarefasFiltradas()[0].status).toBe('cancelada');
    });

    test('CT08: Deve filtrar tarefas por status', () => {
        app.cadastrarTarefa('T1');
        app.cadastrarTarefa('T2');
        const primeiraTarefa = app.getTarefasFiltradas()[0];
        app.finalizarTarefa(primeiraTarefa.id);

        app.definirFiltroAtivo('concluida');
        expect(app.getTarefasFiltradas()).toHaveLength(1);
        expect(app.getTarefasFiltradas()[0].titulo).toBe('T1');
    });

    test('CT09: Deve buscar tarefas por palavra-chave (case-insensitive)', () => {
        app.cadastrarTarefa('Estudar Javascript');
        app.cadastrarTarefa('Fazer compras');

        app.definirTermoBusca('JAVASCRIPT');
        expect(app.getTarefasFiltradas()).toHaveLength(1);
        expect(app.getTarefasFiltradas()[0].titulo).toBe('Estudar Javascript');
    });

    test('CT10: Deve combinar filtro de status e busca textual', () => {
        app.cadastrarTarefa('Limpar quarto');
        app.cadastrarTarefa('Limpar cozinha');
        app.finalizarTarefa(app.getTarefasFiltradas()[0].id);

        app.definirFiltroAtivo('concluida');
        app.definirTermoBusca('Limpar');
        const resultado = app.getTarefasFiltradas();

        expect(resultado).toHaveLength(1);
        expect(resultado[0].titulo).toBe('Limpar quarto');
    });

    test('CT11: Deve cadastrar tarefa pela interface ao clicar em Adicionar', () => {
        const inputTitulo = document.getElementById('input-titulo');
        const selectPrioridade = document.getElementById('select-prioridade');

        inputTitulo.value = 'Estudar banco de dados';
        selectPrioridade.value = 'alta';
        document.getElementById('btn-adicionar').click();

        expect(document.querySelectorAll('.tarefa-card')).toHaveLength(1);
        expect(document.querySelector('.tarefa-titulo').textContent).toBe('Estudar banco de dados');
        expect(document.getElementById('count-total').textContent).toBe('1');
        expect(document.getElementById('count-pendente').textContent).toBe('1');
        expect(inputTitulo.value).toBe('');
        expect(selectPrioridade.value).toBe('media');
    });

    test('CT12: Deve concluir uma tarefa pela interface', () => {
        document.getElementById('input-titulo').value = 'Escrever relatório';
        document.getElementById('btn-adicionar').click();

        document.querySelector('.btn-concluir').click();

        expect(document.querySelector('.status-badge').textContent).toBe('✔ Concluída');
        expect(document.getElementById('count-concluida').textContent).toBe('1');
        expect(document.getElementById('count-pendente').textContent).toBe('0');
    });

    test('CT13: Deve cancelar uma tarefa pela interface', () => {
        document.getElementById('input-titulo').value = 'Comprar café';
        document.getElementById('btn-adicionar').click();

        document.querySelector('.btn-cancelar').click();

        expect(document.querySelector('.status-badge').textContent).toBe('✖ Cancelada');
        expect(document.getElementById('count-cancelada').textContent).toBe('1');
        expect(document.getElementById('count-pendente').textContent).toBe('0');
    });

    test('CT14: Deve filtrar, buscar e limpar a pesquisa pela interface', () => {
        document.getElementById('input-titulo').value = 'Limpar quarto';
        document.getElementById('btn-adicionar').click();
        document.getElementById('input-titulo').value = 'Limpar cozinha';
        document.getElementById('btn-adicionar').click();

        document.querySelector('.btn-filtro[data-filtro="pendente"]').click();
        expect(document.getElementById('lista-titulo-label').textContent).toBe('Pendentes');
        expect(document.querySelectorAll('.tarefa-card')).toHaveLength(2);

        const inputBusca = document.getElementById('input-busca');
        const btnLimparBusca = document.getElementById('btn-limpar-busca');

        inputBusca.value = 'cozinha';
        inputBusca.dispatchEvent(new Event('input', { bubbles: true }));

        expect(document.querySelectorAll('.tarefa-card')).toHaveLength(1);
        expect(document.querySelector('.tarefa-titulo').innerHTML).toContain('<mark>cozinha</mark>');
        expect(btnLimparBusca.classList.contains('visivel')).toBe(true);

        btnLimparBusca.click();

        expect(inputBusca.value).toBe('');
        expect(btnLimparBusca.classList.contains('visivel')).toBe(false);
        expect(document.querySelectorAll('.tarefa-card')).toHaveLength(2);
    });
});
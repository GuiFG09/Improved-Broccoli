// --- LÓGICA DE DADOS (APENAS O TEU ESCOPO) ---
let listaDeTarefas = [];

/**
 * RF01: Cadastro de Nova Tarefa
 */
function cadastrarTarefa(titulo, prioridade = "media") {
    if (!titulo || titulo.trim() === "") return;

    const novaTarefa = {
        id: Date.now(), // ID único baseado em timestamp
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: "pendente"
    };

    listaDeTarefas.push(novaTarefa);
    renderizarTarefas(); // Atualiza o ecrã
}

/**
 * RF02: Finalizar uma Tarefa
 */
function finalizarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa && tarefa.status !== "cancelada") {
        tarefa.status = "concluida";
        renderizarTarefas();
    }
}

/**
 * RF04: Cancelar Tarefa
 */
function cancelarTarefa(idTarefa) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.status = "cancelada";
        renderizarTarefas();
    }
}

/**
 * RF03: Definir/Alterar Prioridade
 */
function definirPrioridade(idTarefa, novaPrioridade) {
    const tarefa = listaDeTarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        renderizarTarefas();
    }
}

// --- ESCUTA DE EVENTOS E MANIPULAÇÃO DO DOM ---
const btnAdicionar = document.getElementById('btn-adicionar');
const inputTitulo = document.getElementById('input-titulo');
const selectPrioridade = document.getElementById('select-prioridade');
const containerLista = document.getElementById('lista-tarefas-container');

// Evento de clique para cadastrar
btnAdicionar.addEventListener('click', () => {
    cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    inputTitulo.value = ""; // Limpa o input
    selectPrioridade.value = "media"; // Reseta para o padrão
});

// Evento de tecla (Enter) focado no input
inputTitulo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnAdicionar.click();
    }
});

/**
 * Função utilitária para renderizar as alterações na interface.
 * Nota para o outro Dev: Esta função lê o array global 'listaDeTarefas'
 */
function renderizarTarefas() {
    containerLista.innerHTML = ""; // Limpa os elementos visuais antigos

    listaDeTarefas.forEach(tarefa => {
        const card = document.createElement('div');
        
        // Adiciona as classes necessárias para o CSS aplicar as cores e estilos corretos
        card.classList.add('tarefa-card', tarefa.prioridade);
        if (tarefa.status !== 'pendente') {
            card.classList.add(tarefa.status);
        }

        card.innerHTML = `
            <div class="tarefa-info">
                <span class="tarefa-titulo">${tarefa.titulo}</span>
                <span class="tarefa-tag">
                    Prioridade: 
                    <select onchange="definirPrioridade(${tarefa.id}, this.value)" ${tarefa.status !== 'pendente' ? 'disabled' : ''}>
                        <option value="baixa" ${tarefa.prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
                        <option value="media" ${tarefa.prioridade === 'media' ? 'selected' : ''}>Média</option>
                        <option value="alta" ${tarefa.prioridade === 'alta' ? 'selected' : ''}>Alta</option>
                    </select>
                </span>
            </div>
            <div class="tarefa-acoes">
                ${tarefa.status === 'pendente' ? `
                    <button class="btn-acao btn-concluir" onclick="finalizarTarefa(${tarefa.id})">✔ Concluir</button>
                    <button class="btn-acao btn-cancelar" onclick="cancelarTarefa(${tarefa.id})">✖ Cancelar</button>
                ` : `<span style="font-size: 12px; font-weight: bold; color: #94a3b8;">${tarefa.status.toUpperCase()}</span>`}
            </div>
        `;
        containerLista.appendChild(card);
    });
}
// --- LÓGICA DE DADOS ---
let listaDeTarefas = [];

// Estado da UI
let filtroAtivo = "todas";
let termoBusca = "";

function resetEstado() {
    listaDeTarefas = [];
    filtroAtivo = "todas";
    termoBusca = "";
}

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
    renderizarTarefas();
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

function definirFiltroAtivo(novoFiltro) {
    filtroAtivo = novoFiltro;
}

function definirTermoBusca(novoTermo) {
    termoBusca = novoTermo;
}

// --- FILTRO E PESQUISA ---

/**
 * Retorna as tarefas filtradas pelo status ativo e pelo termo de busca.
 */
function getTarefasFiltradas() {
    return listaDeTarefas.filter(tarefa => {
        const passaFiltro = filtroAtivo === "todas" || tarefa.status === filtroAtivo;
        const passaBusca = tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase());
        return passaFiltro && passaBusca;
    });
}

/**
 * Atualiza os contadores de resumo no topo da lista.
 */
function atualizarContadores() {
    document.getElementById('count-total').textContent = listaDeTarefas.length;
    document.getElementById('count-pendente').textContent = listaDeTarefas.filter(t => t.status === 'pendente').length;
    document.getElementById('count-concluida').textContent = listaDeTarefas.filter(t => t.status === 'concluida').length;
    document.getElementById('count-cancelada').textContent = listaDeTarefas.filter(t => t.status === 'cancelada').length;
}

/**
 * Destaca o termo de busca dentro do título da tarefa.
 */
function destacarBusca(titulo) {
    if (!termoBusca) return titulo;
    const regex = new RegExp(`(${termoBusca.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return titulo.replace(regex, '<mark>$1</mark>');
}

// --- ESCUTA DE EVENTOS ---

const btnAdicionar = document.getElementById('btn-adicionar');
const inputTitulo = document.getElementById('input-titulo');
const selectPrioridade = document.getElementById('select-prioridade');
const containerLista = document.getElementById('lista-tarefas-container');
const inputBusca = document.getElementById('input-busca');
const btnLimparBusca = document.getElementById('btn-limpar-busca');
const estadoVazio = document.getElementById('estado-vazio');
const listaTituloLabel = document.getElementById('lista-titulo-label');

// Adicionar tarefa
btnAdicionar.addEventListener('click', () => {
    cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    inputTitulo.value = "";
    selectPrioridade.value = "media";
});

inputTitulo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnAdicionar.click();
});

// Pesquisa em tempo real
inputBusca.addEventListener('input', () => {
    termoBusca = inputBusca.value;
    btnLimparBusca.classList.toggle('visivel', termoBusca.length > 0);
    renderizarTarefas();
});

btnLimparBusca.addEventListener('click', () => {
    inputBusca.value = "";
    termoBusca = "";
    btnLimparBusca.classList.remove('visivel');
    inputBusca.focus();
    renderizarTarefas();
});

// Filtros por status
document.querySelectorAll('.btn-filtro').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        filtroAtivo = btn.dataset.filtro;
        renderizarTarefas();
    });
});

/**
 * Renderiza a lista de tarefas conforme filtro e busca ativos.
 */
function renderizarTarefas() {
    containerLista.innerHTML = "";
    atualizarContadores();

    const tarefasFiltradas = getTarefasFiltradas();

    // Atualiza o título da lista com contexto
    const labelsStatus = { todas: "Todas as Tarefas", pendente: "Pendentes", concluida: "Concluídas", cancelada: "Canceladas" };
    listaTituloLabel.textContent = labelsStatus[filtroAtivo] || "Tarefas";

    // Exibe estado vazio se não houver resultados
    if (tarefasFiltradas.length === 0) {
        estadoVazio.classList.remove('hidden');
        if (listaDeTarefas.length === 0) {
            estadoVazio.querySelector('.estado-vazio-texto').textContent = "Nenhuma tarefa ainda";
            estadoVazio.querySelector('.estado-vazio-sub').textContent = "Adicione uma tarefa acima para começar";
            estadoVazio.querySelector('.estado-vazio-icone').textContent = "✏️";
        } else {
            estadoVazio.querySelector('.estado-vazio-texto').textContent = "Nenhuma tarefa encontrada";
            estadoVazio.querySelector('.estado-vazio-sub').textContent = "Tente ajustar o filtro ou a pesquisa";
            estadoVazio.querySelector('.estado-vazio-icone').textContent = "🔍";
        }
        return;
    }

    estadoVazio.classList.add('hidden');

    tarefasFiltradas.forEach(tarefa => {
        const card = document.createElement('div');
        card.classList.add('tarefa-card', tarefa.prioridade);
        if (tarefa.status !== 'pendente') {
            card.classList.add(tarefa.status);
        }

        const tituloDestacado = destacarBusca(tarefa.titulo);

        card.innerHTML = `
            <div class="tarefa-info">
                <span class="tarefa-titulo">${tituloDestacado}</span>
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
                ` : `<span class="status-badge ${tarefa.status}">${tarefa.status === 'concluida' ? '✔ Concluída' : '✖ Cancelada'}</span>`}
            </div>
        `;
        containerLista.appendChild(card);
    });
}

// Render inicial
renderizarTarefas();

if (typeof module !== 'undefined' && module.exports) {
    const api = {
        resetEstado,
        definirFiltroAtivo,
        definirTermoBusca,
        cadastrarTarefa,
        finalizarTarefa,
        cancelarTarefa,
        definirPrioridade,
        getTarefasFiltradas,
        atualizarContadores,
        destacarBusca,
        renderizarTarefas
    };

    module.exports = api;

    if (typeof globalThis !== 'undefined') {
        Object.assign(globalThis, api);
    }
}
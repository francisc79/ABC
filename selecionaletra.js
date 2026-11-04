/* ARQUIVO: selecionaletra.js 
  DESCRIÇÃO: Lógica do Jogo do Alfabeto com Áudio e Responsividade
*/

// --- 1. CONFIGURAÇÃO DE DADOS ---
const letrasOriginais = [
    'A', 'B', 'C', 'D', 'E', 'F', 
    'G', 'H', 'I', 'J', 'K', 'L', 
    'M', 'N', 'O', 'P', 'Q', 'R', 
    'S', 'T', 'U', 'V', 'W', 'X', 
    'Y', 'Z'
];

let filaDeLetras = []; 

// --- 2. SELEÇÃO DE ELEMENTOS DO DOM ---

// Telas e Containers Principais
const telaInicio = document.getElementById('tela-inicio');
const conteudoJogo = document.getElementById('conteudo-jogo');
const areaJogo = document.getElementById('area-jogo');
const msgVitoria = document.getElementById('mensagem-vitoria');

// Elementos de Interação
const btnComecar = document.getElementById('btn-comecar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const displayLetra = document.getElementById('letra-alvo');
const gridAlfabeto = document.getElementById('grid-alfabeto');

// Elementos de Áudio
const somFundo = document.getElementById('audio-fundo');
const somAcerto = document.getElementById('audio-acerto');
const somVitoria = document.getElementById('audio-vitoria');

// Configuração de Volume Inicial
if(somFundo) somFundo.volume = 0.3; // Música de fundo mais baixa (30%)
if(somAcerto) somAcerto.volume = 1.0;
if(somVitoria) somVitoria.volume = 1.0;


// --- 3. FUNÇÕES AUXILIARES ---

// Função para embaralhar o array (Fisher-Yates Shuffle)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Gera uma cor vibrante aleatória para a letra destaque
function gerarCorAleatoria() {
    // Cores pré-definidas para garantir contraste (opcional), 
    // ou use hexadecimal aleatório. Aqui vou usar aleatório:
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}


// --- 4. LÓGICA DO JOGO ---

// Botão da Tela Inicial (Desbloqueia o Áudio)
btnComecar.addEventListener('click', function() {
    telaInicio.classList.add('d-none'); // Esconde tela de início
    conteudoJogo.classList.remove('d-none'); // Mostra o jogo
    
    // Tenta iniciar o áudio de fundo
    if(somFundo) somFundo.play().catch(e => console.log("Erro ao tocar áudio:", e));
    
    iniciarJogo();
});

function iniciarJogo() {
    // 1. Prepara a fila de letras embaralhada
    filaDeLetras = embaralhar([...letrasOriginais]);
    
    // 2. Reseta a interface visual
    areaJogo.classList.remove('d-none');
    gridAlfabeto.classList.remove('d-none');
    msgVitoria.classList.add('d-none');
    
    // 3. Reseta os cartões (Letras) para o estado original
    const cards = document.querySelectorAll('.letra-card');
    cards.forEach(card => {
        card.style.visibility = 'visible';       // Torna visível
        card.style.backgroundColor = '';             // Restaura a cor definida no CSS
        card.style.color = '';                      // Restaura a cor definida no CSS
        card.style.pointerEvents = '';             // Restaura a interação padrão
        card.style.transform = '';                 // Remove transformações residuais
    });

    // 4. Controle de Áudio (Reinício)
    if(somVitoria) {
        somVitoria.pause();
        somVitoria.currentTime = 0;
    }
    if(somFundo && somFundo.paused) {
        somFundo.play();
    }

    // 5. Mostra a primeira letra
    atualizarLetraAlvo();
}

function atualizarLetraAlvo() {
    if (filaDeLetras.length > 0) {
        displayLetra.innerText = filaDeLetras[0];
        
        // Aplica uma cor nova aleatória
        const novaCor = gerarCorAleatoria();
        displayLetra.style.backgroundColor = novaCor;
        // Ajusta a sombra para combinar (levemente mais escura simulada)
        displayLetra.style.boxShadow = `0 6px 0px rgba(96, 22, 174, 0.61)`; 
        
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    // Esconde o jogo e mostra a vitória
    areaJogo.classList.add('d-none');
    gridAlfabeto.classList.add('d-none');
    msgVitoria.classList.remove('d-none');
    
    // Para a música de fundo e toca a vitória
    if(somFundo) somFundo.pause();
    if(somVitoria) somVitoria.play().catch(e => console.log('Áudio de vitória indisponível:', e));
}


// --- 5. EVENTOS DE INTERAÇÃO (CLICKS) ---

// Clique nas letras (Delegation no Grid)
gridAlfabeto.addEventListener("click", function (event) {
    const elementoClicado = event.target;
    
    // Verifica se o clique foi em um cartão de letra válido
    if (elementoClicado.classList.contains("letra-card") && filaDeLetras.length > 0) {
        
        const letraClicada = elementoClicado.id; // O ID deve ser "A", "B", etc.
        const letraCorreta = filaDeLetras[0];

        if (letraClicada === letraCorreta) {
            // --- ACERTO ---
            
            // 1. Som de acerto (Clone permite tocar sons rápidos sobrepostos)
            if(somAcerto) somAcerto.cloneNode(true).play().catch(() => {});

            // 2. Feedback Visual (Verde)
            elementoClicado.style.backgroundColor = '#18e448ff'; // Verde claro bootstrap
            elementoClicado.style.color = '#155724';         // Verde escuro
            elementoClicado.style.pointerEvents = 'none';    // Impede clicar duas vezes
            elementoClicado.style.transform = 'scale(0.9)';  // Efeito de "pressionado"

            // 3. Remove a letra da fila e atualiza o alvo após pequeno delay
            setTimeout(() => {
                elementoClicado.style.visibility = 'hidden'; // Esconde o cartão
                filaDeLetras.shift(); // Remove da lista
                atualizarLetraAlvo(); // Chama a próxima
            }, 200); // 200ms de delay

        } else {
            // --- ERRO ---
            
            // 1. Feedback Visual (Vermelho)
            elementoClicado.style.backgroundColor = '#e70c1eff';
            elementoClicado.style.pointerEvents = 'none';
            
            // 2. Vibração (apenas Android/Mobile compatível)
            if (navigator.vibrate) navigator.vibrate(50); 
            
            // 3. Volta explicitamente para o azul original após 500ms
            setTimeout(() => {
                elementoClicado.style.backgroundColor = '#1ba8dfff';
                elementoClicado.style.pointerEvents = '';
            }, 500);
        }
    }
});

// Botão Reiniciar (Fim de Jogo)
btnReiniciar.addEventListener('click', iniciarJogo);
// Seleciona os elementos do HTML a serem manipulados pelo JavaScript, sendo identificados pelo IDs e classes
const btn = document.getElementById("btnMostrar");
const select = document.getElementById("humor");
const btnReset = document.getElementById("btnReset");
const container = document.querySelector(".container");
const mainContainer = document.getElementById("mainContainer");
const emojiDisplay = document.getElementById("emojiDisplay");

// Constantes que servem para referenciar diferentes partes do modal (janela popup), onde será usado para exibir mensagens ao usuário
const modalOverlay = document.getElementById("modalOverlay");
const modalContainer = document.getElementById("modalContainer");
const modalMessage = document.getElementById("modalMessage");
const modalEmoji = document.getElementById("modalEmoji");
const modalClose = document.getElementById("modalClose");

// Variáveis que referenciam o canvas onde o gráfico será desenhado e a área onde as estatísticas serão exibidas
const chartCanvas = document.getElementById("emotionChart");
const chartStats = document.getElementById("chartStats");

// Objeto que contém todas as configurações de cada humor disponível
// Cada humor possui: mensagem, cores de fundo, emoji, cor da borda e valor númerico
const humores = {
    radiante: {
        mensagem: "Que energia incrível! Você está brilhando hoje! Continue espalhando essa luz! ✨🌟",
        background: "linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)", // Gradiente amarelo para vermelho
        containerBg: "linear-gradient(135deg, rgba(255, 217, 61, 0.12) 0%, rgba(255, 107, 107, 0.12) 100%)", // Versão transparente do gradiente
        emoji: "🤩",
        borderColor: "#FFD93D",
        value: 12 // Valor mais alto - humor mais positivo
    },
    feliz: {
        mensagem: "Ficamos felizes que você está bem! Continue assim, a felicidade é contagiante! 😊✨",
        background: "linear-gradient(135deg, #FFD93D 0%, #FFA07A 100%)",
        containerBg: "linear-gradient(135deg, rgba(255, 217, 61, 0.12) 0%, rgba(255, 160, 122, 0.12) 100%)",
        emoji: "😊",
        borderColor: "#FFD93D",
        value: 10
    },
    animado: {
        mensagem: "Que animação maravilhosa! Aproveite esse momento de energia positiva! 🎉🚀",
        background: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
        containerBg: "linear-gradient(135deg, rgba(255, 154, 158, 0.12) 0%, rgba(254, 207, 239, 0.12) 100%)",
        emoji: "😄",
        borderColor: "#FF9A9E",
        value: 11
    },
    grato: {
        mensagem: "A gratidão transforma dias comuns em dias especiais. Lindo sentimento! 🙏💚",
        background: "linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 100%)",
        containerBg: "linear-gradient(135deg, rgba(168, 230, 207, 0.12) 0%, rgba(220, 237, 193, 0.12) 100%)",
        emoji: "🙏",
        borderColor: "#A8E6CF",
        value: 8
    },
    confiante: {
        mensagem: "Confiança é a chave do sucesso! Você está no caminho certo! 😎🔥",
        background: "linear-gradient(135deg, #FAD0C4 0%, #FFD1FF 100%)",
        containerBg: "linear-gradient(135deg, rgba(250, 208, 196, 0.12) 0%, rgba(255, 209, 255, 0.12) 100%)",
        emoji: "😎",
        borderColor: "#FAD0C4",
        value: 9
    },
    calmo: {
        mensagem: "A paz interior é um tesouro precioso. Continue cultivando essa serenidade! 😌🌸",
        background: "linear-gradient(135deg, #C3CFFE 0%, #F9D5E5 100%)",
        containerBg: "linear-gradient(135deg, rgba(195, 207, 254, 0.12) 0%, rgba(249, 213, 229, 0.12) 100%)",
        emoji: "😌",
        borderColor: "#C3CFFE",
        value: 7
    },
    neutro: {
        mensagem: "Tudo bem estar neutro! Às vezes precisamos de momentos assim. Esperamos que seu dia melhore! 🌟",
        background: "linear-gradient(135deg, #A8DADC 0%, #B8D4E8 100%)",
        containerBg: "linear-gradient(135deg, rgba(168, 218, 220, 0.12) 0%, rgba(184, 212, 232, 0.12) 100%)",
        emoji: "😐",
        borderColor: "#A8DADC",
        value: 5 // Valor médio - estado neutro
    },
    pensativo: {
        mensagem: "Refletir faz parte do crescimento. Tome seu tempo para processar seus pensamentos! 🤔💭",
        background: "linear-gradient(135deg, #B4A7D6 0%, #CAC4CE 100%)",
        containerBg: "linear-gradient(135deg, rgba(180, 167, 214, 0.12) 0%, rgba(202, 196, 206, 0.12) 100%)",
        emoji: "🤔",
        borderColor: "#B4A7D6",
        value: 6
    },
    cansado: {
        mensagem: "Descanse! Seu corpo e mente merecem um tempo para recarregar as energias. 😪💤",
        background: "linear-gradient(135deg, #9FA4C4 0%, #B8C5D6 100%)",
        containerBg: "linear-gradient(135deg, rgba(159, 164, 196, 0.12) 0%, rgba(184, 197, 214, 0.12) 100%)",
        emoji: "😪",
        borderColor: "#9FA4C4",
        value: 3
    },
    preocupado: {
        mensagem: "Respire fundo. Preocupações fazem parte, mas você tem força para superá-las! 😟🌈",
        background: "linear-gradient(135deg, #D4A5A5 0%, #E8B4B8 100%)",
        containerBg: "linear-gradient(135deg, rgba(212, 165, 165, 0.12) 0%, rgba(232, 180, 184, 0.12) 100%)",
        emoji: "😟",
        borderColor: "#D4A5A5",
        value: 2
    },
    triste: {
        mensagem: "Está tudo bem não estar bem. Você não está sozinho, e dias melhores virão! 😢💙",
        background: "linear-gradient(135deg, #9D8DF1 0%, #B4A7D6 100%)",
        containerBg: "linear-gradient(135deg, rgba(157, 141, 241, 0.12) 0%, rgba(180, 167, 214, 0.12) 100%)",
        emoji: "😢",
        borderColor: "#9D8DF1",
        value: 1 // Valor mais baixo - humor mais negativo
    },
    estressado: {
        mensagem: "Pause, respire e lembre-se: você é mais forte do que imagina! 😤💪",
        background: "linear-gradient(135deg, #FF9AA2 0%, #FFB3BA 100%)",
        containerBg: "linear-gradient(135deg, rgba(255, 154, 162, 0.12) 0%, rgba(255, 179, 186, 0.12) 100%)",
        emoji: "😤",
        borderColor: "#FF9AA2",
        value: 4
    }
};

// Função de armazenamento local (localStorage)

/**
 * Função que recupera o histórico de emoções armazenado no localStorage
 * O localStorage é uma API do navegador que permite salvar dados localmente
 * @returns {Array} Array com o histórico de emoções ou array vazio se não houver dados
 */

function getEmotionHistory() {
    try {
        // Tenta buscar o item 'emotionHistory' do localStorage
        const history = localStorage.getItem('emotionHistory');
        // Se existir, converte de JSON (texto) para objeto JavaScript, senão retorna array vazio
        return history ? JSON.parse(history) : [];
    } catch (error) {
        // Bloco catch captura e trata erros que possam ocorrer durante a leitura
        console.error('Erro ao ler histórico:', error);
        return [];
    }
}

/**
 * Função responsável por salvar uma nova emoção no histórico do localStorage
 * @param {string} emotion - Nome da emoção a ser salva (ex: "feliz", "triste")
 * @returns {boolean} true se salvou com sucesso, false se houve erro
 */

function saveEmotion(emotion) {
    try {
        // Validação: verifica se a emoção passada existe no objeto humores
        if (!humores[emotion]) {
            console.error('❌ Emoção inválida:', emotion);
            return false;
        }

        // Busca o histórico atual de emoções
        const history = getEmotionHistory();

        // Cria um objeto Date com a data e hora atuais
        const now = new Date();

        // Converte a data para formato ISO e pega apenas a parte da data (AAAA-MM-DD)
        const dateStr = now.toISOString().split('T')[0];

        // Formata a hora no padrão brasileiro (HH:MM:SS)
        const timeStr = now.toLocaleTimeString('pt-BR');

        // Cria um objeto com todas as informações do registro da emoção
        const newEntry = {
            emotion: emotion,           // Nome da emoção
            date: dateStr,              // Data no formato AAAA-MM-DD
            time: timeStr,              // Hora no formato HH:MM:SS
            timestamp: now.getTime(),   // Timestamp em milissegundos (usado para ordenação e filtragem)
            value: humores[emotion].value // Valor numérico da emoção (1-12)
        };

        // Adiciona o novo registro ao final do array de histórico
        history.push(newEntry);

        // Calcula o timestamp de 90 dias atrás - 90 dias * 24 horas * 60 minutos * 60 segundos * 1000 milissegundos
        const ninetyDaysAgo = now.getTime() - (90 * 24 * 60 * 60 * 1000);

        // Filtra o histórico mantendo apenas registros dos últimos 90 dias, isso evita que o localStorage fique muito cheio com dados antigos
        const filteredHistory = history.filter(entry => entry.timestamp > ninetyDaysAgo);

        // Converte o array JavaScript de volta para JSON e salva no localStorage
        localStorage.setItem('emotionHistory', JSON.stringify(filteredHistory));

        // Logs para debug - ajudam a acompanhar o que está acontecendo
        console.log('✅ Emoção salva:', newEntry);
        console.log('📊 Total no histórico:', filteredHistory.length);

        // Atualiza o gráfico após um pequeno delay de 100ms
        // O setTimeout garante que o gráfico seja atualizado depois que tudo estiver processado
        setTimeout(() => {
            if (emotionChart) {
                updateChart();
            }
        }, 100);

        return true;
    } catch (error) {
        // Captura e exibe erros que possam ocorrer durante o salvamento
        console.error('❌ Erro ao salvar emoção:', error);
        return false;
    }
}

// Variável global que armazenará a instância do gráfico Chart.js
let emotionChart = null;

/**
 * Função que inicializa o gráfico usando a biblioteca Chart.js
 * Configura o tipo de gráfico, aparência, tooltips, escalas e interações
 */
function initChart() {
    // Obtém o contexto 2D do canvas onde o gráfico será desenhado
    const ctx = chartCanvas.getContext('2d');

    // Cria uma nova instância do Chart.js
    emotionChart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico: linha
        data: {
            labels: [],  // Rótulos do eixo X (serão as datas)
            datasets: [{ // Array de conjuntos de dados (neste caso, apenas um)
                label: 'Humor',
                data: [],    // Dados do eixo Y (serão os valores das emoções)
                borderColor: 'rgb(102, 126, 234)',              // Cor da linha
                backgroundColor: 'rgba(102, 126, 234, 0.1)',    // Cor de preenchimento abaixo da linha
                tension: 0.4,    // Curvatura da linha (0 = reta, 1 = muito curva)
                fill: true,      // Preenche a área abaixo da linha
                pointRadius: 7,  // Tamanho dos pontos
                pointHoverRadius: 9, // Tamanho dos pontos ao passar o mouse
                pointBackgroundColor: 'rgb(102, 126, 234)',     // Cor de fundo dos pontos
                pointBorderColor: '#fff',                       // Cor da borda dos pontos
                pointBorderWidth: 3,                            // Largura da borda dos pontos
                pointHoverBackgroundColor: 'rgb(118, 75, 162)', // Cor do ponto ao passar o mouse
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 4
            }]
        },
        options: {
            responsive: true,              // O gráfico se adapta ao tamanho do container
            maintainAspectRatio: false,    // Permite que o gráfico use toda a altura disponível
            animation: {
                duration: 400  // Duração da animação em milissegundos
            },
            plugins: {
                legend: {
                    display: false  // Esconde a legenda do gráfico
                },
                tooltip: { // Configurações do tooltip (caixinha que aparece ao passar o mouse)
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    padding: 14,
                    cornerRadius: 10,
                    titleFont: {
                        size: 15,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    displayColors: false, // Não mostra o quadradinho colorido no tooltip
                    callbacks: {
                        // Função que customiza o texto exibido no tooltip
                        label: function (context) {
                            // Objeto que mapeia valores numéricos para nomes de emoções
                            const emotionNames = {
                                1: 'Triste 😢', 2: 'Preocupado 😟', 3: 'Cansado 😪',
                                4: 'Estressado 😤', 5: 'Neutro 😐', 6: 'Pensativo 🤔',
                                7: 'Calmo 😌', 8: 'Grato 🙏', 9: 'Confiante 😎',
                                10: 'Feliz 😊', 11: 'Animado 😄', 12: 'Radiante 🤩'
                            };
                            // Retorna o nome da emoção baseado no valor Y do ponto
                            return emotionNames[context.parsed.y] || 'Emoção';
                        }
                    }
                }
            },
            scales: {
                y: { // Configurações do eixo Y (vertical)
                    beginAtZero: false,
                    min: 0,      // Valor mínimo do eixo Y
                    max: 13,     // Valor máximo do eixo Y
                    ticks: {
                        stepSize: 1, // Intervalo entre os valores
                        callback: function (value) {
                            // Função que substitui os números por emojis no eixo Y
                            const emojiMap = {
                                1: '😢', 2: '😟', 3: '😪', 4: '😤',
                                5: '😐', 6: '🤔', 7: '😌', 8: '🙏',
                                9: '😎', 10: '😊', 11: '😄', 12: '🤩'
                            };
                            return emojiMap[value] || '';
                        },
                        font: {
                            size: 18  // Tamanho da fonte dos emojis
                        }
                    },
                    grid: { // Configurações das linhas de grade
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    }
                },
                x: { // Configurações do eixo X (horizontal)
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        maxRotation: 45, // Rotação máxima dos rótulos (para não sobrepor)
                        minRotation: 45
                    }
                }
            },
            interaction: {
                intersect: false,  // O tooltip aparece mesmo sem passar exatamente sobre o ponto
                mode: 'index'      // Mostra dados de todos os datasets no mesmo índice X
            }
        }
    });
}

/**
 * Função que atualiza o gráfico com dados do histórico
 * @param {string} period - Período a ser exibido: 'week' (7 dias) ou 'month' (30 dias)
 */

function updateChart(period = 'week') {
    // Verifica se o gráfico foi inicializado
    if (!emotionChart) {
        console.error('Gráfico não inicializado');
        return;
    }

    // Busca o histórico de emoções
    const history = getEmotionHistory();
    const now = new Date();

    // Define quantos dias serão exibidos baseado no período
    const daysToShow = period === 'week' ? 7 : 30;

    console.log(`📊 Atualizando gráfico (${period}). Total de registros:`, history.length);

    // Arrays que armazenarão os rótulos (datas) e dados (valores) do gráfico
    const labels = [];
    const dataPoints = [];

    // Loop que percorre os últimos dias (de trás para frente)
    for (let i = daysToShow - 1; i >= 0; i--) {
        const date = new Date(now);
        // Subtrai i dias da data atual para pegar cada dia do período
        date.setDate(date.getDate() - i);

        // Formata a data como string AAAA-MM-DD para comparação
        const dateStr = date.toISOString().split('T')[0];

        // Formata a data no padrão brasileiro DD/MM para exibição
        const shortDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        // Adiciona o rótulo ao array
        labels.push(shortDate);

        // Filtra as emoções que foram registradas neste dia específico
        const dayEmotions = history.filter(entry => entry.date === dateStr);

        if (dayEmotions.length > 0) {
            // Filtra apenas emoções com valores válidos (não nulos e não NaN)
            const validEmotions = dayEmotions.filter(e => e.value != null && !isNaN(e.value));

            if (validEmotions.length > 0) {
                // Calcula a média dos valores das emoções do dia
                const avgValue = validEmotions.reduce((sum, entry) => sum + entry.value, 0) / validEmotions.length;
                // Arredonda a média e adiciona ao array de dados
                dataPoints.push(Math.round(avgValue));
                console.log(`${shortDate}: ${validEmotions.length} emoções, média: ${avgValue.toFixed(1)}`);
            } else {
                // Se não há valores válidos, adiciona null (ponto vazio no gráfico)
                dataPoints.push(null);
            }
        } else {
            // Se não há registros neste dia, adiciona null
            dataPoints.push(null);
        }
    }

    // Verifica se há pelo menos um dado válido para exibir
    const hasData = dataPoints.some(point => point !== null);
    console.log('Dados para o gráfico:', dataPoints);
    console.log('Possui dados válidos:', hasData);

    if (!hasData) {
        console.warn('⚠️ Nenhum dado encontrado para o período selecionado');
    }

    // Atualiza os dados do gráfico
    emotionChart.data.labels = labels;
    emotionChart.data.datasets[0].data = dataPoints;
    emotionChart.update(); // Redesenha o gráfico com os novos dados

    // Atualiza as estatísticas exibidas abaixo do gráfico
    updateStats(history);
}

/**
 * Função que calcula e exibe estatísticas do histórico de emoções
 * @param {Array} history - Array com o histórico de emoções
 */
function updateStats(history) {
    // Se não há registros, exibe mensagem informativa
    if (history.length === 0) {
        chartStats.innerHTML = '<p style="text-align: center; color: #a0aec0; padding: 20px;">📝 Nenhum registro ainda. Comece a registrar suas emoções! 😊</p>';
        return;
    }

    // Objeto que contará quantas vezes cada emoção foi registrada
    const emotionCount = {};
    history.forEach(entry => {
        // Incrementa o contador da emoção ou inicializa em 1 se não existir
        emotionCount[entry.emotion] = (emotionCount[entry.emotion] || 0) + 1;
    });

    // Encontra a emoção mais comum usando reduce
    // Compara os valores de cada emoção e retorna a que tem maior contagem
    const mostCommon = Object.keys(emotionCount).reduce((a, b) =>
        emotionCount[a] > emotionCount[b] ? a : b
    );

    // Filtra apenas registros com valores válidos para calcular a média
    const validValues = history.filter(entry => entry.value != null && !isNaN(entry.value));

    // Calcula o humor médio de todos os registros válidos
    const avgMood = validValues.length > 0
        ? validValues.reduce((sum, entry) => sum + entry.value, 0) / validValues.length
        : 0;

    // Determina qual emoji representa melhor o humor médio
    let avgEmoji = '😊';
    if (avgMood >= 10) avgEmoji = '🤩';      // Muito feliz
    else if (avgMood >= 7) avgEmoji = '😊';  // Feliz
    else if (avgMood >= 5) avgEmoji = '😐';  // Neutro
    else if (avgMood >= 3) avgEmoji = '😟';  // Preocupado
    else avgEmoji = '😢';                    // Triste

    // Atualiza o HTML com as três estatísticas principais
    chartStats.innerHTML = `
        <div class="stat-card">
            <span class="stat-emoji">${humores[mostCommon].emoji}</span>
            <div class="stat-label">Mais Frequente</div>
            <div class="stat-value">${emotionCount[mostCommon]}x</div>
        </div>
        <div class="stat-card">
            <span class="stat-emoji">📊</span>
            <div class="stat-label">Total de Registros</div>
            <div class="stat-value">${history.length}</div>
        </div>
        <div class="stat-card">
            <span class="stat-emoji">${avgEmoji}</span>
            <div class="stat-label">Humor Médio</div>
            <div class="stat-value">${validValues.length > 0 ? avgMood.toFixed(1) : 'N/A'}/12</div>
        </div>
    `;
}

// Event Listeners - Abas do gráfico

/**
 * Adiciona funcionalidade de troca entre as abas "Semana" e "Mês"
 * Quando uma aba é clicada, ela se torna ativa e o gráfico é atualizado
 */
document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        // Remove a classe 'active' de todas as abas
        document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
        // Adiciona a classe 'active' na aba clicada
        this.classList.add('active');
        // Atualiza o gráfico com o período da aba (week ou month)
        updateChart(this.dataset.period);
    });
});

// Sistema de partículas

/**
 * Cria partículas animadas que explodem de um ponto central
 * Usado para feedback visual quando o usuário interage com elementos
 * @param {number} x - Posição X de onde as partículas vão surgir
 * @param {number} y - Posição Y de onde as partículas vão surgir
 * @param {number} count - Quantidade de partículas a criar (padrão: 8)
 */

function createParticles(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
        // Cria um elemento div que representará uma partícula
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Define tamanho aleatório para a partícula (entre 4px e 12px)
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Posiciona a partícula no ponto inicial
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Array com cores possíveis para as partículas
        const colors = ['#667eea', '#764ba2', '#FFD93D', '#FF6B6B', '#A8E6CF'];
        // Escolhe uma cor aleatória do array
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Calcula o ângulo de direção da partícula
        // Distribui as partículas uniformemente em círculo (360° / count)
        const angle = (Math.PI * 2 * i) / count;

        // Calcula a distância que a partícula vai percorrer (aleatória entre 40 e 120px)
        const distance = Math.random() * 80 + 40;

        // Calcula as coordenadas finais (X e Y) usando trigonometria
        const tx = Math.cos(angle) * distance;  // Movimento horizontal
        const ty = Math.sin(angle) * distance;  // Movimento vertical

        // Define as variáveis CSS customizadas que controlam a animação
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        // Adiciona a partícula ao body da página
        document.body.appendChild(particle);

        // Após 10ms, ativa a animação da partícula
        setTimeout(() => particle.classList.add('active'), 10);

        // Remove a partícula do DOM após 800ms (quando a animação termina)
        setTimeout(() => particle.remove(), 800);
    }
}

/**
 * Cria um efeito de confete com movimento mais aleatório
 * Similar às partículas, mas com mais elementos e física diferente
 * @param {number} x - Posição X de origem
 * @param {number} y - Posição Y de origem
 */
function createConfetti(x, y) {
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'particle';

        // Tamanho aleatório do confete (entre 3px e 9px)
        const size = Math.random() * 6 + 3;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';

        // 50% de chance de ser redondo ou quadrado
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

        // Array com cores vibrantes para o confete
        const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D8DF1', '#FF9AA2'];
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Ângulo completamente aleatório (0 a 360 graus)
        const angle = Math.random() * Math.PI * 2;

        // Velocidade aleatória (entre 80 e 200px)
        const velocity = Math.random() * 120 + 80;

        // Calcula posição final usando trigonometria
        const tx = Math.cos(angle) * velocity;
        // Subtrai 40 para dar um efeito de "subida" inicial (movimento para cima)
        const ty = Math.sin(angle) * velocity - 40;

        // Define as variáveis CSS para a animação
        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--ty', ty + 'px');

        // Adiciona o confete ao DOM
        document.body.appendChild(confetti);

        // Ativa a animação após 10ms
        setTimeout(() => confetti.classList.add('active'), 10);

        // Remove o confete após a animação terminar (800ms)
        setTimeout(() => confetti.remove(), 800);
    }
}

// Event Listeners - Interações do usuário

/**
 * Event listener para quando o usuário muda a seleção do dropdown
 * Atualiza o emoji exibido IMEDIATAMENTE, sem delay
 */

select.addEventListener("change", function () {
    const valor = select.value; // Pega o valor selecionado no dropdown

    // Verifica se há um valor válido selecionado e se existe no objeto humores
    if (valor && humores[valor]) {
        // Atualiza o emoji exibido com o emoji correspondente ao humor
        emojiDisplay.textContent = humores[valor].emoji;

        // Adiciona classe para animação de mudança
        emojiDisplay.classList.add("change");

        // Remove a classe após 400ms para permitir nova animação
        setTimeout(() => {
            emojiDisplay.classList.remove("change");
        }, 400);

        // Obtém as dimensões e posição do select na tela
        const rect = select.getBoundingClientRect();
        // Cria partículas no centro do select (largura/2, altura/2)
        createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 6);
    } else {
        // Se não há seleção válida, mostra emoji de pensamento
        emojiDisplay.textContent = "💭";
    }
});

/**
 * Event listener do botão "Mostrar Mensagem"
 * Valida a seleção, salva a emoção e exibe o modal
 */
btn.addEventListener("click", function (e) {
    const valor = select.value; // Pega o valor selecionado

    // Obtém posição do botão para criar confete
    const rect = btn.getBoundingClientRect();
    createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Validação: verifica se o usuário selecionou alguma opção
    if (!valor) {
        // Se não selecionou, mostra mensagem de aviso
        modalMessage.textContent = "Por favor, selecione uma opção válida para continuar.";
        modalEmoji.textContent = "⚠️";
        // Define cores neutras/cinza para o aviso
        document.body.style.background = "linear-gradient(135deg, #E8E8E8 0%, #D0D0D0 100%)";
        mainContainer.style.background = "rgba(255, 255, 255, 0.95)";
        // Exibe o modal e o botão de reset
        modalOverlay.classList.add("show");
        btnReset.classList.add("show");
        return; // Interrompe a execução da função aqui
    }

    // Busca as configurações do humor selecionado
    const humorSelecionado = humores[valor];

    // Salva a emoção no localStorage
    saveEmotion(valor);

    // Atualiza a mensagem e emoji do modal
    modalMessage.textContent = humorSelecionado.mensagem;
    modalEmoji.textContent = humorSelecionado.emoji;

    // Aplica o gradiente de fundo correspondente ao humor
    document.body.style.background = humorSelecionado.background;
    mainContainer.style.background = humorSelecionado.containerBg;

    // Atualiza o emoji grande exibido
    emojiDisplay.textContent = humorSelecionado.emoji;

    // Exibe o modal e o botão de reset
    modalOverlay.classList.add("show");
    btnReset.classList.add("show");
});

/**
 * Event listener para fechar o modal ao clicar no botão de fechar (X)
 */
modalClose.addEventListener("click", function () {
    modalOverlay.classList.remove("show"); // Remove a classe que torna o modal visível
});

/**
 * Event listener para fechar o modal ao clicar fora dele (no overlay escuro)
 * Verifica se o clique foi exatamente no overlay e não em seus elementos filhos
 */
modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("show");
    }
});

/**
 * Event listener do botão Reset
 * Restaura o estado inicial da aplicação
 */
btnReset.addEventListener("click", function (e) {
    // Obtém posição do botão para criar partículas
    const rect = btnReset.getBoundingClientRect();
    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 6);

    // Limpa a seleção do dropdown
    select.value = "";

    // Esconde o botão de reset
    btnReset.classList.remove("show");

    // Restaura o gradiente de fundo padrão (roxo)
    document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    mainContainer.style.background = "rgba(255, 255, 255, 0.95)";

    // Restaura o emoji padrão (pensamento)
    emojiDisplay.textContent = "💭";
});

/**
 * Event listener para permitir enviar o formulário pressionando Enter
 * Quando o select está focado e o usuário aperta Enter, simula clique no botão
 */
select.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        btn.click(); // Dispara o evento de clique do botão
    }
});

// ============================================
// EFEITO PARALLAX 3D
// ============================================

// Variáveis de controle do efeito parallax
let isMouseOver = false; // Flag para saber se o mouse está sobre o container
let rafId = null;        // ID do requestAnimationFrame (para otimização)

/**
 * Event listener que detecta quando o mouse entra no container
 */
container.addEventListener("mouseenter", function () {
    isMouseOver = true; // Marca que o mouse entrou
});

/**
 * Event listener que detecta quando o mouse sai do container
 * Restaura a posição original do container
 */
container.addEventListener("mouseleave", function () {
    isMouseOver = false; // Marca que o mouse saiu
    container.style.transform = ""; // Remove a transformação 3D

    // Cancela qualquer animação pendente para economizar recursos
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
});

/**
 * Event listener que cria o efeito parallax 3D
 * O container "acompanha" o movimento do mouse com rotação suave
 */
document.addEventListener("mousemove", function (e) {
    // Só executa se o mouse estiver sobre o container e não há animação em andamento
    if (!isMouseOver || rafId) return;

    // requestAnimationFrame otimiza a performance da animação
    // Sincroniza com a taxa de atualização da tela (normalmente 60fps)
    rafId = requestAnimationFrame(() => {
        // Obtém as dimensões e posição do container
        const rect = container.getBoundingClientRect();

        // Calcula o centro do container
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calcula a distância do mouse em relação ao centro (normalizada entre -1 e 1)
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        // Calcula os ângulos de rotação (multiplicados por 5 para efeito mais visível)
        const rotateY = deltaX * 5;  // Rotação horizontal
        const rotateX = -deltaY * 5; // Rotação vertical (negativo para inverter direção)

        // Aplica a transformação 3D ao container
        container.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

        // Libera o rafId para permitir nova animação
        rafId = null;
    });
});

// Variáveis para detectar triplo clique no emoji
let clickCount = 0;   // Contador de cliques
let clickTimer = null; // Timer para resetar o contador

/**
 * Easter egg: triplo clique no emoji exibe uma animação especial
 * Um "segredo" divertido para os usuários descobrirem
 */
emojiDisplay.addEventListener("click", function () {
    clickCount++; // Incrementa o contador a cada clique

    // Se já existe um timer ativo, cancela ele
    if (clickTimer) {
        clearTimeout(clickTimer);
    }

    // Cria novo timer que reseta o contador após 500ms
    // Isso significa que os 3 cliques precisam acontecer em menos de 0.5 segundos
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 500);

    // Se chegou a 3 cliques, ativa o easter egg
    if (clickCount === 3) {
        // Obtém posição do emoji para criar confete
        const rect = emojiDisplay.getBoundingClientRect();
        // Cria confete duas vezes para efeito mais intenso
        createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

        // Exibe mensagem especial no modal
        modalMessage.textContent = "🎉 Você encontrou o easter egg! Continue explorando suas emoções! 🎊";
        modalEmoji.textContent = "🎉";

        // Aplica gradiente colorido e vibrante
        document.body.style.background = "linear-gradient(135deg, #FFD93D 0%, #FF6B6B 50%, #667eea 100%)";

        // Mostra o modal e o botão de reset
        modalOverlay.classList.add("show");
        btnReset.classList.add("show");

        // Reseta o contador de cliques
        clickCount = 0;
    }
});

// Inicialização da aplicação

/**
 * Event listener que executa quando a página termina de carregar
 * Inicializa o gráfico e carrega dados salvos
 */
window.addEventListener("load", function () {
    console.log('🚀 Iniciando Humormômetro...');

    // Verifica se a biblioteca Chart.js foi carregada corretamente
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js não foi carregado!');
        // Exibe mensagem de erro ao usuário
        chartStats.innerHTML = '<p style="text-align: center; color: #ff6b6b; padding: 20px;">⚠️ Erro ao carregar o gráfico. Recarregue a página.</p>';
        return; // Interrompe a inicialização
    }

    // Bloco try-catch para capturar erros durante a inicialização
    try {
        // Inicializa o gráfico Chart.js
        initChart();
        console.log('✅ Gráfico inicializado');

        // Carrega o histórico de emoções do localStorage
        const history = getEmotionHistory();
        console.log('📂 Histórico carregado:', history.length, 'registros');

        // Atualiza o gráfico com os dados carregados (período: semana)
        updateChart('week');
        console.log('✅ Gráfico atualizado com dados');
    } catch (error) {
        // Se houver erro, captura e exibe mensagem
        console.error('❌ Erro ao inicializar gráfico:', error);
        chartStats.innerHTML = '<p style="text-align: center; color: #ff6b6b; padding: 20px;">⚠️ Erro ao inicializar o gráfico.</p>';
    }

    console.log('✅ Humormômetro carregado com sucesso!');
});
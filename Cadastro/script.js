// Seleciona o container onde os ícones serão adicionados
const iconContainer = document.getElementById('iconContainer');

// Número total de ícones que aparecerão na tela
const iconCount = 60;

// Array com os ícones de programação (classe Font Awesome e nome)
const iconSet = [
    { class: 'fa-brands fa-js', name: 'JavaScript' },
    { class: 'fa-brands fa-python', name: 'Python' },
    { class: 'fa-brands fa-html5', name: 'HTML5' },
    { class: 'fa-brands fa-css3-alt', name: 'CSS3' },
    { class: 'fa-brands fa-php', name: 'PHP' },
    { class: 'fa-brands fa-java', name: 'Java' },
    { class: 'fa-solid fa-database', name: 'SQL' },
    { class: 'fa-brands fa-golang', name: 'Go' },
    { class: 'fa-solid fa-gem', name: 'Ruby' },
    { class: 'fa-solid fa-code', name: 'TypeScript' }
];

// Classe que cria e gerencia cada ícone animado
class ProgrammingIcon {
    constructor() {
        // Cria um elemento <i> para o ícone
        this.element = document.createElement('i');

        // Seleciona aleatoriamente um ícone do conjunto
        const iconData = iconSet[Math.floor(Math.random() * iconSet.length)];

        // Define a classe do ícone (Font Awesome + classe customizada)
        this.element.className = `icon ${iconData.class}`;

        // Define posição inicial aleatória dentro da tela
        this.element.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
        this.element.style.top = `${Math.random() * (window.innerHeight - 30)}px`;

        // Define velocidades aleatórias de movimento em X e Y
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;

        // Define opacidade inicial aleatória
        this.opacity = Math.random() * 0.4 + 0.4;
        this.element.style.opacity = this.opacity;

        // Flag para indicar se o ícone está "explodindo"
        this.isExploding = false;

        // Adiciona o ícone ao container
        iconContainer.appendChild(this.element);

        // Evento de clique para criar efeito de fogos de artifício
        this.element.addEventListener('click', () => {
            if (this.isExploding) return; // Evita múltiplas explosões simultâneas
            this.isExploding = true;

            // Esconde o ícone durante a "explosão"
            this.element.style.opacity = 0;

            // Cria 8 partículas para efeito visual
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                // Define direção e distância aleatória da partícula
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 30 + 20;
                particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

                // Posição inicial da partícula igual à do ícone
                particle.style.left = this.element.style.left;
                particle.style.top = this.element.style.top;

                // Adiciona a partícula ao container
                iconContainer.appendChild(particle);

                // Remove a partícula após 500ms (fim da animação)
                setTimeout(() => particle.remove(), 500);
            }

            // Restaura o ícone após a animação das partículas
            setTimeout(() => {
                this.element.style.opacity = this.opacity;
                this.isExploding = false;
            }, 500);
        });
    }

    // Atualiza a posição e opacidade do ícone a cada frame
    update() {
        if (this.isExploding) return;

        let x = parseFloat(this.element.style.left);
        let y = parseFloat(this.element.style.top);

        // Atualiza a posição com base na velocidade
        x += this.speedX;
        y += this.speedY;

        // Faz a opacidade variar levemente
        this.opacity = Math.max(0.4, this.opacity - 0.002 * Math.random());

        // Reverte a direção se atingir borda da tela
        if (x < 0 || x > window.innerWidth - 30) this.speedX *= -1;
        if (y < 0 || y > window.innerHeight - 30) this.speedY *= -1;

        // Mantém a opacidade dentro do intervalo permitido
        if (this.opacity < 0.4) this.opacity = Math.random() * 0.4 + 0.4;

        // Atualiza a posição e opacidade no DOM
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.opacity = this.opacity;
    }
}

// Função que inicializa todos os ícones
function initIcons() {
    for (let i = 0; i < iconCount; i++) {
        icons.push(new ProgrammingIcon());
    }
}

// Função que anima todos os ícones continuamente
function animateIcons() {
    icons.forEach(icon => icon.update());
    requestAnimationFrame(animateIcons);
}

// Array que armazenará todos os ícones
const icons = [];
initIcons();        // Cria os ícones
animateIcons();     // Inicia a animação

// Ajusta a posição dos ícones quando a janela é redimensionada
window.addEventListener('resize', () => {
    icons.forEach(icon => {
        let x = parseFloat(icon.element.style.left);
        let y = parseFloat(icon.element.style.top);
        if (x > window.innerWidth - 30) icon.element.style.left = `${window.innerWidth - 30}px`;
        if (y > window.innerHeight - 30) icon.element.style.top = `${window.innerHeight - 30}px`;
    });
});


// ===================== FORMULÁRIO =====================

// Função que trata o envio do formulário
function handleSubmit(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os valores dos campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Seleciona os elementos de erro e sucesso
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');

    let isValid = true;

    // Reset das mensagens de erro e sucesso
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    successMessage.style.display = 'none';
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    passwordError.classList.remove('show');
    successMessage.classList.remove('show');

    // Validação do nome
    if (name.trim() === '') {
        nameError.style.display = 'block';
        nameError.classList.add('show');
        isValid = false;
    }

    // Validação do email
    if (!email.includes('@') || email.trim() === '') {
        emailError.style.display = 'block';
        emailError.classList.add('show');
        isValid = false;
    }

    // Validação da senha
    if (password.length < 6) {
        passwordError.style.display = 'block';
        passwordError.classList.add('show');
        isValid = false;
    }

    // Se todos os campos forem válidos, exibe mensagem de sucesso
    if (isValid) {
        successMessage.style.display = 'block';
        successMessage.classList.add('show');
        document.getElementById('myForm').reset(); // Limpa o formulário

        // Remove a mensagem de sucesso após 4 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.style.display = 'none';
        }, 4000);
    }
}

// ===================== VALIDAÇÃO EM TEMPO REAL =====================

// Validação do campo nome enquanto o usuário digita
document.getElementById('name').addEventListener('input', function () {
    const nameError = document.getElementById('nameError');
    if (this.value.trim() === '') {
        nameError.style.display = 'block';
        nameError.classList.add('show');
    } else {
        nameError.style.display = 'none';
        nameError.classList.remove('show');
    }
});

// Validação do campo email enquanto o usuário digita
document.getElementById('email').addEventListener('input', function () {
    const emailError = document.getElementById('emailError');
    if (!this.value.includes('@') || this.value.trim() === '') {
        emailError.style.display = 'block';
        emailError.classList.add('show');
    } else {
        emailError.style.display = 'none';
        emailError.classList.remove('show');
    }
});

// Validação do campo senha enquanto o usuário digita
document.getElementById('password').addEventListener('input', function () {
    const passwordError = document.getElementById('passwordError');
    if (this.value.length < 6) {
        passwordError.style.display = 'block';
        passwordError.classList.add('show');
    } else {
        passwordError.style.display = 'none';
        passwordError.classList.remove('show');
    }
});

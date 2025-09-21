// Seleciona o container onde os ícones serão adicionados
const iconContainer = document.getElementById('iconContainer');

// Define a quantidade total de ícones que aparecerão na tela
const iconCount = 60;

// Conjunto de ícones de programação e tecnologia, com classes do Font Awesome
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

// Classe que representa cada ícone animado na tela
class ProgrammingIcon {
    constructor() {
        // Cria o elemento <i> para o ícone
        this.element = document.createElement('i');

        // Seleciona aleatoriamente um ícone do conjunto
        const iconData = iconSet[Math.floor(Math.random() * iconSet.length)];

        // Define a classe CSS e o ícone do Font Awesome
        this.element.className = `icon ${iconData.class}`;

        // Posição inicial aleatória dentro da janela
        this.element.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
        this.element.style.top = `${Math.random() * (window.innerHeight - 30)}px`;

        // Velocidade de movimento aleatória
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;

        // Opacidade inicial aleatória
        this.opacity = Math.random() * 0.4 + 0.4;
        this.element.style.opacity = this.opacity;

        // Flag para verificar se o ícone está explodindo (efeito de partículas)
        this.isExploding = false;

        // Adiciona o ícone ao container
        iconContainer.appendChild(this.element);

        // Evento de clique para criar efeito de "fogos de artifício"
        this.element.addEventListener('click', () => {
            if (this.isExploding) return; // evita múltiplos cliques simultâneos
            this.isExploding = true;
            this.element.style.opacity = 0; // esconde o ícone durante a explosão

            // Cria 8 partículas ao redor do ícone
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 30 + 20; // distância aleatória de 20-50px
                particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
                particle.style.left = this.element.style.left;
                particle.style.top = this.element.style.top;
                iconContainer.appendChild(particle);

                // Remove a partícula após 500ms (fim da animação)
                setTimeout(() => particle.remove(), 500);
            }

            // Restaura o ícone após a animação de partículas
            setTimeout(() => {
                this.element.style.opacity = this.opacity;
                this.isExploding = false;
            }, 500);
        });
    }

    // Atualiza posição e opacidade do ícone a cada frame
    update() {
        if (this.isExploding) return; // não movimenta ícone durante explosão

        let x = parseFloat(this.element.style.left);
        let y = parseFloat(this.element.style.top);
        x += this.speedX;
        y += this.speedY;

        // Opacidade diminui levemente ao longo do tempo
        this.opacity = Math.max(0.4, this.opacity - 0.002 * Math.random());

        // Inverte a direção se atingir bordas da janela
        if (x < 0 || x > window.innerWidth - 30) this.speedX *= -1;
        if (y < 0 || y > window.innerHeight - 30) this.speedY *= -1;

        // Garante que a opacidade mínima seja 0.4
        if (this.opacity < 0.4) this.opacity = Math.random() * 0.4 + 0.4;

        // Aplica novas posições e opacidade
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.opacity = this.opacity;
    }
}

// Inicializa todos os ícones na tela
function initIcons() {
    for (let i = 0; i < iconCount; i++) {
        icons.push(new ProgrammingIcon());
    }
}

// Função de animação contínua usando requestAnimationFrame
function animateIcons() {
    icons.forEach(icon => icon.update());
    requestAnimationFrame(animateIcons);
}

// Array que armazenará todos os ícones
const icons = [];
initIcons();
animateIcons();

// Ajusta posições dos ícones quando a janela é redimensionada
window.addEventListener('resize', () => {
    icons.forEach(icon => {
        let x = parseFloat(icon.element.style.left);
        let y = parseFloat(icon.element.style.top);
        if (x > window.innerWidth - 30) icon.element.style.left = `${window.innerWidth - 30}px`;
        if (y > window.innerHeight - 30) icon.element.style.top = `${window.innerHeight - 30}px`;
    });
});

// ============================
// Formulário - Validação e Envio
// ============================

// Função que gerencia o envio do formulário
function handleSubmit(event) {
    event.preventDefault(); // impede envio padrão do formulário

    // Seleciona os valores dos campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Seleciona elementos de erro e sucesso
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');

    let isValid = true;

    // Reseta mensagens de erro e sucesso
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
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

    // Se todos os campos forem válidos
    if (isValid) {
        successMessage.classList.add('show');
        document.getElementById('myForm').reset(); // reseta o formulário
        // Remove mensagem de sucesso após 4 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 4000);
    }
}

// ============================
// Validação em tempo real
// ============================

// Validação em tempo real do campo nome
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

// Validação em tempo real do campo email
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

// Validação em tempo real do campo senha
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

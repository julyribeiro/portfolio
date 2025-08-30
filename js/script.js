// ================================
// Animação de Digitação (Typewriter)
// ================================

// Elemento onde o texto digitado aparecerá
const typedEl = document.getElementById("typed");

// Frases que irão aparecer em loop na animação
const phrases = [
  "Desenvolvedora Front-end",
  "Criando com paixão",
  "Transformando ideias em código",
  "Bem-vindo ao meu portfólio!"
];

// Controle da digitação
let phraseIndex = 0;      // Índice da frase atual
let charIndex = 0;        // Índice da letra atual
let isDeleting = false;   // Estado: escrevendo ou apagando

// Velocidades e pausas (em ms)
const typingSpeed = 100;      // Velocidade ao digitar
const deletingSpeed = 50;     // Velocidade ao apagar
const pauseBeforeNext = 1500; // Pausa antes de começar a próxima frase

// Função principal da animação de digitação
function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    // Apaga uma letra
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Digita uma letra
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  // Se terminou de digitar a frase → começa a apagar depois de uma pausa
  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => (isDeleting = true), pauseBeforeNext);
  }
  // Se terminou de apagar → passa para a próxima frase
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length; // Volta para a primeira ao final
  }

  // Define a velocidade atual (digitar ou apagar)
  const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeWriter, currentSpeed);
}

// ================================
// Toggle de Tema (Claro ↔ Escuro)
// ================================

// Botão que ativa a troca de tema
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Recupera o tema salvo no navegador (localStorage) ou define o padrão
const currentTheme = localStorage.getItem("theme") || "light-theme";

// Aplica o tema atual no body
body.classList.add(currentTheme);

// Define o ícone inicial do botão conforme o tema
themeToggleBtn.innerHTML =
  currentTheme === "dark-theme"
    ? '<i class="fas fa-sun"></i>'   // ícone de sol no tema escuro
    : '<i class="fas fa-moon"></i>'; // ícone de lua no tema claro

// Evento de clique no botão de toggle
themeToggleBtn.addEventListener("click", () => {
  if (body.classList.contains("light-theme")) {
    // Muda para dark mode
    body.classList.replace("light-theme", "dark-theme");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark-theme"); // salva no navegador
  } else {
    // Muda para light mode
    body.classList.replace("dark-theme", "light-theme");
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light-theme"); // salva no navegador
  }
});

// ================================
// Animação de Scroll (revela seções ao aparecer na tela)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  // Configurações do observer (gatilho quando 10% da seção aparece na tela)
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  // Fallback: se JS falhar, todas as seções ficam visíveis
  sections.forEach((section) => {
    section.classList.add("section-visible");
  });

  // Se o navegador suporta IntersectionObserver → aplica animação de entrada
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    }, observerOptions);

    // Observa cada seção
    sections.forEach((section) => observer.observe(section));
  }

  // Inicia a animação de digitação
  typeWriter();
});

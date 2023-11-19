// Mudar os links ativos da navbar de acordo com a section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };

    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // Desativar o navbar e voltar o icone quando clicar em um link da navbar ou scrollar
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Mudar o icone da navbar e ativar a navbar ao clicar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll reveal
ScrollReveal({
    reset: true,
    distance: '50px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.heading', { origin: 'top' });
ScrollReveal().reveal('.formacao, .sobre-img img', { origin: 'left' });
ScrollReveal().reveal('.sobre-content h3, .sobre-content p', { origin: 'right' });
ScrollReveal().reveal('.portfolio-box, .contato form, .sobre-content a', { origin: 'bottom' });
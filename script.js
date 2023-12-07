// Mudar os links ativos da navbar de acordo com a section
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((links) => {
                links.classList.remove("active");
                document
                    .querySelector("header nav a[href*=" + id + "]")
                    .classList.add("active");
            });
        }
    });

    let header = document.querySelector("header");

    header.classList.toggle("sticky", window.scrollY > 100);

    // Desativar o navbar e voltar o icone quando clicar em um link da navbar ou scrollar
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

// Mudar o icone da navbar e ativar a navbar ao clicar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

// Scroll reveal
ScrollReveal({
    reset: true,
    distance: "50px",
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal(".heading, .sobre-content h3", { origin: "top" });
ScrollReveal().reveal(".formacao, .sobre-img img", { origin: "left" });
ScrollReveal().reveal(
    ".portfolio-box, .contato form, .sobre-content a, .sobre-content p, .icons",
    { origin: "bottom" }
);

// Formulário de Contato
const form = document.querySelector("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const assunto = document.getElementById("assunto");
const mensagem = document.getElementById("mensagem");

function enviarEmail() {
    const body = `Nome: ${nome.value}<br> 
                  Email: ${email.value}<br>  
                  Telefone: ${phone.value}<br>
                  Mensagem: ${mensagem.value}`;

    Email.send({
        SecureToken: "1dfa13f1-ea22-4655-a4c9-0acc3bd6f5d4",
        To: "contato.michellpereira@gmail.com",
        From: "contato.michellpereira@gmail.com",
        Subject: assunto.value,
        Body: body,
    }).then((message) => {
        if (message == "OK") {
            Swal.fire({
                title: "Sucesso!",
                text: "Mensagem enviada com sucesso!",
                icon: "success",
                background: "#323946",
                color: "#fff",
                backdrop: "rgba(0, 0, 0, 0.4)",
                timer: 10000,
                timerProgressBar: true,
            });
            form.reset();
            for (const item of items) {
                item.classList.remove("valido");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao enviar a mensagem! Tente novamente mais tarde.",
                background: "#323946",
                color: "#fff",
                backdrop: "rgba(0, 0, 0, 0.4)",
                timer: 10000,
                timerProgressBar: true,
            });
            console.log("Error: " + message);
            console.log(body);
            console.log(assunto.value);
        }
    });
}

// Checar se o item é válido
const items = document.querySelectorAll(".item");
for (const item of items) {
    item.addEventListener("keyup", () => {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
    });

    item.addEventListener("blur", () => {
        if (item.value != "") {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
            item.classList.add("valido");
        } else {
            item.classList.add("error");
            item.parentElement.classList.add("error");
            item.classList.remove("valido");
        }
    });

    items[1].addEventListener("blur", () => {
        checkEmail();
    });
}

function checarInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });
    }
}

function checkEmail() {
    const emailRegex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
        email.classList.remove("valido");

        if (email.value != "") {
            errorTxtEmail.innerText = "Digite um email válido!";
        } else {
            errorTxtEmail.innerText = "Email não pode ficar em branco!";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
        email.classList.add("valido");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checarInputs();

    if (
        !nome.classList.contains("error") &&
        !email.classList.contains("error") &&
        !phone.classList.contains("error") &&
        !assunto.classList.contains("error") &&
        !mensagem.classList.contains("error")
    ) {
        enviarEmail();
        return false;
    }
});

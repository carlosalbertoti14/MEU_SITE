const linksComSubmenu = document.querySelectorAll("#navmenu > a + ul.submenu");
let submenuAberto = null; // Variável para rastrear o submenu aberto

linksComSubmenu.forEach(function(submenu) {
    const link = submenu.previousElementSibling; // Pega o elemento anterior (o link)

    link.addEventListener("click", function(event) {
        event.preventDefault();

        // Fecha o submenu atualmente aberto, se houver e não for o atual
        if (submenuAberto && submenuAberto !== submenu) {
            submenuAberto.style.display = "none";
        }

        // Abre ou fecha o submenu atual
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";

        // Atualiza a variável de submenu aberto
        submenuAberto = submenu.style.display === "block" ? submenu : null;
    });

    // Adiciona event listener para os cliques dentro do submenu
    submenu.addEventListener("click", function(event) {
        // Verifica se o clique ocorreu em um item do submenu (você pode refinar essa lógica se necessário)
        if (event.target.tagName === 'A' || event.target.tagName === 'LI') {
            // Espera 5 milissegundos e então esconde o menu
            setTimeout(function() {
                submenu.style.display = "none";
                submenuAberto = null; // Reseta a variável
            }, 5);
        }
    });
});

document.addEventListener("click", function(event) {
    // Verifica se o clique ocorreu fora do menu e do link que o abriu
    if (submenuAberto && !submenuAberto.contains(event.target) && !submenuAberto.previousElementSibling.contains(event.target)) {
        // Espera 5 milissegundos e então esconde o menu
        setTimeout(function() {
            if (submenuAberto) {
                submenuAberto.style.display = "none";
                submenuAberto = null; // Reseta a variável
            }
        }, 5);
    }
});

// Event listener para o link "MERCADO" no menu
document.addEventListener('DOMContentLoaded', function() {
    const mostrarMercadoLink = document.getElementById('mostrar-mercado');
    const mercadoDiv = document.getElementById('mercadoDiv'); // Certifique-se de pegar a div aqui!

    if (mostrarMercadoLink && mercadoDiv) {
        mostrarMercadoLink.addEventListener('click', function(event) {
            event.preventDefault();
            mercadoDiv.style.display = mercadoDiv.style.display === 'block' ? 'none' : 'block';
        });
    }
});
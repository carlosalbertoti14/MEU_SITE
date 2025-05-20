document.addEventListener('DOMContentLoaded', function() {
    // Controle de submenus padrão
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

    // Funcionalidade específica para "MOSTRAR MERCADO"
    const mostrarMercadoLink = document.getElementById('mostrar-mercado');
    const mercadoDiv = document.getElementById('mercadoDiv');

    if (mostrarMercadoLink && mercadoDiv) {
        mostrarMercadoLink.addEventListener('click', function(event) {
            event.preventDefault();
            mercadoDiv.style.display = mercadoDiv.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Funcionalidade específica para "CALCULOS DINÂMICOS"
    const mostrarSomaDinamicaLink = document.getElementById('mostrar-soma_dinamica');
    const somaDinamicaDiv = document.getElementById('soma_dinamica');

    if (mostrarSomaDinamicaLink && somaDinamicaDiv) {
        mostrarSomaDinamicaLink.addEventListener('click', function(event) {
            event.preventDefault();
            somaDinamicaDiv.style.display = somaDinamicaDiv.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Funcionalidade para o botão "Fechar Comparativo" dentro de "CALCULOS DINÂMICOS"
    const fecharSomaDinamicaButton = document.getElementById('fechar-soma_dinamica');

    if (fecharSomaDinamicaButton && somaDinamicaDiv) {
        fecharSomaDinamicaButton.addEventListener('click', function() {
            somaDinamicaDiv.style.display = 'none'; // Força o fechamento ao clicar no botão
        });
    }

    // Funcionalidade para o botão "Resetar Valores" dentro de "CALCULOS DINÂMICOS"
    const resetarValoresButton = document.getElementById('resetar-valores');

    if (resetarValoresButton && somaDinamicaDiv) {
        resetarValoresButton.addEventListener('click', function() {
            const inputsParaResetar = somaDinamicaDiv.querySelectorAll('input[type="number"], input[type="text"]');
            inputsParaResetar.forEach(input => {
                input.value = '';
            });
            // Adicione aqui a lógica para resetar outros elementos dentro de soma_dinamica, se necessário.
        });
    }
});
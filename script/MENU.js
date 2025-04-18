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
});

document.addEventListener("click", function(event) {
    // Verifica se o clique ocorreu fora do menu e do link que o abriu
    if (submenuAberto && !submenuAberto.contains(event.target) && !submenuAberto.previousElementSibling.contains(event.target)) {
        submenuAberto.style.display = "none";
        submenuAberto = null; // Reseta a variável
    }
});
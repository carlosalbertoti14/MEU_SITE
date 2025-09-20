// Função para ocultar as divs
function ocultarDivs() {
  const idsParaOcultar = [
    "planilhas_section",
    "invencoes_section",
    "sites",
    "mercado",
    "soma_dinamica",
    "sites_criados",
    "cur_habilidades",
    "curricuro"
  ];

  idsParaOcultar.forEach(id => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.style.display = "none";
    }
  });
}

// Adiciona os eventos de clique somente aos links principais com os novos IDs
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("home_MENU").addEventListener('click', function(event) {
    event.preventDefault(); 
    ocultarDivs();
  });
  
  document.getElementById("projetos_MENU").addEventListener('click', function(event) {
    event.preventDefault(); 
    ocultarDivs();
  });

  document.getElementById("utilitarios_MENU").addEventListener('click', function(event) {
    event.preventDefault(); 
    ocultarDivs();
  });

  document.getElementById("sobremim_MENU").addEventListener('click', function(event) {
    event.preventDefault(); 
    ocultarDivs();
  });
});
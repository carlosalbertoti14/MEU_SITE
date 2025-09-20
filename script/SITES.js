document.addEventListener('DOMContentLoaded', function() {
    // Função para esconder todas as seções com a classe 'conteudo-secao'
    function esconderTodasAsSecoes() {
        const secoes = document.querySelectorAll('.conteudo-secao');
        secoes.forEach(secao => {
            secao.style.display = 'none';
        });
    }

    // -------------------- LÓGICA PARA SITES ÚTEIS --------------------
    const sitesUteisLink = document.getElementById('sites_uteis');
    const fecharSitesBtn = document.getElementById('fechar-sites_uteis');
    const sitesDiv = document.getElementById('sites');
    
    // Este trecho mostra a div dos sites
    sitesUteisLink.addEventListener('click', function(event) {
        event.preventDefault(); // Impede que a página recarregue
        esconderTodasAsSecoes(); // Esconde todas as outras seções
        sitesDiv.style.display = 'block'; // Mostra a seção de sites úteis
    });

    // Este trecho é o que fecha a div, ele já está correto.
    fecharSitesBtn.addEventListener('click', function() {
        sitesDiv.style.display = 'none'; // Oculta a seção de sites úteis
    });

    // -------------------- LÓGICA PARA SITES CRIADOS --------------------
    // Adicionei um exemplo para você ver como funciona.
    // A div `sites_criados` precisa existir no seu HTML.
    const sitesCriadosLink = document.getElementById('mostrar_sites_criados');
    const sitesCriadosDiv = document.getElementById('sites_criados');
    if (sitesCriadosLink && sitesCriadosDiv) {
        sitesCriadosLink.addEventListener('click', function(event) {
            event.preventDefault();
            esconderTodasAsSecoes();
            sitesCriadosDiv.style.display = 'block';
        });
    }

    // -------------------- LÓGICA PARA CURRÍCULO --------------------
    const curriculoLink = document.getElementById('mostrar-curriculo');
    const curriculoDiv = document.getElementById('curricuro');
    const fecharCurriculoBtn = document.getElementById('fechar_curriculo');
    if (curriculoLink && curriculoDiv) {
        curriculoLink.addEventListener('click', function(event) {
            event.preventDefault();
            esconderTodasAsSecoes();
            curriculoDiv.style.display = 'block';
        });
    }
    if (fecharCurriculoBtn) {
        fecharCurriculoBtn.addEventListener('click', function() {
            curriculoDiv.style.display = 'none';
        });
    }
});
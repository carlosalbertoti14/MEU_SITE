// --- Lógica para a seção de CONTATO ---
const contatoLink = document.getElementById('contato_menu');
const contatoSection = document.getElementById('contato');
const fecharContatoBtn = document.getElementById('fechar-contato');

if (contatoLink && contatoSection && fecharContatoBtn) {
    contatoLink.addEventListener('click', function(event) {
        event.preventDefault();

        if (contatoSection.style.display === 'block') {
            contatoSection.style.display = 'none';
        } else {
            contatoSection.style.display = 'block';
        }
    });

    fecharContatoBtn.addEventListener('click', function() {
        contatoSection.style.display = 'none';
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && contatoSection.style.display === 'block') {
            contatoSection.style.display = 'none';
        }
    });
} else {
    console.error("Um ou mais elementos para a seção de CONTATO não foram encontrados!");
}
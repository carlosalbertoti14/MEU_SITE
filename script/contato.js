// --- Lógica para a seção de CONTATO ---
const contatoLink = document.getElementById('contato_menu');
const contatoSection = document.getElementById('contato');
const fecharContatoBtn = document.getElementById('fechar-contato');

if (contatoLink && contatoSection && fecharContatoBtn) {
    contatoLink.addEventListener('click', function(event) {
        event.preventDefault();

        // 1. Torna o elemento visível para que ele ocupe espaço
        contatoSection.style.display = 'block';

        // 2. Aguarda uma pequena pausa para o navegador processar a mudança de display
        // antes de iniciar a transição de opacidade.
        setTimeout(() => {
            contatoSection.classList.add('show');
        }, 10);
    });

    // Lógica para fechar a seção
    function fecharContato() {
        // Remove a classe 'show' para iniciar a transição de fade out
        contatoSection.classList.remove('show');

        // Adiciona um listener para a transição. Quando ela terminar...
        contatoSection.addEventListener('transitionend', function handler(e) {
            // ...se a opacidade for 0, oculta o elemento completamente
            if (e.propertyName === 'opacity' && contatoSection.style.opacity == 0) {
                contatoSection.style.display = 'none';
                
                // Remove o listener para não acumular
                contatoSection.removeEventListener('transitionend', handler);
            }
        });
    }

    fecharContatoBtn.addEventListener('click', fecharContato);
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && contatoSection.style.display === 'block') {
            fecharContato();
        }
    });
} else {
    console.error("Um ou mais elementos para a seção de CONTATO não foram encontrados!");
}
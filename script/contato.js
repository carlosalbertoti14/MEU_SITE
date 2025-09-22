// --- Lógica para a seção de CONTATO ---
const contatoLink = document.getElementById('contato_menu');
const contatoSection = document.getElementById('contato');
const fecharContatoBtn = document.getElementById('fechar-contato');
const telefoneEl = document.getElementById('telefone');
const emailEl = document.getElementById('email');

// Esta é a nova função para copiar o texto
async function copyToClipboard(element, textToCopy) {
    try {
        await navigator.clipboard.writeText(textToCopy);
        alert(`Texto copiado: "${textToCopy}"`); // Alerta simples de confirmação
        element.style.color = 'green'; // Muda a cor para indicar que foi copiado
        setTimeout(() => {
            element.style.color = 'white'; // Retorna a cor original após um tempo
        }, 1000);
    } catch (err) {
        console.error('Falha ao copiar o texto: ', err);
    }
}

if (contatoLink && contatoSection && fecharContatoBtn && telefoneEl && emailEl) {
    contatoLink.addEventListener('click', function(event) {
        event.preventDefault();
        contatoSection.style.display = 'block';
        setTimeout(() => {
            contatoSection.classList.add('show');
        }, 10);
    });

    function fecharContato() {
        contatoSection.classList.remove('show');
        contatoSection.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'opacity' && contatoSection.style.opacity == 0) {
                contatoSection.style.display = 'none';
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

    // Adiciona os event listeners para o telefone e o e-mail
    telefoneEl.addEventListener('click', function() {
        copyToClipboard(this, this.textContent.trim());
    });

    emailEl.addEventListener('click', function() {
        copyToClipboard(this, this.textContent.trim());
    });
} else {
    console.error("Um ou mais elementos para a seção de CONTATO não foram encontrados!");
}
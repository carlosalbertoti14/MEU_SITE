document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos HTML
    // Certifique-se de que este ID corresponda ao ID do link no seu menu
    const fecharCurriculo = document.getElementById('fechar_curriculo');
    const mostrarCurriculopdf = document.getElementById('mostrar-curriculo-menu');
    const mostrarCurriculoLink = document.getElementById('mostrar-curriculo');
    const curriculoDiv2 = document.getElementById('curricuro');
    const curriculoPdfContainer = document.getElementById('curriculo-pdf-container');
    const fecharPdfBtn = document.getElementById('fechar-pdf');

     // Listener para o clique no link "CURRÍCULO" do menu
    if (mostrarCurriculopdf && curriculoPdfContainer) {
        mostrarCurriculopdf.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            curriculoPdfContainer.style.display = 'flex'; // Exibe o container do PDF como flexbox
        });
    } 

    // Listener para o clique no botão "X" de fechar
    if (fecharPdfBtn && curriculoPdfContainer) {
        fecharPdfBtn.addEventListener('click', function() {
            curriculoPdfContainer.style.display = 'none'; // Oculta o container do PDF
        });
    }

    // Opcional: Fechar o PDF ao pressionar a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && curriculoPdfContainer.style.display === 'flex') {
            curriculoPdfContainer.style.display = 'none';
        }
    });


    if (fecharCurriculo && curriculoDiv2) {
        fecharCurriculo.addEventListener('click', function() {
            curriculoDiv2.style.display = 'none'; // Oculta a div do currículo
            // Se o seu cur_CURRICULO for um modal, você pode precisar
            // ocultar também o overlay (fundo escuro) se houver um.
            // Exemplo: document.getElementById('seu_overlay_id').style.display = 'none';
        });
    }


        mostrarCurriculoLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que o link navegue para outra página (se tiver um href)
        // Verifica se a lista já está visível
        if (curriculoDiv2.style.display === 'block') {
            curriculoDiv2.style.display = 'none'; // Se estiver visível, esconde
        } else {
            curriculoDiv2.style.display = 'block'; // Se estiver escondida, mostra
        }
    });

});
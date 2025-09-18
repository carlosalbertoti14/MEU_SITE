document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para a seção de INVENÇÕES ---
    const invencoesLink = document.getElementById('invencoes'); // Link do menu
    const invencoesSection = document.getElementById('invencoes_section'); // A div principal para exibir as invenções
    const fecharInvencoesBtn = document.getElementById('fechar-invencoes'); // Botão de fechar dentro da div de invenções

    // Verifica se todos os elementos existem antes de adicionar os listeners
    if (invencoesLink && invencoesSection && fecharInvencoesBtn) {

        // Listener para o clique no link "INVENÇÕES" do menu
        invencoesLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link

            // Alterna a exibição da div de invenções
            if (invencoesSection.style.display === 'block' || invencoesSection.style.display === 'flex') {
                invencoesSection.style.display = 'none'; // Se estiver visível, esconde
            } else {
                // Você pode querer definir um display específico aqui, dependendo de como você quer que ela apareça.
                // 'block' é comum para seções de conteúdo.
                invencoesSection.style.display = 'block';
            }
        });

        // Listener para o clique no botão "Fechar" da seção de invenções
        fecharInvencoesBtn.addEventListener('click', function() {
            invencoesSection.style.display = 'none'; // Oculta a div de invenções
        });

        // Opcional: Fechar a seção de invenções ao pressionar a tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && invencoesSection.style.display === 'block') {
                invencoesSection.style.display = 'none';
            }
        });

    } else {
        console.error("Um ou mais elementos para a seção de INVENÇÕES não foram encontrados!");
    }

    // --- O restante do seu código JavaScript existente (para Currículo, etc.) ---
    // ... (seu código para currículo, HABILIDADES, etc.) ...

    // Exemplo do seu código de currículo aqui (para garantir que tudo funcione junto)
    const fecharCurriculo = document.getElementById('fechar_curriculo');
    const mostrarCurriculopdf = document.getElementById('mostrar-curriculo-menu');
    const mostrarCurriculoLink = document.getElementById('mostrar-curriculo');
    const curriculoDiv2 = document.getElementById('curricuro');
    const curriculoPdfContainer = document.getElementById('curriculo-pdf-container');
    const fecharPdfBtn = document.getElementById('fechar-pdf');

    if (mostrarCurriculopdf && curriculoPdfContainer) {
        mostrarCurriculopdf.addEventListener('click', function(event) {
            event.preventDefault();
            curriculoPdfContainer.style.display = 'flex';
        });
    }

    if (fecharPdfBtn && curriculoPdfContainer) {
        fecharPdfBtn.addEventListener('click', function() {
            curriculoPdfContainer.style.display = 'none';
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && curriculoPdfContainer.style.display === 'flex') {
            curriculoPdfContainer.style.display = 'none';
        }
    });

    if (fecharCurriculo && curriculoDiv2) {
        fecharCurriculo.addEventListener('click', function() {
            curriculoDiv2.style.display = 'none';
        });
    }

    if (mostrarCurriculoLink) { // Verifique se o elemento existe
        mostrarCurriculoLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (curriculoDiv2.style.display === 'block') {
                curriculoDiv2.style.display = 'none';
            } else {
                curriculoDiv2.style.display = 'block';
            }
        });
    }
});
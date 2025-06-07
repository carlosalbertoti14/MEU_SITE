document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para Habilidades Extracurriculares (existente) ---
    const toggleButton = document.getElementById('cur_habilidades_extra_toggle');
    const contentDiv = document.getElementById('cur_habilidades_extra_conteudo');
    /* const curriculoDiv = document.getElementById('cur_habilidades'); */
    const mostrarhabilidades = document.getElementById('mostrar-habilidades'); // Novo elemento

    if (toggleButton && contentDiv) {
        toggleButton.addEventListener('click', function() {
            if (contentDiv.style.display === 'none') {
                contentDiv.style.display = 'block'; // Mostra o conteúdo
                toggleButton.classList.add('active'); // Adiciona a classe 'active' para mudar o ícone
                toggleButton.querySelector('.cur_toggle_icon').textContent = '−'; // Muda para o sinal de menos
            } else {
                contentDiv.style.display = 'none'; // Oculta o conteúdo
                toggleButton.classList.remove('active'); // Remove a classe 'active'
                toggleButton.querySelector('.cur_toggle_icon').textContent = '+'; // Volta para o sinal de mais
            }
        });
    }

    // --- Nova Lógica para Fechar o Currículo ---
    const fecharCurriculoBtn = document.getElementById('cur_fechar_habilidades');
    const curriculoDiv = document.getElementById('cur_habilidades');

    if (fecharCurriculoBtn && curriculoDiv) {
        fecharCurriculoBtn.addEventListener('click', function() {
            curriculoDiv.style.display = 'none'; // Oculta a div do currículo
            // Se o seu cur_CURRICULO for um modal, você pode precisar
            // ocultar também o overlay (fundo escuro) se houver um.
            // Exemplo: document.getElementById('seu_overlay_id').style.display = 'none';
        });
    }




    // Event listener para o link "curriculo" no menu
    mostrarhabilidades.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que o link navegue para outra página (se tiver um href)
        // Verifica se a lista já está visível
        if (curriculoDiv.style.display === 'block') {
            curriculoDiv.style.display = 'none'; // Se estiver visível, esconde
        } else {
            curriculoDiv.style.display = 'block'; // Se estiver escondida, mostra
        }
    });






});




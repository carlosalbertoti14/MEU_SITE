// --- Lógica para a seção de PLANILHAS ---
const planilhasLink = document.getElementById('planilhas');
const planilhasSection = document.getElementById('planilhas_section');
const fecharPlanilhasBtn = document.getElementById('fechar-planilhas');

if (planilhasLink && planilhasSection && fecharPlanilhasBtn) {
    planilhasLink.addEventListener('click', function(event) {
        event.preventDefault();

        if (planilhasSection.style.display === 'block') {
            planilhasSection.style.display = 'none';
        } else {
            planilhasSection.style.display = 'block';
        }
    });

    fecharPlanilhasBtn.addEventListener('click', function() {
        planilhasSection.style.display = 'none';
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && planilhasSection.style.display === 'block') {
            planilhasSection.style.display = 'none';
        }
    });
} else {
    console.error("Um ou mais elementos para a seção de PLANILHAS não foram encontrados!");
}
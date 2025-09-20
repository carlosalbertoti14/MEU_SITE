document.addEventListener('DOMContentLoaded', function() {
    const shareWhatsappButton = document.getElementById('shareWhatsapp');
    const siteUrl = "https://estudodeprovas.netlify.app/";

    // Função para compartilhar no WhatsApp
    if (shareWhatsappButton) {
        shareWhatsappButton.addEventListener('click', function(event) {
            event.preventDefault();
            const message = `Prepare-se para concursos públicos! Acesse questões atualizadas, gabaritos e resoluções detalhadas em: ${siteUrl}`;
            const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
            window.open(whatsappShareUrl, '_blank');
        });
    }
});
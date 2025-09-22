document.addEventListener('DOMContentLoaded', function() {
    const shareWhatsappButton = document.getElementById('shareWhatsapp');
    const siteUrl = "https://carlosalbertoperfil.netlify.app/";

    // Função para compartilhar no WhatsApp
    if (shareWhatsappButton) {
        shareWhatsappButton.addEventListener('click', function(event) {
            event.preventDefault();
            const message = `Esse é o meu Perfil Pessoal e todas as minhas habilidades e feitos durante minha carreira: ${siteUrl}`;
            const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
            window.open(whatsappShareUrl, '_blank');
        });
    }
});
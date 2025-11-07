// Sistema de senha para download
const SENHA_CORRETA = "898989"; // Altere para a senha que você quiser

function solicitarSenha(event) {
    event.preventDefault(); // Impede o download direto
    
    const senha = prompt("🔒 Digite a senha para download:");
    
    if (senha === SENHA_CORRETA) {
        // Senha correta - inicia o download
        window.location.href = "midia/scripts.rar";
    } else if (senha !== null) {
        // Senha incorreta
        alert("❌ Senha incorreta!");
    }
    // Se clicar em Cancelar, não faz nada
}
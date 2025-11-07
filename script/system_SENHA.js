function solicitarSenha(event) {
    event.preventDefault();
    
   
    const chave = prompt("🔑 Digite a chave numérica para desbloquear o cálculo:");
    
    if (!chave || isNaN(chave)) {
        alert("❌ Chave inválida!");
        return;
    }
    
    const chaveNum = parseFloat(chave);
    
    
    const senha = prompt("🔒 Agora digite a senha do cálculo completo:");
    
    if (senha && !isNaN(senha.replace(',', '.'))) {
        const senhaNum = parseFloat(senha.replace(',', '.'));
        
        
        const outrosNumeros = [27, 343, 2197, 50653]; // Removemos o 27
        let resultado = chaveNum; // Começa com a chave
        
        for (let i = 0; i < outrosNumeros.length; i++) {
            resultado *= Math.cbrt(outrosNumeros[i]);
        }
        
       
        if (Math.abs(senhaNum - resultado) < 0.0001) {
            window.location.href = "midia/scripts.rar";
        } else {
            alert("❌ Senha incorreta!\n\nVerifique a chave e o cálculo.");
        }
    } else if (senha !== null) {
        alert("❌ Senha incorreta!");
    }
}
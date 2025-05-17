document.addEventListener('DOMContentLoaded', function() {
    const mercadoDiv = document.getElementById('mercado');
    const produtos = document.querySelectorAll('.produto-card');
    const nomesProdutos = document.querySelectorAll('.produto-nome');
    const resetarButton = document.getElementById('resetar-valores');
    const fecharButton = document.getElementById('fechar-mercado');
    const mostrarMercadoLink = document.getElementById('mostrar-mercado'); // Novo elemento
    const inputs = {};
    ['produto1', 'produto2', 'produto3'].forEach(produtoId => {
        inputs[produtoId] = {
            valor: document.getElementById(`${produtoId}-valor`),
            volume: document.getElementById(`${produtoId}-volume`),
            qntPac: document.getElementById(`${produtoId}-qnt-pac`),
            qnt2: document.getElementById(`${produtoId}-qnt2`)
        };
    });

function atualizarComparativo() {
    let menorPrecoVolume = Infinity;
    let produtoMenorPrecoNome = '';
    const volumesTotais = {};
    const nomesProdutosMap = {};

    // Primeiro loop: Calcular o volume total e o preço por volume de cada produto
    produtos.forEach(produtoElement => {
        const nomeElement = produtoElement.querySelector('.produto-nome');
        const nomeProduto = nomeElement.textContent;
        const produtoId = nomeElement.dataset.produtoId;
        const valor = parseFloat(inputs[produtoId]?.valor?.value) || 0;
        const volume = parseFloat(inputs[produtoId]?.volume?.value) || 0;
        const qntPac = parseInt(inputs[produtoId]?.qntPac?.value) || 0;
        const qnt2 = parseInt(inputs[produtoId]?.qnt2?.value) || 0;
        const volTotalElement = produtoElement.querySelector('.vol-total');
        const precoVolumeElement = produtoElement.querySelector('.preco-volume');

        // Calcular Vol.TOTAL
        const volTotal = volume * qntPac * qnt2;
        volTotalElement.textContent = volTotal.toFixed(2);
        volumesTotais[produtoId] = volTotal;
        nomesProdutosMap[produtoId] = nomeProduto;

        // Calcular P. Vol.
        let precoVolume = Infinity;
        if (volTotal !== 0) {
            precoVolume = valor / volTotal;
            precoVolumeElement.textContent = `R$ ${precoVolume.toFixed(3)}`;
            if (precoVolume < menorPrecoVolume) {
                menorPrecoVolume = precoVolume;
                produtoMenorPrecoNome = nomeProduto;
            }
        } else {
            precoVolumeElement.textContent = '#DIV/0!';
            precoVolumeElement.style.color = 'red';
        }
    });

    // Segundo loop: Calcular o "Deveria Ser" e o "Pago a Mais" usando o menor preço por volume
    produtos.forEach(produtoElement => {
        const nomeElement = produtoElement.querySelector('.produto-nome');
        const produtoId = nomeElement.dataset.produtoId;
        const valor = parseFloat(inputs[produtoId]?.valor?.value) || 0;
        const volTotal = volumesTotais[produtoId];
        const deveriaSerElement = produtoElement.querySelector('.deveria-ser');
        const pagoAMaisElement = produtoElement.querySelector('.pago-a-mais');
        const pagoAMaisParagrafo = pagoAMaisElement.parentNode;

        // Calcular DEVERIA SER
        let deveriaSer = menorPrecoVolume * volTotal;
        if (menorPrecoVolume === Infinity) {
            deveriaSer = valor; // Se não há preços válidos, o "Deveria Ser" é o próprio valor
        }
        deveriaSerElement.textContent = `R$ ${deveriaSer.toFixed(2)}`;

        // Calcular e exibir PAGO A MAIS (ou a menos)
        const pagoAMais = valor - deveriaSer;
        pagoAMaisElement.textContent = `R$ ${pagoAMais.toFixed(2)}`;

        // Atualizar o texto do parágrafo "Pago a Mais"
        if (pagoAMais < 0) {
            pagoAMaisParagrafo.textContent = `Valor Pago a Menos: `;
            pagoAMaisParagrafo.appendChild(pagoAMaisElement);
        } else if (pagoAMais > 0) {
            pagoAMaisParagrafo.textContent = `Valor Pago a Mais: `;
            pagoAMaisParagrafo.appendChild(pagoAMaisElement);
        } else {
            pagoAMaisParagrafo.textContent = `VALOR: `;
            pagoAMaisParagrafo.appendChild(pagoAMaisElement);
        }
    });

    // Exibir o menor preço (agora o menor preço *por volume*)
    document.getElementById('menor-preco-produto').textContent = produtoMenorPrecoNome;
    document.getElementById('menor-preco-valor').textContent = `R$ ${menorPrecoVolume !== Infinity ? menorPrecoVolume.toFixed(3) : 'N/A'}`;
}


    // Adicionar event listeners para os inputs de valor, volume e quantidade
    for (const produtoId in inputs) {
        for (const campo in inputs[produtoId]) {
            inputs[produtoId][campo].addEventListener('input', atualizarComparativo);
        }
    }

    // Adicionar event listeners para os nomes dos produtos (ao clicar)
    nomesProdutos.forEach(nomeElement => {
        nomeElement.addEventListener('click', function() {
            const novoNome = prompt("Qual nome do produto?");
            if (novoNome !== null && novoNome.trim() !== "") {
                this.textContent = novoNome.trim();
                atualizarComparativo();
            }
        });
    });

    // Event listener para o botão de resetar
    resetarButton.addEventListener('click', function() {
        for (const produtoId in inputs) {
            inputs[produtoId].valor.value = '';
            inputs[produtoId].volume.value = '';
            inputs[produtoId].qntPac.value = '1';
            inputs[produtoId].qnt2.value = '1';
        }
        atualizarComparativo();
    });

    // Event listener para o botão de fechar
    fecharButton.addEventListener('click', function() {
        mercadoDiv.style.display = 'none';
    });

    // Event listener para o link "MERCADO" no menu
    mostrarMercadoLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que o link navegue para outra página (se tiver um href)
        // Verifica se a lista já está visível
        if (mercadoDiv.style.display === 'block') {
            mercadoDiv.style.display = 'none'; // Se estiver visível, esconde
        } else {
            mercadoDiv.style.display = 'block'; // Se estiver escondida, mostra
        }
    });

    // Calcular inicialmente ao carregar a página
    atualizarComparativo();
});
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
        let menorPreco = Infinity;
        let produtoMenorPreco = '';

        produtos.forEach(produtoElement => {
            const nomeElement = produtoElement.querySelector('.produto-nome');
            const nomeProduto = nomeElement.textContent.toLowerCase().replace(/\s+/g, '');
            const produtoId = nomeElement.dataset.produtoId;
            const valor = parseFloat(inputs[produtoId]?.valor?.value) || 0;
            const volume = parseFloat(inputs[produtoId]?.volume?.value) || 0;
            const qntPac = parseInt(inputs[produtoId]?.qntPac?.value) || 0;
            const qnt2 = parseInt(inputs[produtoId]?.qnt2?.value) || 0;
            const volTotalElement = produtoElement.querySelector('.vol-total');
            const precoVolumeElement = produtoElement.querySelector('.preco-volume');
            const deveriaSerElement = produtoElement.querySelector('.deveria-ser');
            const pagoAMaisElement = produtoElement.querySelector('.pago-a-mais');

            // Calcular Vol.TOTAL
            const volTotal = volume * qntPac * qnt2;
            volTotalElement.textContent = volTotal.toFixed(2);

            // Calcular P. Vol.
            let precoVolume = 0;
            if (volTotal !== 0) {
                precoVolume = valor / volTotal;
                precoVolumeElement.textContent = `R$ ${precoVolume.toFixed(3)}`;
                if (precoVolume < menorPreco) {
                    menorPreco = precoVolume;
                    produtoMenorPreco = nomeElement.textContent;
                }
            } else {
                precoVolumeElement.textContent = '#DIV/0!';
                precoVolumeElement.style.color = 'red';
            }

            // Calcular DEVERIA SER (usando a lógica para o segundo produto baseada no primeiro)
            let deveriaSer = valor;
            if (produtoId === 'produto2') {
                const primeiroValor = parseFloat(inputs['produto1']?.valor?.value) || 0;
                const primeiroVolTotal = parseFloat(produtos[0].querySelector('.vol-total').textContent) || 0;
                if (primeiroVolTotal !== 0) {
                    deveriaSer = (primeiroValor / primeiroVolTotal) * volTotal;
                }
            }
            deveriaSerElement.textContent = `R$ ${deveriaSer.toFixed(2)}`;

            // Calcular PAGO A MAIS
            const pagoAMais = valor - deveriaSer;
            pagoAMaisElement.textContent = `R$ ${pagoAMais.toFixed(2)}`;
        });

        // Exibir o menor preço
        document.getElementById('menor-preco-produto').textContent = produtoMenorPreco;
        document.getElementById('menor-preco-valor').textContent = `R$ ${menorPreco.toFixed(2)}`;
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
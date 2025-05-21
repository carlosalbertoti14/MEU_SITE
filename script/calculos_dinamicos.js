document.addEventListener('DOMContentLoaded', function () {
    const botaoOperacao = document.getElementById('botao-operacao');
    const botaoSomaTotal = document.getElementById('botao-soma-total');
    const tabelaCorpoSOMA = document.getElementById('tabela-corpoSOMA');
    const tabelaCorpoCalculos = document.getElementById('tabela-corpo');

    let operacaoAtual = "SOMA"; // Operação inicial

    botaoOperacao.addEventListener('click', function () {
        // Alternar entre SOMA, MMC, MDC e LOG
        if (operacaoAtual === "SOMA") {
            operacaoAtual = "MMC";
        } else if (operacaoAtual === "MMC") {
            operacaoAtual = "MDC";
        } else if (operacaoAtual === "MDC") {
            operacaoAtual = "LOG";
        } else {
            operacaoAtual = "SOMA";
        }
        botaoOperacao.textContent = operacaoAtual; // Atualizar o botão
        calcularOperacaoTotal(); // Recalcular com a nova operação
    });

    tabelaCorpoSOMA.addEventListener('change', calcularOperacaoTotal);
    botaoSomaTotal.addEventListener('click', copiarSomaParaNumero);

    function calcularOperacaoTotal() {
        const inputsSoma = document.querySelectorAll('#tabela-corpoSOMA .soma');
        let valores = [];

        inputsSoma.forEach(input => {
            const valor = parseInt(input.value);
            if (!isNaN(valor)) {
                valores.push(valor);
            }
        });

        let resultado = 0;
        if (operacaoAtual === "SOMA") {
            resultado = valores.reduce((acc, num) => acc + num, 0);
        } else if (operacaoAtual === "MMC") {
            resultado = calcularMMC(valores);
        } else if (operacaoAtual === "MDC") {
            resultado = calcularMDC(valores);
        } else if (operacaoAtual === "LOG") {
            resultado = calcularLogaritmo();
        }

        botaoSomaTotal.textContent = resultado;
    }

    function copiarSomaParaNumero() {
        const resultadoSoma = botaoSomaTotal.textContent;
        const linhasCalculos = tabelaCorpoCalculos.querySelectorAll('tr');

        for (let i = 0; i < linhasCalculos.length; i++) {
            const linhaCalculo = linhasCalculos[i];
            const campoNumero = linhaCalculo.querySelector('.NUMERO');
            if (campoNumero && campoNumero.value === '') {
                campoNumero.value = resultadoSoma;
                break;
            }
        }
    }

    function calcularMMC(numeros) {
        function mmc(a, b) {
            return (a * b) / calcularMDC([a, b]);
        }
        return numeros.reduce((acc, num) => mmc(acc, num));
    }

    function calcularMDC(numeros) {
        function mdc(a, b) {
            return b === 0 ? a : mdc(b, a % b);
        }
        return numeros.reduce((acc, num) => mdc(acc, num));
    }

    function calcularLogaritmo() {
        let a = parseFloat(document.getElementById('a').value);
        let b = parseFloat(document.getElementById('b').value);
        let x = parseFloat(document.getElementById('x').value);

        if (a === 0) {
            return Math.pow(b, x); // Encontrar a base
        } else if (b === 0) {
            return Math.log(x) / Math.log(a); // Encontrar o logaritmando
        } else if (x === 0) {
            return Math.log(b) / Math.log(a); // Encontrar o expoente
        } else {
            return "Erro: Preencha um campo com 0 para encontrar o valor.";
        }
    }

    calcularOperacaoTotal(); // Calcular operação inicial
});


//***************CALCULOS DINAMICOS**********************//

function calcularResultado(linha) {
  const numero = parseFloat(linha.querySelector('.NUMERO').value);
  const operador = linha.querySelector('.operador').value;
  const numerador = parseFloat(linha.querySelector('.NUMERADOR').value);
  const resultadoBotao = linha.querySelector('.RESULTADO2'); // Seleciona o botão

  let resultado;

  if (isNaN(numero)) {
    resultadoBotao.textContent = ''; // Atualiza o texto do botão
    return;
  }

// Função auxiliar para calcular o fatorial
function calcularFatorial(n) {
    if (n < 0) {
        return NaN; // Fatorial de números negativos não é definido para inteiros
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let resultadoFatorial = 1;
    for (let i = 2; i <= n; i++) {
        resultadoFatorial *= i;
    }
    return resultadoFatorial;
}

// Seu switch statement
switch (operador) {
    case 'multiplicacao':
        resultado = numero * numerador;
        break;
    case 'divisao':
        if (numerador === 0) {
            resultado = 'Erro! Divisão por zero.';
        } else {
            resultado = numero / numerador;
        }
        break;
    case 'quociente':
        if (numerador === 0) {
            resultado = 'Erro! Divisão por zero.';
        } else {
            resultado = Math.floor(numero / numerador);
        }
        break;
    case 'resto':
        if (numerador === 0) {
            resultado = 'Erro! Divisão por zero.';
        } else {
            resultado = numero % numerador;
        }
        break;
    case 'soma':
        resultado = numero + numerador;
        break;
    case 'raiz':
        if (numerador <= 0) {
            resultado = 'Erro! Radical inválido.';
        } else if (isNaN(numerador) || numerador == 0) {
            resultado = Math.sqrt(numero);
        } else {
            resultado = Math.pow(numero, 1 / numerador);
        }
        break;
    case 'elevado':
        resultado = Math.pow(numero, numerador);
        break;
    case 'porcentagem':
        resultado = (numero * numerador) / 100;
        break;
    case 'fatorial':
        const fatorialNumero = calcularFatorial(numero);

        if (isNaN(numerador) || numerador === 0) {
            // Se o numerador não for mencionado ou for zero, calcula apenas o fatorial do 'numero'
            resultado = fatorialNumero;
        } else {
            // Se o numerador for mencionado, calcula o fatorial do 'numero' vezes o fatorial do 'numerador'
            const fatorialNumerador = calcularFatorial(numerador);
            if (isNaN(fatorialNumero) || isNaN(fatorialNumerador)) {
                resultado = 'Erro! Entrada inválida para fatorial.';
            } else {
                resultado = fatorialNumero * fatorialNumerador;
            }
        }
        break;
    default:
        resultado = '';
        break;
}

  resultadoBotao.textContent = resultado; // Define o texto do botão
}

document.addEventListener('DOMContentLoaded', function() {
  const tabelaCorpo = document.getElementById('tabela-corpo');

  tabelaCorpo.addEventListener('change', function(event) {
    const elementoAlterado = event.target;
    const linha = elementoAlterado.closest('tr');

    if (elementoAlterado.classList.contains('NUMERO') ||
        elementoAlterado.classList.contains('operador') ||
        elementoAlterado.classList.contains('NUMERADOR')) {
      calcularResultado(linha);
    }
  });

  // Calcular resultados iniciais ao carregar a página
  const linhas = tabelaCorpo.querySelectorAll('tr');
  linhas.forEach(calcularResultado);
});

//***************FIM CALCULOS DINAMICOS**********************//


//*************** PORCENTAGEM **********************//
function calcularPorcentagem() {
    const valorTotalInput = document.getElementById('pvt');
    const porcentagemInput = document.getElementById('porc');
    const valorComAumentoInput = document.getElementById('vcA');
    const valorComDescontoInput = document.getElementById('vcD');
    const descontoInput = document.getElementById('desc');

    const valorTotalBotao = document.getElementById('pvt_b');
    const porcentagemBotao = document.getElementById('porc_b');
    const valorComAumentoBotao = document.getElementById('vcA_b');
    const valorComDescontoBotao = document.getElementById('vcD_b');
    const descontoBotao = document.getElementById('desc_b');

    const valorTotal = parseFloat(valorTotalInput.value);
    const porcentagem = parseFloat(porcentagemInput.value);
    const valorComAumento = parseFloat(valorComAumentoInput.value);
    const valorComDesconto = parseFloat(valorComDescontoInput.value);
    const desconto = parseFloat(descontoInput.value);

    let camposPreenchidos = 0;
    if (!isNaN(valorTotal)) camposPreenchidos++;
    if (!isNaN(porcentagem)) camposPreenchidos++;
    if (!isNaN(valorComAumento)) camposPreenchidos++;
    if (!isNaN(valorComDesconto)) camposPreenchidos++;
    if (!isNaN(desconto)) camposPreenchidos++;

    if (camposPreenchidos === 2) {
        if (!isNaN(valorTotal) && !isNaN(porcentagem)) {
            const valorDoDesconto = valorTotal * (porcentagem / 100);
            const novoValorComDesconto = valorTotal - valorDoDesconto;
            const novoValorComAumento = valorTotal + valorDoDesconto;
            valorComDescontoBotao.textContent = novoValorComDesconto.toFixed(2);
            valorComAumentoBotao.textContent = novoValorComAumento.toFixed(2);
            descontoBotao.textContent = valorDoDesconto.toFixed(2);
            valorTotalBotao.textContent = valorTotal.toFixed(2);
            porcentagemBotao.textContent = porcentagem.toFixed(2);
        } else if (!isNaN(valorTotal) && !isNaN(valorComDesconto)) {
            const valorDoDesconto = valorTotal - valorComDesconto;
            const porcentagemDesconto = (valorDoDesconto / valorTotal) * 100;
            const novoValorComAumento = valorTotal + valorDoDesconto;
            porcentagemBotao.textContent = porcentagemDesconto.toFixed(2);
            descontoBotao.textContent = valorDoDesconto.toFixed(2);
            valorTotalBotao.textContent = valorTotal.toFixed(2);
            valorComDescontoBotao.textContent = valorComDesconto.toFixed(2);
            valorComAumentoBotao.textContent = novoValorComAumento.toFixed(2);
        } else if (!isNaN(valorTotal) && !isNaN(desconto)) {
            const novoValorComDesconto = valorTotal - desconto;
            const novoValorComAumento = valorTotal + desconto;
            const porcentagemDesconto = (desconto / valorTotal) * 100;
            porcentagemBotao.textContent = porcentagemDesconto.toFixed(2);
            valorComDescontoBotao.textContent = novoValorComDesconto.toFixed(2);
            valorComAumentoBotao.textContent = novoValorComAumento.toFixed(2);
            valorTotalBotao.textContent = valorTotal.toFixed(2);
            descontoBotao.textContent = desconto.toFixed(2);
        } else if (!isNaN(porcentagem) && !isNaN(valorComDesconto)) {
            const valorTotalCalculado = valorComDesconto / (1 - (porcentagem / 100));
            const valorDoDesconto = valorTotalCalculado - valorComDesconto;
            const novoValorComAumento = valorTotalCalculado + valorDoDesconto;
            valorTotalBotao.textContent = valorTotalCalculado.toFixed(2);
            descontoBotao.textContent = valorDoDesconto.toFixed(2);
            porcentagemBotao.textContent = porcentagem.toFixed(2);
            valorComDescontoBotao.textContent = valorComDesconto.toFixed(2);
            valorComAumentoBotao.textContent = novoValorComAumento.toFixed(2);
        } else if (!isNaN(porcentagem) && !isNaN(desconto)) {
            const valorTotalCalculado = desconto / (porcentagem / 100);
            const valorComDescontoCalculado = valorTotalCalculado - desconto;
            const valorComAumentoCalculado = valorTotalCalculado + desconto;
            valorTotalBotao.textContent = valorTotalCalculado.toFixed(2);
            valorComDescontoBotao.textContent = valorComDescontoCalculado.toFixed(2);
            valorComAumentoBotao.textContent = valorComAumentoCalculado.toFixed(2);
            porcentagemBotao.textContent = porcentagem.toFixed(2);
            descontoBotao.textContent = desconto.toFixed(2);
        } else if (!isNaN(valorComDesconto) && !isNaN(desconto)) {
            const valorTotalCalculado = valorComDesconto + desconto;
            const porcentagemDesconto = (desconto / valorTotalCalculado) * 100;
            const novoValorComAumento = valorTotalCalculado + desconto;
            valorTotalBotao.textContent = valorTotalCalculado.toFixed(2);
            porcentagemBotao.textContent = porcentagemDesconto.toFixed(2);
            valorComDescontoBotao.textContent = valorComDesconto.toFixed(2);
            descontoBotao.textContent = desconto.toFixed(2);
            valorComAumentoBotao.textContent = novoValorComAumento.toFixed(2);
        } else if (!isNaN(valorTotal) && !isNaN(valorComAumento)) {
            const valorDoAumento = valorComAumento - valorTotal;
            const porcentagemAumento = (valorDoAumento / valorTotal) * 100;
            valorTotalBotao.textContent = valorTotal.toFixed(2);
            valorComAumentoBotao.textContent = valorComAumento.toFixed(2);
            porcentagemBotao.textContent = porcentagemAumento.toFixed(2);
            descontoBotao.textContent = (-valorDoAumento).toFixed(2);
            valorComDescontoBotao.textContent = (valorTotal - valorDoAumento).toFixed(2);
        } else if (!isNaN(porcentagem) && !isNaN(valorComAumento)) {
            const valorTotalCalculado = valorComAumento / (1 + (porcentagem / 100));
            const valorDoAumento = valorComAumento - valorTotalCalculado;
            valorTotalBotao.textContent = valorTotalCalculado.toFixed(2);
            valorComAumentoBotao.textContent = valorComAumento.toFixed(2);
            porcentagemBotao.textContent = porcentagem.toFixed(2);
            descontoBotao.textContent = (-valorDoAumento).toFixed(2);
            valorComDescontoBotao.textContent = (valorTotalCalculado - valorDoAumento).toFixed(2);
        } else if (!isNaN(valorComAumento) && !isNaN(desconto)) {
            // Lógica corrigida para quando vcA e desconto são preenchidos
            const valorTotalCalculado = valorComAumento - desconto;
            valorTotalBotao.textContent = valorTotalCalculado.toFixed(2);
            valorComAumentoBotao.textContent = valorComAumento.toFixed(2);
            descontoBotao.textContent = desconto.toFixed(2);
            valorComDescontoBotao.textContent = (valorTotalCalculado - desconto).toFixed(2);
            const porcentagemDesconto = (desconto / valorTotalCalculado) * 100;
            porcentagemBotao.textContent = porcentagemDesconto.toFixed(2);
        }
    } else if (camposPreenchidos < 2) {
        valorTotalBotao.textContent = '0';
        porcentagemBotao.textContent = '0';
        valorComAumentoBotao.textContent = '0';
        valorComDescontoBotao.textContent = '0';
        descontoBotao.textContent = '0';
    }
}

const inputs = document.querySelectorAll('#tabela-corpoPORCENTAGEM input');
inputs.forEach(input => {
    input.addEventListener('input', calcularPorcentagem);
});


//*************** FIM PORCENTAGEM **********************//

//*************** REGRA DE TRES **********************//
    function calcularRegraTresSimples() {
        const a1 = parseFloat(document.getElementById('a1_simples').value);
        const b1 = parseFloat(document.getElementById('b1_simples').value);
        const a2 = parseFloat(document.getElementById('a2_simples').value);
        const resultadoSimplesInput = document.getElementById('resultado_simples');

        if (isNaN(a1) || isNaN(b1) || isNaN(a2)) {
            resultadoSimplesInput.value = "Preencha todos os campos";
            return;
        }

        const b2 = (a2 * b1) / a1;
        resultadoSimplesInput.value = b2.toFixed(2);
    }


     /* REGRA DE TRES COMPOSTA */

        document.addEventListener('DOMContentLoaded', function () {
    // 1️⃣ Função para calcular Regra de Três Composta conforme sua lógica
        function calcularRegraTresComposta() {
        const valor1 = parseFloat(document.querySelector('.valor1').value);
        const valor2 = parseFloat(document.querySelector('.valor2').value);
        const valor3 = parseFloat(document.querySelector('.valor3').value);
        const valor4 = parseFloat(document.querySelector('.valor4').value);
        const g_x1 = parseFloat(document.querySelector('.g_x1').value); // Grandeza X1
        const resultadoCompostaInput = document.getElementById('resultado_composta');

        // Validar os campos
        if (isNaN(valor1) || isNaN(valor2) || isNaN(valor3) || isNaN(valor4) || isNaN(g_x1)) {
            resultadoCompostaInput.value = "Preencha todos os campos corretamente.";
            return;
        }

        // Aplicação da fórmula:
        const x = valor1 * valor3;
        const y = valor2 * valor4;
        const z = g_x1 * y;
        const resultadoFinal = z / x;

        resultadoCompostaInput.value = resultadoFinal.toFixed(2);
    }

    // 2️⃣ Função para inverter os valores conforme "Inversamente" for selecionado
    function inverterValores() {
        const selectInvert1 = document.getElementById('invert_v1');
        const selectInvert2 = document.getElementById('invert_v2');

        selectInvert1.addEventListener('change', function () {
            if (selectInvert1.value === "inversamente") {
                const temp = document.querySelector('.valor1').value;
                document.querySelector('.valor1').value = document.querySelector('.valor2').value;
                document.querySelector('.valor2').value = temp;
            }
        });

        selectInvert2.addEventListener('change', function () {
            if (selectInvert2.value === "inversamente") {
                const temp = document.querySelector('.valor3').value;
                document.querySelector('.valor3').value = document.querySelector('.valor4').value;
                document.querySelector('.valor4').value = temp;
            }
        });
    }

    // 3️⃣ Função para adicionar uma nova grandeza
    function adicionarGrandeza() {
        const tabelaComposta = document.getElementById('tabela_composta');
        const novaLinha = tabelaComposta.insertRow();

        novaLinha.innerHTML = `
            <td class="INgrand"><input type="text" class="g_x1"></td>
            <td><input type="number" class="valor1"></td>
            <td><input type="number" class="valor3"></td>
            <td>
                <select id="invert_v1" class="tipo">
                    <option value="diretamente">Diretamente</option>
                    <option value="inversamente">Inversamente</option>
                </select>
            </td>
        `;
    }

    // 4️⃣ Função para remover a última grandeza adicionada
    function removerGrandeza() {
        const tabelaComposta = document.getElementById('tabela_composta');
        if (tabelaComposta.rows.length > 2) {
            tabelaComposta.deleteRow(-1);
        } else {
            alert("Você deve manter pelo menos duas grandezas!");
        }
    }

    // Executar inversão dos valores no carregamento da página
    inverterValores();

    // Associar funções aos botões
    window.calcularRegraTresComposta = calcularRegraTresComposta;
    window.adicionarGrandeza = adicionarGrandeza;
    window.removerGrandeza = removerGrandeza;
});

 //alterar nome to rótulo
document.addEventListener('DOMContentLoaded', function () {
    // Permitir edição dos títulos ao clicar
    document.querySelectorAll("th").forEach(th => {
        th.addEventListener("click", function () {
            const novoTexto = prompt("Digite o novo nome para este título:", this.textContent);
            if (novoTexto !== null && novoTexto.trim() !== "") {
                this.textContent = novoTexto;
            }
        });
    });
});

//*************** FIM REGRA DE TRES **********************//

//*************** BOTÃO CALCULOS DINAMICOS **********************//

function copiarResultadoParaNumero(event) {
  const botaoResultado = event.target;
  const resultado = botaoResultado.textContent;
  const tabelaCorpo = document.getElementById('tabela-corpo');
  const linhas = tabelaCorpo.querySelectorAll('tr');

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    const campoNumero = linha.querySelector('.NUMERO');
    if (campoNumero && campoNumero.value === '') {
      campoNumero.value = resultado;
      break; // Para de procurar após encontrar a primeira célula vazia
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const tabelaCorpo = document.getElementById('tabela-corpo');
  const botoesResultado = tabelaCorpo.querySelectorAll('.RESULTADO2');

  botoesResultado.forEach(botao => {
    botao.addEventListener('click', copiarResultadoParaNumero);
  });
});

//*************** FIM BOTÃO CALCULOS DINAMICOS **********************//

//*************** BOTÃO PORCENTAGEM **********************//

function copiarParaTransferencia(event) {
    const botao = event.target;
    const valorParaCopiar = botao.textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(valorParaCopiar)
        .then(() => {
            /* alert(`"${valorParaCopiar}" copiado para a área de transferência!`); */
        })
        .catch(err => {
            console.error('Erro ao copiar para a área de transferência: ', err);
            alert('Erro ao copiar para a área de transferência. Por favor, tente novamente.');
        });
    } else {
        // Fallback para navegadores mais antigos (pode não funcionar em todos os casos, especialmente em dispositivos móveis)
        const tempInput = document.createElement('input');
        tempInput.value = valorParaCopiar;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        /* alert(`"${valorParaCopiar}" copiado para a área de transferência (método antigo)!`); */
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const botoesResultadoCalculos = tabelaCorpo.querySelectorAll('.RESULTADO');
    const botaoSomaTotal = document.getElementById('botao-soma-total');
    
    botoesResultadoCalculos.forEach(botao => {
        botao.addEventListener('click', copiarParaTransferencia);
    });
    
    if (botaoSomaTotal) {
        botaoSomaTotal.addEventListener('click', copiarParaTransferencia);
    }
});

//*************** FIM BOTÃO PORCENTAGEM **********************//




document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleciona o botão de "Resetar Valores" da soma dinâmica
    const resetarValoresSomaDinamicaButton = document.getElementById('resetar-valores_soma_dinamica');

    // 2. Define os seletores para todas as input boxes que você quer resetar
    //    Estes seletores cobrem a maioria das input boxes que você mencionou.
    const seletoresDeInputs = [
        '#tabela-corpoSOMA .soma',             // Inputs da tabela de soma (a, b, etc.)
        '#mercadoDiv input[type="number"]',    // Se houver inputs de número em mercadoDiv
        '#mercadoDiv input[type="text"]',     // Se houver inputs de texto em mercadoDiv
        '#soma_dinamica .NUMERO',              // Inputs NUMERO da tabela de cálculos dinâmicos
        '#soma_dinamica .NUMERADOR',           // Inputs NUMERADOR da tabela de cálculos dinâmicos
        '#pvt',                                // Input de valor total (porcentagem)
        '#porc',                               // Input de porcentagem
        '#vcA',                                // Input de valor com aumento
        '#vcD',                                // Input de valor com desconto
        '#desc',                               // Input de desconto
        '#a1_simples',                         // Input a1 da regra de três simples
        '#b1_simples',                         // Input b1 da regra de três simples
        '#a2_simples',                         // Input a2 da regra de três simples
        '#resultado_simples',                  // Input de resultado da regra de três simples
        '#resultado_composta',                 // Input de resultado da regra de três composta
        '#tabela_composta .grandeza',          // Inputs de grandeza da regra de três composta
        '#tabela_composta .valor1',            // Inputs de valor1 da regra de três composta
        '#tabela_composta .valor2'             // Inputs de valor2 da regra de três composta
        // Adicione quaisquer outros seletores de inputs que você queira resetar
    ];

    // 3. Adiciona o listener de clique ao botão
    if (resetarValoresSomaDinamicaButton) {
        resetarValoresSomaDinamicaButton.addEventListener('click', function() {
            // Itera sobre cada seletor de input
            seletoresDeInputs.forEach(seletor => {
                // Seleciona todos os inputs que correspondem ao seletor atual
                const inputs = document.querySelectorAll(seletor);

                // Para cada input encontrado, define seu valor como vazio
                inputs.forEach(input => {
                    input.value = '';
                });
            });

            // Opcional: Se você quiser garantir que os resultados também sejam limpos
            // Você pode precisar chamar funções de cálculo relevantes para redefinir as exibições.
            // Por exemplo, para a parte de soma dinâmica, você pode chamar:
            // if (typeof calcularOperacaoTotal === 'function') {
            //     calcularOperacaoTotal(); // Recalcula a soma, que deve ser 0 ou vazia
            // }
            // Se tiver botões de resultado que exibem texto, você pode limpá-los também.
            // Exemplo:
            // document.querySelectorAll('.RESULTADO2').forEach(btn => btn.textContent = '');
            // document.querySelectorAll('.RESULTADO_P').forEach(btn => btn.textContent = '');
        });
    }
});

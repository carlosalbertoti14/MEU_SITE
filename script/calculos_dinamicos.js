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
            return "log a^ b = x → deixe em branco";
        }
    }

    calcularOperacaoTotal(); // Calcular operação inicial
});

/* ADICIONAR LINHAS SOMA */

document.addEventListener('DOMContentLoaded', function () {
    const tabelaCorpoSOMA = document.getElementById('tabela-corpoSOMA');
    const linhaTotal = document.querySelector('.totais').parentElement; // Captura a linha do total

    tabelaCorpoSOMA.addEventListener('change', function () {
        adicionarNovaLinhaSeNecessario();
        calcularOperacaoTotal();
    });

    function adicionarNovaLinhaSeNecessario() {
        const inputsSoma = document.querySelectorAll('#tabela-corpoSOMA .soma');
        const ultimaCelula = inputsSoma[inputsSoma.length - 1];

        if (ultimaCelula.value !== '') {
            let novaLinha = document.createElement('tr');
            let novaCelula = document.createElement('td');
            let novoInput = document.createElement('input');

            novoInput.type = "number";
            novoInput.className = "soma";
            novaCelula.appendChild(novoInput);
            novaLinha.appendChild(novaCelula);

            // Insere antes da linha total
            tabelaCorpoSOMA.insertBefore(novaLinha, linhaTotal);
        }
    }

    /* calcularOperacaoTotal(); // Calcular operação inicial */
});
//***************CALCULOS DINAMICOS**********************//

document.addEventListener('DOMContentLoaded', function () {
    const tabelaCorpo = document.getElementById('tabela-corpo');

    tabelaCorpo.addEventListener('change', function (event) {
        const elementoAlterado = event.target;
        const linha = elementoAlterado.closest('tr');

        if (elementoAlterado.classList.contains('NUMERO') || 
            elementoAlterado.classList.contains('operador') || 
            elementoAlterado.classList.contains('NUMERADOR')) {
            calcularResultado(linha);
            adicionarNovaLinhaSeNecessario();
        }
    });

    /* ADICIONAR LINHA */
    function adicionarNovaLinhaSeNecessario() {
        const linhas = tabelaCorpo.querySelectorAll('tr');
        const ultimaLinha = linhas[linhas.length - 1];
        const ultimaCelula = ultimaLinha.querySelector('.NUMERO');

        if (ultimaCelula.value !== '') {
            let novaLinha = document.createElement('tr');

            let novaCelulaNumero = document.createElement('td');
            let novoInputNumero = document.createElement('input');
            novoInputNumero.type = "number";
            novoInputNumero.className = "NUMERO";
            novaCelulaNumero.appendChild(novoInputNumero);
            novaLinha.appendChild(novaCelulaNumero);

            let novaCelulaOperador = document.createElement('td');
            let novoSelectOperador = document.createElement('select');
            novoSelectOperador.className = "operador";
            ["multiplicacao", "divisao", "quociente", "resto", "soma", "raiz", "elevado", "porcentagem", "fatorial"]
                .forEach(op => {
                    let option = document.createElement('option');
                    option.value = op;
                    option.textContent = op;
                    novoSelectOperador.appendChild(option);
                });
            novaCelulaOperador.appendChild(novoSelectOperador);
            novaLinha.appendChild(novaCelulaOperador);

            let novaCelulaNumerador = document.createElement('td');
            let novoInputNumerador = document.createElement('input');
            novoInputNumerador.type = "number";
            novoInputNumerador.className = "NUMERADOR";
            novaCelulaNumerador.appendChild(novoInputNumerador);
            novaLinha.appendChild(novaCelulaNumerador);

            let novaCelulaResultado = document.createElement('td');
            let novoBotaoResultado = document.createElement('button');
            novoBotaoResultado.className = "RESULTADO2";
            novoBotaoResultado.textContent = "Resultado";
            novoBotaoResultado.addEventListener('click', function () {
                copiarResultadoParaProximaLinha(novaLinha);
            });
            novaCelulaResultado.appendChild(novoBotaoResultado);
            novaLinha.appendChild(novaCelulaResultado);

            tabelaCorpo.appendChild(novaLinha);
        }
    }
    
     /* fim ADICIONAR LINHA */


    function calcularResultado(linha) {
        const numero = parseFloat(linha.querySelector('.NUMERO').value);
        const operador = linha.querySelector('.operador').value;
        const numerador = parseFloat(linha.querySelector('.NUMERADOR').value);
        const resultadoBotao = linha.querySelector('.RESULTADO2'); 

        let resultado;

        if (isNaN(numero)) {
            resultadoBotao.textContent = ''; 
            return;
        }

        function calcularFatorial(n) {
            if (n < 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let resultadoFatorial = 1;
            for (let i = 2; i <= n; i++) {
                resultadoFatorial *= i;
            }
            return resultadoFatorial;
        }

        switch (operador) {
            case 'multiplicacao':
                resultado = numero * numerador;
                break;
            case 'divisao':
                resultado = numerador === 0 ? 'Erro! Divisão por zero.' : numero / numerador;
                break;
            case 'quociente':
                resultado = numerador === 0 ? 'Erro! Divisão por zero.' : Math.floor(numero / numerador);
                break;
            case 'resto':
                resultado = numerador === 0 ? 'Erro! Divisão por zero.' : numero % numerador;
                break;
            case 'soma':
                resultado = numero + numerador;
                break;
            case 'raiz':
                resultado = numerador <= 0 ? 'Erro! Radical inválido.' : Math.pow(numero, 1 / numerador);
                break;
            case 'elevado':
                resultado = Math.pow(numero, numerador);
                break;
            case 'porcentagem':
                resultado = (numero * numerador) / 100;
                break;
            case 'fatorial':
                const fatorialNumero = calcularFatorial(numero);
                const fatorialNumerador = calcularFatorial(numerador);
                resultado = isNaN(fatorialNumero) || isNaN(fatorialNumerador) ? 'Erro! Entrada inválida para fatorial.' : fatorialNumero * fatorialNumerador;
                break;
            default:
                resultado = '';
                break;
        }

        resultadoBotao.textContent = resultado;
    }

    function copiarResultadoParaProximaLinha(linhaAtual) {
        const resultadoBotao = linhaAtual.querySelector('.RESULTADO2');
        const resultadoValor = resultadoBotao.textContent;

        const proximaLinha = linhaAtual.nextElementSibling;
        if (proximaLinha) {
            const campoNumero = proximaLinha.querySelector('.NUMERO');
            if (campoNumero && campoNumero.value === '') {
                campoNumero.value = resultadoValor;
            }
        }
    }

    const linhas = tabelaCorpo.querySelectorAll('tr');
    linhas.forEach(linha => {
        const botaoResultado = linha.querySelector('.RESULTADO2');
        if (botaoResultado) {
            botaoResultado.addEventListener('click', function () {
               /*  copiarResultadoParaProximaLinha(linha); */
            });
        }
        calcularResultado(linha);
    });
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

    /* adicionar grandeza */
    document.addEventListener('DOMContentLoaded', function () {
    const tabelaComposta = document.getElementById('tabela_composta');

    window.adicionarGrandeza = function () {
        const todasLinhas = tabelaComposta.querySelectorAll('tr');

        todasLinhas.forEach((linha, index) => {
            let novaCelula = document.createElement('td');
            let novoInput = document.createElement('input');

            novoInput.type = "number";
            novoInput.className = `valor${document.querySelectorAll('.valor1').length + 1}`;

            novaCelula.appendChild(novoInput);
            linha.appendChild(novaCelula);
        });
    };

    window.removerGrandeza = function () {
        const todasLinhas = tabelaComposta.querySelectorAll('tr');

        todasLinhas.forEach((linha) => {
            if (linha.cells.length > 3) {
                linha.removeChild(linha.lastElementChild);
            }
        });
    };
});

/* fim adicionar grandeza */


    // Executar inversão dos valores no carregamento da página
    inverterValores();

    // Associar funções aos botões
    window.calcularRegraTresComposta = calcularRegraTresComposta;
    window.adicionarGrandeza = adicionarGrandeza;
    window.removerGrandeza = removerGrandeza;
});

 //alterar nome to rótulo
document.addEventListener('DOMContentLoaded', function () {
    const thGrandeza = document.getElementById('r3grandeza');
    const thValor1 = document.getElementById('r3valor_1');
    const thValor2 = document.getElementById('r3valor_2');

    // Função para adicionar a lógica de edição
    function enableThEditing(thElement) {
        if (thElement) { // Verifica se o elemento existe
            thElement.addEventListener("click", function () {
                const novoTexto = prompt("Digite o novo nome para este título:", this.textContent);
                if (novoTexto !== null && novoTexto.trim() !== "") {
                    this.textContent = novoTexto;
                }
            });
        }
    }

    enableThEditing(thGrandeza);
    enableThEditing(thValor1);
    enableThEditing(thValor2);
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

//*************** CALCULO DE TEMPO **********************//

// Obtenção dos elementos de entrada (o que o usuário digita)
const inputDias = document.getElementById('tch_dias');
const inputHoras = document.getElementById('tch_horas');
const inputMinutos = document.getElementById('tch_minutos');
const inputSegundos = document.getElementById('tch_segundos');

// Obtenção dos elementos de saída (T. DIAS, T. HORAS, etc.)
const outputTDias = document.getElementById('T_tch_dias');
const outputTHoras = document.getElementById('T_tch_horas');
const outputTMinutos = document.getElementById('T_tch_minutos');
const outputTSegundos = document.getElementById('T_tch_segundos');

// Elemento onde o resultado final será exibido (o td com id="resp_tch")
const resultadoTD = document.getElementById('resp_tch'); // Agora pegamos o TD diretamente

// Constantes de tempo em segundos
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600; // 60 * 60
const SECONDS_IN_DAY = 86400; // 24 * 3600

// Função principal para calcular e exibir o tempo
function calcularTempo() {
    // 1. Obter os valores dos inputs do usuário
    // Usamos || 0 para garantir que campos vazios sejam tratados como zero
    const dias = parseFloat(inputDias.value) || 0;
    const horas = parseFloat(inputHoras.value) || 0;
    const minutos = parseFloat(inputMinutos.value) || 0;
    const segundos = parseFloat(inputSegundos.value) || 0;

    // 2. Calcular o total de segundos a partir dos inputs do usuário
    let totalSeconds = (dias * SECONDS_IN_DAY) +
                       (horas * SECONDS_IN_HOUR) +
                       (minutos * SECONDS_IN_MINUTE) +
                       segundos;
    
    totalSeconds = Math.round(totalSeconds); // Arredonda para evitar problemas de ponto flutuante

    // 3. Distribuir o total de segundos nos campos T. DIAS, T. HORAS, etc.
    let remainingSeconds = totalSeconds;

    const calcDias = Math.floor(remainingSeconds / SECONDS_IN_DAY);
    remainingSeconds %= SECONDS_IN_DAY;

    const calcHoras = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
    remainingSeconds %= SECONDS_IN_HOUR;

    const calcMinutos = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
    const calcSegundos = remainingSeconds % SECONDS_IN_MINUTE; 

    // Atualizar os campos de saída (T. DIAS, T. HORAS, etc.)
    outputTDias.value = calcDias;
    outputTHoras.value = calcHoras;
    outputTMinutos.value = calcMinutos;
    outputTSegundos.value = calcSegundos;

    // 4. Gerar o resultado por extenso
    let extensoTexto = "";
    let partes = [];

    if (calcDias > 0) {
        partes.push(`${calcDias} dia${calcDias !== 1 ? 's' : ''}`);
    }
    if (calcHoras > 0) {
        partes.push(`${calcHoras} hora${calcHoras !== 1 ? 's' : ''}`);
    }
    if (calcMinutos > 0) {
        partes.push(`${calcMinutos} minuto${calcMinutos !== 1 ? 's' : ''}`);
    }
    if (calcSegundos > 0) {
        partes.push(`${calcSegundos} segundo${calcSegundos !== 1 ? 's' : ''}`);
    }

    if (partes.length === 0) {
        extensoTexto = "Zero segundos";
    } else if (partes.length === 1) {
        extensoTexto = partes[0];
    } else {
        extensoTexto = partes.slice(0, -1).join(', ') + ' e ' + partes[partes.length - 1];
    }

    // 5. Formatar o resultado para o display (HH:MM:SS) e combiná-lo com o texto por extenso
    const pad = (num) => num.toString().padStart(2, '0');
    let formattedTime = '';

    if (calcDias > 0) {
        formattedTime += `${calcDias} dia${calcDias !== 1 ? 's' : ''}`;
    }

    if (calcHoras > 0 || calcMinutos > 0 || calcSegundos > 0 || (totalSeconds === 0 && formattedTime === "")) {
        if (formattedTime !== "") {
            formattedTime += ' e ';
        }
        formattedTime += `${pad(calcHoras)}:${pad(calcMinutos)}:${pad(calcSegundos)} min`;
    } else if (totalSeconds === 0 && formattedTime === "") {
        formattedTime = `00:00:00 min`;
    }
    
    // Combina o resultado formatado e o resultado por extenso
    // Aqui vamos substituir o conteúdo do TD
    resultadoTD.innerHTML = `RESULTADO: ${formattedTime.trim()} (${extensoTexto}) <button onclick="calcularTempo()">Calcular</button>`;
    // O botão foi recriado aqui dentro do innerHTML, então ele precisa ser colocado de volta.
}

// Para garantir que os campos de saída sejam inicializados com 0
// e o resultado seja exibido ao carregar a página
window.onload = calcularTempo;

// Opcional: Para testar com o valor da sua imagem (177100 segundos)
// inputSegundos.value = 177100;
// window.onload = calcularTempo;


//*************** FIM CALCULO DE TEMPO **********************//

//*************** CALCULO DE DURAÇÃO DAS HORAS **********************//

// Obtenção dos elementos de entrada (o que o usuário digita)
const inputDuracaoHoras = document.getElementById('tch_dura');
const inputDiasSemana = document.getElementById('tch_dSem');
const inputHorasPorDia = document.getElementById('tch_hpd');

// Obtenção dos elementos de saída
const outputSemanas = document.getElementById('T_tch_sem');
const outputMeses = document.getElementById('T_tch_dmes');
const outputAnos = document.getElementById('T_tch_anos'); // Novo: Referência para o campo de anos

// Referência ao TD onde o resultado final será exibido
const resultadoTD_dura = document.getElementById('resp_tch_dura');

// Constantes para conversão
const WEEKS_IN_MONTH = 4.33; // Aproximadamente, 365.25 dias / 7 dias/semana / 12 meses
const WEEKS_IN_YEAR = 52.14; // Aproximadamente, 365.25 dias / 7 dias/semana

function calcularTempoCorrida() {
    const duracaoHoras = parseFloat(inputDuracaoHoras.value) || 0;
    const diasSemana = parseFloat(inputDiasSemana.value) || 0;
    const horasPorDia = parseFloat(inputHorasPorDia.value) || 0;

    let totalSemanas = 0;
    let totalMeses = 0;
    let totalAnos = 0; // Novo: Variável para armazenar o total de anos

    // Cálculo das semanas
    if (diasSemana > 0 && horasPorDia > 0) {
        totalSemanas = duracaoHoras / horasPorDia / diasSemana;
    }
    outputSemanas.value = totalSemanas.toFixed(2); // Arredonda para 2 casas decimais

    // Cálculo dos meses
    totalMeses = totalSemanas / WEEKS_IN_MONTH;
    outputMeses.value = Math.floor(totalMeses); // Arredonda para baixo para meses inteiros

    // NOVO CÁLCULO: Anos
    totalAnos = totalSemanas / WEEKS_IN_YEAR;
    outputAnos.value = totalAnos.toFixed(2); // Exibe anos com 2 casas decimais

    // Montar o resultado final para o TD "resp_tch_dura"
    let resultadoFormatado = '';
    if (totalSemanas > 0) {
        resultadoFormatado = `Total de semanas: ${totalSemanas.toFixed(0)} semanas`;
        if (totalMeses > 0) {
            resultadoFormatado += `, o que equivale a ${Math.floor(totalMeses)} mês${Math.floor(totalMeses) !== 1 ? 'es' : ''}`;
        }
        if (totalAnos > 0) {
            resultadoFormatado += ` e ${totalAnos.toFixed(2)} ano${totalAnos.toFixed(0) !== '1' ? 's' : ''}.`;
        } else {
            resultadoFormatado += `.`;
        }
    } else {
        resultadoFormatado = 'Preencha os campos para calcular.';
    }

    // Atualiza o conteúdo do TD, incluindo o botão de volta
    resultadoTD_dura.innerHTML = `RESULTADO: ${resultadoFormatado} <button onclick="calcularTempoCorrida()">Calcular</button>`;
}

// Inicializa os campos de saída no carregamento da página
window.onload = calcularTempoCorrida;

// Opcional: Pré-preencher com os valores da imagem para teste
// inputDuracaoHoras.value = 300;
// inputDiasSemana.value = 2;
// inputHorasPorDia.value = 2;
// window.onload = calcularTempoCorrida;

//*************** FIM CALCULO DE DURAÇÃO DAS HORAS **********************//


  
// Converte HH:MM:SS para segundos totais
function timeToSeconds(timeStr) {
    if (!timeStr || timeStr === "00:00:00") return 0;
    const parts = timeStr.split(':').map(Number);
    return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : 0;
}

// Converte segundos totais para formato "Dias - HH:MM:SS" (se houver dias) ou "HH:MM:SS"
function secondsToTime(totalSeconds) {
    if (totalSeconds < 0) totalSeconds = 0; // Garante que o tempo não seja negativo

    const dias = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const horas = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutos = Math.floor(totalSeconds / 60);
    const segundos = Math.round(totalSeconds % 60); // Arredonda segundos

    const pad = (num) => num.toString().padStart(2, '0');

    // Adiciona o hífen apenas se houver dias
    return dias > 0
        ? `${dias} - ${pad(horas)}:${pad(minutos)}:${pad(segundos)}`
        : `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
}

function calcularSomatorioTempo() {
    let grandTotalSeconds = 0; // Para o somatório final no rodapé

    for (let i = 1; i <= 7; i++) {
        const somaInput = document.getElementById(`calcH_soma${i}`);
        const operacaoSelect = document.getElementById(`calcH_operacao${i}`);
        const valorInput = document.getElementById(`calcH_valor${i}`);
        const resultadoOutput = document.getElementById(`calcH_resultado${i}`);

        let somaSeconds = timeToSeconds(somaInput ? somaInput.value : "00:00:00");
        const valor = parseFloat(valorInput ? valorInput.value : 0) || 0;
        const operacao = operacaoSelect ? operacaoSelect.value : '';

        let resultadoSeconds = 0;

        switch (operacao) {
            case 'multiplicacao':
                resultadoSeconds = somaSeconds * valor;
                break;
            case 'divisao':
                resultadoSeconds = valor !== 0 ? somaSeconds / valor : 0;
                break;
            case 'adicao':
                resultadoSeconds = somaSeconds + valor;
                break;
            case 'subtracao':
                resultadoSeconds = somaSeconds - valor;
                break;
            default:
                resultadoSeconds = 0;
                break;
        }

        resultadoSeconds = Math.max(Math.round(resultadoSeconds), 0);

        if (resultadoOutput) {
            resultadoOutput.textContent = secondsToTime(resultadoSeconds);
        }

        grandTotalSeconds += somaSeconds;
    }

    const totalSomaElement = document.getElementById('calcH_total_soma');
    if (totalSomaElement) {
        totalSomaElement.textContent = secondsToTime(grandTotalSeconds);
    }
}

window.onload = calcularSomatorioTempo;

document.querySelectorAll('.calcH_input_time, .calcH_input_value, .calcH_input_select').forEach(input => {
    input.addEventListener('input', calcularSomatorioTempo);
    input.addEventListener('change', calcularSomatorioTempo);
});


//***************  CALCULOS DE DATAS **********************//


// Define a constante para o estado "vazio" ou placeholder de data
const DZERO_PLACEHOLDER = '  /  /    ';

// Converte string 'dd/mm/aaaa' (parcial ou completa) para objeto Date ou null
function parseFlexibleDate(dateStr, baseDate = new Date()) {
    const cleanedStr = dateStr.replace(/\s/g, ''); // Remove espaços em branco

    // Se a string é DZERO_PLACEHOLDER ou vazia, retorna null
    if (cleanedStr === '' || cleanedStr === '//' || cleanedStr === '/') {
        return null;
    }

    const parts = cleanedStr.split('/');

    let day = baseDate.getDate();
    let month = baseDate.getMonth(); // 0-based
    let year = baseDate.getFullYear();

    const parsedDay = parseInt(parts[0], 10);
    const parsedMonth = parseInt(parts[1], 10);
    const parsedYear = parseInt(parts[2], 10);

    if (!isNaN(parsedDay)) {
        day = parsedDay;
    }
    if (!isNaN(parsedMonth)) {
        month = parsedMonth - 1; // Mês é zero-based para o Date object
    }
    if (!isNaN(parsedYear)) {
        // Heurística para anos de 2 dígitos: 00-69 -> 20xx, 70-99 -> 19xx
        if (parsedYear < 100) {
            year = (parsedYear < 70) ? 2000 + parsedYear : 1900 + parsedYear;
        } else {
            year = parsedYear;
        }
    }

    const date = new Date(year, month, day);

    // Validação de data inválida ou anos absurdos
    if (isNaN(date.getTime()) || date.getFullYear() > 9999 || date.getFullYear() < 1900) {
        return null;
    }
    
    return date;
}

// Converte objeto Date para string 'dd/mm/aaaa'
function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "N/A";
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Interpreta a string "d / m / a" do campo de adição/multiplicação/divisão
// Retorna um objeto {dias, meses, anos} com 0 para campos vazios
function parseDateComponents(dateComponentsStr) {
    const cleanedStr = dateComponentsStr.replace(/\s/g, '');
    if (cleanedStr === '' || cleanedStr === '//' || cleanedStr === '/') {
        return { dias: 0, meses: 0, anos: 0 };
    }

    const parts = cleanedStr.split('/');
    const dias = parseInt(parts[0], 10) || 0;
    const meses = parseInt(parts[1], 10) || 0;
    const anos = parseInt(parts[2], 10) || 0;

    return { dias, meses, anos };
}

function calcularSomatorioDatas() {
    for (let i = 1; i <= 7; i++) {
        const dataInput = document.getElementById(`caldt_data${i}`);
        const operacaoSelect = document.getElementById(`caldt_operacao${i}`);
        const valorInput = document.getElementById(`caldt_valor${i}`);
        const resultadoOutput = document.getElementById(`caldt_resultado${i}`);

        // Usamos DZERO_PLACEHOLDER para a base se o input estiver vazio
        let dataInicial = parseFlexibleDate(dataInput ? dataInput.value : DZERO_PLACEHOLDER, new Date());

        const operacao = operacaoSelect ? operacaoSelect.value : 'adicionar';
        const { dias: inputDias, meses: inputMeses, anos: inputAnos } = parseDateComponents(valorInput ? valorInput.value : DZERO_PLACEHOLDER);

        let resultadoDate = null;

        if (dataInicial) {
            resultadoDate = new Date(dataInicial);

            switch (operacao) {
                case 'adicionar':
                    resultadoDate.setDate(resultadoDate.getDate() + inputDias);
                    resultadoDate.setMonth(resultadoDate.getMonth() + inputMeses);
                    resultadoDate.setFullYear(resultadoDate.getFullYear() + inputAnos);
                    break;

                case 'multiplicar':
                    let newDay = resultadoDate.getDate();
                    let newMonth = resultadoDate.getMonth();
                    let newYear = resultadoDate.getFullYear();

                    if (inputDias !== 0) {
                        newDay = newDay * inputDias;
                    }
                    if (inputMeses !== 0) {
                        newMonth = (newMonth + 1) * inputMeses - 1;
                    }
                    if (inputAnos !== 0) {
                        newYear = newYear * inputAnos;
                    }

                    resultadoDate = new Date(newYear, newMonth, newDay);
                    if (isNaN(resultadoDate.getTime())) {
                        resultadoDate = null;
                    }
                    break;

                case 'dividir':
                    let originalDay = resultadoDate.getDate();
                    let originalMonth = resultadoDate.getMonth();
                    let originalYear = resultadoDate.getFullYear();

                    let dividedDay = originalDay;
                    let dividedMonth = originalMonth;
                    let dividedYear = originalYear;

                    let invalidOperation = false;

                    if (inputDias !== 0) {
                        dividedDay = Math.round(originalDay / inputDias);
                    } else if (inputDias === 0 && (originalDay !== 0)) {
                        invalidOperation = true;
                    }

                    if (inputMeses !== 0) {
                        dividedMonth = Math.round((originalMonth + 1) / inputMeses) - 1;
                    } else if (inputMeses === 0 && (originalMonth !== 0)) {
                        invalidOperation = true;
                    }

                    if (inputAnos !== 0) {
                        dividedYear = Math.round(originalYear / inputAnos);
                    } else if (inputAnos === 0 && (originalYear !== 0)) {
                        invalidOperation = true;
                    }
                    
                    if (inputDias === 0 && inputMeses === 0 && inputAnos === 0) {
                        invalidOperation = false;
                    }

                    if (invalidOperation) {
                        resultadoDate = null;
                    } else {
                        resultadoDate = new Date(dividedYear, dividedMonth, dividedDay);
                        if (isNaN(resultadoDate.getTime())) {
                            resultadoDate = null;
                        }
                    }
                    break;
            }
        }

        if (resultadoOutput) {
            resultadoOutput.textContent = formatDate(resultadoDate);
        }
    }
}

// **NOVA/REVISADA:** Função para verificar se um campo de input está vazio ou é o placeholder
function isInputEmptyOrPlaceholder(inputElement) {
    const value = inputElement.value.trim();
    return value === '' || value === DZERO_PLACEHOLDER.trim(); // Compara com o trim() do DZERO
}

// **NOVA/REVISADA:** Função para verificar se uma célula de texto está "vazia" (N/A ou vazia)
function isTextCellEmpty(cellElement) {
    const text = cellElement.textContent.trim();
    return text === '' || text === 'N/A';
}


// Função para copiar um valor para a próxima célula de uma CLASSE ESPECÍFICA em linhas abaixo
function copyValueToNextEmptyInput(currentElement, targetInputClass, valueToCopy) {
    const currentRow = currentElement.closest('tr');
    let nextRow = currentRow.nextElementSibling;

    while (nextRow) {
        const targetInput = nextRow.querySelector(`.${targetInputClass}`);
        if (targetInput && isInputEmptyOrPlaceholder(targetInput)) {
            targetInput.value = valueToCopy;
            calcularSomatorioDatas(); // Recalcula após a cópia
            return; // Copiou, então sai da função
        }
        nextRow = nextRow.nextElementSibling;
    }
}


// Inicializa os cálculos e adiciona event listeners
window.onload = () => {
    // 1. Define a data atual na primeira célula "DATA INICIAL"
    const today = new Date();
    const todayFormatted = formatDate(today);
    const dataInicial1Input = document.getElementById('caldt_data1');
    if (dataInicial1Input) {
        dataInicial1Input.value = todayFormatted;
    }

    // 2. Adiciona event listeners para a coluna DATA INICIAL (TODAS as células, mas o CLICK de cópia apenas na primeira)
    document.querySelectorAll('.caldt_input_date').forEach(input => {
        // Define o placeholder se estiver vazio no carregamento
        if (input.value.trim() === '') {
            input.value = DZERO_PLACEHOLDER;
        }

        // Listeners para placeholder (blur/focus) - Aplicam-se a TODAS as células de data inicial
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.value = DZERO_PLACEHOLDER;
            }
        });
        input.addEventListener('focus', () => {
            if (input.value.trim() === DZERO_PLACEHOLDER) {
                input.value = '';
            }
        });
    });

    // **APLICA O CLICK DE CÓPIA APENAS À PRIMEIRA CÉLULA (caldt_data1)**
    if (dataInicial1Input) { // Verifica se caldt_data1 existe
        dataInicial1Input.addEventListener('click', function() {
            // Só copia se a célula atual tiver um valor real (não "N/A" ou DZERO_PLACEHOLDER)
            if (this.value.trim() !== 'N/A' && !isInputEmptyOrPlaceholder(this)) {
                copyValueToNextEmptyInput(this, 'caldt_input_date', this.value);
            }
        });
    }


    // 3. Adiciona event listeners para a coluna DIAS/MESES/ANOS A SOMAR (placeholders)
    document.querySelectorAll('.caldt_input_add_date').forEach(input => {
        if (!input.value || input.value.trim() === '00/00/0000' || input.value.trim() === '' || input.value.trim() === '//' || input.value.trim() === '/') {
            input.value = DZERO_PLACEHOLDER;
        }

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.value = DZERO_PLACEHOLDER;
            }
        });
        input.addEventListener('focus', () => {
            if (input.value.trim() === DZERO_PLACEHOLDER) {
                input.value = '';
            }
        });
    });

    // 4. Adiciona event listeners para a coluna RESULTADO para COPIAR para a próxima DATA INICIAL vazia
    document.querySelectorAll('.caldt_resultado_cell').forEach(cell => {
        cell.addEventListener('click', function() {
            const resultadoValor = this.textContent;
            // Só copia se o resultado não for "N/A" e não estiver vazio
            if (!isTextCellEmpty(this)) {
                // Chama a função genérica para copiar para o próximo input de DATA INICIAL
                copyValueToNextEmptyInput(this, 'caldt_input_date', resultadoValor);
            }
        });
    });

    // Listeners gerais para recalcular ao digitar ou mudar seleção (Aplicam-se a TODOS os inputs de data e select)
    document.querySelectorAll('.caldt_input_date, .caldt_input_add_date, .caldt_input_select').forEach(input => {
        input.addEventListener('input', calcularSomatorioDatas);
        input.addEventListener('change', calcularSomatorioDatas);
    });

    calcularSomatorioDatas(); // Calcula ao carregar a página com os valores iniciais
};




//*************** FIM CALCULOS DE DATAS **********************//





//*************** RESETAR VALORES **********************//

document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleciona o botão de "Resetar Valores" da soma dinâmica
    const resetarValoresSomaDinamicaButton = document.getElementById('resetar-valores_soma_dinamica');

    // 2. Define os seletores para todas as input boxes que você quer resetar
    const seletoresDeInputs = [
        '#tabela-corpoSOMA .soma',             // Inputs da tabela de soma (a, b, etc.)
        '#mercadoDiv input[type="number"]',   // Se houver inputs de número em mercadoDiv
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
        '#tabela_composta .valor2',            // Inputs de valor2 da regra de três composta
        '.valor3',                             // Adicionado: valor3 da regra de três composta
        '.valor4',                             // Adicionado: valor4 da regra de três composta
        '.g_x1',                               // Adicionado: g_x1 da regra de três composta
        '#tch_dias',                           // Adicionado: Input de Dias (Cálculo de Tempo)
        '#tch_horas',                          // Adicionado: Input de Horas (Cálculo de Tempo)
        '#tch_minutos',                        // Adicionado: Input de Minutos (Cálculo de Tempo)
        '#tch_segundos',                       // Adicionado: Input de Segundos (Cálculo de Tempo)
        '#tch_dura',                           // Adicionado: Input de Duração Horas (Cálculo de Duração das Horas)
        '#tch_dSem',                           // Adicionado: Input de Dias na Semana (Cálculo de Duração das Horas)
        '#tch_hpd',                            // Adicionado: Input de Horas Por Dia (Cálculo de Duração das Horas)
        '.calcH_input_time',                   // Adicionado: Inputs de tempo (HH:MM:SS) na soma de tempo
        '.calcH_input_value'                   // Adicionado: Inputs de valor numérico na soma de tempo
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

            // Chamar funções de cálculo para atualizar os resultados após o reset
            if (typeof calcularRegraTresComposta === 'function') {
                calcularRegraTresComposta();
            }
            if (typeof calcularTempo === 'function') {
                calcularTempo();
            }
            if (typeof calcularTempoCorrida === 'function') {
                calcularTempoCorrida();
            }
            if (typeof calcularSomatorioTempo === 'function') {
                calcularSomatorioTempo();
            }
        });
    }
});

//*************** RESETAR VALORES **********************//






//*************** SOMA **********************//
function calcularSomaTotal() {
  const inputsSoma = document.querySelectorAll('#tabela-corpoSOMA .soma');
  const resultadoBotao = document.querySelector('#tabela-corpoSOMA .RESULTADO');
  let somaTotal = 0;

  inputsSoma.forEach(input => {
    const valor = parseFloat(input.value);
    if (!isNaN(valor)) {
      somaTotal += valor;
    }
  });

  resultadoBotao.textContent = somaTotal; // Alterado para textContent
}

document.addEventListener('DOMContentLoaded', function() {
  const tabelaCorpoSOMA = document.getElementById('tabela-corpoSOMA');

  tabelaCorpoSOMA.addEventListener('change', calcularSomaTotal);

  // Calcular a soma inicial ao carregar a página
  calcularSomaTotal();
});



//*************** FIM SOMA **********************//


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
    case 'soma':
      resultado = numero + numerador;
      break;

       case 'raiz': // Calculará a raiz enésima ou quadrada
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

    function calcularRegraTresComposta() {
        const tabelaComposta = document.getElementById('tabela_composta');
        const resultadoCompostaInput = document.getElementById('resultado_composta');
        let fatoresDiretos = 1;
        let fatoresInversos = 1;
        let xValor1;

        for (let i = 0; i < tabelaComposta.rows.length; i++) {
            const linha = tabelaComposta.rows[i];
            const grandeza = linha.querySelector('.grandeza').value.trim();
            const valor1 = parseFloat(linha.querySelector('.valor1').value);
            const valor2 = parseFloat(linha.querySelector('.valor2').value);
            const tipo = linha.querySelector('.tipo').value;

            if (isNaN(valor1) || isNaN(valor2) || grandeza === "") {
                resultadoCompostaInput.value = "Preencha todos os campos da tabela";
                return;
            }

            if (document.getElementById('x_composta') === linha.querySelector('.valor2')) {
                xValor1 = valor1;
            } else {
                if (tipo === 'diretamente') {
                    fatoresDiretos *= valor2 / valor1;
                } else if (tipo === 'inversamente') {
                    fatoresInversos *= valor1 / valor2;
                }
            }
        }

        if (isNaN(xValor1)) {
            resultadoCompostaInput.value = "Campo com 'X' não encontrado";
            return;
        }

        const resultadoX = xValor1 * fatoresDiretos * fatoresInversos;
        resultadoCompostaInput.value = resultadoX.toFixed(2);
    }

    function adicionarGrandeza() {
        const tabelaComposta = document.getElementById('tabela_composta');
        const novaLinha = tabelaComposta.insertRow();

        const colunaGrandeza = novaLinha.insertCell();
        colunaGrandeza.innerHTML = '<input type="text" class="grandeza">';

        const colunaValor1 = novaLinha.insertCell();
        colunaValor1.innerHTML = '<input type="number" class="valor1">';

        const colunaValor2 = novaLinha.insertCell();
        colunaValor2.innerHTML = '<input type="number" class="valor2">';

        const colunaTipo = novaLinha.insertCell();
        colunaTipo.innerHTML = `
            <select class="tipo">
                <option value="diretamente">Diretamente</option>
                <option value="inversamente">Inversamente</option>
            </select>
        `;
    }

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

//*************** BOTÃO SOMA **********************//


function copiarSomaParaNumero() {
  const botaoSomaTotal = document.getElementById('botao-soma-total');
  const resultadoSoma = botaoSomaTotal.textContent;
  const tabelaCorpoCalculos = document.getElementById('tabela-corpo');
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

document.addEventListener('DOMContentLoaded', function() {
  // ... (seu código existente aqui) ...

  const botaoSomaTotal = document.getElementById('botao-soma-total');
  if (botaoSomaTotal) {
    botaoSomaTotal.addEventListener('click', copiarSomaParaNumero);
  }
});
//*************** FIM BOTÃO SOMA **********************//

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


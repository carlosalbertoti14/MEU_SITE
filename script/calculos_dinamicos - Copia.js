document.addEventListener('DOMContentLoaded', function() {
    const inputsSoma = document.querySelectorAll('#tabela-corpoSOMA input.soma');
    const primeiraCelulaNumero = document.querySelector('#tabela-corpo tr:first-child input.NUMERO');
    const botaoCalcular = document.getElementById('calcular');
    const tabelaCorpoCalculos = document.getElementById('tabela-corpo');

    function calcularSoma() {
        let soma = 0;
        inputsSoma.forEach(input => {
            const valor = parseFloat(input.value);
            if (!isNaN(valor)) {
                soma += valor;
            }
        });
        return soma;
    }

    function atualizarPrimeiraCelulaNumero() {
        const resultadoSoma = calcularSoma();
        const primeiraLinhaNumeroInput = tabelaCorpoCalculos.querySelector('tr:first-child input.NUMERO');
        if (primeiraLinhaNumeroInput) {
            primeiraLinhaNumeroInput.value = resultadoSoma;
        }
    }

    function criarNovaLinhaCalculo() {
        const novaLinha = tabelaCorpoCalculos.insertRow();

        const celulaNumero = novaLinha.insertCell();
        const inputNumero = document.createElement('input');
        inputNumero.type = 'number';
        inputNumero.classList.add('NUMERO');
        inputNumero.readOnly = true;
        celulaNumero.appendChild(inputNumero);

        const celulaOperador = novaLinha.insertCell();
        const selectOperador = document.createElement('select');
        selectOperador.classList.add('operador');
        selectOperador.innerHTML = `
            <option value="NENHUM">ESCOLHA</option>
            <option value="multiplicacao">Multiplicação</option>
            <option value="divisao">Divisão</option>
            <option value="soma">Soma</option>
            <option value="raiz">Raiz Quadrada</option>
            <option value="elevado">Elevado a</option>
            <option value="porcentagem">Porcentagem de</option>
        `;
        celulaOperador.appendChild(selectOperador);

        const celulaNumerador = novaLinha.insertCell();
        const inputNumerador = document.createElement('input');
        inputNumerador.type = 'number';
        inputNumerador.classList.add('NUMERADOR');
        celulaNumerador.appendChild(inputNumerador);

        return novaLinha;
    }

function realizarCalculos() {
    const linhasCalculos = tabelaCorpoCalculos.querySelectorAll('tr');
    const somaInicial = parseFloat(primeiraCelulaNumero.value);
    let resultadoAnterior = somaInicial;
    let resultadoFinal = somaInicial; // Inicializa com a soma inicial
    let ultimoOperadorValido = '';
    let ultimoNumeradorValido = NaN;

    for (let i = 1; i < linhasCalculos.length; i++) {
        const linha = linhasCalculos[i-1]; // Correção no índice
        const inputNumero = linha.querySelector('input.NUMERO');
        const selectOperador = linha.querySelector('select.operador');
        const inputNumerador = linha.querySelector('input.NUMERADOR');

        if (!inputNumero || !selectOperador) continue;

        const operador = selectOperador.value;
        const numerador = parseFloat(inputNumerador.value);

        let resultado = resultadoAnterior;

        if (operador !== 'NENHUM' && !isNaN(numerador)) {
            ultimoOperadorValido = operador;
            ultimoNumeradorValido = numerador;

            switch (operador) {
                case 'multiplicacao':
                    resultado = resultado * numerador;
                    break;
                case 'divisao':
                    resultado = numerador === 0 ? NaN : resultado / numerador;
                    break;
                case 'soma':
                    resultado = resultado + numerador;
                    break;
                case 'raiz':
                    resultado = resultado < 0 ? NaN : Math.sqrt(resultado);
                    break;
                case 'elevado':
                    resultado = Math.pow(resultado, numerador);
                    break;
                case 'porcentagem':
                    resultado = (resultado * (numerador / 100));
                    break;
            }

            if (!isNaN(resultado)) {
                inputNumero.value = resultado.toFixed(2);
                resultadoFinal = resultado; // Atualiza o resultado final aqui
            }
        }

        resultadoAnterior = parseFloat(inputNumero.value);
    }

    alert(`Resultado da Soma Inicial: ${somaInicial.toFixed(2)}\nÚltimo Operador Válido: ${ultimoOperadorValido}\nÚltimo Numerador Válido: ${isNaN(ultimoNumeradorValido) ? 'N/A' : ultimoNumeradorValido.toFixed(2)}\nResultado Final: ${resultadoFinal.toFixed(2)}`);

    const ultimaLinhaNumeroInput = tabelaCorpoCalculos.querySelector('tr:last-child input.NUMERO');
    if (ultimaLinhaNumeroInput) {
        ultimaLinhaNumeroInput.value = resultadoFinal.toFixed(2);
    }
}




    atualizarPrimeiraCelulaNumero();
    primeiraCelulaNumero.value = calcularSoma();
    primeiraCelulaNumero.readOnly = true;

    tabelaCorpoCalculos.addEventListener('input', function(event) {
        if (event.target.classList.contains('NUMERADOR')) {
            const linhaAtual = event.target.closest('tr');
            const indiceLinhaAtual = Array.from(tabelaCorpoCalculos.children).indexOf(linhaAtual);

            if (indiceLinhaAtual === tabelaCorpoCalculos.children.length - 1 && event.target.value !== '') {
                criarNovaLinhaCalculo();
            }
        }
    });

    botaoCalcular.addEventListener('click', realizarCalculos);

    inputsSoma.forEach(input => {
        input.addEventListener('input', atualizarPrimeiraCelulaNumero);
    });
});
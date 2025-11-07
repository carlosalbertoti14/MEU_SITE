// Função para copiar texto com mensagem temporária
function copiarParaAreaTransferencia(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        mostrarMensagemTemporaria('Comando copiado: ' + texto + '\nPressione Win+R e cole para executar!');
    }).catch(function(err) {
        console.error('Erro ao copiar: ', err);
        // Fallback para navegadores antigos
        const textArea = document.createElement("textarea");
        textArea.value = texto;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        mostrarMensagemTemporaria('Comando copiado: ' + texto + '\nPressione Win+R e cole para executar!');
    });
}

// Função para mostrar mensagem temporária
function mostrarMensagemTemporaria(mensagem) {
    // Remove mensagem anterior se existir
    const mensagemAnterior = document.getElementById('mensagem-temporaria');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }
    
    // Cria nova mensagem
    const mensagemDiv = document.createElement('div');
    mensagemDiv.id = 'mensagem-temporaria';
    mensagemDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        font-size: 14px;
        line-height: 1.4;
        animation: fadeInOut 3s ease-in-out;
        white-space: pre-line;
    `;
    
    mensagemDiv.textContent = mensagem;
    document.body.appendChild(mensagemDiv);
    
    // Remove automaticamente após 3 segundos
    setTimeout(() => {
        if (mensagemDiv.parentNode) {
            mensagemDiv.parentNode.removeChild(mensagemDiv);
        }
    }, 3000);
}

// Adicione este CSS no style.css ou diretamente no JavaScript
function adicionarEstilosMensagem() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            15% { opacity: 1; transform: translateY(0); }
            85% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
}

// Chame esta função quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    adicionarEstilosMensagem();
    
    // Resto do código existente...
    console.log("SYSTEM.js carregado");
    
    const mostrarSystemBtn = document.getElementById("mostrar_SYSTEM_menu");
    const fecharSystemBtn = document.getElementById("fechar-SYSTEM");
    const systemDiv = document.getElementById("mostrar_SYSTEM");

    if (mostrarSystemBtn) {
        mostrarSystemBtn.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("Clicou em SYSTEM");
            ocultarTodasDivs();
            systemDiv.style.display = "block";
            displaySystemInfo();
            inicializarAtalhos();
        });
    }

    if (fecharSystemBtn) {
        fecharSystemBtn.addEventListener('click', function() {
            systemDiv.style.display = "none";
        });
    }
});

// O resto do código permanece igual...
function ocultarTodasDivs() {
    const divsParaOcultar = [
        "planilhas_section",
        "invencoes_section", 
        "sites",
        "mercado",
        "soma_dinamica",
        "sites_criados",
        "cur_habilidades",
        "curricuro",
        "contato",
        "mostrar_SYSTEM"
    ];

    divsParaOcultar.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.style.display = "none";
        }
    });
}

function displaySystemInfo() {
    const systemContainer = document.getElementById("system-info-container");
    if (!systemContainer) {
        console.error("Container system-info-container não encontrado");
        return;
    }

    const info = getDetailedSystemInfo();
    
    let html = '<h2>INFORMAÇÕES DO SISTEMA</h2>';
    html += '<div class="SYSTEM-info">';
    
    for (const [category, data] of Object.entries(info)) {
        html += `<div class="SYSTEM-category">`;
        html += `<h3>${category}</h3>`;
        html += `<ul>`;
        for (const [key, value] of Object.entries(data)) {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        html += `</ul>`;
        html += `</div>`;
    }
    
    html += '</div>';
    systemContainer.innerHTML = html;
    console.log("Informações do sistema carregadas");
}

function getDetailedSystemInfo() {
    let navegador = 'Desconhecido';
    if (navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg')) {
        navegador = 'Google Chrome';
    } else if (navigator.userAgent.includes('Firefox')) {
        navegador = 'Mozilla Firefox';
    } else if (navigator.userAgent.includes('Edg')) {
        navegador = 'Microsoft Edge';
    } else if (navigator.userAgent.includes('Safari')) {
        navegador = 'Safari';
    }

    let sistemaOperacional = 'Desconhecido';
    if (navigator.userAgent.includes('Windows NT 10.0')) {
        sistemaOperacional = 'Windows 10/11';
    } else if (navigator.userAgent.includes('Windows NT 6.3')) {
        sistemaOperacional = 'Windows 8.1';
    } else if (navigator.userAgent.includes('Windows NT 6.2')) {
        sistemaOperacional = 'Windows 8';
    } else if (navigator.userAgent.includes('Windows NT 6.1')) {
        sistemaOperacional = 'Windows 7';
    } else if (navigator.userAgent.includes('Mac')) {
        sistemaOperacional = 'macOS';
    } else if (navigator.userAgent.includes('Linux')) {
        sistemaOperacional = 'Linux';
    }

    const is64bit = navigator.userAgent.includes('Win64') || navigator.userAgent.includes('x64');
    const arquitetura = is64bit ? '64 bits' : '32 bits';

    return {
        'Sistema Operacional': {
            'Sistema': sistemaOperacional,
            'Arquitetura': arquitetura,
            'Plataforma': navigator.platform,
            'Idioma': navigator.language || 'Não detectado'
        },
        'Navegador': {
            'Navegador': navegador,
            'Versão': navigator.appVersion.split(' ')[0] || 'Não detectada',
            'Cookies': navigator.cookieEnabled ? 'Habilitado' : 'Desabilitado',
            'Online': navigator.onLine ? 'Sim' : 'Não'
        },
        'Hardware': {
            'Núcleos de CPU': navigator.hardwareConcurrency || 'Não detectado',
            'Memória RAM': navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Não detectado'
        },
        'Tela': {
            'Resolução': screen.width + ' x ' + screen.height,
            'Profundidade de Cor': screen.colorDepth + ' bits'
        }
    };
}

function inicializarAtalhos() {
    const atalhosContainer = document.getElementById("atalhos-container");
    if (!atalhosContainer) {
        console.error("Container atalhos-container não encontrado");
        return;
    }

    const atalhos = [
        { nome: "INFORMAÇÕES DO SISTEMA", comando: "msinfo32" },
        { nome: "GERENCIADOR DE DISPOSITIVOS", comando: "devmgmt.msc" },
        { nome: "GERENCIADOR DE DISCOS", comando: "diskmgmt.msc" },
        { nome: "ADICIONAR/REMOVER PROGRAMAS", comando: "appwiz.cpl" },
        { nome: "MONITOR DE RECURSOS", comando: "resmon" },
        { nome: "PAINEL DE CONTROLE", comando: "control" },
        { nome: "AGENDADOR DE TAREFAS", comando: "taskschd.msc" },
        { nome: "GERENCIADOR DE TAREFAS", comando: "taskmgr" },
        { nome: "CONTAS DE USUÁRIO", comando: "netplwiz" },
        { nome: "VISUALIZADOR DE EVENTOS", comando: "eventvwr.msc" },
        { nome: "DESFRAGMENTADOR DE DISCO", comando: "dfrgui" },
        { nome: "LIMPEZA DE DISCO", comando: "cleanmgr" },
        { nome: "CONFIGURAÇÕES DO WINDOWS", comando: "ms-settings:" },
        { nome: "CONFIGURAÇÃO DE LOGON", comando: "control userpasswords2" },
        { nome: "PROMPT DE COMANDO", comando: "cmd" },
        { nome: "REGEDIT", comando: "regedit" },
        { nome: "DISPOSITIVOS E IMPRESSORAS", comando: "control printers" },
        { nome: "WINDOWS POWERSHELL", comando: "powershell" },
        { nome: "SERVIÇOS", comando: "services.msc" },
        { nome: "POLÍTICA DE GRUPO", comando: "gpedit.msc" },
        { nome: "PROPRIEDADES DO SISTEMA", comando: "sysdm.cpl" },
        { nome: "INICIAR SYSPREP", comando: "sysprep" },
        { nome: "PASTA TEMP", comando: "%temp%" },
        { nome: "ATUALIZAÇÕES DO WINDOWS", comando: "wuapp" },
        { nome: "GERENCIADOR DE COMPUTADOR", comando: "compmgmt.msc" },
        { nome: "SERVIÇO DE COMPONENTES", comando: "dcomcnfg" },
        { nome: "JOYSTICK", comando: "joy.cpl" },
        { nome: "PASTA TEMP DE APLICATIVOS", comando: "%username%\\AppData\\Local\\Temp" },
        { nome: "PASTA MINIDUMP", comando: "%systemroot%\\Minidump" },
        { nome: "LOGS CBS", comando: "%systemroot%\\Logs\\CBS" },
        { nome: "LOGS DISM", comando: "%systemroot%\\Logs\\DISM" },
    ];

    let html = `
        <h2>ATALHOS DO WINDOWS</h2>
        <div class="atalhos-uteis">
            <p><strong>Como usar:</strong> Clique em qualquer item para copiar o comando, depois pressione <strong>Win+R</strong> e cole para executar!</p>
            <div class="atalhos-lista">
    `;

    atalhos.forEach(atalho => {
        html += `
            <div class="atalho-item" onclick="copiarParaAreaTransferencia('${atalho.comando}')">
                <strong>${atalho.nome}</strong>
                <small>${atalho.comando}</small>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    atalhosContainer.innerHTML = html;
    console.log("Atalhos inicializados");
}


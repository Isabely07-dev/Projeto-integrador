const { input, select } = require('@inquirer/prompts');


console.log("Bem-Vindo ao sistema de metas pessoais!");

let metas =[]

function limparTela() {
    console.clear();
}   

function mostrarMensagem(mensagem) {
    console.log(`\n${mensagem}\n`);
}

async function mostrarMenu() {
    const opcao = await select({
        message: "Escolha uma opção:",
        choices: [
            { name: "📝 Adicionar Meta", value: "adicionar" },
            { name: "🗒️  Mostrar Metas", value: "mostrar" },
            { name: "❌ Sair", value: "sair" }
        ]
    });
    return opcao;
}

async function executarAcao(opcao) {
    switch (opcao) {
        case "adicionar":
            await adicionarMeta();
            break;
        case "mostrar":
            await mostrarMetas();
            break;
        case "sair":
            console.log("Saindo do sistema. Até mais!");
            process.exit(0);
        default:
            console.log("Opção inválida. Tente novamente.");
    }
}

async function iniciar() {
    limparTela(); 
    mostrarMensagem("=== Sistema de Metas Pessoais ===");


    while (true) {
        const opcao = await mostrarMenu();
        
        if (opcao === "sair") {
            await executarAcao(opcao);
            limparTela();
            mostrarMensagem("Até mais!");
            break;
    }
    await executarAcao(opcao);
 }
}


async function adicionarMeta() {
    const descricao = await input({
        message: "Digite sua nova meta pessoal:"
    });

    if (descricao.length === 0) {
        mostrarMensagem("❌ Meta inválida. Tente novamente.");
        return;
    }

    const novaMeta = {
        value: descricao,
        checked: false
    }

    metas.push(novaMeta);

    mostrarMensagem("✔️  Meta adicionada com sucesso!");
}

async function mostrarMetas() {
    if (metas.length === 0) {
        mostrarMensagem("Nenhuma meta cadastrada.");
        return;
    }


    console.log("Suas Metas Pessoais:");
    metas.forEach((meta, index) => {
        const status = meta.checked ? "[x]" : "[ ]";
        console.log(`${status} ${index + 1}. ${meta.value}`);
    });
}

iniciar();
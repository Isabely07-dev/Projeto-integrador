const { input, select, checkbox } = require('@inquirer/prompts');

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
            { name: "✅ Marcar Metas Realizadas", value: "marcar" },
            { name: "🏆 Mostrar metas Realizadas", value: "realizadas" },
            { name: "📋 Mostrar Metas Abertas", value: "Metas abertas" },
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
            case "marcar":
            await marcarMetas();
            break;
        case "sair":
            break;
        case "realizadas":
            await metasRealizadas();
            break;
            case "Metas abertas":
            await metasAbertas();
            break;
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
            mostrarMensagem("Até mais!👋");
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


    console.log("❤️ Suas Metas Pessoais:");
    metas.forEach((meta, index) => {
        const status = meta.checked ? "[x]" : "[ ]";
        console.log(`${status} ${index + 1}. ${meta.value}`);
    });
}

async function marcarMetas() {
    if (metas.length === 0) {
        mostrarMensagem("❌ Não existem metas cadastradas!");
        return;
    }
    const metasSelecionadas = await checkbox({
        message: "Selecione as metas que você concluiu:",
        choices: metas.map(meta =>
            ({  name: meta.value,
                value: meta.value,
                checked: meta.checked
             })),
    })

    metas.forEach(meta => meta.checked = false);

    metasSelecionadas.forEach(metaSelecionada => {
        const meta = metas.find(m => m.value === metaSelecionada);
        if (meta) {
            meta.checked = true;
        }
    });

    mostrarMensagem("✔️ Metas atualizadas com sucesso!");

    
}

async function metasRealizadas() {
    const Realizadas = metas.filter(meta => meta.checked);
    if (Realizadas.length === 0) {
    mostrarMensagem = "Não existem metas realizadas!";
    return;
}
console.log("Metas Realizadas:");
Realizadas.forEach((meta, index) => {
console.log(`${index + 1}. ${meta.value}`);
});

mostrarMensagem(`Parabéns você já concluiu ${Realizadas.length} metas! 🎉`);
}
async function metasAbertas() {
    const realizadas = metas.filter(meta => meta.checked);

    if (metasAbertas.length === 0) {
    mostrarMensagem = "Não existem metas abertas!";
    return;
 }

 console.log("Metas abertas:");
    metasAbertas.forEach((meta, index) => {
    console.log(`${index + 1}. ${meta.value}`);
});

mostrarMensagem(`Você ainda tem ${metasAbertas.length} metas para concluir. Vamos lá! 💪`);

}
 
iniciar();
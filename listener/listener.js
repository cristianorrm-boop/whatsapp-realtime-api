require("dotenv").config();

const fs = require("fs");
const redisClient = require("./config/redis");

redisClient.on("error", (err) => {
    console.log("Erro no Redis:", err);
});


async function startListener() {
    await redisClient.connect();

    console.log("Listener Conectado ao Redis 🚀");

    await redisClient.subscribe("contacts", (message) => {

        try {

            const contact = JSON.parse(message);

            // VALIDAÇÃO: verifica se name ou number estão faltando
            if (!contact.name || !contact.number) {
                console.log("Contato inválido - campos obrigatórios faltando");
                return; // Sai da função sem processar o contato inválido
            }

            console.log("Contato recebido:");
            console.log("Nome:", contact.name);
            console.log("Número:", contact.number);

            const log = `
                Nome: ${contact.name}
                Número: ${contact.number}
                Horário: ${new Date().toLocaleString()}
                ----------------------
                `;

            fs.appendFileSync("/app/logs/contacts.log", log);

        } catch (error) {

            console.log("Erro ao processar mensagem:", error.message);

        }


    });

}

startListener();

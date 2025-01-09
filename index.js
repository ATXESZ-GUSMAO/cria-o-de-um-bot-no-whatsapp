const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info'); // Pasta onde as credenciais serão armazenadas
    const client = makeWASocket({
        printQRInTerminal: true, // Exibe o QR code no terminal
        auth: state
    });

    client.ev.on('creds.update', saveCreds);

    client.ev.on('messages.upsert', async (m) => {
        console.log('Nova mensagem recebida:', m);
        if (m.messages && m.messages[0].message) {
            const message = m.messages[0].message;
            if (message.conversation === 'oi') {
                await client.sendMessage(m.messages[0].key.remoteJid, { text: 'Olá! Como posso ajudar?' });
            }
        }
    });

    console.log('Bot iniciado!');
}

startBot().catch(console.error);

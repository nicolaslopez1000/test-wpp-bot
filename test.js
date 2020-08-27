
const qrcode = require('qrcode-terminal');
const fs = require('fs')

const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = './session.json';


let sessionData;

let contador = 0;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
    console.log(sessionData);
}

// Use the saved values
const client = new Client({
    session: sessionData
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	if(message.body === '!help') {
		message.reply('Hola, soy Edgar y estoy a tu disposición');
    }
    if(message.body === '!sum') {
        contador = contador + 1;
        msj = "El contador actual es " + contador.toString();

		client.sendMessage(message.from, msj);
	}
});

client.initialize();
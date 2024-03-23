const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require("fs");
const qrcode = require('qrcode-terminal');

const cId = process.argv.slice(2);
const client = new Client(
    {
    authStrategy: new LocalAuth({ clientId: cId}),
    // proxyAuthentication: { username: 'username', password: 'password' },
    restartOnAuthFail: true,
    puppeteer: { 
        // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
        // executablePath: "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        // headless: false,
        headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
    //   '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
    }
}
);

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED');
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
    client.sendMessage(client.info.wid._serialized,"```[Logs : KP Bot connected & ready to use | "+ new Date().toLocaleString() +"```]");
});

client.on('disconnected', function() {
    console.log('CLIENT DISCONNECTED');
    console.log('INITIALIZING NEW CLIENT');
    client.initialize();
});



client.on('message', async msg => {
    // console.log('MESSAGE RECEIVED', msg);

    if (msg.body === '!ping') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    }
});

client.on('message_create', async (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe){
    if (msg.body.startsWith('.Selamat ')) {
        // do stuff here
        const timer = (ms) =>
        new Promise((res) => setTimeout(res, ms));
        let number = msg.to;
        const brosur = MessageMedia.fromFilePath('./Media/Brosur Super Karantina Priority.pdf');
        const fatih = MessageMedia.fromFilePath('./Media/Testimoni_Fatih.mp4');
        client.sendMessage(number,
`Perkenalkan, saya adalah Konsultan Pendidikan dari Bimbel Priority. Alhamdulillah sudah 5 tahun meluluskan 5.137 siswa kami ke Perguruan Tinggi Negeri.
Terima kasih sudah menguhubungi 😊🙏`
        );
        client.sendMessage(number, 
`Di sini saya izin ingin menjelaskan terkait Progam Super Karantina kami 🙏`
        );
        client.sendMessage(number, 
`Program Super Karantina adalah program khusus *belajar menginap* selama sebulan di Hotel atau Apartemen dekat *Universitas Indonesia, Depok*. Program ini dikhususukan bagi anandanya yang ingin fokus dan memiliki ambisi *Masuk PTN Satu Kali Coba*. 

Dalam Program Super Karantina Priority kami, *100% Tutor dari Universitas Indonesia* dan saat belajar nanti akan *Dipantau Langsung* oleh *Owner* kami yang mana merupakan *Dosen Universitas Indonesia*`
        );
        client.sendMessage(number, 
`Untuk info selengkapnya saya izin mengirimkan *Brosur Super Karantina* kami 🙏`
        );
        await timer(500);
        client.sendMessage(number,brosur,{caption: 'Berikut brosur kami silahkan dibaca 🙏'});
        await timer(3000);
        client.sendMessage(number, 
`Fasilitas dari Progam Super Karantina sudah meliputi :
🏨 Tempat menginap
🍽 Makan
🧺 Laundry
🚗 Antar jemput ke lokasi ujian SNBT
📚 Bimbingan sampai Ujian Mandiri dengan tutor full dari Universitas Indonesia
👥 Sharing bersama Alumni PTN
🧑‍⚕️ Bimbingan Kedokteran khusus di Program Premium`
        );
        client.sendMessage(number, 
`Program Super Karantina Priority akan dilaksanakan di *Fave Hotel Depok* atau *Dave Apartment* dekat *Universitas Indonesia*

Jadwal pelaknsaan Karantina adalah sebagai berikut:
🛜 *Kelas Online:* 1-10 April
🏨 *Kelas Karantina:* 15 April-15 Mei`
        );
        client.sendMessage(number, 
`Khusus siswa *Super Karantina Priority* akan diarahkan untuk mengikuti UTBK pada *Gelombang ke-2* yaitu tanggal *14-20 Mei*.

Alasan kami arahkan ke gelombang ke-2 yaitu, supaya persiapan anandanya nanti akan lebih banyak dan matang, materi masih melekat, dan dari pengalaman kami mengikuti Gelombang ke-2 akan mendapatkan keunggulan berupa kisi-kisi soal dari gelombang ke-1.`
        );
        client.sendMessage(number, 
`Pada Program Kami, nanti anandanya tidak hanya dibantu pada masa UTBK saja, tetapi dibantu juga sampai tahap *Ujian Mandiri*

Kami juga akan memberikan *Konsultasi Pilih Jurusan dan Pilih Kampus* untuk menentukan pilihan terbaik bagi anandanya`
        );
        client.sendMessage(number, 
`Berikut Saya izin mengirimkan salah satu testimoni siswa kami, Fatih dari Jogja, yang Lulus di *Kedokteran UNAIR*, *Teknik Elektro UI*, dan *Teknik Elektro UGM* melalui Program Karantina Bimbel Priority🙏🏻`
        );
        await timer(500);
        client.sendMessage(number,fatih,{caption: 
`*Hampir Gagal Masuk PTN, Siswa dari Jogja malah masuk 3 Top PTN Indonesia! Salah satunya Kedokteran*`, sendMediaAsDocument: true});
        await timer(3000);
        client.sendMessage(number, 
`_Apakah ada yang ingin ditanyakan terkait *Program Super Karantina Priority*?_`
        );
    }
    else if (msg.body.startsWith("!fulist") && msg.hasQuotedMsg) {
        const timer = (ms) =>
        new Promise((res) => setTimeout(res, ms));
        const numbers = msg.body.split(/\r?\n/);
        console.log(numbers.length-1);
        client.sendMessage(msg.from,"```[Logs : Sending broadcast to "+ (numbers.length-1).toString() + " chats from lists | "+ new Date().toLocaleString()+"]```");

        const quotedMsg = await msg.getQuotedMessage();

        for (i = 1 ; i < numbers.length ; i++){
            const nId = numbers[i]+"@c.us";
            // const nName = names[i].toString().trim();
            // const theName = nName.split(" ").slice(0,2).join(" ");
            const nChat = client?.getChatById(nId);
            (await nChat)?.sendStateTyping();
            
            if (quotedMsg.hasMedia) {
                const attachmentData = await quotedMsg.downloadMedia();
                client.sendMessage(nId, attachmentData, { caption: quotedMsg.body });
            } else {
                client.sendMessage(nId, quotedMsg.body);
            }

            console.log('Follow up #'+(i)+' sent to '+nId);
            // console.log('Follow up #'+i+' sent to '+nId+' ('+theName+')');
            await timer((i%3===0||i%11===0)?3000:500);
            if((i+1)%13===0){
                client.sendMessage(msg.from,"```[Logs : Broadcast Checkpoint."+i+" chats sent | "+ new Date().toLocaleString()+"]```");
            }
        }
        console.log("Follow up sent to " + (numbers.length-1).toString() + " chats");
        client.sendMessage(msg.from,"```[Logs : Broadcast finished | "+ new Date().toLocaleString()+"]```");
    } else if (msg.body === "!fulabel" && msg.hasQuotedMsg) {
        const timer = (ms) =>
        new Promise((res) => setTimeout(res, ms));
        const de = await client.getChatById(msg.to);
        const labell = await de.getLabels();
        const labelId = labell[0].id;
        console.log(labell);
        const labeledChat = await client.getChatsByLabelId(labelId);
        // let chatLists = [];
        const quotedMsg = await msg.getQuotedMessage();
        
        console.log(labeledChat.length);
        client.sendMessage(msg.from,"```[Logs : Sending broadcast to "+ labeledChat.length + " chats from "+ labell[0].name + " label | "+ new Date().toLocaleString()+"]```");

        for (i = 0 ; i < labeledChat.length ; i++){
            const nId = labeledChat[i].id._serialized;
            console.log(nId);
            // const theName = labeledChat[i].name.startsWith("+")||labeledChat[i].name.startsWith("Lead")? "bunda/bapak" : labeledChat[i].name.split(" ").slice(0,2).join(" ");
            await labeledChat[i].sendStateTyping();
            
            if (quotedMsg.hasMedia) {
                const attachmentData = await quotedMsg.downloadMedia();
                client.sendMessage(nId, attachmentData, { caption: quotedMsg.body });
            } else {
                client.sendMessage(nId, quotedMsg.body);
            }

            console.log('Follow up #'+(i+1)+' sent to '+nId);
            // console.log('Follow up #'+i+' sent to '+nId+' ('+theName+')');
            await timer((i%3===0||i%11===0)?3000:500);
            if(i%13===0){
                client.sendMessage(msg.from,"```[Logs : Broadcast Checkpoint."+i+" chats sent | "+ new Date().toLocaleString()+"]```");
            }
            }
            console.log("Follow up sent to "+ labeledChat.length + " chats");
            client.sendMessage(msg.from,"```[Logs : Broadcast finished | "+ new Date().toLocaleString()+"]```");
        }
}});


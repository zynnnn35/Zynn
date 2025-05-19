const TelegramBot = require('node-telegram-bot-api');
const { pinterest, wallpaper, remini, wikimedia, yanzGpt, mediafireDl, ringtone, styletext, instagramDl, tiktokDl, facebookDl, instaStory, bk9Ai, spotifyDl, ytMp4, ytMp3, quotedLyo, youSearch, simi } = require('./lib/screaper');
const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, tanggal, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, checkBandwidth, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, getTypeUrlMedia, pickRandom, convertTimestampToDate, getAllHTML } = require('./lib/function');

const fs = require('fs');
const chalk = require('chalk');
const axios = require('axios');
const fetch = require('node-fetch');
const path = require('path');
const { exec, spawn, execSync } = require('child_process');
const yts = require('yt-search');

// Ganti TOKEN_BOT_LO dengan token bot Telegram lo
const bot = new TelegramBot('7524827456:AAEpyt6tUQQzxBKgO4fHfaqr0OTTbgumlmM', { polling: true });

// Fungsi helper biar gampang kirim pesan
const reply = (chatId, text, options = {}) => 
    bot.sendMessage(chatId, text, { parse_mode: "Markdown", ...options });

const sendPhoto = (chatId, photo, caption = '', options = {}) => 
    bot.sendPhoto(chatId, photo, { caption, ...options });

const sendDocument = (chatId, document, caption = '', options = {}) => 
    bot.sendDocument(chatId, document, { caption, ...options });

const sendVideo = (chatId, video, caption = '', options = {}) => 
    bot.sendVideo(chatId, video, { caption, ...options });

const editMessage = (bot, chatId, messageId, newText) => {
    bot.editMessageText(newText, {
        chat_id: chatId,
        message_id: messageId
    }).catch(err => console.error("Error editing message:", err));
};

async function tiktokSearchVideo(query) {
	return new Promise(async (resolve, reject) => {
		axios("https://tikwm.com/api/feed/search", {
			headers: {
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				cookie: "current_language=en",
				"User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
			},
			data: {
				keywords: query,
				count: 12,
				cursor: 0,
				web: 1,
				hd: 1,
			},
			method: "POST",
		}).then((res) => {
			resolve(res.data.data);
		});
	});
}	


const FormData = require('form-data');
const { fromBuffer } = require('file-type');

async function uploadToUrl(buffer) {
    try {
        let { ext } = await fromBuffer(buffer);
        let bodyForm = new FormData();
        bodyForm.append("file", buffer, "file." + ext);

        let res = await fetch("https://8030.us.kg/api/upload.php", {
            method: "POST",
            body: bodyForm
        });

        let data = await res.json();
        return data.result ? data.result.url : null;
    } catch (error) {
        console.error("Upload error:", error);
        return null;
    }
}





const profileDir = path.join(__dirname, 'database');
const profilePath = path.join(profileDir, 'profile.json');

// Pastikan folder `database` ada
if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
}

// Jika file profile.json belum ada, buat file kosong
if (!fs.existsSync(profilePath)) {
    fs.writeFileSync(profilePath, '{}');
}

// Baca data profil dari file JSON
let profiles = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

// Simpan data profil ke file JSON
function saveProfiles() {
    fs.writeFileSync(profilePath, JSON.stringify(profiles, null, 2));
}

const anonymous = {}; // Menyimpan user anonymous yang sedang mencari pasangan
const uploadSession = {}; // Menyimpan sesi upload per user

bot.on('message', async (msg) => { 
    const chatId = msg.chat.id;
    const senderId = msg.from.id.toString();
    const text = msg.text;
    const args = text?.split(' ') || [];
    const command = args[0]?.toLowerCase();
    const arg1 = args.slice(1).join(' ');
    const ownerId = ["7550046315", "987654321"]; 
const isOwner = ownerId.includes(senderId);

    try {
        switch (command) {
        case '/start': {
                const startText = `👋 *Selamat datang di Fox Bot!*  
Aku adalah bot yang siap membantu berbagai hal. Klik tombol di bawah untuk membuka menu utama.`;

                const options = {
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "📜 Menu", callback_data: "menu" }]
                        ]
                    }
                };

                bot.sendMessage(chatId, startText, options);
            }
            break;
           
            case '/tourl': {
    if (uploadSession[chatId]) return bot.sendMessage(chatId, "⚠️ Kamu sudah dalam sesi upload. Kirim file sekarang!");
    
    uploadSession[chatId] = true; // Simpan sesi upload
    bot.sendMessage(chatId, "📤 Kirim file yang ingin kamu upload.");
}
break; 
            
     case '/cekid': {
    try {
        let chatType = msg.chat.type;
        let chatId = msg.chat.id.toString();
        let userId = msg.from.id.toString();
        let userName = msg.from.first_name + (msg.from.last_name ? ` ${msg.from.last_name}` : "");
        let username = msg.from.username ? `@${msg.from.username}` : "Tidak ada";
        let groupName = (chatType === 'group' || chatType === 'supergroup') ? msg.chat.title : ""; // Hanya ambil nama grup jika bukan private chat

        // Format pesan
        let caption = `🆔 *Informasi ID*  
👤 *ID Pengguna:* \`${userId}\`  
🗣️ *Nama Pengguna:* ${userName}  
🏷️ *Username:* ${username}  
🆔 *ID ${chatType === 'private' ? "Chat" : "Grup"}:* \`${chatId}\``;

        // Jika di grup, tambahkan Nama Grup
        if (groupName) {
            caption += `\n🏷️ *Nama Grup:* ${groupName}`;
        }

        // Jika di private chat & ada foto, kirim sebagai foto
        if (chatType === 'private') {
            try {
                const userPhotos = await bot.getUserProfilePhotos(userId);
                if (userPhotos.total_count > 0) {
                    let photoId = userPhotos.photos[0][0].file_id;
                    bot.sendPhoto(chatId, photoId, { caption, parse_mode: "Markdown" })
                        .catch(err => {
                            console.error("Gagal mengirim foto:", err.message);
                            bot.sendMessage(chatId, caption, { parse_mode: "Markdown" });
                        });
                    return;
                }
            } catch (err) {
                console.log("Tidak bisa mengambil foto pengguna:", err.message);
            }
        }

        // Jika di grup atau tidak ada foto, hanya kirim teks
        bot.sendMessage(chatId, caption, { parse_mode: "Markdown" });

    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
        bot.sendMessage(chatId, "⚠️ Terjadi kesalahan saat mengambil data.");
    }
}
break;
            
            case '/tes': {
                reply(chatId, 'Hai');
            }
            break;

case '/menu': {
    const menuText = `📜 *Menu Utama*  
Pilih fitur yang ingin kamu gunakan:

🔍 *Download*  
  - /tiktok - Download Video/Foto TikTok  
  - /igdl - Download Video/Foto Instagram  
  - /ytmp4 - Download Video YouTube  
  - /ytmp3 - Download Audio YouTube  

🤖 *Fitur AI*  
  - /ai - Chat AI  

🔎 *Search*  
  - /ttsearch - Cari video TikTok  
  - /ytsearch - Cari video YouTube  
  - /play - Cari & putar lagu  

🛠️ *Tools*  
  - /tourl - Konversi media ke URL  

👥 *Anonymous Chat*  
  - /startanon - Mulai Anonymous Chat  
  - /stopanon - Hentikan Anonymous Chat  
  - /buatprofil - Buat Profil Anonymous  

⚙️ *Buat Bot*  
  - /jadibot - Aktifkan bot  
  - /stopjadibot - Nonaktifkan bot  

Silakan ketik perintah sesuai fitur yang ingin kamu gunakan!`;

    const menuButtons = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "👤 Owner", url: "https://t.me/kyenzyy" }] // Ganti USERNAME_OWNER
            ]
        }
    };

    // Kirim video + tombol Owner
    bot.sendVideo(chatId, "https://8030.us.kg/file/MdSji0w1kzhp.mp4", { // Ganti dengan URL atau path video lokal
        caption: menuText,
        parse_mode: "Markdown",
        ...menuButtons
    });
}
break;

            case '/jadibot': {
                if (!arg1) {
                    reply(chatId, 'Masukkan nomor dulu!\nContoh: /jadibot 62727282');
                } else {
                    reply(chatId, `Oke, nomor ${arg1} diterima.`);
                    await JadiBot(bot, arg1, chatId, reply);
                }
            }
            break;

     case '/play': case '/ytplay': {
    if (!arg1) return bot.sendMessage(chatId, `Example: ${command} hujan utopia`);
    
    let loadingMsg = await bot.sendMessage(chatId, '_ʟᴏᴀᴅɪɴɢ..._', { parse_mode: "Markdown" });

    // Pencarian YouTube
    const res = await yts.search(arg1);
    const hasil = res.all[0]; // Ambil hasil pertama

    const { ytmp3 } = require('ruhend-scraper');
    // Ambil info video dari ruhend-scraper
    const result = await ytmp3(hasil.url);

    let title = result.title;
    let author = result.author;
    let duration = result.duration;
    let views = result.views;
    let upload = result.upload;
    let thumbnail = result.thumbnail;
    let audiourl = result.audio; // Default pakai ruhend-scraper

    // **Konversi Durasi ke Detik**
    let durParts = duration.split(":").map(Number);
    let totalSeconds = 0;

    if (durParts.length === 3) { // Format HH:MM:SS
        totalSeconds = (durParts[0] * 3600) + (durParts[1] * 60) + durParts[2];
    } else if (durParts.length === 2) { // Format MM:SS
        totalSeconds = (durParts[0] * 60) + durParts[1];
    }

    let useAutoresbot = totalSeconds < 3600; // Pakai autoresbot hanya jika durasi < 1 jam
    let fileSizeInMB = 0;

    if (useAutoresbot) {
        try {
            const response = await fetchJson(`https://api.autoresbot.com/api/downloader/ytplay?apikey=APIKEY_GRATIS&url=${encodeURIComponent(hasil.url)}`);

            if (response.status) {
                audiourl = response.url; // Ganti audiourl dengan link dari autoresbot
                fileSizeInMB = response.bytes / (1024 * 1024); // Konversi bytes ke MB
            }
        } catch (err) {
            console.log("Error fetching autoresbot:", err);
        }
    }

    let caption = `🎵 *YTMP3 Download* 🎵
📌 *Judul:* ${title}
🎤 *Author:* ${author}
⏳ *Durasi:* ${duration}
👁️ *Views:* ${views}
📅 *Upload:* ${upload}

🔗 *Audio sedang dikirim...*`;

    // **Edit pesan loading menjadi informasi lagu**
    await bot.editMessageText(caption, {
        chat_id: chatId,
        message_id: loadingMsg.message_id,
        parse_mode: "Markdown"
    });

    // **Kirim gambar thumbnail dengan deskripsi**
    await bot.sendPhoto(chatId, thumbnail, { caption, parse_mode: "Markdown" });

    // **Kirim audio**
    if (useAutoresbot) {
        const MAX_FILE_SIZE_MB = 50;

        if (fileSizeInMB > MAX_FILE_SIZE_MB) {
            let batasfile = `⚠️ *File melebihi batas maksimal!*
> *Ukuran file:* ${fileSizeInMB.toFixed(2)} MB
> *Mengirim audio dalam bentuk file...*`;

            await bot.sendMessage(chatId, batasfile);

            // Jika ukuran file > 50MB, kirim sebagai dokumen
            await bot.sendDocument(chatId, audiourl, {
                caption: `🎵 *${title}*`,
                parse_mode: "Markdown"
            });
        } else {
            // Jika ukuran file ≤ 50MB, kirim sebagai audio biasa
            await bot.sendAudio(chatId, audiourl, {
                caption: `🎵 *${title}*`,
                parse_mode: "Markdown"
            });
        }
    } else {
        // **Kalau > 1 jam, langsung kirim sebagai dokumen dari ruhend-scraper**
        await bot.sendDocument(chatId, audiourl, {
            caption: `🎵 *${title}*`,
            parse_mode: "Markdown"
        });
    }

    // **Edit pesan jadi berhasil**
    await bot.editMessageText('✅ *Berhasil mengunduh audio!*', {
        chat_id: chatId,
        message_id: loadingMsg.message_id,
        parse_mode: "Markdown"
    });
}
break;


         case '/ttsearch':
case '/tiktoksearch': {
    (async () => {
        if (!arg1) {
            return bot.sendMessage(chatId, "Masukkan kata kunci pencarian TikTok!\nContoh: /ttsearch lagu viral");
        }

        try {
            // Pencarian video TikTok
            let search = await tiktokSearchVideo(arg1);

            if (!search.videos || search.videos.length === 0) {
                return bot.sendMessage(chatId, "❌ Tidak ditemukan hasil untuk pencarian tersebut.");
            }

            let video = search.videos[0]; // Ambil video pertama
            let teks = `🎥 *${video.title}*\n\n` +
                `🆔 *Video ID* : ${video.video_id}\n` +
                `👤 *Username* : ${video.author.unique_id}\n` +
                `🏷️ *Nickname* : ${video.author.nickname}\n` +
                `⏳ *Duration* : ${video.duration} detik\n` +
                `❤️ *Likes* : ${video.digg_count}\n` +
                `💬 *Comments* : ${video.comment_count}\n` +
                `🔄 *Shares* : ${video.share_count}\n\n` +
                `🔗 [Tonton Video](https://www.tiktok.com/@${video.author.unique_id}/video/${video.video_id})`;

            // **🔴 Konversi URL video TikTok**
            let videoUrl = `https://tikwm.com${video.play}`;
            console.log("Video Play URL:", videoUrl);

            // **🟢 Kirim Video ke Telegram**
            if (video.play) {
                await bot.sendVideo(chatId, videoUrl, { caption: teks, parse_mode: "Markdown" });
            } else {
                await bot.sendMessage(chatId, teks, { parse_mode: "Markdown" });
            }

            // **🔵 Kirim daftar video lainnya**
            if (search.videos.length > 1) {
                let list = search.videos.slice(1).map((v, i) =>
                    `${i + 2}. 🎵 *${v.title}*\n` +
                    `⏳ Duration: ${v.duration} detik\n` +
                    `❤️ Likes: ${v.digg_count}\n` +
                    `💬 Comments: ${v.comment_count}\n` +
                    `🔄 Shares: ${v.share_count}\n` +
                    `🔗 [Tonton Video](https://www.tiktok.com/@${v.author.unique_id}/video/${v.video_id})\n`
                ).join("\n");

                bot.sendMessage(chatId, `📚 *Daftar Video Lainnya:*\n\n${list}`, { parse_mode: "Markdown" });
            }

        } catch (error) {
            console.error("Error saat mengambil video TikTok:", error);
            bot.sendMessage(chatId, "❌ Terjadi kesalahan saat mengambil video TikTok.");
        }
    })();
}  
break;

            case '/tiktok': case '/tiktokdown': case '/ttdown': case '/ttdl': case '/tt': case '/ttmp4': case '/ttvideo': case '/tiktokmp4': case '/tiktokvideo': {
                if (!arg1) return reply(chatId, '⚠️ Harap masukkan URL Tiktok!\n\nContoh: /tiktok https://www.tiktok.com/@user/video/123456789');
                if (!arg1.includes('tiktok.com')) return reply(chatId, '⚠️ URL tidak valid! Harap masukkan link dari Tiktok.');

                try {
                    reply(chatId, '⏳ Sedang mengambil video...');
                    const hasil = await tiktokDl(arg1);

                    if (hasil && hasil.data && hasil.data[1] && hasil.data[1].url) {
                        await bot.sendVideo(chatId, hasil.data[1].url, {
                            caption: `📍 *Title:* ${hasil.title}\n⏳ *Duration:* ${hasil.duration}\n🎃 *Author:* ${hasil.author.nickname} (@${hasil.author.fullname})`
                        });
                    } else {
                        for (let i = 0; i < hasil.data.length; i++) {
                            await bot.sendPhoto(chatId, hasil.data[i].url, { caption: `🚀 *Image:* ${i + 1}` });
                        }
                    }
                } catch (e) {
                    reply(chatId, '❌ Gagal mengunduh! Pastikan URL benar.');
                }
            }
            break;

          case '/ai': 
          case '/chatgpt': {
           if (!arg1) return reply(chatId, '⚠️ Masukkan teks untuk dikirim ke AI!\nContoh: /ai Hai, apa kabar?');

           // Kirim pesan proses dulu
         let sentMessage = await bot.sendMessage(chatId, "⏳ Sedang memproses...");

            try {
           let response = await fetch(`https://api.siputzx.my.id/api/ai/gpt3?prompt=kamu adalah ai yang ceria&content=${encodeURIComponent(arg1)}`);
        let data = await response.json();

        if (data.status) {
            editMessage(bot, chatId, sentMessage.message_id, data.data);
        } else {
            editMessage(bot, chatId, sentMessage.message_id, "⚠️ Terjadi kesalahan dalam memproses permintaan.");
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        editMessage(bot, chatId, sentMessage.message_id, "❌ Gagal mengambil respons dari AI.");
    }
}
break;

case '/buatprofil': {
    if (!arg1.includes('|')) {
        return bot.sendMessage(chatId, "⚠️ Format salah!\nGunakan: /buatprofil [nama] | [umur] | [gender]\nContoh: /buatprofil Sanzz | 18 | Laki-laki");
    }

    let [nama, umur, gender] = arg1.split('|').map(v => v.trim());

    if (!nama || !umur || !gender) {
        return bot.sendMessage(chatId, "⚠️ Format salah! Pastikan menggunakan tanda `|` untuk memisahkan.");
    }

    if (isNaN(umur)) {
        return bot.sendMessage(chatId, "⚠️ Umur harus berupa angka!");
    }

    profiles[chatId] = { nama, umur, gender };
    saveProfiles();
bot.sendMessage(chatId, "✅ Profil berhasil dibuat!\n\n📌 *Nama:* ${nama}\n📆 *Umur:* ${umur} tahun\n🚻 *Gender:* ${gender}", { parse_mode: "Markdown" });
}
break;

            // Fitur Anonymous Chat
           case '/startanon': {
    if (anonymous[chatId]) return bot.sendMessage(chatId, '❌ Kamu sudah dalam mode anonymous!');

    let partner = Object.keys(anonymous).find(id => !anonymous[id].partner);
    if (partner) {
        anonymous[chatId] = { partner };
        anonymous[partner].partner = chatId;

        let userProfile = profiles[chatId] ? `📌 *Nama:* ${profiles[chatId].nama}\n📆 *Umur:* ${profiles[chatId].umur} tahun\n🚻 *Gender:* ${profiles[chatId].gender}` : "⚠️ Pasanganmu belum membuat profil.";
        let partnerProfile = profiles[partner] ? `📌 *Nama:* ${profiles[partner].nama}\n📆 *Umur:* ${profiles[partner].umur} tahun\n🚻 *Gender:* ${profiles[partner].gender}` : "⚠️ Pasanganmu belum membuat profil.";

        bot.sendMessage(chatId, `✅ Kamu terhubung! Mulai chat sekarang.\n\n📜 *Profil Pasanganmu:*\n${partnerProfile}`);
        bot.sendMessage(partner, `✅ Kamu terhubung! Mulai chat sekarang.\n\n📜 *Profil Pasanganmu:*\n${userProfile}`);
    } else {
        anonymous[chatId] = { partner: null };
        bot.sendMessage(chatId, '🔄 Menunggu pasangan...');
    }
}
break;

            case '/stopanon': {
    if (!anonymous[chatId]) return bot.sendMessage(chatId, '❌ Kamu tidak sedang dalam mode anonymous.');

    let partner = anonymous[chatId].partner;
    if (partner) {
        bot.sendMessage(partner, '⚠️ Pasanganmu telah keluar dari chat.');
        delete anonymous[partner];
    }
    delete anonymous[chatId];

    bot.sendMessage(chatId, '✅ Kamu keluar dari anonymous chat.');
}
break;

default: {
    if (uploadSession[chatId] && (msg.document || msg.photo || msg.video)) {
        let fileId = msg.document ? msg.document.file_id : 
                     msg.photo ? msg.photo[msg.photo.length - 1].file_id : 
                     msg.video.file_id;

        let file = await bot.getFile(fileId);
        let filePath = `https://api.telegram.org/file/bot7524827456:AAGA9ODOWOxd8hbpl6__mbJoqm9ogMZWKds/${file.file_path}`;

        let response = await fetch(filePath);
        let buffer = await response.buffer();

        bot.sendMessage(chatId, "⏳ Mengupload file...");

        let url = await uploadToUrl(buffer);

        if (url) {
            bot.sendMessage(chatId, `✅ File berhasil diunggah!\n🔗 Link: ${url}`);
        } else {
            bot.sendMessage(chatId, "❌ Gagal mengunggah file.");
        }

        delete uploadSession[chatId]; // Hapus sesi setelah selesai upload
    } 
    else if (anonymous[chatId]?.partner) {
        let partner = anonymous[chatId].partner;
        if (msg.text) {
            bot.sendMessage(partner, msg.text);
        } else if (msg.sticker) {
            bot.sendSticker(partner, msg.sticker.file_id);
        } else if (msg.photo) {
            bot.sendPhoto(partner, msg.photo[msg.photo.length - 1].file_id, { caption: msg.caption || '' });
        } else if (msg.video) {
            bot.sendVideo(partner, msg.video.file_id, { caption: msg.caption || '' });
        }
    }
}
}
} catch (error) {
    console.log(error);
    reply(chatId, "⚠️ Terjadi kesalahan.");
}
});


bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    switch (query.data) {
        case "menu": {
            const menuText = `📜 *Menu Utama*  
Pilih fitur yang ingin kamu gunakan:

🔍 *Download*  
  - /tiktok - Download Video/Foto TikTok  
  - /igdl - Download Video/Foto Instagram  
  - /ytmp4 - Download Video YouTube  
  - /ytmp3 - Download Audio YouTube    

🤖 *Fitur AI*  
  - /ai - Chat AI  

👥 *Anonymous Chat*  
  - /startanon - Mulai Anonymous Chat  
  - /stopanon - Hentikan Anonymous Chat  
  - /buatprofil - Buat Profil Anonymous  

⚙️ *Buat Bot*  
  - /jadibot - Aktifkan bot  
  - /stopjadibot - Nonaktifkan bot  

Silakan ketik perintah sesuai fitur yang ingin kamu gunakan!`;

            bot.editMessageText(menuText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: "Markdown"
            });
        }
        break;
    }

    bot.answerCallbackQuery(query.id);
});

// Auto reload jika file berubah
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});

module.exports = bot;
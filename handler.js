process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

/*
	* Create By Naze
	* Follow https://github.com/nazedev
	* Whatsapp : https://whatsapp.com/channel/0029VaWOkNm7DAWtkvkJBK43
*/

require('./settings');
const fs = require('fs');
const chalk = require('chalk');
const prem = require('./src/premium');
const { rdGame, iGame, tGame, gameSlot, gameCasinoSolo, gameSamgongSolo, gameMerampok, gameBegal, daily, buy, setLimit, addLimit, addUang, setUang, transfer } = require('./lib/game');
const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, checkBandwidth, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, getTypeUrlMedia, pickRandom, convertTimestampToDate, getAllHTML, tarBackup } = require('./lib/function');

module.exports = naze = async (naze, m, msg, store, groupCache) => {
	try {
	
	const botNumber = await naze.decodeJid(naze.user.id)	
const body = (m.type === 'conversation') ? m.message.conversation :
		(m.type == 'imageMessage') ? m.message.imageMessage.caption :
		(m.type == 'videoMessage') ? m.message.videoMessage.caption :
		(m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
		(m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
		(m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
		(m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
		(m.type == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) :
		(m.type == 'editedMessage') ? (m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || '') :
		(m.type == 'protocolMessage') ? (m.message.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.protocolMessage?.editedMessage?.conversation || m.message.protocolMessage?.editedMessage?.imageMessage?.caption || m.message.protocolMessage?.editedMessage?.videoMessage?.caption || '') : ''
const isCreator = isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)	
const prefix = isCreator ? (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : listprefix.find(a => body.startsWith(a)) || '') : db.set[botNumber].multiprefix ? (/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : listprefix.find(a => body.startsWith(a)) || '¿') : listprefix.find(a => body.startsWith(a)) || '¿'
		const isCmd = body.startsWith(prefix)
		const args = body.trim().split(/ +/).slice(1)
		const command = isCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
		const text = q = args.join(' ')
	
	 const premium = db.premium
	
	const isLimit = db.users[m.sender] ? (db.users[m.sender].limit > 0) : false
	const isPremium = isCreator || prem.checkPremiumUser(m.sender, premium) || false
	
	
	
	



const plug = {
    naze,
    isCreator,
    command,
    isCmd,
    m,
    text,
    sleep,
    setLimit,
    isLimit,
    prefix,
    args,
    botNumber,
    isPremium,
    isGroup: m.isGroup,
    isPrivate: !m.isGroup,
    reply: m.reply.bind(m),
};

for (let plugin of global.plugins) {
    try {
        // Cek mute
        if (m.isGroup && db.groups[m.chat]?.mute && !isCreator) continue;

        // Jalankan plugin.before kalau ada
        if (typeof plugin.before === 'function') {
            await plugin.before(m, plug);
        }

        // Jalankan command kalau cocok
        if (
            Array.isArray(plugin.command) &&
            plugin.command.includes(command.toLowerCase())
        ) {
            if (plugin.owner && !isCreator) return m.reply(mess.owner);
            if (plugin.premium && !isPremium) return m.reply(mess.prem);
            if (plugin.group && !plug.isGroup) return m.reply(mess.group);
            if (plugin.admin && !m.isAdmin) return m.reply(mess.admin);
            if (plugin.private && !plug.isPrivate) return m.reply(mess.private);
            if (typeof plugin !== "function") return;
            await plugin(m, plug);
        }

    } catch (err) {
        console.error(err);
        m.reply(err)
    }
}


} catch (err) {
		console.log(err);
		}
	}
	

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
const timeout = 120
module.exports.config = {
    name: "dovuilq",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Đố vui, hong vui thì thôi",
    commandCategory: "game",
    usages: "",
    cooldowns: 5
}

module.exports.handleReply = async function ({ args, event, Users, api, handleReply }) {
    const axios = global.nodemodule['axios'];  
    var { dataGame, dapan, nameUser } = handleReply;
    if (handleReply.author != event.senderID) return 
    switch (handleReply.type) {
        case "reply": {
            const aw = event.body
            const dapanUser = dataGame
            const checkTrue = dapan
            if (aw.toLowerCase() == 'a' && dataGame.a == checkTrue) {
                api.unsendMessage(handleReply.messageID)
                var msg = {body: `✔${nameUser} đã trả lời chính xác!\nĐáp án: ${checkTrue}`}
                return api.sendMessage(msg, event.threadID, event.messageID)   
            } else 
             if (aw.toLowerCase() == 'b' && dataGame.b == checkTrue) {
                api.unsendMessage(handleReply.messageID)
                var msg = {body: `✔${nameUser} đã trả lời chính xác!\nĐáp án: ${checkTrue}`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            } else 
             if (aw.toLowerCase() == 'c' && dataGame.c == checkTrue) {
                api.unsendMessage(handleReply.messageID)
                var msg = {body: `✔${nameUser} đã trả lời chính xác!\nĐáp án: ${checkTrue}`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            } else 
             if (aw.toLowerCase() == 'd' && dataGame.d == checkTrue) {
                api.unsendMessage(handleReply.messageID)
                var msg = {body: `✔${nameUser} đã trả lời chính xác!\nĐáp án: ${checkTrue}`}
                return api.sendMessage(msg, event.threadID, event.messageID)
            }
            else {
            api.unsendMessage(handleReply.messageID)
            api.sendMessage(`✘Tiếc quá! ${nameUser} trả lời sai rồi!!!\nĐáp án chính xác là: ${dapan}`, event.threadID);
            }
        }
    }
}

module.exports.handleReaction = ({ Users, api, event, handleReaction,  }) => {
    var { dataGame, dapan, author, nameUser } = handleReaction;
    //if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
    if (event.userID != author) return;
    console.log(event.userID)
    console.log(author)
    if (event.reaction != "👍" && event.reaction != "😆"&& event.reaction != "😮"&& event.reaction != "😀") return;
    let response = "";
    if (event.reaction == "👍") response = dataGame.a
    else if (event.reaction == "😀") response = dataGame.b
    else if (event.reaction == "😆") response = dataGame.c
    else if (event.reaction == "😮") response = dataGame.d

    if (response == handleReaction.dapan) { 
        api.unsendMessage(handleReaction.messageID)
        api.sendMessage(`✔Hay quá! ${nameUser} trả lời đúng rồi.\nĐáp án: ${dapan}`, event.threadID) 
    } else {
    api.unsendMessage(handleReaction.messageID)
    api.sendMessage(`✘Tiếc quá! ${nameUser} trả lời sai rồi!!!\nĐáp án chính xác là: ${dapan}`, event.threadID);
    }
}

module.exports.run = async ({ api, event, Users }) => {
const axios = require('axios');  
const { threadID, messageID } = event;
const res = await axios.get(`https://apilienquan.miraiofficials123.repl.co/`);
const dataGame = res.data
const qq = res.data.images;
let cc = (await axios.get(qq, {
			responseType: "stream"
		})).data;
var namePlayer_react = await Users.getData(event.senderID)
        return api.sendMessage({body: `❔Câu hỏi dành cho bạn:\n${dataGame.questions}\n\n👍/A. ${dataGame.a}\n😀/B. ${dataGame.b}\n😆/C. ${dataGame.c}\n😮/D. ${dataGame.d}\n\n🌻Reply tin nhắn hoặc thả cảm xúc để trả lời`, attachment: cc}, event.threadID, (error, info) => {
        global.client.handleReaction.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            dataGame: res.data,
            dapan: dataGame.dapan,
            nameUser: namePlayer_react.name
        })
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            dataGame: res.data,
            dapan: dataGame.dapan,
            nameUser: namePlayer_react.name
        })
setTimeout(function(){ 
        api.unsendMessage(info.messageID)
        }, timeout*1000);
    }) 
}

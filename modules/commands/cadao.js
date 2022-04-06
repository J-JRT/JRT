module.exports.config = {
	name: "cadao",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Ca Dao Việt Nam",
	commandCategory: "fun",
	usages: "cadao",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const request = require('request');
const fs = require("fs");
const res = await axios.get(`https://apikanekiflop.tk/cadao`);
const anh = await axios.get(`https://api.xlshsad.repl.co/images/mirai`);
var image = res.data.url;
var cadao = res.data.data
let callback = function () {
			 api.sendMessage({
				body: `★Ca dao Việt Nam★:\n﹤ ${cadao} ﹥`,
				attachment: fs.createReadStream(__dirname + `/cache/gaicadao.jpg`)
			}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/gaicadao.jpg`), event.messageID);
			};
			request(anh.data.url).pipe(fs.createWriteStream(__dirname + `/cache/gaicadao.jpg`)).on("close", callback);
}

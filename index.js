const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');

var telegramToken = require('./keys.js').telegramToken;
var emailPassword = require('./keys.js').emailPassword;

console.log(telegramToken);

// replace the value below with the Telegram token you receive from @BotFather
const token = telegramToken;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 
  sendEmail(resp)
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Received your message from ${chatId}`);
}); 

var sendEmail = function(textToSend) {

  let transporter = nodemailer.createTransport(
    {
        host: 'smtp.yandex.ru',
        port: 465,
        auth: {
            user: 'k.keksovitch@yandex.ru',
            pass: emailPassword
        },
        logger: false,
        debug: false 
    }
);
  
  var mailOptions = {
    from: 'k.keksovitch@yandex.ru',
    to: 'k.keksovitch@yandex.ru',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
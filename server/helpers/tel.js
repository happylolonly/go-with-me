const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '540810838:AAHxFaUQ0Onmy_8QLEroYKqyv-14tnQgjrc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

import Subscriber from '../models/Subscriber';
import User from '../models/User';

import { processUser } from './s';


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const { id, first_name: firstName, last_name: lastName, username: userName } = msg.chat;

  await processUser(id, { firstName, lastName, userName }, 'telegram');

  bot.sendMessage(id, 'Received your message');
});


function greeting() {
    const gr = [
        'Хай',
        'Привет',
        'Хеллоу',
        'Нихао',
        'Прив',
        'Здаров',
    ];

    const random = Math.floor(Math.random() * gr.length);

    return gr[random];
}

export default {
    async send({title, description, link, list, id}) {

        return new Promise( async (resolve, reject) => {

            const user = (await User.findById(id)).toObject();


            const lists = user.lists;

            const listObj = lists.filter(item => {
                return item._id.toString() === list
            })[0];



            // const listObj = await List.findById(list);

            const friends = [];

            for (let item of listObj.friends) {
                // const friend = await Friend.findById(item);
                const friend = user.friends.filter(item2 => item2._id.toString() === item)[0];

                // убрать костыль перенеся проверку на фронт
                if (!friend) continue;
                if (friend.source !== 'telegram') continue;



                // if (friend.link.includes('/id') && Number.isInteger(+friend.link.split('/id')[1])) {
                //     friend.link = friend.link.split('id')[1];
                // } else {
                //     const id = await vkId(friend.link.split('vk.com/')[1]);
                //     friend.link = id.id;
                // }
                friends.push(friend.link)

            } 


            let friend = '';

            // if (user.login.type === 'vk'); {
            //     const d = await vkId(user.login.id);
            //     const { first_name, last_name, id } = d;

            //     friend = `@id${id} (${first_name} ${last_name})`;
            // }

            for (let item of friends) {

                const user = await Subscriber.findOne({ userName: item, source: 'telegram' });

                if (!user) {
                    return;
                }
    
                bot.sendMessage(user.id, `
                    ${greeting()}! Твой друг ${friend} зовет тебя на ${title}! \n ${description} \n Ссылка: ${link}    
                `.trim());
            };

            resolve();

        });
    }
}

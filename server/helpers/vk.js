// import Friend from '../models/friend';
// import List from '../models/list';
import User from "../models/User";

import Subscriber from "../models/Subscriber";

import { Bot as Bot2 } from "node-vk-bot";
const VkBot = require("node-vk-bot-api");
import { processUser, inviteFriends } from "./s";

import vkId from "./vkId";

const token =
  "20a14540148556de06e7fb0c5abee74ae174df47de504ee14f6612eed349bba6a5793d5b03c5e27a04dc4";

const bot = new VkBot({
  token: token,
  // group_id: 165270834
  confirmation: "e75adbe3"
  // prefix: /^Bot[\s,]/
});

const bot2 = new Bot2({
  token: token,
  group_id: 165270834
  // confirmation: "e75adbe3"
  // prefix: /^Bot[\s,]/
});

//   /Hi|Hello|Hey/i,
// /^(.|\n)*$/

bot.on(async ctx => {
  // /./i
  const { message } = ctx;
  const { user_id: id } = message;

  const users = await bot2.api("users.get", { user_ids: id });

  const { first_name: firstName, last_name: lastName } = users[0];

  const existingUser = await Subscriber.findOne({ id, source: "vk" });

  if (existingUser) {
    const phraces = [
      "У меня пока нету нейросетей - не могу ответить тебе что-нибудь по делу",
      "Я рад что ты мне пишешь, но лучше напиши тому кто тебя позвал на мероприятие",
      "!@#$%^&*@%&%#@#@&#@$^#@",
      "Эй, не сломай меня!"
    ];

    ctx.reply(
      phraces[Math.floor(Math.random() * phraces.length)],
      message.peer_id
    );
    await processUser(id, { firstName, lastName }, "vk"); // пересохранить
  } else {
    await processUser(id, { firstName, lastName }, "vk");
    ctx.reply(
      "Привет! Круто что ты мне написал! Я тебя сохранил, теперь ты можешь получать приглашения от друзей!",
      message.peer_id
    );
  }
});

function greeting() {
  const gr = ["Хай", "Привет", "Хеллоу", "Нихао", "Прив", "Здаров"];

  const random = Math.floor(Math.random() * gr.length);

  return gr[random];
}

export default {
  async send({ title, description, link, list, id }) {
    return new Promise(async (resolve, reject) => {
      const user = (await User.findById(id)).toObject();

      const lists = user.lists;

      const listObj = lists.filter(item => {
        return item._id.toString() === list;
      })[0];

      // const listObj = await List.findById(list);

      const friends = [];

      for (let item of listObj.friends) {
        // const friend = await Friend.findById(item);
        const friend = user.friends.filter(
          item2 => item2._id.toString() === item
        )[0];

        // убрать костыль перенеся проверку на фронт
        if (!friend) continue;

        if (friend.source !== "vk") continue;

        if (
          friend.link.includes("/id") &&
          Number.isInteger(+friend.link.split("/id")[1])
        ) {
          friend.link = friend.link.split("id")[1];
        } else {
          const id = await vkId(friend.link.split("vk.com/")[1]);
          friend.link = id.id;
        }
        friends.push(friend.link);
      }

      let friend = "";

      if (user.login.type === "vk");
      {
        const d = await vkId(user.login.id);
        const { first_name, last_name, id } = d;

        friend = `@id${id} (${first_name} ${last_name})`;
      }

      friends.forEach(item => {
        bot2.send(
          `
                    ${greeting()}! Твой друг ${friend} зовет тебя на ${title}! \n ${description} \n Ссылка: ${link} ${inviteFriends()}
                `.trim(),
          item
        );
      });

      resolve();
    });

    // bot.get(/Hi|Hello|Hey/i, message => {
    //   const options =  { forward_messages: message.id }

    //   console.log(message.id)

    //   bot.send('Hello!', message.peer_id, options)
    // })
  },

  bot
};

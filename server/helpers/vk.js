import Friend from '../models/friend';
// import List from '../models/list';
import User from '../models/User';


import { Bot } from 'node-vk-bot'

import vkId from './vkId';

const token = '20a14540148556de06e7fb0c5abee74ae174df47de504ee14f6612eed349bba6a5793d5b03c5e27a04dc4';
  
const bot = new Bot({
    token: token,
    // prefix: /^Bot[\s,]/
  }).start()


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


                if (friend.link.includes('/id') && Number.isInteger(+friend.link.split('/id')[1])) {
                    friend.link = friend.link.split('id')[1];
                } else {
                    const id = await vkId(friend.link.split('vk.com/')[1]);
                    friend.link = id;
                }
                friends.push(friend.link)

            }  
            
            friends.forEach(item => {
    
                bot.send(`
                    Твой друг зовет тебя!
                    ${title}
    
                    ${description}
                    
                    Ссылка: ${link}
    
                    Написать ему: https://vk.com/id91645893
                `, item);
            });

            resolve();

        });

       

// bot.get(/Hi|Hello|Hey/i, message => {
//   const options =  { forward_messages: message.id }


//   console.log(message.id)
 
//   bot.send('Hello!', message.peer_id, options)
// })



    }
}
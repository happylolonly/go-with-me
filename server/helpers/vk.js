import Friend from '../model/friend';
import List from '../model/list';

import { Bot } from 'node-vk-bot'

const token = '20a14540148556de06e7fb0c5abee74ae174df47de504ee14f6612eed349bba6a5793d5b03c5e27a04dc4';
  
const bot = new Bot({
    token: token,
    // prefix: /^Bot[\s,]/
  }).start()


export default {
    async send({title, description, link, list}) {

        return new Promise( async (resolve, reject) => {

            const listObj = await List.findById(list);

            const friends = [];

            for (let item of listObj.friends) {
                const friend = await Friend.findById(item);

                if (friend.link.includes('id')) {
                    friend.link = friend.link.split('id')[1];
                }
                friends.push(friend.link)

            }   
            

            friends.forEach(item => {

    
                bot.send(`
                    Твой друг зовет тебя!
    
                    ${description}
                    
                    Ссылка: ${link}
    
                    Написать ему: https://vk.com/id91645893
                `, item);
            });

            resolve();

        });

       

// bot.get(/Hi|Hello|Hey/i, message => {
//   const options =  { forward_messages: message.id }

//   debugger;

//   console.log(message.id)
 
//   bot.send('Hello!', message.peer_id, options)
// })



    }
}
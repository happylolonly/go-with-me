import axios from 'axios';

import Subscriber from '../models/Subscriber';
import User from '../models/User';



const TOKEN = 'EAADUBTfee4sBAJfwhfwFGwZBwZAPjK2WrlXIlMce29Oizta2GA5AHvRmx5swxSIDaWwms3ZB0ADWZCvsR1t1I8U32q3nOwPXe3JQyFn3qo9pCG1tFisIktqDiNeae03YsBpsmbA6RnwkX1cllgNcpswFGKtDqx13Ew091bZCJWZBrSfGMXVr4O';

const sendMessage = (id, text) => {
    return new Promise(async (resolve, reject) => {

        debugger;

        const json = {
            recipient: {
                id: id
            },
            message: {
                text
            }
        }

        try {
            await axios.post('https://graph.facebook.com/v2.6/me/messages', json, {
                params: {
                    access_token: TOKEN
                }
            })

            resolve(true);

        } catch (error) {
            console.dir(error);
            reject();
        }

    });
}

const getProfile = (id, cb) => {
    return new Promise(async resolve => {

        const profile = await axios.get('https://graph.facebook.com/v3.0/' + id, {
            params: {
                fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
                access_token: TOKEN
            }
        })

        resolve(profile);
    });

}


export default {
    sendMessage,
    getProfile,
    testSend
}


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

    async function testSend({title, description, link, list, id}) {

        return new Promise( async (resolve, reject) => {

            debugger;

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
                if (friend.source !== 'facebook') continue;



                // if (friend.link.includes('/id') && Number.isInteger(+friend.link.split('/id')[1])) {
                //     friend.link = friend.link.split('id')[1];
                // } else {
                //     const id = await vkId(friend.link.split('vk.com/')[1]);
                //     friend.link = id.id;
                // }
                friends.push(friend.link)

            } 

            debugger;


            let friend = '';

            // if (user.login.type === 'vk'); {
            //     const d = await vkId(user.login.id);
            //     const { first_name, last_name, id } = d;

            //     friend = `@id${id} (${first_name} ${last_name})`;
            // }

            for (let item of friends) {

                item = item.split('https://www.facebook.com/')[1];

                const user = await Subscriber.findOne({ userName: item, source: 'facebook' });

                if (!user) {
                    return;
                }
    
                sendMessage(user.chatId, `
                    ${greeting()}! Твой друг ${friend} зовет тебя на ${title}! \n ${description} \n Ссылка: ${link}    
                `.trim());
            };

            resolve();

        });
    }

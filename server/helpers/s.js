import Subscriber from '../models/Subscriber';

export async function processUser(id, data, source) {

    return new Promise(async (resolve, reject) => {

        try {
            
            const existingUser = await Subscriber.findOne({ id, source });

            if (existingUser) {

                await Subscriber.findByIdAndUpdate(existingUser._id, {
                    ...data
                });

            } else {

                await new Subscriber({
                    id,
                    ...data,
                    source
                }).save();

            }

            resolve();

        } catch (error) {
            console.log(error);
            resolve(error);
        }

    });

}


export function inviteFriends() {
    const random = Math.random();

    return random > 0.70 ? '\n \n Пригласи своих друзей куда-нибудь тоже на http://gowithme.surge.sh/': '';
}

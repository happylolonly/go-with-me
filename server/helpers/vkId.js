import VK from 'vk-io';

// const { app, key, token } = credentials.vk;

const token = '20a14540148556de06e7fb0c5abee74ae174df47de504ee14f6612eed349bba6a5793d5b03c5e27a04dc4';
const app = '6456378';
const key = 'rgvUpIuCMsIBX7IrElYr';

const vk = new VK({
    app: app,
    key: key,
    token: token,
});

export default (name) => {

    return new Promise(async resolve => {

        try {
            const users = await vk.api.users.get({ user_ids: name });
            resolve(users[0]);
        } catch (error) {
            console.log('VK get id error');
            resolve('');
        }
        
    });

}

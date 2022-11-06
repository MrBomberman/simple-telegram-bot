const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againGameOptions } = require('./options');

const token = '5489947754:AAEXuaCGnqxCwipgtfK1GgHUyCeCBQ5E7b0';

const bot = new TelegramApi(token, {polling: true});

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю тебе цифру от 0 до 9, ты должен будешь ее угадать!`)
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай число!', gameOptions)
}

const start = () => {
    bot.setMyCommands ( [
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Начать игру "Угадай цифру"'}
    ])
    
    bot.on('message', async message => {
        const text = message.text;
        const chatId = message.chat.id;
    
        if(text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/897/df3/897df311-e19d-4a7d-8b27-4929abbcf2cc/1.webp')
            return bot.sendMessage(chatId, `Привет! Добро пожаловать в телеграм бота автора MrBomberman!`)
        } 
        if(text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${message.from.username} :)`);
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз :)')
        // console.log(message)
    }) // слушатель событий на обработку полученных сообщений

    bot.on('callback_query', async message => {
        const data = message.data;
        const chatId = message.message.chat.id
        if(data === '/again') {
            return startGame(chatId)
        }
        if(data == chats[chatId]) {
            return await bot.sendMessage(chatId,`Ты угадал цифру ${chats[chatId]} :)`, againGameOptions)
        } else {
            return await bot.sendMessage(chatId,`К сожалению, ты не угадал, бот загадал цифру ${chats[chatId]}`, againGameOptions)
        }
    })
}

start()
const { Telegraf } = require('telegraf')
const path = require('path')
const SpendingsService = require('./Service/SpendingsService')

global.appRoot = path.resolve(__dirname);

const spendingsService = new SpendingsService()
const bot = new Telegraf("1903273801:AAElhHTN1BlvozC1rgnR9LmXaOxVqbt6T3E")

bot.on('message',(ctx, next) =>{
    if (ctx.message.chat.id === 157168307) {
        next()
    } else {
        ctx.reply('Ты не можешь пользоваться этим ботом')
    }
})

bot.command('add', ctx => {
    const message = spendingsService.logSpending(ctx.message.text)
    ctx.reply(message)
})

bot.command('show', ctx => {
    const message = spendingsService.showSpendings()
    ctx.reply(message)
})

bot.command('reset', ctx => {
    const message = spendingsService.resetSpendings()
    ctx.reply(message)
})

bot.command('items', ctx => {
    const message = spendingsService.itemsAvailible()
    ctx.reply(message)
})

bot.launch().catch(e => {
    console.log(e.message)
})
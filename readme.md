# 🤖 Expenses-bot

<b>Expenses bot is a telegram bot which assists you in managing daily expenses</b>

## 📟 Features

Bot is able to:

- Log expenses and present them in a simple way
- Cancel latest expenses
- Reset all expenses
- Be easily scaled and fitted to your own needs by just modifying one JSON file

[comment]: <> (  ![]&#40;https://i.imgur.com/4qfNb1N.png&#41;)


## 💻 Installation
Download and install the latest version of [Node.js](https://nodejs.org/en/)

Clone this repo and install dependencies:
```bash
git clone https://github.com/belotserkovtsev/expenses-bot.git
cd expenses-bot
npm install
```

Insert your bot token as <b>environment variable</b> and modify <i>expenses.json</i> so that it fits your needs in tracking expenses

```json
{
  "entertainment": {
    "limit": 1000,
    "expenses": 0,
    "displayName": "📱Entertainment",
    "abbreviations": [
      "ent",
      "entertainment"
    ]
  },
  "extra": {
    "limit": 1000,
    "expenses": 0,
    "displayName": "🥶Extra",
    "abbreviations": [
      "ext",
      "extra"
    ]
  }
}
```
The other option is to insert bot token right into app.js:
```js
const bot = new Telegraf('token');
```

Launch your application with <b>pm2</b>, <b>node</b>

```bash
node app.js
```

## 📟 Availible commands

|Description|Command|Param 1|Param 2|
|--- |---	|---	|---
| Adds expense to json|/add   |abbreviation: String| amount: Int| 
|Cancels last expense|/cancel  
|Displays expenses|/show 
|Shows available abbreviations mapped with displayName|/items
|Resets expenses for every item in json|/reset 

<span>
<img src="./media/gif1.gif" width="30%" />
<img src="./media/gif2.gif" width="30%" />
<img src="./media/gif3.gif" width="30%" />
</span>

## 📱 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
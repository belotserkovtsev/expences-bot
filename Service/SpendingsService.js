const FileService = require('./FileService')

class SpendingsService {
    logSpending(message) {
        try {
            const parsedMessage = this._parseMessage(message)
            this.fileService.write(parsedMessage)
            return 'good'
        } catch {
            return 'error'
        }
    }

    showSpendings() {
        const spendings = this.fileService.read()
        const json = JSON.parse(spendings)

        let message = ''

        Object.keys(json).forEach((key, i) => {
            const percentage = Math.round(json[key].expenses / json[key].limit * 100)
            message += `${key}: ${json[key].expenses} / ${json[key].limit} (${percentage} %)\n`
        })

        return message
    }

    resetSpendings() {
        try {
            this.fileService.reset()
            return 'good'
        } catch {
            return 'error'
        }

    }

    itemsAvailible() {
        return JSON.stringify(this.types, null, 2)
    }

    _parseMessage(message) {
        const messageArray = message.split(' ')
        if (messageArray.length < 3 || parseInt(messageArray[1]) || !this._typeForAbbreviation(messageArray[1])) {
            throw Error()
        }
        return {
            amount: messageArray[2],
            type: this._typeForAbbreviation(messageArray[1])
        }
    }

    _typeForAbbreviation(abbreviation) {
        return this.types[abbreviation]
    }

    constructor() {
        this.types = {
            'разв': 'entertainment',
            'транс': 'transport',
            'ост': 'extra',
            'еда': 'food'
        }

        this.fileService = new FileService()
    }
}

module.exports = SpendingsService
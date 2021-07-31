const FileService = require('./FileService')

class SpendingsService {
    logSpending(message) {
        try {
            const parsedMessage = this._parseMessage(message)
            this.fileService.write(parsedMessage)
            this.spendingsHistory.push(parsedMessage)
            return 'good'
        } catch {
            return 'error'
        }
    }

    showSpendings() {
        const spendings = this.fileService.read()
        const json = JSON.parse(spendings)

        let message = ''

        Object.keys(json).forEach(key => {
            const percentage = Math.round(json[key].expenses / json[key].limit * 100)
            message += `${json[key].displayName}: ${json[key].expenses} / ${json[key].limit} (${percentage} %)\n`
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
        try {
            const data = this.fileService.read()
            const json = JSON.parse(data)
            const keys = Object.keys(json)
            let message = ''

            for (let i = 0; i < keys.length; i++) {
                message += `${json[keys[i]].displayName} : ${json[keys[i]].abbreviations}\n`
            }

            return message
        } catch {
            return 'error'
        }
    }

    cancelLastOperation() {
        try {
            if (this.spendingsHistory.length === 0) {
                return 'no history. nothing to cancel'
            }
            let element = this.spendingsHistory.pop()
            this.fileService.cancel(element)
            return 'good'
        } catch {
            return 'error'
        }
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
        const data = this.fileService.read()
        const json = JSON.parse(data)
        const keys = Object.keys(json)

        for (let i = 0; i < keys.length; i++) {
            if (json[keys[i]].abbreviations.includes(abbreviation)) {
                return keys[i]
            }
        }

        return null
    }

    constructor() {
        this.fileService = new FileService()
        this.spendingsHistory = Array()
    }

}

module.exports = SpendingsService
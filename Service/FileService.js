const fs = require("fs")

class FileService {
    write(dataToWrite) {
        fs.readFile(appRoot + '/Data/expenses.json', 'utf-8', (err, data) => {
            const json = JSON.parse(data)
            json[dataToWrite.type].expenses = parseInt(dataToWrite.amount) + json[dataToWrite.type].expenses

            let jsonToWrite = JSON.stringify(json, null, 2)

            fs.writeFile(appRoot + '/Data/expenses.json', jsonToWrite, err => {
                if (err) throw err
            })

        })
    }

    read() {
        return fs.readFileSync(appRoot + '/Data/expenses.json', 'utf-8')
    }

    reset() {
        fs.readFile(appRoot + '/Data/expenses.json', 'utf-8', (err, data) => {
            let json = JSON.parse(data)

            Object.keys(json).forEach((key, i) => {
                json[key].expenses = 0
            })

            let jsonToWrite = JSON.stringify(json, null, 2)

            fs.writeFile(appRoot + '/Data/expenses.json', jsonToWrite, err => {
                if (err) throw err
            })
        })
    }
}

module.exports = FileService
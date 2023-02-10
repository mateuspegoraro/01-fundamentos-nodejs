import fs from 'node:fs/promises'

//console.log(import.meta.url)

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {} // o # impede que o atributo seja acessado externamente

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
    // {'nome': 'mateus', 'email': 'mateus@email'}
    // Object.entries => [['nome', 'mateus'], ['email', 'mateus@email']]
    select(table, search) {
        let data = this.#database[table] ?? []
        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].includes(value) 
                })
            })
        }
        return data
    }
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()
        return data
    }
    update(table, id, data) {
        const rowIndex = this.#database[table]
            .findIndex(row => {
                return row.id === id
            })
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data }
            this.#persist()
        }
    }
    delete(table, id) {
        const rowIndex = this.#database[table]
            .findIndex(row => {
                return row.id === id
            })
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }


}
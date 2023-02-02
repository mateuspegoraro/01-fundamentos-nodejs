export class Database {
    #database = {} // o # impede que o atributo seja acessado externamente

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }
    
    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        return data
    }


}
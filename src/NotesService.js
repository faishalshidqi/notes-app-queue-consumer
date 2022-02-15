const { Pool } = require('pg')

class NotesService {
    constructor() {
        this._pool = new Pool()
    }

    async getNotes(userId) {
        const query = {
            text: `select notes.* from notes 
                left join collaborations on collaborations.note_id = notes.id 
                where notes.owner = $1 or collaborations.user_id = $1 
                group by notes.id`,
            values: [userId]
        }

        const result = await this._pool.query(query)
        return result.rows
    }
}

module.exports = NotesService

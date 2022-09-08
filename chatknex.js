import { options } from './options/mariaDB.js';
import knex from 'knex';

const db = knex(options);

class chatFunctions {
    nuevoMensaje (mensaje) {
        return db('mensajes').insert(mensaje)
    }

}

export default chatFunctions;
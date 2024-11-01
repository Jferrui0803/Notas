import { Note } from './Note.js';

export class NoteConsumer {
    static consum(datos) {
        let notes = [];
        datos.forEach(element => {
            notes.push(new Note(element.tipo, element.contenido, element.fecha));
        });
        return notes;
    }
}
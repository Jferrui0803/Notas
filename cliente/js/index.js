import { NoteHandler } from './modulos/NoteHandler.js';
import { NoteConsumer } from './modulos/NoteConsumer.js';
import { UI } from './modulos/Ui.js';

let noteCollection = null;

document.getElementById('noteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const noteType = document.getElementById('tipo').value;
    const noteContent = document.getElementById('contenido').value;
    const noteDate = document.getElementById('fecha').value;

    NoteHandler.getInstance('http://localhost:3000').addNote({ tipo: noteType, contenido: noteContent, fecha: noteDate }, (response) => {
        noteCollection = NoteConsumer.consum(response.lista);
        UI.drawNotes(noteCollection, document.getElementById('notes'));
    }, (err) => {
        console.error(err);
    });
});

document.getElementById('filterButton').addEventListener('click', () => {
    const selectedMonth = document.getElementById('filterMonth').value;
    const notesFiltered = noteCollection.filter((note) => {
        const noteDateObj = new Date(note.fecha);
        const filterDateObj = new Date(selectedMonth);
        return noteDateObj.getMonth() === filterDateObj.getMonth() && noteDateObj.getFullYear() === filterDateObj.getFullYear();
    });
    UI.drawNotes(notesFiltered, document.getElementById('notes'));
});

NoteHandler.getInstance('http://localhost:3000').getAllNotes((response) => {
    noteCollection = NoteConsumer.consum(response.lista);
    UI.drawNotes(noteCollection, document.getElementById('notes'));
}, (err) => {
    console.error(err);
});

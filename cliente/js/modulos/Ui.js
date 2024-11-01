export const UI = {
    drawNotes: (notes, elementDiv) => {
        elementDiv.innerHTML = ''; 
        notes.forEach(element => {
            const noteDiv = document.createElement('div');
            noteDiv.className = `note ${element.tipo}`;
            noteDiv.innerHTML = `
                <p>${element.contenido}</p>
                <p>${new Date(element.fecha).toLocaleDateString()}</p>
            `;
            elementDiv.appendChild(noteDiv);
        });
    }
}
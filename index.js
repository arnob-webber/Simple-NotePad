const notesContainer = document.getElementById('notesContainer');
const newNoteBtn = document.getElementById('newNoteBtn');

function createNote(content = 'Click to edit...') {
    const note = document.createElement('div');
    note.className = 'note';
    note.contentEditable = true;
    note.innerText = content;

    note.addEventListener('click', () => {
        if (note.innerText === 'Click to edit...') {
            note.innerText = ''; 
        }
    });

    note.addEventListener('blur', () => {
        if (note.innerText.trim() === '') {
            note.innerText = 'Click to edit...'; 
        }
        saveNotes();
    });

    notesContainer.appendChild(note);
}

function saveNotes() {
    const notes = Array.from(notesContainer.children).map(note => note.innerText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notes.forEach(note => createNote(note));
    }
}

newNoteBtn.addEventListener('click', createNote);

loadNotes();

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null; // track which note is being edited

function displayNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const noteEl = document.createElement("div");
        noteEl.className = "note-card";
        noteEl.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteEl);
    });
}

function editNote(index) {
    titleInput.value = notes[index].title;
    contentInput.value = notes[index].content;
    editIndex = index; // store the index being edited
    addNoteBtn.textContent = "UPDATE NOTE"; // change button text
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

addNoteBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return;

    if (editIndex !== null) {
        // update existing note
        notes[editIndex] = { title, content };
        editIndex = null;
        addNoteBtn.textContent = "ADD NOTE"; // reset button text
    } else {
        // add new note
        notes.push({ title, content });
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    titleInput.value = "";
    contentInput.value = "";
    displayNotes();
});

displayNotes();

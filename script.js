const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
    notesContainer.innerHTML = "";
    notes.forEach(note => {
        const noteEl = document.createElement("div");
        noteEl.className = "note-card";
        noteEl.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
        `;
        notesContainer.appendChild(noteEl);
    });
}

addNoteBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) return;

    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
    titleInput.value = "";
    contentInput.value = "";
    displayNotes();
});

displayNotes();

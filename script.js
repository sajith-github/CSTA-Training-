const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null;

// Function to detect URLs and make them clickable
function linkify(text) {
    const urlPattern = /(\b(https?:\/\/|www\.)\S+\b)/gi;
    return text.replace(urlPattern, function (url) {
        let hyperlink = url;
        if (!hyperlink.match('^https?://')) {
            hyperlink = 'http://' + hyperlink;
        }
        return `<a href="${hyperlink}" target="_blank">${url}</a>`;
    });
}

function displayNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const noteEl = document.createElement("div");
        noteEl.className = "note-card";
        noteEl.innerHTML = `
            <h3>${note.title}</h3>
            <p>${linkify(note.content)}</p>
            <div class="note-buttons">
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteEl);
    });
}

function editNote(index) {
    titleInput.value = notes[index].title;
    contentInput.value = notes[index].content;
    editIndex = index;
    addNoteBtn.textContent = "UPDATE NOTE";
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
        notes[editIndex] = { title, content };
        editIndex = null;
        addNoteBtn.textContent = "ADD NOTE";
    } else {
        notes.push({ title, content });
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    titleInput.value = "";
    contentInput.value = "";
    displayNotes();
});

displayNotes();


  

// script.js
document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const addNoteBtn = document.getElementById("addNote");
  const notesContainer = document.getElementById("notesContainer");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let editIndex = null;
  


  // Create a DocumentFragment that contains text nodes and <a> nodes for URLs
  function createContentNode(text) {
    const frag = document.createDocumentFragment();
    const urlPattern = /(\b(https?:\/\/|www\.)[^\s<]+)/gi;
    let lastIndex = 0;
    let match;

    while ((match = urlPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      const rawUrl = match[0];
      const a = document.createElement('a');
      a.href = /^https?:\/\//i.test(rawUrl) ? rawUrl : 'http://' + rawUrl;
      a.textContent = rawUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      frag.appendChild(a);

      lastIndex = urlPattern.lastIndex;
    }

    // Add remaining text after last match
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    return frag;
  }

  function displayNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
      const noteEl = document.createElement("div");
      noteEl.className = "note-card";

      const titleEl = document.createElement("h3");
      titleEl.textContent = note.title || "";

      const contentEl = document.createElement("p");
      // Insert nodes that contain anchors for detected URLs
      contentEl.appendChild(createContentNode(note.content || ""));

      const btnWrap = document.createElement("div");
      btnWrap.className = "note-buttons";

      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editNote(index));

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => deleteNote(index));

      btnWrap.appendChild(editBtn);
      btnWrap.appendChild(delBtn);

      noteEl.appendChild(titleEl);
      noteEl.appendChild(contentEl);
      noteEl.appendChild(btnWrap);

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
    if (!confirm("Delete this note?")) return;
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }

  addNoteBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title && !content) return; // require something

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

  // initial render
  displayNotes();
});

      
   
 




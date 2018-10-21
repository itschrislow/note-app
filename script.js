'use strict'

let noteList = [];
let selectedNoteID;

class NoteComponent {
    constructor() {}
    
    addNote() {
        let newTitle = document.getElementById("title").value;
        let newContent = document.getElementById("content").value;

        if (newTitle === "") {
            alert("Please enter a title.");
        } else {
            let newNote = {
            name: newTitle,
            description: newContent
            };

            noteList.push(newNote);
            newNote.id = "note" + noteList.indexOf(newNote);
        }
        this.update();
        this.addListeners();
    }
    update() {
        document.getElementById("noteList").innerHTML = "";
        for (let i = 0; i < noteList.length; i++) {
            let nameList = "<li id=\"note" + i + "\" class=\"list-group-item\">" + noteList[i].name + "</li>";
            document.getElementById("noteList").innerHTML += nameList;
        }
    }
    addListeners() {
        for (let i = 0; i < noteList.length; i++) {
            document.getElementById("note" + i).addEventListener("click", nc.selNote);
        }
    }
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    }
    selNote() {
        selectedNoteID = event.target.id;
        
        let findNote = noteList.find(note => note.id === selectedNoteID);
        let findNoteIndex = noteList.indexOf(findNote);

        let title = document.getElementById("title");
        let content = document.getElementById("content");
        
        title.value = noteList[findNoteIndex].name;
        content.value = noteList[findNoteIndex].description;
    }
    getQuery() {
        let query = event.target.value.toUpperCase();

        this.filterList(noteList, query);
    }
    filterList(noteList, query) {
        let result = noteList.filter(noteName => {
            if (noteName.name.toUpperCase().indexOf(query) !== -1) {
                let showNote = document.getElementById(noteName.id);
                showNote.style.display = "block";
                return true;
            } else {
                let hideNote = document.getElementById(noteName.id);
                hideNote.style.display = "none";
                return false;
            }
        });
    }
    delNote() {
        let findNote = noteList.find(note => note.id === selectedNoteID);
        let findNoteIndex = noteList.indexOf(findNote);

        if (findNoteIndex === 0) {
            noteList.shift();
        } else {
            noteList.splice(findNoteIndex-1, 1);
        }
        nc.clearFields();
        nc.update();
    }
}
let nc = new NoteComponent();

let btnAdd = document.getElementById("addNote");
let btnDel = document.getElementById("delNote");

btnAdd.addEventListener("click", function() {
    nc.addNote();
    nc.clearFields();
});

btnDel.addEventListener("click", nc.delNote);

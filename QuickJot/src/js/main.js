const inputTitle = document.querySelector('#titleInput');
var addBtn = document.querySelector(".add-note");
const  noteBoard = document.querySelector(".note-body");
class Note{
    constructor(title, body){
        this.title = title;
        this.body = body;
        this.id = Math.random();

    }
}
function getNotes(){
    let notes;
    if(localStorage.getItem('quickJot.notes') === null){
        notes = [];
    } else{
        notes = JSON.parse(localStorage.getItem('quickJot.notes'));
    }
    return notes;
}
function addNoteStorage(note){
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('quickJot.notes' , JSON.stringify(notes));

}
function removeNoteFromStorage(id){
      const notes = getNotes();
      notes.forEach((note, index) => {
        if( note.id === id){
            notes.splice(index, 1);
        }
        localStorage.setItem('qiuckJot.note', JSON.stringify(notes));
      })

}
function displayNotes(){
    const notes = getNotes();
    notes.forEach(note =>{
       addNoteToBoard(note);
    })
}
function showAlrtMsg(message , alrtClass){
    const alertConatiner = document.createElement('div');
    alertConatiner.className = `message ${alrtClass}`;
    alertConatiner.appendChild(document.createTextNode(message));
    noteBoard.insertAdjacentElement('beforebegin', alertConatiner);
    inputTitle.focus();
    setTimeout( ()=> alertConatiner.remove(), 2000);
}

function addNoteToBoard(note){
  const newUInote = document.createElement('div');
        newUInote.classList.add('notes');
        newUInote.innerHTML =`
       <span hidden>${note.id}</span>
        <div class="note-delete-container">   
        <button type="button" class="note-delete-btn" > delete</button>   
        </div>
        <div class="content">
          <h2>${note.title}</h2>
          <p> ${note.body}</p>
        </div>
        `;
        noteBoard.appendChild(newUInote);
}
noteBoard.addEventListener('click',(e)=>{
    if(e.target.classList.contains('note-delete-btn')){
        const currentNote = e.target.closest('.notes');
        showAlrtMsg('Your note was deleted','removed-msg');
        currentNote.remove();
        const id = currentNote.querySelector('span').textContent;
        removeNoteFromStorage(Number(id));
    };
});

document.addEventListener('DOMContentLoaded', displayNotes);
   
addBtn.addEventListener('click', (e) =>{
   e.preventDefault();
   
    const textArea = document.querySelector('#textArea');

    if(inputTitle.value.length > 0 && textArea.value.length > 0 ){
        const newNote = new Note(inputTitle.value, textArea.value,);
        addNoteToBoard(newNote);
        addNoteStorage(newNote);
        inputTitle.value = "";
        textArea.value = "";
        showAlrtMsg( ' Note successfully added!' , 'success-msg');
        inputTitle.focus();
    } else{
        showAlrtMsg('Please add both a Title and note, Thankyou!' , 'alrt-msg');
    }
});
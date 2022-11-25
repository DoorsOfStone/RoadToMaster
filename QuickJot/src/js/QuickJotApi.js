export default class QuickJotApi{

 static getAllNotes(){
     const notes = JSON.parse(localStorage.getItem("noteapp-note") || "[]");
     return notes.sort((a,b) => {
        return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
     });
 } 

 static savedNotes(noteToSave){
    const notes = QuickJotApi.getAllNotes();
    const existing  = notes.find( note => note.id == noteToSave.id);
    if (existing){
     existing.title = noteToSave.title;
     existing.body = noteToSave.body;
     existing.updated = new Date().toISOString();
    }else{
        noteToSave.id = Math.floor(Math.random() * 1000000);
        noteToSave.updated = new Date().toISOString();
        notes.push(noteToSave);

    }

  
    localStorage.setItem("noteapp-note", JSON.stringify(notes));
 }
 static deleteNote(id){
      const notes = QuickJotApi.getAllNotes();
      const newNotes = notes.filter( note => note.id != id);
      localStorage.setItem("noteapp-note", JSON.stringify(newNotes));
 }
}
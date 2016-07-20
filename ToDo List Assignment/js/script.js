
//get all the notes stored in localstorage
function getNotes() {
    var notes = new Array;
    var notesStr = localStorage.getItem('note');
    if (notesStr !== null) {
        notes = JSON.parse(notesStr); 
    }
    return notes;
}

//get all the notes stored in localstorage
function getTrashNotes() {
    var trashNotes = new Array;
    var trashNotesStr = localStorage.getItem('trash');
    if (trashNotesStr !== null) {
        trashNotes = JSON.parse(trashNotesStr); 
    }
    return trashNotes;
}

//empty the trashed notes
function emptyTrash(){
    var trashNotes = getTrashNotes();
    if(trashNotes.length == 0){
        alert('Your trash is empty already');
        return false;
    }
    localStorage.removeItem("trash");
    showTrashNotes();
    alert("trash is empty now!");
}

//object created for new note and trashnote
function note(title ,content , length)
    {
      this.id = new Date();
      this.title = title;
      this.note = content;
      this.timestamp = new Date();
    }

//saving the notes to localstorage after crud operations
function saveNotesState(notesArray)
{
    localStorage.setItem('note', JSON.stringify(notesArray));
    return false;
}

//saving the trashNotes to localstorage after crud operations
function saveTrashState(trashNotes){
    localStorage.setItem('trash', JSON.stringify(trashNotes));
    return false;
}

//add a new note 
function addNote() 
{
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    if(title.split(" ").join("").length < 1 || content.split(" ").join("").length < 1){
         if(title.split(" ").join("").length < 1 && content.split(" ").join("").length < 1){
             alert('Please,Fill first title and content fields');
         }    
         else if(title.split(" ").join("").length == 0){
             alert("Your title field can't be blank");
         }   
         else if(content.split(" ").join("").length == 0){
             alert("Your content field can't be blank");
         } 
         return false;
        }
     
    var notes = getNotes();
    var noteObject =new note(title ,content , notes.length) ;  
    notes.push(noteObject);
    saveNotesState(notes);
    showNotes();
    document.getElementById('content').value = "";
    document.getElementById('title').value = "";
    return false;
}
//edit note
function editNote(id){
    var result = confirm("Want to edit?");
    if (!result) {
        return false;
    }
document.getElementById(id).getElementsByClassName("updated")[0].style.display='block';
 document.getElementById(id).getElementsByClassName("note-title")[0].disabled = false;
   document.getElementById(id).getElementsByClassName("note-content")[0].disabled = false;
}
//save note according to the id generated
function updateNote(id) {
    var title= document.getElementById(id).getElementsByClassName("note-title")[0].value;
    var note = document.getElementById(id).getElementsByClassName("note-content")[0].value
    var notes = getNotes();
    for(var i=0;i<notes.length;i++){
        if(notes[i].id == id){
            notes[i].note=note;
            notes[i].title=title;
            break;
        }
    }
    
    saveNotesState(notes);
    showNotes();
    return false;
}
 
//move the note to trash
function removeNote(id) {
    var result = confirm("Want to delete?");
    if (!result) {
        return false;
    }
    var notes = getNotes();
    var trashNotes = getTrashNotes();
    for(var i=0; i< notes.length; i++){
      if(notes[i].id == id){
        var trashNoteObject =new note(notes[i].title ,notes[i].note , trashNotes.length) ;
         trashNotes.push(trashNoteObject);
         localStorage.setItem('trash', JSON.stringify(trashNotes));
         notes.splice(i,1);
         break;
      }   
    }
    saveTrashState(trashNotes);
    saveNotesState(notes);
    showNotes();
    alert("Note has been moved to trash..!!!");
    return false;
}

//restore the trashNotes
function restoreTrashNote(id){
    var trashNotes = getTrashNotes();
    var notes = getNotes();
    for(var i=0;i<trashNotes.length;i++){
        if(trashNotes[i].id == id){
        var noteObject =new note(trashNotes[i].title ,trashNotes[i].note , notes.length) ;
         notes.push(noteObject);
         trashNotes.splice(i,1);
         break;
        }
    }
    saveTrashState(trashNotes);
    localStorage.setItem('note', JSON.stringify(notes));
    showTrashNotes();
    alert("Note has been restored..!!!");
    return false;   
}

//delete the note from trash
function deleteTrashNote(id) {
    var result = confirm("Delete Note forever?");
    if(result)
        {
    var temp = 0;
    var trashNotes = getTrashNotes();
    for(var i=0; i< trashNotes.length; i++){
      if(trashNotes[i].id == id){
         trashNotes.splice(i,1);
         break;
      }   
    }
    saveTrashState(trashNotes);
    showTrashNotes();
    return false;
        }
}

//display all the notes  
function showNotes() {
    var notes = getNotes();
    var html = '<ul>';
    for(var i=0; i<notes.length; i++) {
        html += "<li><div class='colour1'>" + 
					"<form class='updateForm' id='"+notes[i].timestamp+"' onsubmit='updateNote(this.id)'>" +
            "<input type='text' disabled class='note-title' placeholder='Untitled' maxlength='10' value='"+notes[i].title + "' id='"+notes[i].timestamp+"'/>" + 
					"<textarea disabled class='note-content'  placeholder='Your content here' id='"+notes[i].timestamp+"' />"+notes[i].note+"</textarea>" + 
					"<img src='../images/close.png' onclick='removeNote(this.id)' class='delete' id='" + notes[i].timestamp + "'  />" +
                   "<input type='submit' class='updated' value='save' id='" + notes[i].timestamp + "'/>" +
					"</form><img src='../images/file_edit.png' onclick='editNote(this.id)' class='editImage' id='" + notes[i].timestamp + "'></div></div></li>";
            };
    html += '</ul>';
    document.getElementById('notes').innerHTML = html;
}

//display the trash notes
function showTrashNotes(){
    var trashNotes = getTrashNotes();
    console.log(trashNotes);
    var html = '<ul>';
    for(var i=0; i<trashNotes.length; i++) {
        html += "<li><div class='colour1'>" + 
					"<form class='restoreForm' id='"+trashNotes[i].timestamp+"'>" +
            "<input type='text' class='note-title' placeholder='Untitled' disabled maxlength='10' value='"+trashNotes[i].title + "' id='"+trashNotes[i].timestamp+"'/>" + 
					"<textarea class='note-content' placeholder='Your content here' disabled id='"+trashNotes[i].timestamp+"' />"+trashNotes[i].note+"</textarea>" + 
					"<img src='../images/close.png' onclick='deleteTrashNote(this.id)' class='delete' id='" + trashNotes[i].timestamp + "'/>" +
                   "<input type='button' class='updated' value='restore' onclick='restoreTrashNote(this.id)' id='" + trashNotes[i].timestamp + "'/>" +
					"</form></div></li>";
            };
    html += '</ul>';
    document.getElementById('trashNotes').innerHTML = html;  
}


//for dyanamically growing textarea
function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

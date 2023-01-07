use this in https://www.websequencediagrams.com/


    note over selain:
    painetaan Save:
    selain ajaa spa.js
    
    päivitys lokaalisti:
    notes.push(note)
    e.target.elements[0].value = ""
    redrawNotes()
    
    päivitys palvelimelle:
    sendToServer(note)
    end note
    
    selain->palvelin: HTTP POST /exampleapp/new_note_spa
    palvelin-->selain: 201 {"message":"note created"}
    
    note over selain:
    data on jo päivitetty
    selaimen näkymään, kun
    painettiin Save, joten
    sitä ei erikseen noudeta
    palvelimelta
    end note

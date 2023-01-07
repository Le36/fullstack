use this in https://www.websequencediagrams.com/


    note over selain:
    painetaan Save
    end note
    
    selain->palvelin: HTTP POST /exampleapp/new_note
    palvelin-->selain: 302 /exampleapp/notes
    selain->palvelin: HTTP GET /exampleapp/notes
    palvelin-->selain: 304 html head with href="/exampleapp/main.css" and src="/exampleapp/main.js">
    selain->palvelin: HTTP GET exampleapp/main.css
    palvelin-->selain: 304 .css file
    selain->palvelin: HTTP GET /exampleapp/main.js
    palvelin-->selain: 304 .js file
    
    note over selain:
    selain alkaa suorittaa js-koodia
    joka pyytää JSON-datan palvelimelta:
    xhttp.open("GET", "/exampleapp/data.json", true)
    end note
    
    selain->palvelin: /exampleapp/data.json
    palvelin-->selain: 200 [{"content":"sure","date":"2023-01-07T13:06:29.536Z"},...]
    
    note over selain:
    selain suorittaa tapahtumankäsittelijän
    joka renderöi muistiinpanot näytölle:
    const data = JSON.parse(this.responseText)
    data.forEach(function(note) =>
    end note
    
    selain->palvelin: https://studies.cs.helsinki.fi/favicon.ico
    palvelin-->selain: 200 favicon
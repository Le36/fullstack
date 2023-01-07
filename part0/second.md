use this in https://www.websequencediagrams.com/


    selain->palvelin: HTTP GET /exampleapp/spa
    palvelin-->selain: 304 html head with href="/exampleapp/main.css" and src="/exampleapp/spa.js">
    selain->palvelin: HTTP GET /exampleapp/main.css
    palvelin-->selain: 304 .css file
    selain->palvelin: HTTP GET /exampleapp/spa.js
    palvelin-->selain: 304 .js file
    
    note over selain:
    selain alkaa suorittaa js-koodia
    joka pyytää JSON-datan palvelimelta:
    xhttp.open("GET", "/exampleapp/data.json", true)
    end note
    
    selain->palvelin: /exampleapp/data.json
    palvelin-->selain: 304 [{"content":"sure","date":"2023-01-07T13:06:29.536Z"},...]
    
    note over selain:
    selain suorittaa tapahtumankäsittelijän
    joka renderöi muistiinpanot näytölle:
    notes = JSON.parse(this.responseText)
    redrawNotes()
    end note
    
    selain->palvelin: https://studies.cs.helsinki.fi/favicon.ico
    palvelin-->selain: 200 favicon
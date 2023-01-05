import axios from "axios";
import {useEffect, useState} from "react";

const Weather = ({capital, coordinates: [lat, lng]}) => {
    const [newWeather, setNewWeather] = useState([])
    const hook = () => {
        axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
            .then(response => {
                setNewWeather(response.data)
            })
    }
    useEffect(hook, [lat, lng])
    if (newWeather.length === 0) return
    return (
        <div>
            <h2>Weather in {capital}</h2>
            temperature {newWeather.current_weather.temperature} Celsius
            <br/>weather code: {newWeather.current_weather.weathercode}
            <br/>wind {newWeather.current_weather.windspeed} m/s
        </div>
    )
}

const Country = ({data: {name, capital, area, languages, flags: {png}, latlng}}) => {
    return (
        <div>
            <Title name={name.common} area={area} capital={capital}/>
            <h2>languages</h2>
            <Languages languages={languages}/>
            <img src={png} alt="Flag"/>
            <Weather capital={capital} coordinates={latlng}/>
        </div>
    )
}

const Title = ({name, capital, area}) => {
    return (
        <div>
            <h1>{name}</h1>
            capital {capital}<br/>
            area {area}
        </div>
    )
}

const Languages = ({languages}) => {
    const langArray = Object.values(languages)
    return (
        <ul>
            {langArray.map(l =>
                <li key={l.toString()}>
                    <div>{l}</div>
                </li>)}
        </ul>
    )
}


const CountryList = ({data, filter, newShow, setNewShow}) => {

    const filtered = data.map(({name: {common}}) => {
        return common.toLowerCase().includes(filter.toLowerCase());
    }).map((b, i) => b ? i : null).filter(i => i !== null)

    if (filtered.length > 10) return "Too many matches, specify another filter"

    if (filtered.length === 1) {
        return (
            <div>
                <Country data={data[filtered[0]]}/>
            </div>
        )
    }

    const showCountry = (index) => setNewShow(index)

    if (newShow !== -1) {
        return (
            <div>
                <Country data={data[newShow]}/>
            </div>
        )
    }

    return (
        <ul>
            {data.map(({name: {common}}, i) => common.toLowerCase().includes(filter.toLowerCase()) ?
                <li key={common}>
                    <div>{common}
                        <button onClick={() => showCountry(i)}>show</button>
                    </div>
                </li> : null)}
        </ul>
    )
}


const App = () => {

    const [newFilter, setNewFilter] = useState("")
    const [newCountries, setNewCountries] = useState([])
    const [newShow, setNewShow] = useState(-1)

    const hook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setNewCountries(response.data)
            })
    }
    useEffect(hook, [])

    const handleCountryChange = (event) => {
        setNewFilter(event.target.value);
        setNewShow(-1)
    }

    return (
        <div>
            find countries<input value={newFilter} onChange={handleCountryChange}/>
            <br/>
            <CountryList data={newCountries} filter={newFilter} setNewShow={setNewShow} newShow={newShow}/>
        </div>
    )
}

export default App;

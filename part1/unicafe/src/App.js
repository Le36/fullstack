import {useState} from 'react'

const Header = (props) => {
    return (
        <>
            <h1>{props.text}</h1>
        </>
    )
}

const Button = (props) => (
    <>
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    </>
)

const Stats = (props) => {
    return (
        <>
            <p>{props.text} {props.value}</p>
        </>
    )
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text={"give feedback"}></Header>
            <Button handleClick={() => setGood(good + 1)} text={"good"}></Button>
            <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}></Button>
            <Button handleClick={() => setBad(bad + 1)} text={"bad"}></Button>
            <Header text={"statistics"}></Header>
            <Stats text={"good"} value={good}></Stats>
            <Stats text={"neutral"} value={neutral}></Stats>
            <Stats text={"bad"} value={bad}></Stats>
        </div>
    )
}

export default App
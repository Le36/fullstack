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

const Statistics = ({bad, good, neutral}) => {

    const allStat = () => good + bad + neutral
    const average = () => (good - bad) / allStat()
    const positive = () => (good / allStat()) * 100

    if (allStat() !== 0) {
        return (
            <div>
                <table>
                    <StatisticLine text={"good"} value={good}/>
                    <StatisticLine text={"neutral"} value={neutral}/>
                    <StatisticLine text={"bad"} value={bad}/>
                    <StatisticLine text={"all"} value={allStat()}/>
                    <StatisticLine text={"average"} value={average()}/>
                    <StatisticLine text={"positive"} value={positive() + " %"}/>
                </table>
            </div>
        )
    }
    return <div>No feedback given</div>
}

const StatisticLine = (props) => {
    return (
        <>
            <tbody>
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
            </tbody>
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
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App
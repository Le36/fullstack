const Header = ({course}) => {
    return (
        <>
            <h1>{course}</h1>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <>
            <ul>
                {parts.map(part =>
                    <li key={part.id}>
                        {<Part part={part.name} exercises={part.exercises}></Part>}
                    </li>
                )}
            </ul>
        </>
    )
}

const Part = ({exercises, part}) => {
    return (
        <>
            <p>{part} {exercises}</p>
        </>
    )
}

const Total = ({parts}) => {
    return (
        <>
            total of {parts.reduce((tot, current) => tot + current.exercises, 0)} exercises
        </>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}></Total>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course}/>
        </div>
    )
}

export default App
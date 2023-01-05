const Header = ({course}) => {
    return (
        <>
            <h3>{course}</h3>
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
        <>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}></Total>
        </>
    )
}

const Courses = ({courses}) => {
    return (
        <>
            <ul>
                {courses.map(course =>
                    <li key={course.id}>
                        <Course course={course}></Course>
                    </li>)}
            </ul>
        </>
    )
}

const App = () => {
    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>web dev curriculum</h1>
            <Courses courses={courses}/>
        </div>
    )
}

export default App
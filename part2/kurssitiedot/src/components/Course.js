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

export default Course
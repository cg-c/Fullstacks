const Header = ({name}) => <h2>{name}</h2>
const Title = ({text}) => <h1>{text}</h1>
const Part = ({name, exercises}) => <p>{name} {exercises}</p>


const Course = ({ courses }) => {

    const getAllParts = (parts) => {
        return (
            <>
                {parts.map(part =>
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )}
            </>
        )
    }

    return (
        <>
            <Title text="Web development curriculum" />
            {courses.map(course => 
                <div key={course.id}>
                    <Header name={course.name}/>
                    {getAllParts(course.parts)}
                    <p><b>total of {course.parts.reduce((sum, val) => {return sum + val.exercises}, 0)} exercises</b></p>
                </div>
            )}
        </>
    )
}

export default Course
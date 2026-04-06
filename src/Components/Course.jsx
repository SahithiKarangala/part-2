import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course)=> {
                console.log(course.name)
                return ( 
                <div>
                    <Header course={course.name} />
                    <Content key={course.id} parts={course.parts} /> 
                    <Total parts={course.parts} />
                </div>
                )
            })}
        </div> 
    )
}

export default Course 

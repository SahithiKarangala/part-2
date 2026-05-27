const Notification = (props) =>{
    const message= props.message
    const notificationStyle = {
        backgroundColor: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: message.includes('Deleted') ? 'red' : 'green',
        color: message.includes('Deleted') ? 'red' : 'green'
    }
    
    if (message === null || message === undefined || message === '' ){
        return null
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
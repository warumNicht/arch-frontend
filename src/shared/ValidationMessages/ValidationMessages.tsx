import React from "react";
import './ValidationMessages.css';

const listMessages = (messages: string[]) => {
    return (
        messages.map((message: string) => {
        return <small>{message}</small>
        })
    )
}

class ValidationMessages extends React.PureComponent<any> {
    

    render() {
        console.log(this.props.messages)
        return (
            <div className='validation-messages-holder'>
                {listMessages(this.props.messages)}
            </div>
        );
    }
}

export default ValidationMessages;
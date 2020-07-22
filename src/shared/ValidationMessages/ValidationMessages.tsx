import React from "react";

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
            <div>
                {listMessages(this.props.messages)}
            </div>
        );
    }
}

export default ValidationMessages;
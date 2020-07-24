import React from "react";
import './ValidationMessages.css';
import { ErrorMessage } from "../../components/modules/admin/AdminInterfaces";

const listMessages = (messages: string[]) => {
    return (
        messages.map((message: string) => {
        return <small>{message}</small>
        })
    )
}

interface ValidationMessagesProps{
    validationErrors: ErrorMessage
}

class ValidationMessages extends React.PureComponent<ValidationMessagesProps> {
    

    render() {
        if(!this.props.validationErrors || !this.props.validationErrors.isTouched || !this.props.validationErrors.messages ){
            return '';
        }
        return (
            <div className='validation-messages-holder'>
                {listMessages(this.props.validationErrors.messages)}
            </div>
        );
    }
}

export default ValidationMessages;
import React from "react";

export class Unauthorized extends React.PureComponent {

    render() {
        return (
            <div>
                <h1>You are not authorized to access this page</h1>
            </div>
        );
    }
}
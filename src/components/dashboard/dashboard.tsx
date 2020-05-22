import React from "react";
import { withTranslation } from 'react-i18next';

class Dashboard extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
      }

    render() {
        console.log(this.props.t)
        return (
            <div>
                
                <span>{this.props.t('welcome', 'Hello there')}</span>
                <h1>Dashboard for all authenticated users</h1>
            </div>
        );
    }
}

export default  withTranslation()(Dashboard);

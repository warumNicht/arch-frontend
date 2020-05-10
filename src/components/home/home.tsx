import React from "react";
import { withTranslation, WithTranslation } from 'react-i18next';

class Home extends React.PureComponent<WithTranslation> {

    render() {
        // const { t } = this.props;
        return (
            <div>
                <span>{this.props.t('welcome', 'Hello there')}</span>
                <h1>Home page for all users</h1>
            </div>
        );
    }
}

export default withTranslation()(Home);
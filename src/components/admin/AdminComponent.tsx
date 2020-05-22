import React from "react";
import { withTranslation, Trans, WithTranslation } from 'react-i18next';

class AdminComponent extends React.PureComponent<WithTranslation> {

    render() {
        return (
            <div>
                <h1>ADMIN pages!!!</h1>
                <Trans i18nKey="navbar:content.text">
                    Welcome at <strong>our place</strong>.
                </Trans>
            </div>
        );
    }
}

export default withTranslation(['translation', 'navbar'])(AdminComponent);
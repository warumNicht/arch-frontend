import React from "react";
import { withTranslation, WithTranslation } from 'react-i18next';
import UserSevice from '../../services/UserService';
import { UserRoles } from "../../constants/appConstants";

class Home extends React.PureComponent<WithTranslation> {

    render() {
        const userRole=UserSevice.getMainRole();
        return (
            <div>
                <span>{this.props.t('welcome', 'Hello there')}</span>
                <h1>Home page for all users</h1>
                {userRole ? userRole===UserRoles.admin ? <div>Admin Content</div> : <div>User Content</div> : <div>Visitor Content</div>}
            </div>
        );
    }
}

export default withTranslation()(Home);
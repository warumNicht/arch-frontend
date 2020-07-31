import React from "react";
import { withTranslation, WithTranslation } from 'react-i18next';
import UserSevice from '../../services/UserService';
import { UserRoles } from "../../constants/appConstants";
import api from '../../util/api';
import { Link } from "react-router-dom";

class Home extends React.PureComponent<WithTranslation, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles() {
        api
            .get(`/projects/category/all`)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    articles: res.data
                })

            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    renderArticles() {
        if (!this.state.articles) {
            return
        }
        return this.state.articles.map((a: any) => {
            return <article>
                <div>{a.id}</div>
                <div>{a.title}</div>
                <div>
                    <img src={a.mainImage}></img>
                </div>
                <Link to={`/en/admin/articles/edit/${a.id}`}>Article {a.id}</Link>
            </article>
        })
    }

    render() {
        const userRole = UserSevice.getMainRole();
        return (
            <div>
                <span>{this.props.t('welcome', 'Hello there')}</span>
                <h1>Home page for all users</h1>
                {userRole ? userRole === UserRoles.ADMIN ? <div>Admin Content</div> : <div>User Content</div> : <div>Visitor Content</div>}
                <div>
                    {this.renderArticles()}
                </div>
            </div>

        );
    }
}

export default withTranslation()(Home);
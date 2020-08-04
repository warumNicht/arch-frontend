import React from "react";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from 'react-i18next';
import UserSevice from '../../services/UserService';
import { UserRoles } from "../../constants/appConstants";
import api from '../../util/api';
import { Link } from "react-router-dom";
import ArchitectureAppStore, { Article } from "../../redux/interfaces/ArchitectureAppStore";
import { loadArticlesList } from "../../redux/actions/actionCreators";
import { AxiosResponse } from "axios";

interface HomeProps extends WithTranslation{
    articles: Article[],
    loadArticlesList: (articles: Article[]) => void
}

class Home extends React.PureComponent<HomeProps, any> {
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
        if(this.props.articles.length === 0){
            api
            .get(`/projects/category/all`)
            .then((res: AxiosResponse<Article[]>) => {
                console.log(res.data);
                this.props.loadArticlesList(res.data);
                // this.setState({
                //     articles: res.data
                // })

            })
            .catch((e: any) => {
                console.log(e)
            });
        }
       
    }

    renderArticles() {
        if (!this.props.articles) {
            return
        }
        return this.props.articles.map((a: any) => {
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

const mapStateToProps = (state: ArchitectureAppStore) => ({
    articles: state.articlesByCategories.articles
});

const mapDispatchToProps = (dispatch: any) => ({
    loadArticlesList: (articles: Article[]) => dispatch(loadArticlesList(articles)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Home));
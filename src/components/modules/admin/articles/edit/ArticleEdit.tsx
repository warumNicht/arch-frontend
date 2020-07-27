import React, { FormEvent } from "react";
import api from '../../../../../util/api';
import { csrfHeaderName, tokenAttributeName } from "../../../../../constants/appConstants";
import { Category } from "../../../../../redux/interfaces/ArchitectureAppStore";
import { RouteComponentProps, RouteProps } from "react-router-dom";
import { ImageModel, LocalContent, ErrorMessages } from "../../AdminInterfaces";

const config = {
    headers: {
        [csrfHeaderName]: localStorage.getItem(tokenAttributeName)
    }
};

interface ArticleRouterParams{
    articleId: string
}

interface ArticleEditProps extends RouteComponentProps<ArticleRouterParams>{
    categories: Category[]
}

interface ArticleEditModel{
    id: string,
    categoryId: string,
    mainImage?:ImageModel,
    localContent:{
        [key: string]: LocalContent
    }
}

interface ArticleEditState{
    article: ArticleEditModel,
    errors: ErrorMessages
}

class ArticleEdit extends React.PureComponent<ArticleEditProps, ArticleEditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            article:{
                id: '',
                categoryId:'',
                localContent: {}
            },
            errors: {}
        }
    }

    componentDidMount() {
        const articleId = this.props.match.params.articleId;
        console.log(articleId)
        this.loadArticle();
    }

    loadArticle(){
        const articleId = this.props.match.params.articleId;
        api
            .get(`/admin/articles/edit/${articleId}`, config)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    article: res.data
                })
            
            })
            .catch((e: any) => {
                console.log(e)
            });
    }

    render(){
        return(
            <div>
                Article edit {this.props.match.params.articleId}
            </div>
        )
    }
}

export default ArticleEdit;
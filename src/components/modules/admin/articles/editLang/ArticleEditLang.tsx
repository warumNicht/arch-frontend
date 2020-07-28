import React, { FormEvent } from "react";
import api from '../../../../../util/api';
import { getTokenHeader } from "../../../../../util/utilFunctions";
import { RouteComponentProps } from "react-router-dom";
import { ArticleTitleContent, ErrorMessages } from "../../AdminInterfaces";
import ValidationMessages from "../../../../../shared/ValidationMessages/ValidationMessages";
import { ArticleFields } from "../create/ArticleCreate";


interface ArticleEditLangRouterParams {
    articleId: string,
    lang: string
}

interface ArticleEditLangProps extends RouteComponentProps<ArticleEditLangRouterParams> {

}

interface ArticleEditLangModel extends ArticleTitleContent {
    mainImage?: string
}

interface ArticleEditLangState {
    article: ArticleEditLangModel,
    errors: ErrorMessages
}

class ArticleEditLang extends React.PureComponent<ArticleEditLangProps, ArticleEditLangState> {

    constructor(props: any) {
        super(props);
        this.state = {
            article: {
                title: '',
                content: ''
            },
            errors: {}
        }
    }

    componentDidMount() {
        this.loadArticle();
        // this.setInitialErrors();
    }


    loadArticle() {
        const articleId = this.props.match.params.articleId;
        const lang = this.props.match.params.lang;
        api
            .get(`/admin/articles/edit/${articleId}/${lang}`, getTokenHeader())
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

    handleChange = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        const { name, value } = event.target;
    }

    render() {
        return (
            <div>
                <div>Article edit lang</div>
                <form>
                    <div>
                        <input
                            type='text'
                            value={this.state.article.title}
                            name={ArticleFields.TITLE}
                            onChange={this.handleChange} />
                        <ValidationMessages validationErrors={this.state.errors[ArticleFields.TITLE]} />
                    </div>

                    <div>
                        <textarea value={this.state.article.content} name={ArticleFields.CONTENT} onChange={this.handleChange} />
                        <ValidationMessages validationErrors={this.state.errors[ArticleFields.CONTENT]} />
                    </div>

                    {this.state.article.mainImage !== null?
                        <div>
                            <input
                                type='text'
                                value={this.state.article.mainImage}
                                name={ArticleFields.MAIN_IMAGE}
                                onChange={this.handleChange} />
                            <ValidationMessages validationErrors={this.state.errors[ArticleFields.MAIN_IMAGE]} />
                        </div>
                        :
                        ''
                    }
                </form>
            </div>
        )
    }
}

export default ArticleEditLang;
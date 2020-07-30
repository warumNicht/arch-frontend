import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore, { Article } from "../../../../../redux/interfaces/ArchitectureAppStore";
import { Link } from "react-router-dom";

class ListAllArticles extends React.PureComponent<any> {

    renderLinksToAtricles() {
        if (this.props.articles.length === 0) {
            return <div>No Loaded Articles</div>
        } else {
            return this.props.articles.map((article: Article) => {
                return <Link to={`/en/admin/articles/edit/${article.id}`}>Article: {article.id}</Link>
            })
        }
    }

    render() {
        return (
            <div>
                <Link to={`/en/admin/articles/edit/1`}>Article: 1</Link>
                <Link to={`/en/admin/articles/edit/2`}>Article: 2</Link>
                <Link to={`/en/`}>Start</Link>
                {this.renderLinksToAtricles()}
            </div>
        )
    }
}

const mapStateToProps = (state: ArchitectureAppStore) => ({
    articles: state.articlesByCategories.articles
});

export default connect(mapStateToProps)(ListAllArticles);
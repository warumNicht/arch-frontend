import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ArchitectureAppStore, { Category } from "../../../../redux/interfaces/ArchitectureAppStore";

const createCategoriesLinks = (categories: Category[]) => {
    return (
        categories.map((category: Category) => {
            return <Link to={`/admin/category/edit/${category.id}`}>{category.name}</Link>
        })
    )
}

interface CategoryListProps {
    categories: Category[]
}

const CategoriesList = (props: CategoryListProps) => {

    return (
        <div>
            <h1>Categories List</h1>
            <div>{createCategoriesLinks(props.categories)}</div>
        </div>
    );

}
const mapStateToProps = (state: ArchitectureAppStore) => ({
    categories: state.categories
});

export default connect(mapStateToProps)(CategoriesList);
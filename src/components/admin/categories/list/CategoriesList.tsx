import React from "react";
import { connect } from "react-redux";
import ArchitectureAppStore from "../../../../redux/interfaces/ArchitectureAppStore";



class CategoriesList extends React.PureComponent<any> {


    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Categories List</h1>
            
            </div>
        );
    }
}
const mapStateToProps = (state: ArchitectureAppStore) => ({
    categories: state.categories
  });
  
export default connect(mapStateToProps)(CategoriesList);
import React from 'react';
import './SlidingDropdown.css';

class SlidingDropdown extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedIndex: 0,
            data: props.data
        }
        this.setSelectedIndex = this.setSelectedIndex.bind(this)
    }

    componentWillReceiveProps(props: any) {
        this.setState({
            selectedIndex: 0,
            data: props.data
        })
    }

    renderSelectedItem(): any {
        if (this.props.data.length > 0) {
            console.log(this.props.mapData)

            return this.props.mapData(this.state.data[this.state.selectedIndex]);

        }
        return 'Title'
    }

    setSelectedIndex(index: number){
        this.setState({
            selectedIndex: index
        })
    }

    renderList(): any {
        if (this.props.mapData) {
            console.log(this.props.mapData)
            return this.state.data.map((d: any, index: number) => {
                return <li key={index} onClick={() => { this.setSelectedIndex(index)}}
                className={this.state.selectedIndex===index ? 'selected-item' : ''}>
                    {this.props.mapData(d)}
                </li>;
            })
        }
    }

    render() {
        console.log(this.props.data)
        console.log(2)
        return (
            <div>
                <div className='displayed-item'>
                    {this.renderSelectedItem()}
                </div>
                <ul className='dropdown-content'>
                    {this.renderList()}
                </ul>

            </div>
        );
    }
}

export default SlidingDropdown;
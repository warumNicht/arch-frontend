import React from 'react';
import './SlidingDropdown.css';

interface SlidingDropdownProps {
    data: [],
    mapData: (dataElement:any) => {}
}

interface SlidingDropdownState {
    selectedIndex: number,
    data: []
}

class SlidingDropdown extends React.PureComponent<SlidingDropdownProps, SlidingDropdownState> {
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

    setSelectedIndex(index: number) {
        this.setState({
            selectedIndex: index
        })
    }

    renderList(): any {
        if (this.props.mapData) {
            console.log(this.props.mapData)
            return this.state.data.map((d: any, index: number) => {
                return <div key={index} onClick={() => { this.setSelectedIndex(index) }}
                    className={'dropdwn-item' + (this.state.selectedIndex === index ? ' selected-item' : '')}>
                    {this.props.mapData(d)}
                </div>;
            })
        }
    }

    render() {
        console.log(this.props.data)
        console.log(2)
        return (
            <div className='sliding-dropdown'>
                <div className='placeholder-item'>
                    {this.renderSelectedItem()}
                </div>
                <div className='dropdown-content'>
                    {this.renderList()}
                </div>

            </div>
        );
    }
}

export default SlidingDropdown;
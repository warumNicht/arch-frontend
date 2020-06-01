import React from 'react';
import './SlidingDropdown.css';

interface SlidingDropdownProps {
    selectedOption: any,
    data: any[],
    mapData: (dataElement: any) => {},
    comparator?: (currentElement: any, selectedElement: any) => boolean,
    callback?: (dataElement: any) => void
}

interface SlidingDropdownState {
    selectedIndex?: number,
    data: any[]
}

class SlidingDropdown extends React.PureComponent<SlidingDropdownProps, SlidingDropdownState> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: props.data
        }
        this.changeSelectedOption = this.changeSelectedOption.bind(this)
    }

    componentWillReceiveProps(props: SlidingDropdownProps) {
        this.setState({
            data: props.data,
            selectedIndex: this.calculateSelectedIndex()
        })
    }

    calculateSelectedIndex() {
        let selectedIndex: number = -1;
        this.props.data.forEach((d: any, index: number) => {
            if (this.props.comparator && this.props.comparator(d, this.props.selectedOption)) {
                selectedIndex = index
            }
        })
        if (selectedIndex < 0) {
            return undefined;
        }
        return selectedIndex;
    }

    renderSelectedItem(): any {
        if (this.state.selectedIndex !== undefined) {
            return this.props.mapData(this.state.data[this.state.selectedIndex]);
        }
        return this.props.mapData(this.props.selectedOption)
    }

    renderList(): any {
        return this.state.data.map((d: any, index: number) => {
            return <div key={index} onClick={() => { this.changeSelectedOption(d, index) }}
                className={'dropdwn-item' + (this.state.selectedIndex === index ? ' selected-item' : '')}>
                {this.props.mapData ? this.props.mapData(d) : d}
            </div>;
        })

    }

    async changeSelectedOption(d: any, index: number){
        if(this.props.callback){
            await this.props.callback(d);
        }
        this.setState({
            selectedIndex: index
        })
    }

    render() {
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
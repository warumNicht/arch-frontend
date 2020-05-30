import React from 'react';

class SlidingDropdown extends React.PureComponent<any,any> {
    constructor(props:any){
        super(props)
        this.state={
            selectedIndex: 0,
            data: props.data
        }
    }

    componentWillReceiveProps(props:any){
        this.setState({
            selectedIndex: 0,
            data: props.data
        })
    }

    renderList() :any{
        if(this.props.mapData){
            console.log(this.props.mapData)
            return this.state.data.map((d:any, index:number)=>{
                return <li key={index} onClick={()=>{console.log(index)}}>
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
                <div className='selected-item'>
                    Title
                </div>
                <ul className='dropdown-content'>
                    {this.renderList()}
                </ul>

            </div>
        );
    }
}

export default SlidingDropdown;
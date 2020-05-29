import React from 'react';

class SlidingDropdown extends React.PureComponent<any> {

    render() {
        return (
            <div>
                <div className='selected-item'>
                    Title
                </div>
                <ul className='dropdown-content'>
                    {this.props.mapData ? this.props.mapData(this.props.data) :
                        this.props.data.map((d: string) => {
                            return <li>{d}</li>
                        })}
                </ul>

            </div>
        );
    }
}

export default SlidingDropdown;
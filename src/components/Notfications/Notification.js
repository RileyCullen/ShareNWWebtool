import React from 'react';

class Notification extends React.Component
{
    render()
    {
        return (
            <div>
                {this.props.message}
            </div>
        ); 
    }

    componentDidMount()
    {
        if (this.props.timeout !== 0) {
            this.timer = setTimeout(this.props.requestHide, this.props.timeout);
        }
    }

    componentWillUnmount()
    {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
}

export { Notification };
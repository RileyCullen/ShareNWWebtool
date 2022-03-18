import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import "../../css/React/Notification.css";
import { Constants } from './NotificationEnums';

class Notification extends React.Component
{
    render()
    {
        return (
            <div className={"notification " + this.props.type}
                onClick={this.props.requestHide.bind(this)}>
                <div className="notification-icon-container">
                    <FontAwesomeIcon 
                        className="notification-icon" 
                        icon={this._GetIcon()}
                    />
                </div>
                <div className="notification-div">
                    <p className='notification-title'>{this.props.title}</p>
                    <p>{this.props.message}</p>
                </div>
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

    _GetIcon()
    {
        switch(this.props.type) {
            case Constants.INFO: 
                return faInfoCircle;
            case Constants.ERROR:
                return faTimesCircle;
            case Constants.SUCCESS:
                return faCheckCircle;
            default:
                return faCheckCircle;
        }
    }
}

export { Notification };
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NotificationManager } from './index';
import { Notification } from './Notification';

import '../../css/React/NotificationContainer.css';
import '../../css/React/Notification.css';

class NotificationContainer extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            notifications: [],
        }
    }

    render()
    {
        return (
            <div id='notification-container'>
                <TransitionGroup>
                    {this.state.notifications.map((d, i) => {
                        return (<CSSTransition
                            key={i}
                            classNames="notification"
                            timeout={{ enter: 400, exit: 400 }}
                        >
                            <Notification 
                                title={d.title}
                                message={d.message}
                                timeout={d.timeout}
                                type={d.type}
                                requestHide={() => { NotificationManager.Remove(d); }}
                            />
                        </CSSTransition>);
                    })}
                </TransitionGroup>
            </div>
        );
    }

    componentDidMount()
    {
        NotificationManager.AddEventListener(this.UpdateNotifications.bind(this)); 
    }

    componentWillUnmount()
    {  
        NotificationManager.RemoveEventListener(this.UpdateNotifications.bind(this));
    }

    UpdateNotifications(notifs)
    {
        this.setState({
            notifications: notifs,
        });
    }
}

export { NotificationContainer };
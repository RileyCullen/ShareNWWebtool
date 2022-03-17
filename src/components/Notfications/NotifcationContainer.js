import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NotificationManager } from './index';
import { Notification } from './Notification';

import '../../css/React/NotificationContainer.css';

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
                <p>class comp</p>
                <TransitionGroup>
                    {this.state.notifications.map((d, i) => {
                        return (<CSSTransition
                            key={i}
                            classNames="fade"
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
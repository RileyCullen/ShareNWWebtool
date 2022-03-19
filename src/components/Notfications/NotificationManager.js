import { EventEmitter } from 'events';
import { Constants } from './NotificationEnums';

/**
 * Taken from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
 * @returns UID
 */
function Create_UUID()
{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

class NotificationManager extends EventEmitter
{
    /**
     * @description Creates a NotificationManager object. This object follows 
     *              the singleton pattern, which means that there is only one
     *              NotificationManager object for the entire program. 
     * 
     *              Users will call one of the "add" methods, which will 
     *              enqueue a notification to _notifications. This will then
     *              be displayed on the screen in the NotificationContainer.
     * 
     * @sources https://github.com/tjrexer/react-notifications/blob/master/src/NotificationManager.js
     */
    constructor()
    {
        super();
        this._notifications = [];
    }

    /**
     *      
     * @param {JSON} notification A JSON notification following the format 
     *                            below:
     *      
     *                            notification = {
     *                              id, type, title, message, timeout
     *                            }
     */
    AddNotification(notification = {
        id: Create_UUID(),
        type: Constants.INFO,
        title: "TITLE",
        message: "message",
        timeout: 5000,
    })
    {
        this._notifications.push(notification);
        this._DisplayNotification();
    }

    /**
     * @description Adds a success notification the NotificationManager
     * @param {String} title
     * @param {String} message
     * @param {Double} timeout
     */
    Success({title, message, timeout})
    {
        this.AddNotification({
            id: Create_UUID(),
            type: Constants.SUCCESS,
            title: title,
            message: message,
            timeout: timeout
        });
    }

    Error({title, message, timeout}) 
    {
        this.AddNotification({
            id: Create_UUID(),
            type: Constants.ERROR,
            title: title,
            message: message,
            timeout: timeout
        });
    }

    Info({title, message, timeout}) 
    {
        this.AddNotification({
            id: Create_UUID(),
            type: Constants.INFO,
            title: title,
            message: message,
            timeout: timeout
        });
    }

    Remove(notification)
    {
        this._notifications = this._notifications.filter((d) => notification.id !== d.id);
        this._DisplayNotification();
    }

    /**
     * @description Triggers NOTIFY callback, which updates UI to display the 
     *              newly added notifications.
     */
    _DisplayNotification()
    {
        this.emit(Constants.NOTIFY, this._notifications);
    }

    /**
     * @description Adds a callback function that will be triggered when a 
     *              notification is added.
     * 
     * @param {Function} callback Callback function to be triggered when a new
     *                            notification is added. Note that this function
     *                            should contain a single parameter representing
     *                            a list.
     */
    AddEventListener(callback) 
    {
        this.addListener(Constants.NOTIFY, callback);
    }

    /**
     * @description Removes the callback function added in addEventListener.
     * @param {Function} callback 
     */
    RemoveEventListener(callback) 
    {
        this.removeListener(Constants.NOTIFY, callback);
    }
}

const instance = new NotificationManager();

export default instance;
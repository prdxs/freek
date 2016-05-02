import { Meteor } from 'meteor/meteor';
// XXX: Session
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';

export default createContainer(() => {
    const itemsHandle = Meteor.subscribe('items');
    const starsHandle = Meteor.subscribe('stars');
    return {
        user: Meteor.user(),
        loading: !(itemsHandle.ready() && starsHandle.ready()),
        connected: Meteor.status().connected,
        chatOpen: !!Session.get('chatOpen')
    };
}, App);

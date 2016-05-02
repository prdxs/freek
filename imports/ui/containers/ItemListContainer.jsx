import { Meteor } from 'meteor/meteor';
import { Items } from '../../api/items/items.js';
import { Stars } from '../../api/stars/stars.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'; // XXX SESSION
import ItemListPage from '../pages/ItemListPage.jsx';

export default createContainer(() => {
    const itemsHandle = Meteor.subscribe('items');
    const starsHandle = Meteor.subscribe('stars');
    const loading = !itemsHandle.ready() || !starsHandle.ready();
    const items = Items.find().fetch();
    items.forEach(item => {
        item.starred = (!Stars.findOne({ itemId: item._id })) ? false : true;
    });
    return {
        user: Meteor.user(),
        loading: loading,
        isStarFilterOn: !!Meteor.userId() && !!Session.get('isStarFilterOn'),
        items: loading ? [] : items
    };
}, ItemListPage);

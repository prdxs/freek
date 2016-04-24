import { Meteor } from 'meteor/meteor';
import { Lists } from '../../api/lists/lists.js';
import { Stars } from '../../api/stars/stars.js';
import { createContainer } from 'meteor/react-meteor-data';
import ItemListPage from '../pages/ItemListPage.jsx';

export default createContainer(() => {
    const itemsHandle = Meteor.subscribe('items');
    const starsHandle = Meteor.subscribe('stars');
    const loading = !itemsHandle.ready() || !starsHandle.ready();
    const items = Lists.find().fetch();
    items.forEach((item) => {
        item.starred = (!Stars.findOne({ itemId: item._id })) ? true : false;
    });
    return {
        loading,
        items: loading ? [] : items
    };
}, ItemListPage);

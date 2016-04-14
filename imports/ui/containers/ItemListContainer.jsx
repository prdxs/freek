import { Meteor } from 'meteor/meteor';
import { Lists } from '../../api/lists/lists.js';
import { Stars } from '../../api/stars/stars.js';
import { createContainer } from 'meteor/react-meteor-data';
import ItemListPage from '../pages/ItemListPage.jsx';

export default createContainer(() => {
    const itemsHandle = Meteor.subscribe('items');
    const starsHandle = Meteor.subscribe('stars');
    const items = Lists.find().fetch();
    const stars = Stars.find().fetch();
    return {
        user: Meteor.user(),
        items: Lists.find().fetch(),
        stars: Stars.find().fetch()
    };
}, ItemListPage);

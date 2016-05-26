import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'; // XXX SESSION

import { Items, ItemsIndex } from '../../api/items/items.js';
import { Stars } from '../../api/stars/stars.js';
import { Images } from '../../api/images/images.js';

import Item from '../components/Item.jsx';
import ItemListPage from '../pages/ItemListPage.jsx';

export default createContainer(() => {

    // Collection handlers
    const itemsHandle = Meteor.subscribe('items');
    const starsHandle = Meteor.subscribe('stars');
    const imagesHandle = Meteor.subscribe('images');

    // Show loading when not all collection subscriptions are ready
    const loading = !itemsHandle.ready() || !starsHandle.ready() || !imagesHandle.ready();

    // Get search input text, if some, to filter items
    const searchInput = !Session.get('searchTerm') ? '' : Session.get('searchTerm');
    var items = ItemsIndex.search(searchInput).fetch();
    items.forEach(item => {
        item.starred = !!Stars.findOne({ itemId: item._id });
        item.images = item.imRefs.map(imId => Images.findOne(imId));
    });

    // Filter those starred items if star filter is enabled
    const isStarFilterOn = !!Session.get('isStarFilterOn');
    if (isStarFilterOn) {
        items = items.filter(i => i.starred);
    }

    const user = Meteor.user();
    return {
        user: user,
        loading: loading,
        isStarFilterOn: !!user && !!Session.get('isStarFilterOn'),
        items: items.map(i => (<Item
                key={i.__originalId}
                item={i}
                editable={user ? (user._id === i.owner) : false} />))
    };
}, ItemListPage);

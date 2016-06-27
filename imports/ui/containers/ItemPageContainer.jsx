import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Items } from '../../api/items/items.js';
import { Stars } from '../../api/stars/stars.js';
import { Images } from '../../api/images/images.js';

import ItemPage from '../pages/ItemPage.jsx';

export default createContainer((params) => {

    // Get item id from Route params
    const itemId = params.routeParams.itemId;

    // Collection handlers
    const itemHandle = Meteor.subscribe('item', itemId);
    const starsHandle = Meteor.subscribe('stars');
    const imagesHandle = Meteor.subscribe('images');

    // Show loading when not all collection subscriptions are ready
    const loading = !itemHandle.ready() || !starsHandle.ready() || !imagesHandle.ready();

    var item = loading ? {} : Items.findOne(itemId);
    if (!loading && !_.isEmpty(item)) {
        item.starred = !!Stars.findOne({itemId: itemId});
        item.images = item.imRefs.map(imId => Images.findOne(imId));
    }
    const user = Meteor.user();
    return {
        item: item,
        loading: loading,
        user: user
    };
}, ItemPage);

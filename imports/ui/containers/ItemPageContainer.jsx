import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'; // XXX SESSION

// import { Items } from '../../api/items/items.js';
// import { Stars } from '../../api/stars/stars.js';
// import { Images } from '../../api/images/images.js';

import { ItemPage } from '../pages/ItemPage.jsx';

export default createContainer(params => {

    // Get item id from Route params
    const itemId = params.routeParams.itemId;

    // Collection handlers
    //const itemHandle = Meteor.subscribe('item', itemId);
    //const starsHandle = Meteor.subscribe('stars');
    //const imagesHandle = Meteor.subscribe('images');

    // Show loading when not all collection subscriptions are ready
    // const loading = !itemHandle.ready(); // || !starsHandle.ready() || !imagesHandle.ready();
    //
    // var item = loading ? {} : Items.findOne(itemId);
    // console.log('item');
    // console.log(item);
    // if (item) {
    //     item.starred = !!Stars.findOne({ itemId: item._id });
    //     item.starred = !!Stars.findOne({ itemId: item._id });
    //     item.images = item.imRefs.map(imId => Images.find(imId));
    // }

    const user = Meteor.user();
    return {
        loading: loading,
        user: user
    };
}, ItemPage);

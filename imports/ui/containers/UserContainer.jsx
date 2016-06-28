import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Items } from '../../api/items/items.js';
import { Stars } from '../../api/stars/stars.js';
import { Images } from '../../api/images/images.js';

import UserPage from '../pages/UserPage.jsx';

export default createContainer((params) => {

    // Get item id from Route params
    const username = params.routeParams.username;

    console.log('url param username');
    console.log(username);
    // Collection handlers
    const usersHandle = Meteor.subscribe('users', { username });
    const itemsHandle = Meteor.subscribe('itemsByUser', username);
    const starsHandle = Meteor.subscribe('stars');
    const imagesHandle = Meteor.subscribe('images');

    // Show loading when not all collection subscriptions are ready
    const loading = !usersHandle.ready() || !itemsHandle.ready() || !starsHandle.ready() || !imagesHandle.ready();

    var user = loading ? {} : Meteor.users.findOne({username: username});
    var items = loading ? [] : Items.find({username: username}).fetch();
    if (!loading && !!items.length) {
        items.map(item => {
            item.starred = !!Stars.findOne({itemId: item._id});
            item.images = item.imRefs.map(imId => Images.findOne(imId));
        });
    }
    console.log(user);
    console.log(items);
    console.log(loading);
    return {
        items: items,
        loading: loading,
        user: user
    };
}, UserPage);

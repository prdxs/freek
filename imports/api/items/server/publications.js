/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Items } from '../items.js';

Meteor.publish('items', function items() {
    return Items.find();
});

Meteor.publish ('item', function item(itemId) {
    return Items.find(itemId);
})

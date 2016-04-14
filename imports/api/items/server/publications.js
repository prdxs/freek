/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Lists } from '../items.js';

Meteor.publish('items', function items() {
    return Items.find();
});

/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Images } from '../images.js';

Meteor.publish('images', function images() {
    return Images.find();
});

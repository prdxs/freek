/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Images } from '../images.js';


Images.allow({
    'insert': function() {
        // add custom authentication code here
        return true;
    },
    'update': function() {
        // add custom authentication code here
        return true;
    },
    'remove': function() {
        // add custom authentication code here
        return true;
    },
    download: function(userId, fileObj) {
        return false;
    }
});
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Stars } from './stars.js';

export const insertStar = new ValidatedMethod({
    name: 'stars.insert',
    validate: new SimpleSchema({
        itemId: { type: String }
    }).validator(),
    run({ itemId }) {
        if (!this.userId) {
            throw new Meteor.Error('stars.insert.notLoggedIn',
                'Must be logged in to star an item.');
        }
        return Stars.insert({
            userID: this.userId,
            itemID: itemID
        });
    }
});

export const removeStar = new ValidatedMethod({
    name: 'stars.remove',
    validate: new SimpleSchema({
        id: { type: String }
    }).validator(),
    run({ id }) {
        const star = Stars.findOne(id);

        if (!this.userId || this.userId != star.userID) {
            throw new Meteor.Error('items.remove.accessDenied',
            'You don\'t have permission to remove this star.');
        }

        // XXX the security check above is not atomic, so in theory a race condition could
        // result in exposing private data

        Stars.remove(id);
    },
});

// Get list of all method names on Items
const STARS_METHODS = _.pluck([
    insertStar,
    removeStar,
], 'name');

if (Meteor.isServer) {
    // Only allow 5 item operations per connection per second
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(STARS_METHODS, name);
        },

        // Rate limit per connection ID
        connectionId() { return true; },
    }, 5, 1000);
}

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Items } from './items.js';

const LIST_ID_ONLY = new SimpleSchema({
    listId: { type: String },
}).validator();

export const insertItem = new ValidatedMethod({
    name: 'items.insert',
    validate: new SimpleSchema({
        title: { type: String },
        description: { type: String }
    }).validator(),
    run({ title, description }) {
        if (!this.userId) {
            throw new Meteor.Error('items.insert.notLoggedIn',
                'Must be logged in to post a new item.');
        }
        return Items.insert({
            title: title,
            description: description,
            createdAt: new Date(),
            owner: this.userId(),
            username: this.user().username
        });
    }
});

export const updateItem = new ValidatedMethod({
    name: 'items.update',
    validate: new SimpleSchema({
        id: { type: String },
        title: { type: String },
        description: { type: String }
    }).validator(),
    run({ id, title, description }) {
        const item = Items.findOne(id);

        if (!this.userId() || this.userId() != item.owner) {
            throw new Meteor.Error('items.update.accessDenied',
            'You don\'t have permission to edit this item.');
        }

        // XXX the security check above is not atomic, so in theory a race condition could
        // result in exposing private data

        Items.update(id, {
            $set: {
                title: title,
                description: description
            },
        });
    },
});

export const removeItem = new ValidatedMethod({
    name: 'items.remove',
    validate: new SimpleSchema({
        id: { type: String }
    }).validator(),
    run({ id }) {
        const item = Items.findOne(id);

        if (!this.userId || this.userId() != item.owner) {
            throw new Meteor.Error('items.remove.accessDenied',
            'You don\'t have permission to remove this list.');
        }

        // XXX the security check above is not atomic, so in theory a race condition could
        // result in exposing private data

        Items.remove(id);
    },
});

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
    insertItem,
    updateItem,
    removeItem,
], 'name');

if (Meteor.isServer) {
    // Only allow 5 list operations per connection per second
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },

        // Rate limit per connection ID
        connectionId() { return true; },
    }, 5, 1000);
}

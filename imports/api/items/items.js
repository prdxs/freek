import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import { Stars } from '../stars/stars.js';

class ItemsCollection extends Mongo.Collection {
    remove(id, callback) {
        Stars.remove({ userID: this.userId, itemID: id });
        return super.remove(id, callback);
    }
}

export const Items = new ItemsCollection('Items');

// Deny all client-side updates since we will be using methods to manage this collection
Items.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Items.schema = new SimpleSchema({
    title: { type: String },
    description: { type: String },
    createdAt: { type: Date },
    owner: { type: String },
    username: {type: String }
});

Items.attachSchema(Items.schema);

// This represents the keys from Items objects that should be published
// to the client. If we add secret properties to Item objects, don't list
// them here to keep them private to the server.
Lists.publicFields = {
    title: 1,
    description: 1,
    createdAt: 1,
    owner: 1,
    username: 1
};

Factory.define('item', Items, {});

Items.helpers({
    editableBy(userId) {
        if (!this.userId) {
            return true;
        }

        return this.userId === userId;
    },
    stars() {
        return Todos.find({ userID: this._id });
    },
});

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

export const Stars = new Mongo.Collection('Stars');

// Deny all client-side updates since we will be using methods to manage this collection
Stars.deny({
    insert() { return true; },
    remove() { return true; },
});

Stars.schema = new SimpleSchema({
    userID: { type: String },
    itemID: { type: String }
});

Items.attachSchema(Stars.schema);

// This represents the keys from Items objects that should be published
// to the client. If we add secret properties to Item objects, don't list
// them here to keep them private to the server.
Lists.publicFields = {
    userID: 1,
    itemID: 1
};

Factory.define('star', Stars, {});

Stars.helpers({
    editableBy(userId) {
        if (!this.userId) {
            return true;
        }

        return this.userId === userId;
    }
});

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';

export const Stars = new Mongo.Collection('Stars');

// Deny all client-side updates since we will be using methods to manage this collection
Stars.deny({
    insert() { return true; },
    remove() { return true; }
});

Stars.schema = new SimpleSchema({
    _id: { type: String },
    userId: { type: String },
    itemID: { type: String }
});

Stars.attachSchema(Stars.schema);

// This represents the keys from Items objects that should be published
// to the client. If we add secret properties to Item objects, don't list
// them here to keep them private to the server.
Stars.publicFields = {
    _id: 1,
    userId: 1,
    itemID: 1
};

// Factory.define('star', Stars, {});
//
// Stars.helpers({
//     editableBy(userId) {
//         return this.userId === userId;
//     }
// });

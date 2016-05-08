import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import { EasySearch } from 'meteor/easy:search';
import { Stars } from '../stars/stars.js';
import { Images } from '../images/images.js';

class ItemsCollection extends Mongo.Collection {
    remove(id, callback) {
        const item = this.findOne(id);
        if (item) {
            console.log(item);
            item.imRefs.forEach(function(ref) {
                Images.remove(ref);
            });
        }
        Stars.remove({ itemId: id });
        return super.remove(id, callback);
    }
}

export const Items = new ItemsCollection('items');

// Deny all client-side updates since we will be using methods to manage this collection
Items.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Items.schema = new SimpleSchema({
    title: { type: String },
    description: { type: String },
    createdAt: { type: Date },
    owner: { type: String },
    username: { type: String },
    imRefs: {
        type: [String],
        minCount: 1,
        maxCount: 4
    }
});

Items.attachSchema(Items.schema);

// This represents the keys from Items objects that should be published
// to the client. If we add secret properties to Item objects, don't list
// them here to keep them private to the server.
Items.publicFields = {
    title: 1,
    description: 1,
    createdAt: 1,
    owner: 1,
    username: 1,
    imRefs: 1
};

Factory.define('item', Items, {});

Items.helpers({
    editableBy(userId) {
        if (!this.userId) {
            return true;
        }

        return this.userId === userId;
    },
    stars(itemId) {
        return Stars.find({ itemId: itemId });
    }
});

export const ItemsIndex = new EasySearch.Index({
  collection: Items,
  fields: ['title', 'description'],
  engine: new EasySearch.MongoTextIndex()
});

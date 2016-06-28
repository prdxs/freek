import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function users(query) {
    return Meteor.users.find(query);
});

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Items } from '../../api/items/items.js';
import { Stars } from '../../api/stars/stars.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    if (Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: 'user1',
            email: 'user1@freek.org',
            password: 'user1',
            profile: { name: 'John' }
        });
        Accounts.createUser({
            username: 'user2',
            email: 'user2@freek.org',
            password: 'user2',
            profile: { name: 'Jack' }
        });
        Accounts.createUser({
            username: 'user3',
            email: 'user3@freek.org',
            password: 'user3',
            profile: { name: 'Jimmy' }
        });
    }
    if (Items.find().count() === 0) {
        console.log(Meteor.users.findOne({username: {$eq: 'user1'}}));
        const data = [
            {
                title: 'Sofá rojo',
                description: 'Sofá rojo de piel sin magulladuras.',
                createdAt: new Date(),
                owner: Meteor.users.findOne({username: {$eq: 'user1'}})._id,
                username: 'user1'
            },
            {
                title: 'Sillas de madera',
                description: '4 sillas de madera clásicas en perfectas condiciones.',
                createdAt: new Date(),
                owner: Meteor.users.findOne({username: {$eq: 'user2'}})._id,
                username: 'user2'
            },
            {
                title: 'Mesa grande',
                description: 'Mesa grande de plástico para terrazas o exteriores.',
                createdAt: new Date(),
                owner: Meteor.users.findOne({username: {$eq: 'user3'}})._id,
                username: 'user3'
            }
        ];

        data.forEach((item) => {
            Items.insert(item);
        });
    }
});

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
        const data = [
            {
                title: 'Sofá rojo',
                description: 'Sofá rojo de piel sin magulladuras.',
                owner: Meteor.users.find({nickname: {$eq: 'user1'}})._id,
                nickname: 'user1',
                createdAt: new Date()
            },
            {
                title: 'Sillas de madera',
                description: '4 sillas de madera clásicas en perfectas condiciones.',
                owner: Meteor.users.find({nickname: {$eq: 'user2'}})._id,
                nickname: 'user2',
                createdAt: new Date()
            },
            {
                title: 'Mesa grande',
                description: 'Mesa grande de plástico para terrazas o exteriores.',
                owner: Meteor.users.find({nickname: {$eq: 'user3'}})._id,
                nickname: 'user3',
                createdAt: new Date()
            },
        ];

        data.forEach((item) => {
            Items.insert(item);
        });
    }
});

/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Stars } from '../stars.js';

Meteor.publish('stars', function stars() {
  if (!this.userId) {
    return this.ready();
  }

  return Stars.find({
    userId: this.userId
  });
});

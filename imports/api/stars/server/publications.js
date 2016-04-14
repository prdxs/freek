/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Lists } from '../stars.js';

Meteor.publish('stars', function stars() {
  if (!this.userId) {
    return this.ready();
  }

  return Lists.find({
    userId: this.userId,
  });
});

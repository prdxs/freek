import { Meteor } from 'meteor/meteor';
import React from 'react';
import { _ } from 'meteor/underscore';
import { displayError } from '../helpers/errors.js';

import { removeItem } from '../../api/items/methods.js';
import { insertStar, removeStar  } from '../../api/stars/methods.js';

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this);
        this.toggleStar = this.toggleStar.bind(this);
    }

    removeItem() {
        removeItem.call({
            id: this.props.item._id
        });
    }

    toggleStar() {
        const item = this.props.item;
        item.starred ? removeStar.call({itemId: item._id}) : insertStar.call({itemId: item._id});
    }

    render() {
        const { item, editable } = this.props;

        return (
            <div id={item._id} className="item">
                <div className="pic"></div>
                <div className="info">
                    <h3 className="title">{item.title}</h3>
                    <h4 className="owner">{item.username}</h4>
                    <p className="description">{item.description}</p>
                    <div className="btns-overlay">
                        { editable ?
                            <button onClick={this.removeItem}>REMOVE</button>
                            : null
                        }
                        { !!Meteor.userId() ?
                            <button className={item.starred ? 'starred' : ''} onClick={this.toggleStar}>STAR</button>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: React.PropTypes.object,
    editable: React.PropTypes.bool
};

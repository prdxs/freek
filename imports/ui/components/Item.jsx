import React from 'react';
import { _ } from 'meteor/underscore';
import classnames from 'classnames';
import { displayError } from '../helpers/errors.js';

import { removeItem } from '../../api/items/methods.js';
import { insertStar, removeStar  } from '../../api/stars/methods.js';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
/*        this.state = {
            starred: this.props.starred
        };*/

        this.removeItem = this.removeItem.bind(this);
        this.toggleStar = this.toggleStar.bind(this);
    }

    removeItem() {
        removeItem.call({
            id: this.props.item._id
        });
    }

    toggleStar() {
        item.starred ? removeStar.call() : insertStar.call();
    }

    render() {
        const { item } = this.props;

        return (
            <div id="{item._id}" className="item">
                <div className="pic"></div>
                <div className="info">
                    <h3 className="title">{item.title}</h3>
                    <p className="description">{item.description}</p>
                    { item.editable ?
                        <div className="btns-overlay">
                            <button onClick={this.removeItem}>REMOVE</button>
                            <button className="{item.starred ? 'starred' : ''}" onClick={this.toggleStar}>STAR</button>
                        </div>
                        : ""
                    }
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: React.PropTypes.object
};

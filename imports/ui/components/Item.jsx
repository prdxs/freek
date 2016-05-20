import { Meteor } from 'meteor/meteor';
import React from 'react';
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
            id: this.props.item.__originalId
        });
    }

    toggleStar() {
        const item = this.props.item;
        item.starred ? removeStar.call({itemId: item._id}) : insertStar.call({itemId: item._id});
    }

    render() {
        const { item, editable } = this.props;

        return (
            <div
                id={item.__originalId}
                className={`item${ item.starred ? ' starred' : '' }`}
                data-date={item.createdAt}>

                <div className="pic">
                    { !!Meteor.userId() ?
                        <div className="btns-overlay">
                            { editable ?
                                <i className="btn item-btn material-icons" onClick={this.removeItem}>delete</i>
                                : <i className="btn item-btn material-icons">chat_bubble</i>
                            }
                            <i className="btn item-btn material-icons" onClick={this.toggleStar}>{item.starred ? 'star' : 'star_border'}</i>
                        </div>
                        : null
                    }
                    <img src={item.images[0].url()} />
                </div>
                <div className="info">
                    <h3 className="title">{item.title}</h3>
                    <h4 className="owner">{item.username}</h4>
                    <p className="description">{item.description}</p>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: React.PropTypes.object,
    editable: React.PropTypes.bool
};

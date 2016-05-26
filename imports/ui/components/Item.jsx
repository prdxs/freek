import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
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
                className='item'
                data-date={item.createdAt}>

                <div className="pic">
                    { !!Meteor.userId() ?
                        <div className="btns-overlay">
                            { editable ?
                                <button className="btn btn-item"
                                        onClick={this.removeItem}
                                        type="button">
                                    <i className="material-icons" aria-hidden="true">delete</i>
                                </button> :
                                <button className="btn btn-item"
                                        type="button">
                                    <i className="material-icons">chat_bubble</i>
                                </button>
                            }
                            <button className="btn btn-item"
                                    onClick={this.toggleStar}
                                    type="button">
                                <i className="material-icons">{item.starred ? 'star' : 'star_border'}</i>
                            </button>
                        </div>
                        : null
                    }
                    <img src={item.images[0].url()} />
                </div>
                <div className="info">
                    <h4 className="title"><Link to={`/items/${item.__originalId}`}>{item.title}</Link></h4>
                    <p className="description">{
                        item.description.length > 46 ?
                        item.description.substring(0, 46) + '...' :
                        item.description}</p>
                    <h5 className="owner"><Link to={`/users/${item.username}`}>{item.username}</Link></h5>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: React.PropTypes.object,
    editable: React.PropTypes.bool
};

import React from 'react';
import { _ } from 'meteor/underscore';
import classnames from 'classnames';
import { displayError } from '../helpers/errors.js';

import {
    removeItem
} from '../../api/items/methods.js';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        // this.throttledUpdate = _.throttle(value => {
        //     if (value) {
        //         updateText.call({
        //             todoId: this.props.todo._id,
        //             newText: value,
        //         }, displayError);
        //     }
        // }, 300);

        this.setTodoCheckStatus = this.setTodoCheckStatus.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    removeItem() {
        removeItem.call({
            id: this.props.item._id
        });
    }

    render() {
        const { item, editable, key } = this.props;

        return (
            <div id="{item._id}" className="item">
                <div className="pic"></div>
                <div className="info">
                    <h3 className="title">{item.title}</h3>
                    <p className="description">{item.description}</p>
                    { editable ?
                        (<p>EDITABLE</p>)
                        : ""
                    }
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item: React.PropTypes.object,
    editable: React.PropTypes.bool
};

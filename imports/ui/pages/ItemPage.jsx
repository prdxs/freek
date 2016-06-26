import { Session } from 'meteor/session'; // XXX SESSION
import { _ } from 'meteor/underscore';
import React from 'react';
import Item from '../components/Item.jsx';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';

export default class ItemPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { item, loading, user } = this.props;

        let Item;
        if (loading) {
            Item = <Loading/>;
        }
        else if (!item) {
            Item = (
                <Message
                    title="Id del ítem incorrecto"
                    subtitle="No existe ningún ítem con dicho Id"
                />
            );
        } else { Item = item; }

        return (
            <div className="page item-page">
                <h1 className="title">{item.title}</h1>
                <p className="description">{item.description}</p>
                <p className="owner">{item.owner}</p>

                <div className="carousel">
                </div>
            </div>
        );
    }
}

ItemPage.propTypes = {
    item: React.PropTypes.array,
    loading: React.PropTypes.bool,
    user: React.PropTypes.object
};

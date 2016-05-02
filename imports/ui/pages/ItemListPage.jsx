import React from 'react';
import Item from '../components/Item.jsx';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';

export default class ItemListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, loading, isStarFilterOn, items } = this.props;

        let Items;
        if (loading) {
            Items = <Loading/>;
        }
        else if (!items || !items.length) {
            Items = (
                <Message
                    title="No hay items"
                    subtitle={!user ? "Logueate para compartir" : "Crea un nuevo item con el botón +"}
                />
            );
        } else {
            Items = items.filter(item => !isStarFilterOn || item.starred).map(item => (
                <Item
                    key={item._id}
                    item={item}
                    editable={user ? (user._id === item.owner) : false}
                />
            ));
        }

        return (
            <div className="page item-page">
                <div className="item-list">
                    {Items}
                </div>
            </div>
        );
    }
}

ItemListPage.propTypes = {
    user: React.PropTypes.object,
    loading: React.PropTypes.bool,
    isStarFilterOn: React.PropTypes.bool,
    items: React.PropTypes.array
};

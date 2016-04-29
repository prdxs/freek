import React from 'react';
import Item from '../components/Item.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';

export default class ItemListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loading, items } = this.props;

        let Items;
        if (loading) {
            Items = <Loading/>;
        }
        else if (!items || !items.length) {
            Items = (
                <Message
                    title="No hay items"
                    subtitle="Crea un nuevo item con el menú de arriba"
                />
            );
        } else {
            Items = items.map(item => (
                <Item
                    item={item}
                    editable={user._id === item.owner}
                />
            ));
        }

        return (
            <div className="page items-show">
                <div className="content-scrollable list-items">
                    {Items}
                </div>
            </div>
        );
    }
}

ListPage.propTypes = {
    loading: React.PropTypes.bool,
    items: React.PropTypes.array
};

import React from 'react';
import Item from '../components/Item.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class ItemListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, items, stars } = this.props;

        let Items;
        if (!items || !items.length) {
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
                    star={ stars.find(s => s.userID === user._id) }
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
    user: React.PropTypes.object,
    items: React.PropTypes.array,
    stars: React.PropTypes.array
};

import React from 'react';
import Item from '../components/Item.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';

export default class ItemListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingTodo: null,
        };
        this.onEditingChange = this.onEditingChange.bind(this);
    }

    onEditingChange(id, editing) {
        this.setState({
            editingTodo: editing ? id : null,
        });
    }

    render() {
        const { user, items, stars } = this.props;
        const { editingTodo } = this.state;

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

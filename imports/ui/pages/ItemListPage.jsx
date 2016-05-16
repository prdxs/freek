import { Session } from 'meteor/session'; // XXX SESSION
import { _ } from 'meteor/underscore';
import React from 'react';
import Item from '../components/Item.jsx';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';

export default class ItemListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchInputOn: false,
            lastSearch: ''
        }
    }

    componentDidMount() {
        // console.log('componentDidMount');
        setTimeout(() => {
            $('.item-list').isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows',
                fitRows: {
                    gutter: 10
                }
            });
            var that = this;
            $(document).keyup(function(e) {
                let k = e.keyCode;

                if (k == 13 && that.state.isSearchInputOn) {
                    // $('.item-list').isotope({
                    //     filter: function(){
                    //         return $(this).find('.title').text().toLowerCase()
                    //             .search($('.search').val().toLowerCase()) !== -1;
                    //     }
                    // });
                    Session.set('searchInput', $('.search').val());
                    that.setState({ isSearchInputOn: false });
                } else if (k == 13) {
                    that.setState({ isSearchInputOn: true });
                    $('.search').focus();
                }
            });
        }, 500);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps');
    //     // List removed and added items
    //     removedItems = nextProps.items.map(i => i.__originalId);
    //     if (!!$('.item-list').data('isotope')) {
    //         //$('.item-list').isotope({ filter: '' });
    //     }
    // }

    componentDidUpdate(prevProps, prevState) {
        console.log('Prev item list:');
        console.log(prevProps.items.map(i => i.__originalId));
        console.log('Current item list:');
        console.log(this.props.items.map(i => i.__originalId));
        let diff = _.difference(this.props.items.map(i => i.__originalId), prevProps.items.map(i => i.__originalId));
        console.log("difference");
        console.log(diff);

        $('.item-list').isotope('addItems', this.props.items.filter(i => _.contains(diff, i.__originalId)));
        $('.item-list').isotope('layout');

    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
        $(document).off('keyup');
    }

    render() {
        // console.log('ItemListPage render');
        const { isSearchInputOn } = this.state;
        const { user, loading, isStarFilterOn, items } = this.props;

        let Items;
        if (loading) {
            Items = <Loading/>;
        }
        else if (!items || !items.length) {
            Items = (
                <Message
                    title="No hay items"
                    subtitle={!user ? "Logueate para compartir" : "Añade un nuevo item"}
                />
            );
        } else {
            Items = items.map(item => (
                <Item
                    key={item.__originalId}
                    item={item}
                    editable={user ? (user._id === item.owner) : false}
                />
            ));
        }

        return (
            <div>
                { isSearchInputOn ?
                    <div className="modal-overlay ">
                        <input className="search" placeholder="Buscar..." autofocus/>
                    </div> : null
                }
                <div className="page item-page">
                    <div className="item-list">
                        {Items}
                    </div>
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

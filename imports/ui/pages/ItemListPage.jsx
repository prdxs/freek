import { Session } from 'meteor/session'; // XXX SESSION
import { _ } from 'meteor/underscore';
import React from 'react';
import Item from '../components/Item.jsx';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';

export default class ItemListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isSearchInputOn: false,
            lastSearch: ''
        };

        this.filterFns = {
            // Show if starred
            starred: function() {
                return $(this).hasClass('starred');
            }
        };

        this.isoOptions = {
            itemSelector: '.item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: 200,
                gutter: 20
            },
            getSortData: {
                title: '.title',
                date: '[data-date]'
            },
            sortAscending: false
        };

        this.createIsotopeContainer = this.createIsotopeContainer.bind(this)
    }

    createIsotopeContainer() {
        if (this.iso == null) {
            this.iso = new Isotope(document.querySelector('.item-list'), this.isoOptions)
        }
    }

    componentDidMount() {
        // console.log('componentDidMount');
        this.createIsotopeContainer();

        // Only arrange if there are elements to arrange
        if (this.props.items.length > 0) {
            this.iso.arrange({ sortBy: 'date' });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');

        if (nextProps.filter && !_.isEqual(nextProps.filter, this.props.filter)) {
            this.iso.arrange({ filter: this.filterFns[nextProps.filter] || nextProps.filter });
        }
        this.iso.arrange({ sortBy: 'date' });
    }

    componentDidUpdate(prevProps) {
        // The list of keys seen in the previous render
        let currentKeys = prevProps.items.map(i => i.key);

        // The latest list of keys that have been rendered
        let newKeys = this.props.items.map(i => i.key);

        // Find which keys are new between the current set of keys and any new children passed to this component
        let addKeys = _.difference(newKeys, currentKeys);

        // Find which keys have been remove between the current set of keys and any new children passed to this component
        let removeKeys = _.difference(currentKeys, newKeys);

        if (removeKeys.length > 0) {
            this.iso.remove(removeKeys.map(k => document.getElementById(k)));
            this.iso.layout();
            this.iso.reloadItems();
        }

        if (addKeys.length > 0) {
            this.iso.insert(addKeys.map(k => document.getElementById(k)));
        }
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount');
        $(document).off('keyup');
    }

    render() {
        // console.log('ItemListPage render');
        const { isSearchInputOn } = this.state;
        const { user, loading, isStarFilterOn, items } = this.props;

        console.log('Items');
        console.log(items);

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
        } else { Items = items; }

        return (
            <div>
                { isSearchInputOn ?
                    <div className="modal-overlay ">
                        <input className="search" placeholder="Buscar..." autofocus/>
                    </div> : null
                }
                <div className="page item-page">
                    <div className="item-list" ref="isotopeContainer">
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

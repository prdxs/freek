import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Session } from 'meteor/session'; // XXX: SESSION

import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';
import Navigator from '../components/Navigator.jsx';
import NewItemModal from '../components/NewItemModal.jsx';
import SearchModal from '../components/SearchModal.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modals: {
                showNewItemModal: false,
                showSearchModal: false
            },
            notifications: {
                showConnectionIssue: false
            }
        };

        this.logout = this.logout.bind(this);
        this.setSearchTerm = this.setSearchTerm.bind(this);
        this.toggleNewItemModal = this.toggleNewItemModal.bind(this);
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
    }

    componentDidMount() {
        /* Show connection problem if showConnectionIssue and loading are both true */
        setTimeout(() => {
            /* eslint-disable react/no-did-mount-set-state */
            this.setState({ notifications: { showConnectionIssue: true } });
        }, CONNECTION_ISSUE_TIMEOUT);
    }

    componentWillReceiveProps({ loading, children }) {
        // redirect / to item list when ready
        if (!loading && !children) {
            this.context.router.replace('/items');
        }
    }

    setSearchTerm(searchTerm = '') {
        Session.set({ searchTerm });
    }

    toggleNewItemModal() {
        if (this.state.modals.showNewItemModal) {
            console.log('deactivating new item modal');
            this.state.modals.showNewItemModal = false;
            this.setState(this.state);
            console.log(this.state);
        } else {
            console.log('activating new item modal');
            this.state.modals = { showNewItemModal: true, showSearchModal: false };
            this.setState(this.state);
            console.log(this.state);
        }
    }

    toggleSearchModal() {
        if (this.state.modals.showSearchModal) {
            this.setState({ modals: { showSearchModal: false } });
        } else {
            this.setState({ modals: {
                showNewItemModal: false,
                showSearchModal: true
            } });
        }
    }

    logout() {
        Meteor.logout();
    }

    render() {
        const { modals, notifications } = this.state;
        const {
            user,
            loading,
            connected,
            children,
            location,
            params
        } = this.props;

        // clone route components with keys so that they can
        // have transitions
        const clonedChildren = children && React.cloneElement(children, {
            key: location.pathname
        });

        return (
            <div className="container-freek">

                { modals.showNewItemModal ?
                    <NewItemModal ref="newItemModal" toggleNewItemModal={this.toggleNewItemModal} /> : null }
                { modals.showSearchModal ?
                    <SearchModal setSearchTerm={this.setSearchTerm}
                                 toggleSearchModal={this.toggleSearchModal} /> : null }


                { notifications.showConnectionIssue && !connected ?
                    <ConnectionNotification/> : null }
                
                <Navigator
                    isNewItemModalOn={modals.showNewItemModal}
                    isSearchModalOn={modals.showSearchModal}
                    logout={this.logout}
                    toggleNewItemModal={this.toggleNewItemModal}
                    toggleSearchModal={this.toggleSearchModal}
                    user={user} />


                <div className="container-fluid">

                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200} >

                        {loading
                            ? <Loading key="loading"/>
                            : clonedChildren}

                    </ReactCSSTransitionGroup>

                </div>
            </div>
        );
    }
}

App.propTypes = {
    user: React.PropTypes.object,      // current meteor user
    loading: React.PropTypes.bool,     // subscription status
    connected: React.PropTypes.bool,   // server connection status
    chatOpen: React.PropTypes.bool,    // is chat menu open?
    children: React.PropTypes.element, // matched child route component
    location: React.PropTypes.object,  // current router location
    params: React.PropTypes.object    // parameters of the current route
};

App.contextTypes = {
    router: React.PropTypes.object
};

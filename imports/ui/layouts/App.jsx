import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Session } from 'meteor/session'; // XXX: SESSION

import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';
import Navigator from '../components/Navigator.jsx';
import NewItemModal from '../components/NewItemModal.jsx';
import SearchModal from '../components/SearchModal.jsx';
import SigninModal from '../components/SigninModal.jsx';
import JoinModal from '../components/JoinModal.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modals: {
                showNewItemModal: false,
                showSearchModal: false,
                showSigninModal: false,
                showJoinModal: false
            },
            notifications: {
                showConnectionIssue: false
            }
        };

        this.logout = this.logout.bind(this);
        this.setSearchTerm = this.setSearchTerm.bind(this);
        this.toggleJoinModal = this.toggleJoinModal.bind(this);
        this.toggleNewItemModal = this.toggleNewItemModal.bind(this);
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
        this.toggleSigninModal = this.toggleSigninModal.bind(this);
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

    toggleJoinModal() {
        console.log('enter');
        if (this.state.modals.showJoinModal) {
            this.state.modals.showJoinModal = false;
            this.setState(this.state);
        } else {
            this.state.modals = {
                showNewItemModal: false,
                showJoinModal: true,
                showSearchModal: false,
                showSigninModal: false
            };
            this.setState(this.state);
        }
    }

    toggleNewItemModal() {
        if (this.state.modals.showNewItemModal) {
            this.state.modals.showNewItemModal = false;
            this.setState(this.state);
        } else {
            this.state.modals = {
                showNewItemModal: true,
                showJoinModal: false,
                showSearchModal: false,
                showSigninModal: false
            };
            this.setState(this.state);
        }
    }

    toggleSearchModal() {
        if (this.state.modals.showSearchModal) {
            this.state.modals.showSearchModal = false;
            this.setState(this.state);
        } else {
            this.state.modals = {
                showNewItemModal: false,
                showJoinModal: false,
                showSearchModal: true,
                showSigninModal: false
            };
            this.setState(this.state);
        }
    }

    toggleSigninModal() {
        if (this.state.modals.showSigninModal) {
            this.state.modals.showSigninModal = false;
            this.setState(this.state);
        } else {
            this.state.modals = {
                showNewItemModal: false,
                showJoinModal: false,
                showSearchModal: false,
                showSigninModal: true
            };
            this.setState(this.state);
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
            key: location.pathname,
            routeParams: this.props.params
        });

        return (
            <div className="container-freek">

                { modals.showJoinModal ?
                    <JoinModal toggleJoinModal={this.toggleJoinModal}
                                 toggleSigninModal={this.toggleSigninModal} /> : null }

                { modals.showNewItemModal ?
                    <NewItemModal ref="newItemModal" toggleNewItemModal={this.toggleNewItemModal} /> : null }
                { modals.showSearchModal ?
                    <SearchModal setSearchTerm={this.setSearchTerm}
                                 toggleSearchModal={this.toggleSearchModal} /> : null }

                { modals.showSigninModal ?
                    <SigninModal toggleJoinModal={this.toggleJoinModal}
                                 toggleSigninModal={this.toggleSigninModal} /> : null }

                { notifications.showConnectionIssue && !connected ?
                    <ConnectionNotification/> : null }

                <Navigator
                    isNewItemModalOn={modals.showNewItemModal}
                    isSearchModalOn={modals.showSearchModal}
                    logout={this.logout}
                    toggleNewItemModal={this.toggleNewItemModal}
                    toggleSearchModal={this.toggleSearchModal}
                    toggleSigninModal={this.toggleSigninModal}
                    user={user} />


                <div className="container-fluid">

                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200} >

                        { loading
                            ? <Loading key="loading"/>
                            : clonedChildren }

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

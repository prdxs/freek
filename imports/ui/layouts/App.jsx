import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Session } from 'meteor/session'; // XXX: SESSION

import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';
import Navigator from '../components/Navigator.jsx';
import NewItemForm from '../components/NewItemForm.jsx';
import SearchModal from '../components/SearchModal.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNewItemFormOn: false,
            isSearchModalOn: false,
            showConnectionIssue: false
        };
        this.logout = this.logout.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.toggleNewItemForm = this.toggleNewItemForm.bind(this);
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
    }

    componentDidMount() {
        /* XXX Show connection problem if showConnectionIssue and loading are
        both true */
        setTimeout(() => {
            /* eslint-disable react/no-did-mount-set-state */
            this.setState({ showConnectionIssue: true });
        }, CONNECTION_ISSUE_TIMEOUT);
    }

    toggleNewItemForm(e) {
        if (!!e) e.preventDefault();
        this.setState({
            isNewItemFormOn: !this.state.isNewItemFormOn
        });
    }

    toggleSearchModal() {
        this.setState({
            isSearchModalOn: !this.state.isSearchModalOn
        });
    }

    toggleChat(chatOpen = !Session.get('chatOpen')) {
        Session.set({ chatOpen });
    }

    logout() {
        Meteor.logout();
    }

    render() {
        const { showConnectionIssue, isNewItemFormOn } = this.state;
        const {
            user,
            loading,
            connected,
            chatOpen,
            children,
            location,
            params
        } = this.props;

        const closeChat = this.toggleChat.bind(this, false);

        // clone route components with keys so that they can
        // have transitions
        const clonedChildren = children && React.cloneElement(children, {
            key: location.pathname
        });

        return (
            <div id="container">
                <Navigator
                    isNewItemFormOn={isNewItemFormOn}
                    logout={this.logout}
                    toggleNewItemForm={this.toggleNewItemForm}
                    toggleSearchModal={this.toggleSearchModal}
                    user={user} />
                {showConnectionIssue && !connected
                    ? <ConnectionNotification/>
                    : null}
                {isNewItemFormOn
                    ? <NewItemForm toggleNewItemForm={this.toggleNewItemForm} />
                    : null}
                {isSearchModalOn
                    ? <SearchModal
                        setSearchTerm={this.setSearchTerm}
                        toggleSearchModal={this.toggleSearchModal} />
                    : null}
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >
                    {loading
                        ? <Loading key="loading"/>
                        : clonedChildren}
                </ReactCSSTransitionGroup>
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

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'; // XXX: SESSION
import { Items } from '../../api/items/items.js';
import UserMenu from '../components/UserMenu.jsx';
import ListList from '../components/ListList.jsx';
import ConnectionNotification from '../components/ConnectionNotification.jsx';
import Loading from '../components/Loading.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatOpen: false,
            showConnectionIssue: false
        };
        this.toggleChat = this.toggleChat.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            /* eslint-disable react/no-did-mount-set-state */
            this.setState({ showConnectionIssue: true });
        }, CONNECTION_ISSUE_TIMEOUT);
    }

    toggleChat(chatOpen = !Session.get('chatOpen')) {
        Session.set({ chatOpen });
    }

    logout() {
        Meteor.logout();

        /* TODO quit editing buttons */
    }

    render() {
        const { showConnectionIssue } = this.state;
        const {
            user,
            connected,
            loading,
            chatOpen,
            children,
            location,
        } = this.props;

        const closeChat = this.toggleChat.bind(this, false);

        // clone route components with keys so that they can
        // have transitions
        const clonedChildren = children && React.cloneElement(children, {
            key: location.pathname,
        });

        return (
            <div id="container">
                <nav id="menu">
                    <UserMenu user={user} logout={this.logout}/>
                </nav>
                {showConnectionIssue && !connected
                    ? <ConnectionNotification/>
                    : null}
                <div id="content-container">
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
            </div>
        );
    }
}

App.propTypes = {
    user: React.PropTypes.object,      // current meteor user
    connected: React.PropTypes.bool,   // server connection status
    loading: React.PropTypes.bool,     // subscription status
    chatOpen: React.PropTypes.bool,    // is chat menu open?
    items: React.PropTypes.array,      // all items
    stars: React.PropTypes.array,      // current user stars
    children: React.PropTypes.element, // matched child route component
    location: React.PropTypes.object,  // current router location
    params: React.PropTypes.object,    // parameters of the current route
};

App.contextTypes = {
    router: React.PropTypes.object,
};

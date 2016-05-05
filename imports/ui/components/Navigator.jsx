import React from 'react';
import { Link } from 'react-router';
import { Session } from 'meteor/session'; // XXX SESSION

export default class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownOn: false,
            isStarFilterOn: !!Session.get('isStarFilterOn')
        };
        this.toggleStarFilter = this.toggleStarFilter.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleStarFilter(e) {
        e.stopPropagation();
        Session.set('isStarFilterOn', !Session.get('isStarFilterOn'));
        this.setState({ isStarFilterOn: !this.state.isStarFilterOn});
    }

    toggleDropdown(e) {
        e.stopPropagation();
        this.setState({
            isDropdownOn: !this.state.isDropdownOn
        });
    }

    renderLoggedIn() {
        const { user, isNewItemFormOn, toggleNewItemForm, logout } = this.props;
        const { isDropdownOn, isStarFilterOn } = this.state;
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));

        return (
            <nav className="navbar">
                <div className="btn navbar-btn"><Link to="/items">FREEK</Link></div>
                <div className="pull-right">
                    <div className={`btn navbar-btn${isNewItemFormOn ? ' active' : ''}`}><a href="#" onClick={toggleNewItemForm}>Añade</a></div>
                    <div className={`btn navbar-btn${isStarFilterOn ? ' active' : ''}`}><a href="#" onClick={this.toggleStarFilter}>Star</a></div>
                    <div className="btn navbar-btn"><Link to="/about">About</Link></div>
                    <div className={`btn navbar-btn${isDropdownOn ? ' active' : ''}`}><a href="#" onClick={this.toggleDropdown}>Settings</a></div>
                    <div className="btn navbar-btn"><a href="#" onClick={logout}>Sign out</a></div>
                </div>
            </nav>
        );
    }

    renderLoggedOut() {
        return (
            <nav className="navbar">
                <div className="btn navbar-btn"><Link to="/items">FREEK</Link></div>
                <div className="pull-right">
                    <div className="btn navbar-btn"><Link to="/about">About</Link></div>
                    <div className="btn navbar-btn"><Link to="/signin">Sign in</Link></div>
                </div>
            </nav>
        );
    }

    render() {

        return this.props.user ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

Navigator.propTypes = {
    user: React.PropTypes.object,
    isNewItemFormOn: React.PropTypes.bool,
    toggleNewItemForm: React.PropTypes.func,
    logout: React.PropTypes.func
};

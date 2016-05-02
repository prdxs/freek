import React from 'react';
import { Link } from 'react-router';
import { Session } from 'meteor/session'; // XXX SESSION

export default class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropdownOn: false
        };
        this.toggleStarFilter = this.toggleStarFilter.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleStarFilter(e) {
        e.stopPropagation();
        Session.set('isStarFilterOn', !Session.get('isStarFilterOn'));
    }

    toggleDropdown(e) {
        e.stopPropagation();
        this.setState({
            isDropdownOn: !this.state.isDropdownOn
        });
    }

    renderLoggedIn() {
        const { user, isNewItemFormOn, toggleNewItemForm, logout } = this.props;
        const { isDropdownOn } = this.state;
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));

        return (
            <nav className="navbar">
                <Link to="/items" className="logo-btn">FREEK</Link>
                <a href="#" className={`navbar-btn${isNewItemFormOn ? ' active' : ''}`} onClick={toggleNewItemForm}>Añade</a>
                <a href="#" className={`navbar-btn${Session.get('isStarFilterOn') ? ' active' : ''}`} onClick={this.toggleStarFilter}>Star</a>
                <Link to="/about" className="navbar-btn">About</Link>
                <a href="#" className={`navbar-btn${isDropdownOn ? ' active' : ''}`} onClick={this.toggleDropdown}>Settings</a>
                <a href="#" className="navbar-btn" onClick={logout}>Sign out</a>
            </nav>
        );
    }

    renderLoggedOut() {
        return (
            <nav className="navbar">
                <Link to="/items" className="logo-btn">FREEK</Link>
                <Link to="/about" className="navbar-btn">About</Link>
                <Link to="/signin" className="navbar-btn">Sign in</Link>
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

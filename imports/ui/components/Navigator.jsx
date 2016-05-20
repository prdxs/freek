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
                <Link className="btn navbar-btn" to="/items">FREEK</Link>
                <div className="pull-right">
                    <button onClick={toggleNewItemForm} className={`btn navbar-btn${isNewItemFormOn ? ' active' : ''}`}>Añade</button>
                    <button  onClick={this.toggleStarFilter} className={`btn navbar-btn${isStarFilterOn ? ' active' : ''}`}>Star</button>
                    <Link className="btn navbar-btn" to="/about">About</Link>
                    <button onClick={this.toggleDropdown} className={`btn navbar-btn${isDropdownOn ? ' active' : ''}`}>Settings</button>
                    <button href="#" onClick={logout} className="btn navbar-btn">Sign out</button>
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

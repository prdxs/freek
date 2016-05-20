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
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
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
        const {
            isNewItemFormOn,
            logout,
            toggleNewItemForm,
            toggleSearchModal,
            user
        } = this.props;
        const { isDropdownOn, isStarFilterOn } = this.state;
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));

        return (
            <nav className="navbar">
                <Link className="btn navbar-btn" to="/items">FREEK</Link>
                <ul className="horizontal pull-center">
                    <li><a
                        className="btn navbar-btn"
                        href="javascript:void(0)"
                        onClick={toggleSearchModal}
                    <a/></li>
                </ul>
                <ul className="horizontal pull-right">
                    <li><a
                        href="javascript:void(0)"
                        onClick={toggleNewItemForm}
                        className={`btn navbar-btn${isNewItemFormOn ? ' active' : ''}`}>
                        Añade
                    </a></li>
                    <li><a
                        href="javascript:void(0)"
                        onClick={this.toggleStarFilter}
                        className={`btn navbar-btn${isStarFilterOn ? ' active' : ''}`}>
                        Star
                    </a></li>
                    <li><Link className="btn navbar-btn" to="/about">About</Link></li>
                    <li><a
                        href="javascript:void(0)"
                        onClick={this.toggleDropdown}
                        className={`btn navbar-btn${isDropdownOn ? ' active' : ''}`}>
                        Settings
                    </a></li>
                    <li><a
                        href="javascript:void(0)"
                        onClick={logout}
                        className="btn navbar-btn">
                        Sign out
                    </a></li>
                </ul>
            </nav>
        );
    }

    renderLoggedOut() {
        return (
            <nav className="navbar">
                <Link className="btn navbar-btn" to="/items">FREEK</Link>
                <ul className="horizontal pull-center">
                    <li><a
                        className="btn navbar-btn"
                        href="javascript:void(0)"
                        onClick={toggleSearchModal}
                    <a/></li>
                </ul>
                <ul className="horizontal pull-right">
                    <li><Link className="btn navbar-btn" to="/about">About</Link></li>
                    <li><Link className="btn navbar-btn" to="/signin">Sign in</Link></li>
                </ul>
            </nav>
        );
    }

    render() {

        return this.props.user ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

Navigator.propTypes = {
    isNewItemFormOn: React.PropTypes.bool,
    logout: React.PropTypes.func,
    toggleNewItemForm: React.PropTypes.func,
    toggleSearchModal: React.PropTypes.func,
    user: React.PropTypes.object
};

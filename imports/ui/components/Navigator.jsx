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
        const {
            isNewItemModalOn,
            isSearchModalOn,
            logout,
            toggleNewItemModal,
            toggleSearchModal,
            user
        } = this.props;
        const { isDropdownOn, isStarFilterOn } = this.state;
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));

        return (
            <nav className="navbar navbar-freek navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button aria-controls="navbar"
                                aria-expanded="false"
                                className="navbar-toggle collapsed"
                                data-target="#navbar"
                                data-toggle="collapse"
                                type="button" >
                            <span className="sr-only">Desplegar barra de navegación</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/items">Freek</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a className={isSearchModalOn ? 'active' : ''}
                                   href="javascript:void(0)"
                                   onClick={toggleSearchModal}>Buscar</a></li>
                            <li><a className={isNewItemModalOn ? 'active' : ''}
                                   href="javascript:void(0)"
                                   onClick={toggleNewItemModal}>Añade</a></li>
                            <li><a href="javascript:void(0)" onClick={this.toggleStarFilter}>Star</a></li>
                            <li><Link activeClassName="active" to="/about">About</Link></li>
                            <li className="dropdown">
                                <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Cuenta <span class="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="javascript:void(0)">Action</a></li>
                                    <li><a href="javascript:void(0)">Another action</a></li>
                                    <li><a href="javascript:void(0)">Something else here</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li className="dropdown-header">Nav header</li>
                                    <li><a href="javascript:void(0)">Separated link</a></li>
                                    <li><a href="javascript:void(0)">One more separated link</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0)" onClick={logout}>Signout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    renderLoggedOut() {
        return (
            <nav className="navbar navbar-freek navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Desplegar barra de navegación</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/items">Freek</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="javascript:void(0)" onClick={this.props.toggleSearchModal}>Buscar</a></li>
                            <li><Link activeClassName="active" to="/about">About</Link></li>
                            <li><Link activeClassName="active" to="/signin">Signin</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    render() {

        return this.props.user ? this.renderLoggedIn() : this.renderLoggedOut();
    }
}

Navigator.propTypes = {
    isNewItemModalOn: React.PropTypes.bool,
    isSearchModalOn: React.PropTypes.bool,
    logout: React.PropTypes.func,
    toggleNewItemModal: React.PropTypes.func,
    toggleSearchModal: React.PropTypes.func,
    user: React.PropTypes.object
};
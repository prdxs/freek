import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import React from 'react';
import { Link } from 'react-router';


export default class SigninModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        $('#signinModal').on('shown.bs.modal', function () {
            $('.email').focus()
        });
        $('#signinModal').modal('show');
    }

    componentWillUnmount() {
        $('#signinModal').modal('hide');
    }

    onSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const errors = {};

        if (!email) {
            errors.email = 'Se requiere correo electrónico.';
        }
        if (!password) {
            errors.password = 'Se requiere contraseña.';
        }

        this.setState({ errors });
        if (Object.keys(errors).length) {
            return;
        }

        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                this.setState({
                    errors: { none: err.reason }
                });
            } else {
                this.context.router.push('/items');
            }
        });
        this.props.toggleSigninModal();
    }

    render() {
        const { toggleJoinModal, toggleSigninModal } = this.props;
        const { errors } = this.state;
        const errorMessages = Object.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';

        return (
            <div className="modal modal-freek fade"
                 data-backdrop="static"
                 id="signinModal"
                 tabindex="-1"
                 role="dialog"
                 aria-labelledby="signinModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Close" onClick={toggleSigninModal}>
                                <i className="material-icons">close</i>
                            </button>
                            <h4 className="modal-title" id="signinModalLabel">Sign in</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" id="signin-form" onSubmit={this.onSubmit} ref="signinForm">
                                <ul className="error-list">
                                    {errorMessages.map(msg => (
                                        <li className="error-msg animated fadeIn" key={msg}>{msg}</li>
                                    ))}
                                </ul>
                                <input className={`email ${errorClass('email')}`}
                                       name="email"
                                       placeholder="Email"
                                       ref="email"
                                       type="email" />
                                <input className={`password ${errorClass('password')}`}
                                       name="password"
                                       placeholder="Contraseña"
                                       ref="password"
                                       type="password" />
                            </form>
                            <a  className="join"
                                href="javascript:void(0)"
                                onClick={toggleJoinModal}>No estás registrado? Únete!</a>
                        </div>
                        <div className="modal-footer">
                            <button className="btn modal-btn" form="signin-form" type="submit">
                                <i className="material-icons">save</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SigninModal.propTypes = {
    toggleJoinModal: React.PropTypes.func,
    toggleSigninModal: React.PropTypes.func
};

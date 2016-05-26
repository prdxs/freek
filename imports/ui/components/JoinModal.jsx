import { _ } from 'meteor/underscore';

import React from 'react';


export default class JoinModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        $('#joinModal').modal('show');
    }

    componentWillUnmount() {
        $('#joinModal').modal('hide');
    }

    onSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const confirm = this.refs.confirm.value;
        const errors = {};

        if (!username) {
            errors.username = 'Nombre de usuario requerido';
        }
        if (!email) {
            errors.email = 'Correo electrónico requerido';
        }
        if (!password) {
            errors.password = 'Contraseña requerida';
        }
        if (confirm !== password) {
            errors.confirm = 'Por favor, confirma tu contraseña';
        }

        this.setState({ errors });
        if (Object.keys(errors).length) {
            return;
        }

        Accounts.createUser({
            username,
            email,
            password
        }, err => {
            if (err) {
                this.setState({
                    errors: { none: err.reason }
                });
            }
            this.context.router.push('/');
        });
        this.props.toggleJoinModal();
    }

    render() {
        const { toggleJoinModal, toggleSigninModal } = this.props;
        const { errors } = this.state;
        const errorMessages = Object.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';

        return (
            <div className="modal modal-freek fade"
                 data-backdrop="static"
                 id="joinModal"
                 tabindex="-1"
                 role="dialog"
                 aria-labelledby="joinModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Close" onClick={toggleJoinModal}>
                                <i className="material-icons">close</i>
                            </button>
                            <h4 className="modal-title" id="joinModalLabel">Sign in</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" id="join-form" onSubmit={this.onSubmit} ref="joinForm">
                                <ul className="error-list">
                                    {errorMessages.map(msg => (
                                        <li className="error-msg animated fadeIn" key={msg}>{msg}</li>
                                    ))}
                                </ul>
                                <input autofocus
                                       className={`email ${errorClass('email')}`}
                                       name="email"
                                       placeholder="Email"
                                       ref="email"
                                       type="email" />
                                <input className={`username ${errorClass('username')}`}
                                       name="username"
                                       placeholder="Usuario"
                                       ref="username"
                                       type="text" />
                                <input className={`password ${errorClass('password')}`}
                                       name="password"
                                       placeholder="Contraseña"
                                       ref="password"
                                       type="password" />
                                <input className={`confirm ${errorClass('confirm')}`}
                                       name="confirm"
                                       placeholder="Confirma"
                                       ref="confirm"
                                       type="password" />
                            </form>
                            <a  className="join"
                                href="javascript:void(0)"
                                onClick={toggleSigninModal}>Si ya estás registrado logueate.</a>
                        </div>
                        <div className="modal-footer">
                            <button className="btn modal-btn" form="join-form" type="submit">
                                <i className="material-icons">save</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

JoinModal.propTypes = {
    toggleJoinModal: React.PropTypes.func,
    toggleSigninModal: React.PropTypes.func
};

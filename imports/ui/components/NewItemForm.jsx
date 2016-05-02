import React from 'react';

import { insertItem } from '../../api/items/methods.js';

export default class NewItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: {} };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const title = this.refs.title.value;
        const description = this.refs.description.value;
        const errors = {};

        if (!title) {
            errors.title = 'Título requerido';
        }
        if (!description) {
            errors.description = 'Descripción requerida';
        }

        this.setState({ errors });
        if (Object.keys(errors).length) {
            return;
        }
        insertItem.call({ title, description });
        this.props.toggleNewItemForm();
    }

    render() {
        const { toggleNewItemForm } = this.props;
        const { errors } = this.state;
        const errorMessages = Object.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';

        return (
            <div className="modal">
                <button className="close" onClick={toggleNewItemForm}>X</button>
                <h1 className="title">Añadir item</h1>
                <form className="form new-item-form" onSubmit={this.onSubmit}>
                    <ul className="error-list">
                        {errorMessages.map(msg => (
                            <li className="error-msg" key={msg}>{msg}</li>
                        ))}
                    </ul>
                    <input
                        className={`title ${errorClass('title')}`}
                        type="text"
                        name="title"
                        ref="title"
                        placeholder="Título" />
                    <textarea
                        className={`description ${errorClass('description')}`}
                        type="text"
                        name="description"
                        ref="description"
                        placeholder="Descripción"
                        cols="200" rows="5" />
                    <button type="submit" className="btn submit-btn">Añadir</button>
                </form>
            </div>
        );
    }
}

NewItemForm.propTypes = {
    toggleNewItemForm: React.PropTypes.func
};
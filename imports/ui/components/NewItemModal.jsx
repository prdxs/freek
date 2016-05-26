import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import React from 'react';
import Dropzone from 'react-dropzone';

import { Images } from '../../api/images/images.js';
import { insertItem } from '../../api/items/methods.js';

export default class NewItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            errors: {}
        };
        this.onDrop = this.onDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        $('#newItemModal').modal('show');
    }

    componentWillUnmount() {
        $('#newItemModal').modal('hide');
    }

    onDrop(images) {
        const errors = {};
        let wrongKind = images.filter(im => !im.type.startsWith('image/'));

        if (wrongKind.length) {
            errors.filetype = 'Los archivos tienen que ser imágenes';
        }

        if (images.length > 4) {
            errors.images = 'No se pueden introducir más de 4 imágenes';
        }

        if (_.isEmpty(errors)) {
            this.setState({ images });
        } else {
            this.setState({ errors });
        }
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
        if (!this.state.images.length) {
            errors.images = 'Almenos una imagen requerida';
        }

        this.setState({ errors });
        if (Object.keys(errors).length) {
            return;
        }

        let imRefs = this.state.images.map(function(image) {
            image.owner = Meteor.userId();
            return Images.insert(image, function (err, im) {
                if (err) {
                    console.log(err); //in case there is an error, log it to the console
                } else {
                    //the image upload is done successfully.
                    //you can use this callback to add the id of your file into another collection
                    //for this you can use fileObj._id to get the id of the file
                    console.log('inserted image', im);
                }
            })._id;
        });
        insertItem.call({ title, description, imRefs });

        /* TODO if error inserting item, delete pics */

        this.props.toggleNewItemModal();
        this.setState({ images: [] });
        this.refs.newItemForm.reset();
    }

    render() {
        const { toggleNewItemModal } = this.props;
        const { errors } = this.state;
        const errorMessages = Object.keys(errors).map(key => errors[key]);
        const errorClass = key => errors[key] && 'error';

        return (
            <div className="modal modal-freek fade"
                 data-backdrop="static"
                 id="newItemModal"
                 tabindex="-1"
                 role="dialog"
                 aria-labelledby="newItemModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Close"onClick={toggleNewItemModal}>
                                <i className="material-icons">close</i>
                            </button>
                            <h4 className="modal-title" id="newItemModalLabel">Añadir item</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" id="new-item-form" onSubmit={this.onSubmit} ref="newItemForm">
                                <ul className="error-list">
                                    {errorMessages.map(msg => (
                                        <li className="error-msg animated fadeIn" key={msg}>{msg}</li>
                                    ))}
                                </ul>
                                <input autofocus
                                       className={`title ${errorClass('title')}`}
                                       type="text"
                                       name="title"
                                       ref="title"
                                       placeholder="Título" />
                                <Dropzone className={`dropzone ${errorClass('images')}`} onDrop={this.onDrop} accept="image/*">
                                    {this.state.images.length ?
                                        <div className="images">{this.state.images.map((image) => <img key={image.lastModified} src={image.preview} />)}</div>
                                        : <div className="msg">Prueba arrastrar algunas imágenes aquí o haz clic encima.</div>
                                    }
                                </Dropzone>
                                <textarea
                                    className={`description ${errorClass('description')}`}
                                    type="text"
                                    name="description"
                                    ref="description"
                                    placeholder="Descripción"
                                    rows="4" />

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn modal-btn" form="new-item-form" type="submit">
                                <i className="material-icons">save</i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

NewItemModal.propTypes = {
    toggleNewItemModal: React.PropTypes.func
};

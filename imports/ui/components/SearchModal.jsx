import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class SearchModal extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.setSearchTerm(this.refs.search.value);
        this.props.toggleSearchModal();
    }
    render() {
        const { toggleSearchModal } = this.props;

        return (
            <div className="modal-overlay">
                <div className="modal">
                    <i  className="btn modal-btn material-icons close pull-right"
                        onClick={toggleSearchModal}>close</i>
                    <div className="modal-title">Buscar</div>
                    <form className="form search-form" onSubmit={this.onSubmit}>
                        <input
                            className="search-input"
                            type="text"
                            name="search"
                            ref="search"
                            placeholder="Busca..."
                            autofocus />
                    </form>
                </div>
            </div>
        );
    }
}

NewItemForm.propTypes = {
    setSearchTerm: React.PropTypes.func,
    toggleSearchModal: React.PropTypes.func
};

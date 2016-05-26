import React from 'react';

import Map from '../components/Map.jsx';

export default class SearchModal extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        $('#searchModal').modal('show');
    }

    componentWillUnmount() {
        $('#searchModal').modal('hide');
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.setSearchTerm(this.refs.search.value);
        this.props.toggleSearchModal();
    }

    render() {
        const { toggleSearchModal } = this.props;

        return (
            <div className="modal modal-freek fade"
                 data-backdrop="static"
                 id="searchModal"
                 tabindex="-1"
                 role="dialog"
                 aria-labelledby="searchModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Close" onClick={toggleSearchModal}>
                                <i className="material-icons">close</i>
                            </button>
                            <h4 className="modal-title" id="searchModalLabel">Parámetros de búsqueda</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" id="search-form" onSubmit={this.onSubmit} ref="searchForm">
                                <input autofocus
                                       className='search-term'
                                       type="text"
                                       name="search"
                                       ref="search"
                                       placeholder="Buscar..." />

                                <Map/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn modal-btn" form="search-form" type="submit">
                                <i className="material-icons">save</i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

SearchModal.propTypes = {
    setSearchTerm: React.PropTypes.func,
    toggleSearchModal: React.PropTypes.func
};

import { Meteor } from 'meteor/meteor';
import React from 'react';


import Config from '../../config/config.js';

export default class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: 0,
            lng: 0
        };

        this.getGoogleMapsURL = this.getGoogleMapsURL.bind(this);
        this.intervalHandler = null;
    }

    getGoogleMapsURL(lat, lng) {
        if (!!lat && !!lng) {
            return 'https://www.google.com/maps/embed/v1/place?key='
            + Config.googleMapsAPIKey
            + '&q=' + lat + ',' + lng
            + '&zoom=13&maptype=satellite';
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.geo);
    }

    render() {
        const { geo } = this.props;

        return (
            <iframe
                ref="frame"
                width="100%"
                height="450"
                frameborder="0"
                style={{ border: 0 }}
                src={_.isEmpty(geo) ? '' : this.getGoogleMapsURL(geo.lat, geo.lng)}
                allowfullscreen />
        );
    }
}

Map.propTypes = {
    geo: React.PropTypes.object
}

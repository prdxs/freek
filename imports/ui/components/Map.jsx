import React from 'react';
import { Geolocation } from 'meteor/mdg:geolocation';

import Config from '../../config/config.js';

export default class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = { width: 0 };

        this.getGoogleMapsURL = this.getGoogleMapsURL.bind(this);
    }

    getGoogleMapsURL(geo) {
        const url1 = 'https://www.google.com/maps/embed/v1/place?view=';
        const url2 = '&zoom=13&size=';
        const url3 = 'x300&sensor=false';

        if (geo) {
            return 'https://www.google.com/maps/embed/v1/place?key='
                + Config.googleMapsAPIKey
                + '&q=' + geo.lat + ',' + geo.lng
                + '&zoom=13&maptype=satellite';
        } else {
            return '';
        }

    }

    render() {
        const { width } = this.state;
        const geo = Geolocation.latLng();

        return (
            <iframe
                width="100%"
                height="450"
                frameborder="0"
                style={{border: 0}}
                src={this.getGoogleMapsURL(geo)}
                allowfullscreen />
        );
    }
}
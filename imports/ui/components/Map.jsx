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

    componentDidMount() {
        this.intervalHandler = Meteor.setInterval(() => {
            this.refs.frame.style.background = '#'+Math.floor(Math.random()*16777215).toString(16);
        } , 200);
    }
    getGoogleMapsURL(lat, lng) {
        if (!!lat && !!lng) {
            Meteor.clearInterval(this.intervalHandler);
            return 'https://www.google.com/maps/embed/v1/place?key='
            + Config.googleMapsAPIKey
            + '&q=' + lat + ',' + lng
            + '&zoom=13&maptype=satellite';
        } else {
            return '';
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.geo);
    }

    componentWillUnmount() {
        Meteor.clearInterval(this.intervalHandler);
    }

    render() {
        const { lat, lng } = this.state;

        return (
            <iframe
                ref="frame"
                width="100%"
                height="450"
                frameborder="0"
                style={{ border: 0 }}
                src={this.getGoogleMapsURL(lat, lng)}
                allowfullscreen />
        );
    }
}

Map.propTypes = {
    geo: React.PropTypes.object
}

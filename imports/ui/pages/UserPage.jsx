import React from 'react';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

import Item from '../components/Item.jsx';
import Loading from '../components/Loading.jsx';
import Message from '../components/Message.jsx';
import Carousel from '../components/Carousel.jsx';

export default class UserPage extends React.Component {

    render() {
        const { items, loading, user } = this.props;

        console.log('userpage props');
        console.log(user);
        
        if (loading) {
            return <Loading/>;
        }
        else if (!user) {
            return (
                <Message
                    title="Nombre de usuario incorrecto"
                    subtitle="No existe ningún usuario con dicho nombre de usuario"
                />
            );
        } else {
            return (
                <div className="page user-page">
                    <h1 className="username">{user.username}</h1>
                    <h2 className="email">{user.emails[0].address}</h2>
                </div>
            );
        }
    }
}

UserPage.propTypes = {
    items: React.PropTypes.array,
    loading: React.PropTypes.bool,
    user: React.PropTypes.object
};

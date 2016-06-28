import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ItemListContainer from '../../ui/containers/ItemListContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import AboutPage from '../../ui/pages/AboutPage.jsx';
import ItemPageContainer from '../../ui/containers/ItemPageContainer.jsx';
import UserContainer from '../../ui/containers/UserContainer.jsx';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <Route path="about" component={AboutPage}/>
            <Route path="item/:itemId" component={ItemPageContainer}/>
            <Route path="items" component={ItemListContainer}/>
            <Route path="join" component={AuthPageJoin}/>
            <Route path="signin" component={AuthPageSignIn}/>
            <Route path="user/:username" component={UserContainer}/>
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);

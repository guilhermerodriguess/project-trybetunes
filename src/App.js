import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      logged: false,
    };
  }

  isLogged = (param) => {
    this.setState({
      logged: param,
    });
  }

  render() {
    const { logged } = this.state;
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/project-trybetunes">
              {logged ? <Redirect to="/project-trybetunes/search" /> : <Login isLogged={ this.isLogged } />}
            </Route>
            <Route exact path="/project-trybetunes/profile/edit">
              <ProfileEdit />
            </Route>
            <Route exact path="/project-trybetunes/profile">
              <Profile />
            </Route>
            <Route exact path="/project-trybetunes/favorites">
              <Favorites />
            </Route>
            <Route exact path="/project-trybetunes/search">
              <Search />
            </Route>
            <Route path="/project-trybetunes/album/:id" component={ Album } />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;

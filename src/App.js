import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';

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
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route path="/profile/edit">
              <ProfileEdit />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/album/:id">
              <Album />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route exact path="/">
              {logged ? <Redirect to="/search" /> : <Login isLogged={ this.isLogged } />}
            </Route>
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

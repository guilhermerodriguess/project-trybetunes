import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
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
              <Login />
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

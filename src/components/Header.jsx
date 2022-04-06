import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.userShow();
  }

  userShow = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();

    this.setState({
      userName: user.name,
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          {
            loading
              ? <Loading />
              : <p data-testid="header-user-name">{ userName }</p>
          }
        </div>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;

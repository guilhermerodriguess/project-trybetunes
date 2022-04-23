import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {;
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
      <header className='header-component' data-testid="header-component">
        <div className='header-logo-name'>
          <h1>TrybeTunes</h1>
          {
            loading
              ? <Loading />
              : <h3 data-testid="header-user-name">{ userName }</h3>
          }
        </div>
        <div className='header-links'>
          <Link data-testid="link-to-search" to="/project-trybetunes/search"><h3>
            Search</h3></Link>
          <Link data-testid="link-to-favorites" to="/project-trybetunes/favorites"><h3>
          Favorites </h3></Link>
          <Link data-testid="link-to-profile" to="/project-trybetunes/profile">
            <h3>
            Profile
              </h3></Link>
        </div>
      </header>
    );
  }
}

export default Header;

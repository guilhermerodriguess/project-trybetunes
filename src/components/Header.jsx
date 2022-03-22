import React, { Component } from 'react';
import Loading from '../pages/Loading';
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
      </header>
    );
  }
}

export default Header;

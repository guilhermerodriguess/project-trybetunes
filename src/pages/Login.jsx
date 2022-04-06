import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      sendButton: true,
      listenInput: '',
      logged: false,
      loading: false,
      fetch: '',
    };
  }

  listenInput = ({ target }) => {
    const minLetters = 3;
    this.setState(
      {
        listenInput: target.value,
      },
      () => {
        const { listenInput } = this.state;
        const result = listenInput.length >= minLetters;
        this.setState({
          sendButton: !result,
        });
      },
    );
  }

  userFetch = async () => {
    const { listenInput } = this.state;
    const { isLogged } = this.props;
    this.setState({
      loading: true,
    });

    const fetchUser = await createUser({
      name: listenInput,
    });

    this.setState({
      fetch: fetchUser,
    }, () => {
      this.setState({
        loading: false,
        logged: true,
      }, () => {
        const { logged } = this.state;
        isLogged(logged);
      });
    });
    const { fetch } = this.state;

    return fetch;
  }

  render() {
    const { sendButton, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="login-name-input">
                <input
                  id="login-name-input"
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Nome"
                  onChange={ this.listenInput }
                />
              </label>
              <label htmlFor="login-submit-button">
                <input
                  id="login-submit-button"
                  type="button"
                  value="Entrar"
                  data-testid="login-submit-button"
                  disabled={ sendButton }
                  onClick={ this.userFetch }
                />
              </label>
            </form>)}
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  isLogged: propTypes.func.isRequired,
};

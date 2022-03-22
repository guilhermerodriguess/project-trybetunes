import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      listenInput: '',
      disabled: true,
    };
  }

  listenInput = ({ target }) => {
    const minLetters = 2;
    this.setState({
      listenInput: target.value,
    }, () => {
      const { listenInput } = this.state;
      const result = listenInput.length >= minLetters;
      this.setState({
        disabled: !result,
      });
    });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form>
            <label htmlFor="search-artist-input">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                id="search-artist-input"
                onChange={ this.listenInput }
              />
            </label>
            <label htmlFor="search-artist-button">
              <input
                type="button"
                data-testid="search-artist-button"
                id="search-artist-button"
                value="Pesquisar"
                disabled={ disabled }
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;

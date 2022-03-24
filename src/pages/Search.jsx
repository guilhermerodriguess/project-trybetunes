import React, { Component } from 'react';
import Header from '../components/Header';
import ListAlbum from '../components/ListAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      name: null,
      disabled: true,
      loading: false,
      result: null,
      showArtistName: false,
    };
  }

  listenInput = ({ target }) => {
    const minLetters = 2;
    this.setState({
      input: target.value,
    }, () => {
      const { input } = this.state;
      const result = input.length >= minLetters;
      this.setState({
        disabled: !result,
      });
    });
  }

  artistSearch = async () => {
    const { input } = this.state;
    this.showArtistName();
    this.setState({ loading: true, name: input, input: '' });
    const result = await searchAlbumsAPI(input);
    this.setState({
      result,
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  showArtistName = () => {
    this.setState({
      showArtistName: true,
    });
  }

  render() {
    const { disabled, input, loading, result, showArtistName, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div>
                <form>
                  <label htmlFor="search-artist-input">
                    <input
                      type="text"
                      data-testid="search-artist-input"
                      placeholder="Nome do Artista"
                      id="search-artist-input"
                      onChange={ this.listenInput }
                      value={ input }
                    />
                  </label>
                  <label htmlFor="search-artist-button">
                    <input
                      type="button"
                      data-testid="search-artist-button"
                      id="search-artist-button"
                      value="Pesquisar"
                      disabled={ disabled }
                      onClick={ this.artistSearch }
                    />
                  </label>
                </form>
              </div>
            )
        }
        {
          showArtistName
            ? (
              <p>
                {`Resultado de álbuns de: ${name}`}
              </p>
            )
            : null
        }
        {
          result === null
            ? null
            : (
              <div>
                <ListAlbum result={ result } />
              </div>
            )
        }
      </div>
    );
  }
}

export default Search;

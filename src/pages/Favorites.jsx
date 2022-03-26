import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      fav: [],
      loading: false,
      checked: true,
    };
  }

  componentDidMount() {
    this.recoveryFav();
  }

  recoveryFav = async () => {
    this.setState({
      loading: true,
    });
    const favs = await getFavoriteSongs();
    this.setState({
      fav: favs,
    });
    this.setState({
      loading: false,
    });
  }

  handleInputFav = async ({ target }, song) => {
    const { fav } = this.state;
    const { checked } = target;
    this.setState({ loading: true });

    if (checked === false) {
      this.setState({
        fav: fav.filter((music) => music.trackName !== song.trackName),
      });
      await removeSong(song);
    }

    this.setState({ loading: false });
  }

  render() {
    const { loading, fav, checked } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading
            ? <Loading />
            : (
              fav.map(
                (song, index) => (
                  <div key={ index }>
                    <MusicCard
                      song={ song }
                    />
                    <label htmlFor="fav">
                      Favorita
                      <input
                        data-testid={ `checkbox-music-${song.trackId}` }
                        type="checkbox"
                        name="fav"
                        id="fav"
                        onChange={ (event) => this.handleInputFav(event, song) }
                        checked={ checked }
                      />
                    </label>
                  </div>
                ),
              )
            )
        }
      </div>
    );
  }
}

export default Favorites;

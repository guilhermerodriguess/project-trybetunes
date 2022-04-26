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
    if (checked === false) {
      this.setState({
        fav: fav.filter((music) => music.trackName !== song.trackName),
      });
      await removeSong(song);
    }
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
              <div className='page-favorites'>
                {fav.map(
                  (song, index) => (
                    <div className='page-favorites-track' key={ index }>
                      <MusicCard
                        song={ song }
                      />
                        <input
                          data-testid={ `checkbox-music-${song.trackId}` }
                          type="checkbox"
                          name="fav"
                          id={`fav-${index}`}
                          onChange={ (event) => this.handleInputFav(event, song) }
                          checked={ checked }
                        />
                      <label htmlFor={`fav-${index}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </label>
                    </div>
                  ),
                )}
              </div>
            )
        }
      </div>
    );
  }
}

export default Favorites;

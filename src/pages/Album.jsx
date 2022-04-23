import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      fav: [],
      artistName: '',
      collectionName: '',
      loading: false,
      image: '',
    };
  }

  async componentDidMount() {
    this.showMusics();
    this.recoveryFav();
  }

  showMusics = async () => {
    this.setState({
      loading: true,
    });
    const { match } = this.props;
    const result = await getMusics(match.params.id);
    this.setState({
      songs: result.slice(1),
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      image: result[0].artworkUrl100,
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  recoveryFav = async () => {
    this.setState({
      fav: await getFavoriteSongs(),
    });
  }

  isChecked = (song) => {
    const { fav } = this.state;
    const isChecked = (fav.some(({ trackName }) => trackName === song.trackName));
    return isChecked;
  }

  handleInput = async ({ target }, song) => {
    const { fav } = this.state;
    const { checked } = target;
    this.setState({ loading: true });

    if (checked) {
      this.setState({ fav: [...fav, song] });
      await addSong(song);
    } else {
      this.setState({
        fav: fav.filter((music) => music.trackName !== song.trackName),
      });
      await removeSong(song);
    }

    this.setState({ loading: false });
  }

  render() {
    const { artistName, collectionName, songs, loading, image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div className='page-album'>
                <div className='page-album-artist' >
                  <img src={image} alt={artistName} />
                  <h1 data-testid="artist-name">{artistName}</h1>
                  <h3 className='album-name' data-testid="album-name">{collectionName}</h3>
                </div>
                <div>
                  {
                    songs.map((song, index) => (
                      <div className='music-card' key={ index }>
                        <hr />
                        <MusicCard
                          song={ song }
                        />
                        
                          <input
                            data-testid={ `checkbox-music-${song.trackId}` }
                            type="checkbox"
                            name="fav"
                            id={`fav-${index}`}
                            onChange={ (event) => this.handleInput(event, song) }
                            checked={ this.isChecked(song) }
                          />
                          <label htmlFor={`fav-${index}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </label>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};

export default Album;

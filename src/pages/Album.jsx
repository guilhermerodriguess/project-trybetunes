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
    const { artistName, collectionName, songs, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <>
                <div>
                  <p data-testid="artist-name">{artistName}</p>
                  <p data-testid="album-name">{collectionName}</p>
                </div>
                <div>
                  {
                    songs.map((song, index) => (
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
                            onChange={ (event) => this.handleInput(event, song) }
                            checked={ this.isChecked(song) }
                          />
                        </label>
                      </div>
                    ))
                  }
                </div>
              </>
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

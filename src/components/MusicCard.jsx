import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  fetchAPI = async (music) => {
    this.setState((prevState) => ({
      loading: true,
      checked: !prevState.checked,
    }));
    await addSong(music);
    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      trackId,
      trackName,
      previewUrl,
      music } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading
          ? <Loading />
          : (
            <>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="fav">
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name={ trackId }
                  id="fav"
                  onChange={ () => this.fetchAPI(music) }
                  checked={ checked }
                />
              </label>
            </>
          )}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,

};

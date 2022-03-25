import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songs } = this.props;
    return (
      <>
        {
          songs.map((song, index) => (
            index === 0
              ? null
              : (
                <li key={ index }>
                  <p>{song.trackName}</p>
                  <audio data-testid="audio-component" src={ song.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                </li>
              )
          ))
        }
      </>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

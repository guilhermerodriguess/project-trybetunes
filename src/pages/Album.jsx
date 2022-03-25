import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      artistName: '',
      collectionName: '',
      loading: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    console.log(match);
    const result = await getMusics(match.params.id);
    this.setState({
      songs: result,
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      loading: false,
    });
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
                  <ul>
                    <MusicCard songs={ songs } />
                  </ul>
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

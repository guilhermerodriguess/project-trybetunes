import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListAlbum extends Component {
  render() {
    const { result } = this.props;
    return (
      <div>
        {
          result.length === 0
            ? (
              <p>
                Nenhum álbum foi encontrado
              </p>
            )
            : (
              <ul>
                {
                  result.map(({ artistName,
                    collectionName,
                    artworkUrl100,
                    collectionId },
                  index) => (
                    <li key={ index }>
                      <img src={ artworkUrl100 } alt={ collectionName } />
                      <br />
                      {`Artista: ${artistName}`}
                      <br />
                      {`Album: ${collectionName}`}
                      <br />
                      <Link
                        data-testid={ `link-to-album-${collectionId}` }
                        to={ `album/${collectionId}` }
                      >
                        More Info
                      </Link>
                    </li>
                  ))
                }
              </ul>
            )
        }
      </div>
    );
  }
}

ListAlbum.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListAlbum;

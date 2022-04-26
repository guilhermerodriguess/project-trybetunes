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
              <p className='album-not-found' >
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
                      <div className='page-search-album'>
                        <img src={ artworkUrl100 } alt={ collectionName } />
                        <p className='artist-name'>
                          {artistName}
                        </p>
                        <p className='album-name' >
                          {collectionName}
                        </p>
                      </div>
                      <div className='page-search-more-info'>
                        <Link
                          data-testid={ `link-to-album-${collectionId}` }
                          to={ `/project-trybetunes/album/${collectionId}` }
                          >
                          <button>More Info</button>
                        </Link>
                      </div>
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

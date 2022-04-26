import React, { Component } from 'react';
import Header from '../components/Header';

class NotFound extends Component {
  render() {
    return (
      <>
        <Header/>
        <div  className='page-not-found' data-testid="page-not-found">
          <h1>
            Página não encontrada
          </h1>
        </div>
      </>
    );
  }
}

export default NotFound;

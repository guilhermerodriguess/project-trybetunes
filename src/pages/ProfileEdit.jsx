import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '', 
      image: '',
      description: ''
    }
  }

  handleInputs = ({target}) => {
    const value = target.id;
    this.setState({
      ...this.state, [value]: target.value
    })    
  }

  saveProfile = (event) => {
    // event.preventDefault();
    const estado = JSON.stringify(this.state)
    localStorage.setItem('user', estado)
  }

  render() {
    return (
      <>
        <div className='page-profile-edit-content' data-testid="page-profile-edit">
          <Header />
        </div>
        <div className='page-profile-edit' >
            <form onSubmit={ (e) => this.saveProfile(e) }>
              <div className='page-profile-edit-inputs'>
                <label htmlFor="name">Nome</label>
                <input onChange={ (e) => this.handleInputs(e) } type="text" id='name' placeholder='Edite seu nome'/>
                <label htmlFor="email">Email</label>
                <input onChange={ (e) => this.handleInputs(e) } type="email" id='email' placeholder='Edite seu email' />
                <label htmlFor="description">Descrição</label>
                <textarea onChange={ (e) => this.handleInputs(e) } row id='description' placeholder='Escreva uma breve descrição sobre você'/>
                <label className='page-profile-edit-image'  htmlFor="image">Imagem</label>
                <input onChange={ (e) => this.handleInputs(e) } type='text' id="image" placeholder='Insira o URL de uma imagem'/>
              </div>
              <button className='page-profile-edit-btn-save' type='submit'>Salvar</button>
            </form>
          </div>
      </>
    );
  }
}

export default ProfileEdit;

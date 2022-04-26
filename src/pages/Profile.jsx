import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.recoveryUser();
  }

  recoveryUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({
      name,
      email,
      description,
      image,
    });
    this.setState({ loading: false });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div className='page-profile' >
                  <Link to="/project-trybetunes/profile/edit">
                    <button className='page-profile-btn'>
                      Editar Perfil
                    </button>
                  </Link>
                <div className='page-profile-card'>
                  <img
                    src={ image }
                    alt={ `Foto de ${name}` }
                    data-testid="profile-image"
                  />
                  <p>
                    { name }
                  </p>
                  <p>
                    { email }
                  </p>
                  <p>
                    { description }
                  </p>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;

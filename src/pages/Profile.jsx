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
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
                <p>
                  { name }
                </p>
                <p>
                  { email }
                </p>
                <p>
                  { description }
                </p>
                <img
                  src={ image }
                  alt={ `Foto de ${name}` }
                  data-testid="profile-image"
                />
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;

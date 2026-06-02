import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../api/users';
import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const DEFAULT_PHONE_NUMBER = "+46012345678";
  const DEFAULT_STREET = "Street";
  const DEFAULT_POSTAL_CODE = "11111";
  const DEFAULT_CITY = "city";
  const DEFAULT_COUNTRY = "Sweden";

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        setError('');

        const data = await usersApi.register({
        username, 
        email,
        password,
        phoneNumber,
        street: DEFAULT_STREET,
        postalCode: DEFAULT_POSTAL_CODE,
        city: DEFAULT_CITY,
        country: DEFAULT_COUNTRY
        });

        localStorage.setItem('token', data.accessToken);

        navigate('/');
    } catch (err) {
        setError(err.message);
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Register</h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Phone number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+46 70 123 45 67"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Register
                </button>
              </form>
              <Link to="/login" className="text-accent small">login with your account</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
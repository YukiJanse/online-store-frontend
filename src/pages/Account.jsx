import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useOrders } from '../hooks/useOrders';
import { usersApi } from '../api/users';

const MOCK_ORDERS = [
  { id: '#ORD-A3F9K2', date: 'May 14, 2026', status: 'Delivered',  items: ['Mens Cotton Jacket', 'WD 2TB Hard Drive'], total: 119.99 },
  { id: '#ORD-B7XQ01', date: 'Apr 28, 2026', status: 'Shipped',    items: ['Silicon Power 256GB SSD'], total: 109.00 },
  { id: '#ORD-C1MN55', date: 'Apr 10, 2026', status: 'Delivered',  items: ["MBJ Women's Boat Neck", "Opna Short Sleeve"], total: 17.80 },
  { id: '#ORD-D4PL88', date: 'Mar 22, 2026', status: 'Processing', items: ['Samsung 49-Inch Monitor'], total: 999.99 },
];

const STATUS = {
  DELIVERED:  'success',
  SHIPPED:    'primary',
  PENDING: 'warning',
};

export default function Account() {
  const token = localStorage.getItem('accessToken');
  const [tab, setTab] = useState('orders'); // 'orders' | 'profile'
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: {
      street: '',
      postalCode: '',
      city: '',
      country: '',
    },
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const {
    userInfo,
    loading: userLoading,
    error: userFetchError
  } = useUsers();

  const {
    orders,
    loading: orderLoading,
    error: orderFetchError
  } = useOrders();

  const handleSave = async () => {
    try {
      await usersApi.updateProfile(form);

      // refresh user info (depends on your hook implementation)
      window.location.reload(); // simple version

      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };
  
  useEffect(() => {
    if (userInfo) {
      setForm({
        username: userInfo.username || '',
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        address: {
          street: userInfo.address.street || '',
          postalCode: userInfo.address.postalCode || '',
          city: userInfo.address.city || '',
          country: userInfo.address.country || ''
        }
      });
    }
  }, [userInfo]);

  if (userLoading || orderLoading) {
    return <p>Loading...</p>;
  }

  if (userFetchError || orderFetchError) {
    return <p>{userFetchError || orderFetchError}</p>;
  }

  return (
    <main className="container my-4">
      <div className="row g-4 align-items-start">
        <div className="col-md-3">
          <div className="card border text-center p-3">
            <div className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4 text-warning"
              style={{ width: 64, height: 64 }}>{userInfo.firstName[0]}{userInfo.lastName[0]}</div>
            <div className="fw-semibold">{userInfo.username}</div>
            <div className="text-muted small mb-3">{userInfo.email}</div>
            <div className="list-group list-group-flush text-start">
              <button
                className={`list-group-item list-group-item-action ${tab === 'orders' ? 'active' : ''}`}
                onClick={() => setTab('orders')}
              >
                Order history
              </button>

              <button
                className={`list-group-item list-group-item-action ${tab === 'profile' ? 'active' : ''}`}
                onClick={() => setTab('profile')}
              >
                Profile settings
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">

          {tab === 'orders' && (
            <>
              <h2 className="h4 fw-bold mb-3">Order history</h2>
              {orders.map((order) => (
                <div key={order.id} className="card border mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <code className="bg-light px-2 py-1 rounded small">#ORD-{order.id}</code>
                        <span className="text-muted small">
                          {new Date(order.orderedAt).toLocaleString()}
                        </span>
                      </div>
                      <span className={`badge bg-${STATUS[order.status]}`}>{order.status}</span>
                    </div>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {order.items.map((item, i) => (
                        <span key={i} className="badge bg-secondary fw-normal">{item.title}</span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between small text-muted">
                      <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                      <strong className="text-dark">${order.totalAmount.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'profile' && (
            <div className="card border p-4">
              <h2 className="h5 fw-bold mb-3">Profile settings</h2>
              <p>Currently you can change only first name and last name</p>

              {!editMode ? (
                <>
                  <p><strong>Username:</strong> {userInfo.username}</p>
                  <p><strong>First name:</strong> {userInfo.firstName}</p>
                  <p><strong>Last name:</strong> {userInfo.lastName}</p>
                  <p><strong>Phone number:</strong> {userInfo.phoneNumber}</p>
                  <p><strong>Email:</strong> {userInfo.email}</p>
                  <p><strong>Address:</strong> {userInfo.address.street} {userInfo.address.city} {userInfo.address.postalCode} {userInfo.address.country}</p>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setEditMode(true)}
                  >
                    Edit profile
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label">First name</label>
                    <input
                      className="form-control"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Last name</label>
                    <input
                      className="form-control"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone number</label>
                    <input
                      className="form-control"
                      value={form.phoneNumber}
                      onChange={(e) =>
                        setForm({ ...form, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Street</label>
                    <input
                      className="form-control"
                      value={form.address.street}
                      onChange={(e) =>
                        setForm({
                           ...form,
                           address: {
                            ...form.address,
                            street: e.target.value
                           }
                          })
                      }
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Postal code</label>
                    <input
                      className="form-control"
                      value={form.address.postalCode}
                      onChange={(e) =>
                        setForm({
                           ...form,
                           address: {
                            ...form.address,
                            postalCode: e.target.value
                           }
                          })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">city</label>
                    <input
                      className="form-control"
                      value={form.address.city}
                      onChange={(e) =>
                        setForm({
                           ...form,
                           address: {
                            ...form.address,
                            city: e.target.value
                           }
                          })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input
                      className="form-control"
                      value={form.address.country}
                      onChange={(e) =>
                        setForm({
                           ...form,
                           address: {
                            ...form.address,
                            country: e.target.value
                           }
                          })
                      }
                    />
                  </div>
{/* Currently Email can't be changed
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
*/}
                  <div className="d-flex gap-2">
                    <button className="btn btn-success btn-sm" onClick={handleSave}>
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditMode(false);
                        setForm({
                          firstName: userInfo.firstName,
                          lastName: userInfo.lastName,
                          phoneNumber: userInfo.phoneNumber,
                          address: {
                            street: userInfo.address.street,
                            postalCode: userInfo.address.postalCode,
                            city: userInfo.address.city,
                            country: userInfo.address.country,
                          },
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
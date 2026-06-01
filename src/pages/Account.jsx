const MOCK_ORDERS = [
  { id: '#ORD-A3F9K2', date: 'May 14, 2026', status: 'Delivered',  items: ['Mens Cotton Jacket', 'WD 2TB Hard Drive'], total: 119.99 },
  { id: '#ORD-B7XQ01', date: 'Apr 28, 2026', status: 'Shipped',    items: ['Silicon Power 256GB SSD'], total: 109.00 },
  { id: '#ORD-C1MN55', date: 'Apr 10, 2026', status: 'Delivered',  items: ["MBJ Women's Boat Neck", "Opna Short Sleeve"], total: 17.80 },
  { id: '#ORD-D4PL88', date: 'Mar 22, 2026', status: 'Processing', items: ['Samsung 49-Inch Monitor'], total: 999.99 },
];

const STATUS = {
  Delivered:  'success',
  Shipped:    'primary',
  Processing: 'warning',
};

export default function Account() {
  return (
    <main className="container my-4">
      <div className="row g-4 align-items-start">
        <div className="col-md-3">
          <div className="card border text-center p-3">
            <div className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4 text-warning"
              style={{ width: 64, height: 64 }}>JD</div>
            <div className="fw-semibold">Jane Doe</div>
            <div className="text-muted small mb-3">jane.doe@email.com</div>
            <div className="list-group list-group-flush text-start">
              <button className="list-group-item list-group-item-action active">Order history</button>
              <button className="list-group-item list-group-item-action">Profile settings</button>
              <button className="list-group-item list-group-item-action">Addresses</button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <h2 className="h4 fw-bold mb-3">Order history</h2>
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="card border mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <code className="bg-light px-2 py-1 rounded small">{order.id}</code>
                    <span className="text-muted small">{order.date}</span>
                  </div>
                  <span className={`badge bg-${STATUS[order.status]}`}>{order.status}</span>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {order.items.map((item, i) => (
                    <span key={i} className="badge bg-secondary fw-normal">{item}</span>
                  ))}
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                  <strong className="text-dark">${order.total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
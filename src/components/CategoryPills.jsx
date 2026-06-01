export default function CategoryPills({ categories, active, onChange }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {['all', ...categories].map((cat) => (
        <button
          key={cat}
          className={`btn btn-sm rounded-pill ${active === cat ? 'btn-dark' : 'btn-outline-secondary'}`}
          onClick={() => onChange(cat)}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  );
}
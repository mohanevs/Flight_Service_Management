export default function Navbar({ active, setActive }) {
  const links = [
    { id: "all",    label: "All Flights" },
    { id: "add",    label: "Add Flight"  },
    { id: "search", label: "Search"      },
    { id: "delete", label: "Delete"      },
  ];

  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-dot" />
        Flight Service
      </div>
      {links.map((l) => (
        <button
          key={l.id}
          className={`nav-btn${active === l.id ? " active" : ""}`}
          onClick={() => setActive(l.id)}
        >
          {l.label}
        </button>
      ))}
    </nav>
  );
}
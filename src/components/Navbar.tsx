import '../styles/components/Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <a href="/">Strona główna</a>
        </li>
        <li>
          <a href="/nagrody">Daily nagrody</a>
        </li>
        <li>
          <a href="/eventy">Eventy</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

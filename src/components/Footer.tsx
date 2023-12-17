import '../styles/components/Footer.css';
import heart from '../assets/heart.png';

function Footer() {
  return (
    <footer>
      <div className="footer">
        Made with <img src={heart} alt="love" width={18} height={18} /> by Oskki
      </div>
    </footer>
  );
}

export default Footer;

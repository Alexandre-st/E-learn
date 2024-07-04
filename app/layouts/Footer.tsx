import AuthButton from '../components/AuthButton';
import facebookIcon from '../assets/facebookl.svg';
import basketIcon from '../assets/ball.svg';
import linkedinIcon from '../assets/linkedin.svg';
import instagramIcon from '../assets/instagram.svg';
import behanceIcon from '../assets/bé.svg';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className='container footer'>
        <div className='footer-header'>
          <Link href='/' className='footer-logo'>
            eLearn
          </Link>
          <div className='footer-social'>
            <Image src={facebookIcon} alt='Facebok Logo' />
            <Image src={basketIcon} alt='' />
            <Image src={linkedinIcon} alt='LinkedIn Logo' />
            <Image src={instagramIcon} alt='Instagram Logo' />
            <Image src={behanceIcon} alt='Behance Logo' />
          </div>
        </div>

        <div className='footer-core'>
          <h3>Explorer</h3>
          <ul className='footer-links'>
            <li>
              <Link href='/'>Accueil</Link>
            </li>
            <li>
              <Link href='/cours'>Cours</Link>
            </li>
            <li>
              <Link href='/profile'>Mon Profil</Link>
            </li>
          </ul>
        </div>

        <AuthButton />
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: 'black', color: 'white', marginTop: '60px', padding: '40px 0 20px' }}>
      <div className="container">
        <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <div className="footer-column">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>CESI EAT</h3>
            <ul>
              <li style={{ marginBottom: '10px' }}><Link to="/about" style={{ color: '#CCC' }}>À propos</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/careers" style={{ color: '#CCC' }}>Carrières</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/blog" style={{ color: '#CCC' }}>Blog</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/contact" style={{ color: '#CCC' }}>Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>Informations légales</h3>
            <ul>
              <li style={{ marginBottom: '10px' }}><Link to="/terms" style={{ color: '#CCC' }}>Conditions d'utilisation</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/privacy" style={{ color: '#CCC' }}>Politique de confidentialité</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/cookies" style={{ color: '#CCC' }}>Cookies</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>Aide</h3>
            <ul>
              <li style={{ marginBottom: '10px' }}><Link to="/support" style={{ color: '#CCC' }}>Support</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/faq" style={{ color: '#CCC' }}>FAQ</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/delivery-areas" style={{ color: '#CCC' }}>Zones de livraison</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>Suivez-nous</h3>
            <ul>
              <li style={{ marginBottom: '10px' }}><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#CCC' }}>Facebook</a></li>
              <li style={{ marginBottom: '10px' }}><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#CCC' }}>Twitter</a></li>
              <li style={{ marginBottom: '10px' }}><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#CCC' }}>Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="copyright" style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: '#AAA', fontSize: '0.9rem' }}>
          <p>© CESI EAT {new Date().getFullYear()} - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
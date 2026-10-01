'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="wrap nav">
        <a className="brand" href="#home">
          <span className="logo">⚖</span>
          <span>
            <b>Achche Lal Gautam</b>
            <small>District Court Lawyer</small>
          </span>
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#services">Practice Areas</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn" href="#consult">Book Consultation</a>
      </div>
    </header>
  );
}

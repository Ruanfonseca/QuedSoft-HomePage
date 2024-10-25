'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Drawer } from 'rsuite';
import menu from '../../../assets/toggle.png';
import logo from '../../../logoqued.png';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${sticky ? 'sticky' : ''}`}>
        <div className="logo-container">
          <Image src={logo} alt="Logo" className="logo" width={50} height={50} />
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#contato">Contato</a></li>
          <li><a href="#servicos">Serviços</a></li>
        </ul>
        {isMobile && (
          <ButtonToolbar className="toolbar-right">
            <Button onClick={() => setOpen(true)}>
              <Image src={menu} className='menu-icon' alt='Menu' width={30} height={30} />
            </Button>
          </ButtonToolbar>
        )}
      </nav>

      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        className="drawer-responsive"
        size='xs'

      >
        <Drawer.Body>
          <ul className="drawer-list">
           <Image src={logo} alt="Logo" className="logo-drawer"/>
            <li><a href="#home">Home</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><a href="#servicos">Serviços</a></li>
          </ul>
        </Drawer.Body>
      </Drawer>
    </>
  );
}

export default Navbar;

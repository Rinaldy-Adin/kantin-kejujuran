import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { ReactComponent as MenuSVG } from '../assets/Menu.svg';
import { SolidButton, TransparentButton } from './Buttons';

const Nav = () => {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <div className='w-full flex flex-col gap-2 bg-inherit shadow-md items-center'>
            <div className='w-full h-20 flex items-center justify-between px-[80px] bg-inherit '>
                <Logo />
                <button
                    className='block md:hidden'
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
                >
                    <MenuSVG />
                </button>
                <div className='flex-row items-center gap-10 hidden md:flex'>
                    <Link to='/kantin'>
                        {pathname === '/kantin' ? (
                            <SolidButton>Kantin</SolidButton>
                        ) : (
                            <TransparentButton>Kantin</TransparentButton>
                        )}
                    </Link>
                    <Link to='/kotak'>
                        {pathname === '/kotak' ? (
                            <SolidButton>Kotak</SolidButton>
                        ) : (
                            <TransparentButton>Kotak</TransparentButton>
                        )}
                    </Link>
                </div>
            </div>
            {menuOpen && (
                <div className='flex flex-col w-full gap-1 md:hidden items-center pb-2'>
                    <Link to='/kantin' className='w-4/5 flex-col items-stretch'>
                        {pathname === '/kantin' ? (
                            <SolidButton className='w-full'>Kantin</SolidButton>
                        ) : (
                            <TransparentButton className='w-full'>
                                Kantin
                            </TransparentButton>
                        )}
                    </Link>
                    <Link to='/kotak' className='w-4/5 flex-col items-stretch'>
                        {pathname === '/kotak' ? (
                            <SolidButton className='w-full'>Kotak</SolidButton>
                        ) : (
                            <TransparentButton className='w-full'>
                                Kotak
                            </TransparentButton>
                        )}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Nav;

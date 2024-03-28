import React from 'react';
import { Link } from 'react-router-dom';
import css from './Navbar.module.scss';


console.log(css);


export type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = (props) => {
    const {} = props;

    return (
        <div className={ css.container }>
            <Link to={ '/' }>Main</Link>
            <Link to={ '/about' }>About</Link>
        </div>
    );
};

export default React.memo(Navbar);
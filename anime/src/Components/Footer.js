import React from 'react';
require('./styles/Footer.css');

const Footer = () => {
    return (
        <div className="footer">
            <a className="AnimeLista" href="/">AnimeList</a>
            <a className="Quiza" href="/Quiz">Quiz</a>
        </div>
    );
}

export default Footer;
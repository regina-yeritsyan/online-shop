import React from 'react';

function Footer(props) {
    return (
        <div style={{position: "relative"}}>
            <div className='footer'>
                <div className="footer__container">

                    <div className="center">
                        <div className="location">
                            <i className="fa-solid fa-location-dot"></i>
                            <div className="center__text">
                                <p className="center__desc">Gyumri Armenia</p>
                                <p className="center__desc">Vardanants Square </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <i className="fa fa-solid fa-envelope"></i>
                        <a href="mailto:test.online.shop@mail.ru" className="footer__contact__link">test.online.shop@mail.ru</a>
                        <br/>
                        <i className="fa fa-solid fa-phone"></i>
                        <a href="tel:(+374) 94444444" className="footer__contact__link">(+374) 94 44 44 44</a>
                    </div>

                    <div className="footer__soc">
                        <p>Follow</p>
                        <a href="#" className="soc__link">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-square-twitter"></i>

                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-pinterest"></i>
                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-dribbble"></i>
                        </a>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Footer;
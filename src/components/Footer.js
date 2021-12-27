import React, { Component } from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

//This comoponent is used for footer 
class Footer extends Component {
    render() {
        return (
            <div data-test="component-footer" className="mt-5 footermain">
                <footer className="bg-primary text-white text-center text-lg-start">
                    <div className="container p-4">

                        <div className="row">
                            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase">About Cognizant</h5>
                                <p>
                                    Cognizant is an American multinational technology company that provides business consulting, information technology and outsourcing services.
                                    It is headquartered in Teaneck, New Jersey, United States.

                                </p>
                            </div>


                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">

                            </div>
                            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase mb-0">More Info</h5>

                                <ul className="list-unstyled">
                                    <li>
                                        <a href="https://en.wikipedia.org/wiki/Cognizant" className="text-white">About</a>
                                    </li>
                                    <li>
                                        <a href="https://en.wikipedia.org/wiki/Cognizant#History" className="text-white">History</a>
                                    </li>

                                </ul>

                            </div>
                        </div>

                    </div>
                    <hr className="mb-4" />
                    <section className="mb-4 text-center">

                        <a href="https://www.facebook.com/Cognizant/" className="btn  btn-floating m-1 text-white"><BsFacebook size="30px" /></a>

                        <a href="https://www.instagram.com/cognizant/" className="btn  btn-floating m-1 text-white"><AiFillInstagram size="30px" /></a>


                        <a href="https://twitter.com/Cognizant?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="btn  btn-floating m-1 text-white"><AiFillTwitterCircle size="30px" /></a>


                        <a href="https://www.linkedin.com/company/cognizant/mycompany/" className="btn  btn-floating m-1 text-white"><BsLinkedin size="30px" /></a>
                    </section>

                    <div className="text-center p-3 footer-end">
                        © 2021 Copyright:
                        <a className="text-white" href="https://www.cognizant.com">cognizant.com</a>
                    </div>
                </footer>

            </div>
        )
    }
}

export default Footer;
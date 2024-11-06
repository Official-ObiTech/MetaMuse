import Link from "next/link";


const Footer = () => {
    return (
      <>
        <div className="footer">
          <div className="container flex flex-sb flex-wrap flex-left">
            <div className="footer_logo">
              <h2>ObiTech</h2>
              <h4>&copy; 2024 All Right Reserved.</h4>
              <h3>
                Coded by <span>Obi-Tech</span>
              </h3>
            </div>

            <div className="q_links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link href={"/"}>Advertise with us</Link>
                </li>
                <li>
                  <Link href={"/about"}>About us</Link>
                </li>
                <li>
                  <Link href={"/contact"}>Contact us</Link>
                </li>
              </ul>
            </div>
            <div className="q_links">
              <h3>Legal Links</h3>
              <ul>
                <li>
                  <Link href={"/"}>Privacy</Link>
                </li>
                <li>
                  <Link href={"/"}>Cookie Policy</Link>
                </li>
                <li>
                  <Link href={"/"}>Terms & Condition</Link>
                </li>
              </ul>
            </div>
            <div className="q_links">
              <h3>Social Media</h3>
              <ul>
                <li>
                  <Link href={"/"}>Github</Link>
                </li>
                <li>
                  <Link href={"/"}>Twitter</Link>
                </li>
                <li>
                  <Link href={"/"}>Instagram</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}

export default Footer;
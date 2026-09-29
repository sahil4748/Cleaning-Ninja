import { ArrowUpRight, Phone } from "lucide-react";
import { prototypeContact } from "@/content/homepage-prototype";
import Brand from "./Brand";
export default function Footer() {
  return (
    <footer className="cn-footer">
      <div className="cn-footer-main">
        <div>
          <Brand light />
          <p>
            Thoughtful cleaning.
            <br />
            For the spaces you love.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="#services">Our services</a>
          <a href="#packages">Special offers</a>
          <a href="#commercial">Commercial cleaning</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <div>
          <h3>Let’s talk clean</h3>
          <a href={prototypeContact.href}>
            <Phone size={17} />
            {prototypeContact.phone}
          </a>
          <a href={`mailto:${prototypeContact.email}`}>
            {prototypeContact.email}
          </a>
          <a href="#quote">
            Get a Free Quote
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="cn-footer-bottom">
        <span>© {new Date().getFullYear()} Cleaning Ninja</span>
        <div>
          <a href="/legal/privacy">Privacy policy</a>
          <a href="/legal/terms">Terms & offer conditions</a>
        </div>
        <span>Prototype · illustrative imagery, prices & phone</span>
      </div>
    </footer>
  );
}

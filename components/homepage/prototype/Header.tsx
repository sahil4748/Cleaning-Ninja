"use client";
import { useRef, type KeyboardEvent } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Brand from "./Brand";
import { prototypeContact } from "@/content/homepage-prototype";
const links = [
  ["Services", "#services"],
  ["Special offers", "#packages"],
  ["Commercial", "#commercial"],
  ["Our approach", "#how-it-works"],
];
export default function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  function trap(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const elements =
      event.currentTarget.querySelectorAll<HTMLElement>("a[href],button");
    const first = elements[0],
      last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <>
      <a className="cn-skip" href="#main-content">
        Skip to content
      </a>
      <div className="cn-offer-strip">
        <span>Prototype · sample offers & phone</span>
        <a href="#packages">
          A little more value. <strong>Up to 30% off selected packages*</strong>
          <ArrowUpRight size={14} />
        </a>
      </div>
      <header className="cn-header">
        <Brand />
        <nav aria-label="Main navigation">
          {links.map(([name, href]) => (
            <a key={href} href={href}>
              {name}
            </a>
          ))}
        </nav>
        <div className="cn-header-actions">
          <a
            className="cn-header-phone"
            href={prototypeContact.href}
            aria-label="Call 123456789, prototype number"
          >
            <Phone size={18} />
            <span>{prototypeContact.phone}</span>
          </a>
          <a className="cn-button cn-header-quote" href="#quote">
            Get a Free Quote
            <ArrowUpRight size={17} />
          </a>
          <button
            className="cn-menu-button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            onClick={() => menu.current?.showModal()}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        className="cn-menu"
        ref={menu}
        onKeyDown={trap}
        aria-labelledby="menu-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) menu.current?.close();
        }}
      >
        <div>
          <div className="cn-menu-top">
            <Brand />
            <button
              autoFocus
              aria-label="Close menu"
              className="cn-menu-button"
              onClick={() => menu.current?.close()}
            >
              <X />
            </button>
          </div>
          <h2 id="menu-title" className="cn-visually-hidden">
            Explore Cleaning Ninja
          </h2>
          <nav aria-label="Mobile navigation">
            {links.map(([name, href]) => (
              <a key={href} href={href} onClick={() => menu.current?.close()}>
                {name}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <a
            className="cn-button"
            href="#quote"
            onClick={() => menu.current?.close()}
          >
            Get a Free Quote
            <ArrowUpRight size={18} />
          </a>
          <a className="cn-menu-phone" href={prototypeContact.href}>
            <Phone size={18} />
            {prototypeContact.phone}
            <small>Prototype number</small>
          </a>
        </div>
      </dialog>
    </>
  );
}

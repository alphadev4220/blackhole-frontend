import React, { useEffect, useState, useRef } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { header } from 'react-bootstrap';
import Link from 'next/link'
import useOnclickOutside from "react-cool-onclickoutside";
import { FaTwitter, FaTelegramPlane } from "react-icons/fa";


setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

// const NavLink = props => (
//   <div 
//     {...props}
//     getProps={({ isCurrent }) => {
//       // the object returned here is passed to the
//       // anchor element's props
//       return {
//         className: isCurrent ? 'active' : 'non-active',
//       };
//     }}
//   />
// );



const Header= function() {

    const logoSize = 25
    const ref = useRef(null);
    const refRef = useRef(null);

    const [openMenu, setOpenMenu] = useState(false);
    const [openMenu1, setOpenMenu1] = useState(false);
    const [openMenu2, setOpenMenu2] = useState(false);
    const [openMenu3, setOpenMenu3] = useState(false);
    const [showmenu, btn_icon] = useState(false);
    const handleBtnClick = () => {
      setOpenMenu(!openMenu);
    };
    const handleBtnClick1 = () => {
      setOpenMenu1(!openMenu1);
    };
    const handleBtnClick2 = () => {
      setOpenMenu2(!openMenu2);
    };
    const handleBtnClick3 = () => {
      setOpenMenu3(!openMenu3);
    };
    const closeMenu = () => {
      setOpenMenu(false);
    };
    const closeMenu1 = () => {
      setOpenMenu1(false);
    };
    const closeMenu2 = () => {
      setOpenMenu2(false);
    };
    const closeMenu3 = () => {
      setOpenMenu3(false);
    };
    // const ref = useOnclickOutside(() => {
    //   closeMenu();
    // });
    const ref1 = useOnclickOutside(() => {
      closeMenu1();
    });
    const ref2 = useOnclickOutside(() => {
      closeMenu2();
    });
    const ref3 = useOnclickOutside(() => {
      closeMenu3();
    });

    // const headerHeight = ref.current && ref.current.clientHeight || 64;
    const headerWidth = refRef.current && refRef.current.clientWidth || 64;

    // console.log('headerWidth', headerWidth)
    useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    }, []);
    return (
    <header id="myHeader" className='navbar white' ref={ref} >
     <div className='container' style={{marginTop: 20}}>
     
       <div className='row w-100-nav'  >
          <div className='logo px-0'>
              <div className='navbar-title navbar-item'>
                
              </div>
          </div> 

          <Link href="/"  >
                <img
                    id='main-logo'
                    src="../img/logo10.png"
                    style={{width: 130, cursor: 'pointer', marginTop: 20}}
                    className="img-fluid d-block"
                    alt="#"
                  />
                </Link>
                
              <BreakpointProvider customQuery="max-width: 768px)">
                <Breakpoint l down>
                  {showmenu && 
                  <div className="mobile-navbar" >
                    <div className='navbar-item'>
                        <div className="mobile-menu-item" >
                          <Link href="/">
                          Home
                        </Link>
                        </div>
                    </div>
                    <div className='navbar-item'>
                      <div className="mobile-menu-item" >
                        <Link href="/voting" className='btn btn-2' >
                         Voting
                       </Link>
                       </div>
                    </div>
                    <div className='navbar-item'>
                    <a rel="noreferrer" href='https://twitter.com/BlackHoleLLC' target="_blank">
                                Twitter
                        </a>
                    </div>
                    <div className='navbar-item'>
                        <a rel="noreferrer" href='https://discord.com/invite/pY6cj2vNJD' target="_blank">
                          Discord
                            </a>
                    </div>
                    <div className='navbar-item'>
                        <a rel="noreferrer" href='https://t.me/+YnPA2Dw4EE4yNGUx' target="_blank">
                          Telegram
                        </a>
                    </div>
                  </div>
                  }
                </Breakpoint>
                <Breakpoint xl>
                  <div className='menu'>
                  <div className='navbar-item'>
                    <div className="hover-underline-animation">
                       <Link href="/">
                         Home
                       </Link>
                       </div>
                     </div>
                     <div className='navbar-item'>
                     <div className="hover-underline-animation">
                       <Link href="/voting" className='btn btn-2' >
                         Voting
                       </Link>
                       </div>
                     </div>
                    {/* <div className='navbar-item'>
                      <div className="hover-underline-animation">
                         <Link href="/team">
                           Team
                        </Link>
                      </div>
                    </div> */}
                    <div className='navbar-item'>
                    
                      <div>
                      <div className="dropdown-custom btn" >
                        </div>
                          <div className="dropdown-custom btn" >
                             <a rel="noreferrer" href='https://twitter.com/BlackHoleLLC' target="_blank">
                                <FaTwitter size={logoSize} />
                            </a>
                          </div>
                          <div className="dropdown-custom btn" >
                             <a rel="noreferrer" href='https://discord.com/invite/pY6cj2vNJD' target="_blank">
                                <img src={'/img/Discord-Logo-White.png'} style={{width: logoSize}} />
                            </a>
                          </div>
                          <div className="dropdown-custom btn" >
                             <a rel="noreferrer" href='https://t.me/+YnPA2Dw4EE4yNGUx' target="_blank">
                                <img src={'/img/telegram2.png'} style={{width: logoSize}} />
                            </a>
                          </div>
                          {/* <div className="dropdown-custom btn" 
                             >
                            <a href='https://www.telegram.com' target="_blank">
                                <FaTelegramPlane size={30} />
                            </a>
                          </div> */}
                        </div>
                    </div>
                  </div>
                </Breakpoint>
              </BreakpointProvider>

              {/* <div className='mainside'>
                <NavLink to="/wallet" className="btn-main">Connect Wallet</NavLink>
              </div> */}
                  
      </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>     
    </header>
    );
}
export default Header;
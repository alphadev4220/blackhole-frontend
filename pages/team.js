import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import TrustLines from '../components/pages/home2'
import axios from 'axios'
import BiddyHeader from '../components/menu/BiddyHeader';
import constants from '../src/constants';
import Swiper from 'swiper';
import StarryGalaxy from '../components/components/StarryGalaxy'
import Footer from '../components/components/footer';

function run() {

    var swiperWrapper = document.querySelector('.swiper-wrapper');

    /* The Team */
    var team = [{
            name: "Alice Stone",
            role: "UI Designer",
            desc: "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts.",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300",
            website: "https://rafaelalucas.com",
            email: "mailto:rafaelavlucas@gmail.com",
            linkedin: "https://www.linkedin.com/in/rafaelalucas/",
            dribbble: "https://dribbble.com/rafaelalucas",
        },
        {
            name: "Adam Turner",
            role: "Project Manager",
            desc: "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts.",
            photo: "https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300",
            website: "https://rafaelalucas.com",
            email: "mailto:rafaelavlucas@gmail.com",
            linkedin: "https://www.linkedin.com/in/rafaelalucas/",
            
        },
        {
            name: "Nancy Hughes",
            role: "UX Specialist",
            desc: "Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres live the blind texts.",
            photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300",
            website: "https://rafaelalucas.com",
            email: "mailto:rafaelavlucas@gmail.com",
            linkedin: "https://www.linkedin.com/in/rafaelalucas/",
            
        }
    ];

    /* Social Icons */
    var icons = [{
        iWebsite: "https://rafaelalucas.com/dailyui/6/assets/link.svg",
        iEmail: "https://rafaelalucas.com/dailyui/6/assets/email.svg",
        iLinkedin: "https://rafaelalucas.com/dailyui/6/assets/linkedin.svg",
        iDribbble: "https://rafaelalucas.com/dailyui/6/assets/dribbble.svg",
    }];

    var iWebsite = icons[0].iWebsite,
        iEmail = icons[0].iEmail,
        iLinkedin = icons[0].iLinkedin,
        iDribbble = icons[0].iDribbble;


    /* Function to populate the team members */
    function addTeam() {
        for (let i = 0; i < team.length; i++) {

            /* Variables for the team */
            var name = team[i].name,
                role = team[i].role,
                desc = team[i].desc,
                photo = team[i].photo,
                website = team[i].website,
                email = team[i].email,
                linkedin = team[i].linkedin,
                dribbble = team[i].dribbble;

            /* Template for the Team Cards */
            var template = `
                <div class="swiper-slide">
                <div class="card">
                    <span class="bg"></span>
                    <span class="more"></span>
                    <figure class="photo"><img src="${photo}"></figure>
                        <article class="text">
                            <p class="name">${name}</p>
                            <p class="role">${role}</p> 
                            <p class="desc">${desc}</p> 
                        </article>
                        
                        <div class="social">
                        <span class="pointer"></span>
                        <div class="icons">
                            <a class="icon" href="${email}" target="_blank" data-index="1"><img src="${iEmail}"></a>
                            <a class="icon" href="${linkedin}" target="_blank" data-index="2"><img src="${iLinkedin}"></a>
                            
                            </div>
                            </div>
                    </div>
                </div>`;

            swiperWrapper.insertAdjacentHTML('beforeend', template);
        }
    };


    addTeam();



    /* Swiper Settings */

    var mySwiper = new Swiper(".swiper-container", {
        // Optional parameters
        direction: "horizontal",
        loop: false,
        centeredSlides: true,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 40,
        threshold: 5,


        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            1180: {
                slidesPerView: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            799: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
                loop: true,
            },
        }
    });

    /* Show More */

    var btnShow = document.querySelectorAll('.more');



    btnShow.forEach(function (el) {
        el.addEventListener('click', showMore);
    });

    function showMore(event) {
        var card = event.target.closest(".swiper-slide");

        if (card.classList.contains('show-more')) {
            card.classList.remove('show-more');
        } else {
            card.classList.add('show-more')
        }

    }


    /* Social Hover */
    var icon = document.querySelectorAll('.icon');

    icon.forEach(function (el) {
        el.addEventListener("mouseenter", followCursor);

    });


    function followCursor(event) {
        var pointer = event.currentTarget.closest(".swiper-slide").querySelector('.pointer'),
            index = event.currentTarget.dataset.index,
            sizeIcon = (60 * index) + 25;

        pointer.style.transform = `translateX(${sizeIcon}px)`;
    }

}

export default function Team() {
    React.useEffect(() => {
        if ((typeof window !== 'undefined')){
            run();
        }
    }, [])
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <StarryGalaxy />
      <BiddyHeader />
        <div>
        <div className="about">
            <a className="bg_links social portfolio" href="https://www.rafaelalucas.com/dailyui" target="_blank" rel="noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank" rel="noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank" rel="noreferrer">
                <span className="icon"></span>
            </a>
            <a className="bg_links logo"></a>
        </div>
        <div className="wrapper">
            <section className="module-team">
                <div className="team">
                    {/* <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                    <h2 className="col-white">Blackhole Voting</h2>
                    </Reveal> */}
                    <h2 className="title">Meet our Team</h2>
                    <div className="team-cards">
                    <div className="swiper-container">
                    <div className="swiper-wrapper"></div>
                </div>

            <div className="swiper-pagination"></div>
            <div className="navigation">
               <div className="swiper-button-prev"></div>
               <div className="swiper-button-next"></div>
            </div>
         </div>

      </div>
      </section>
</div>







        
      </div>

      <Footer />

    </div>
  )
}

import React from 'react';
import $ from 'jquery';
// import ScrollReveal from 'scrollreveal'

function run(){
//Scroll reveal
// var ScrollReveal = require('scrollreveal')

window.sr = ScrollReveal();
sr.reveal('.reveal', { duration: 6000 });

(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();


}

const TreeRoadmap = () => {
    var myVar = (typeof ScrollReveal !== 'undefined');
    // console.log('myVar', myVar)
    React.useEffect(() => {
      if ((typeof ScrollReveal !== 'undefined')){
      run()
        console.log("Schodfisadf")
      }
      else{
        console.log("fijoasdoifjasdf")
      }
    }, [])
    return (
            <section className="timeline">
    <ul>
      <li>
        <div className="reveal">
          <p><phase>PHASE 1 - QUARTER 3 - 2022</phase> 
            Airdrop to Cosmos Ecosystem<br />
            Social Media Airdrop<br />
            Whitepaper 2.0 Release<br />
          </p>
        </div>
      </li>
      <li>
        <div className="reveal">
          <p>
          <phase>PHASE 2</phase> 
          Start HOLE Staking Protocol <br />
          List HOLE on Junoswap <br />
          </p>
        </div>
      </li>
      <li>
        <div className="reveal">
          <p>
          <phase>PHASE 3</phase>
            Launch BlackHole DAO <br/>
            Launch On-Chain Community DAO Proposal <br/>
          </p>
        </div>
      </li>
    </ul>
  </section>
    )

};
export default TreeRoadmap;
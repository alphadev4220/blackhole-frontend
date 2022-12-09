import React, { useState, useRef } from 'react';
import Reveal from 'react-awesome-reveal';
import { fadeIn, displayAddress } from '../../lib/CssHelper'
import { getBalance, getKeplr } from '../../lib/CosmosHelper'
import { isMobile } from '../../lib/BrowserHelper';
import { useContext } from 'react';
import { AppContext } from '../../utils/context';
import { isEmpty } from '../../utils/conversion';

function run() {
  window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  // Global Canvas Setting
  var canvas = document.getElementById('particle');
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  // Particles Around the Parent
  function Particle(x, y, distance) {
    this.angle = Math.random() * 2 * Math.PI;
    this.radius = Math.random();
    this.opacity = (Math.random() * 5 + 2) / 10;
    this.distance = (1 / this.opacity) * distance;
    this.speed = this.distance * 0.00003;

    this.position = {
      x: x + this.distance * Math.cos(this.angle),
      y: y + this.distance * Math.sin(this.angle)
    };

    this.draw = function () {
      ctx.fillStyle = "rgba(255,255,255," + this.opacity + ")";
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    }
    this.update = function () {
      this.angle += this.speed;
      this.position = {
        x: x + this.distance * Math.cos(this.angle),
        y: y + this.distance * Math.sin(this.angle)
      };
      this.draw();
    }
  }

  function Emitter(x, y) {
    this.position = { x: x, y: y };
    this.radius = 40;
    this.count = 2000;
    this.particles = [];

    for (var i = 0; i < this.count; i++) {
      this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
    }
  }


  Emitter.prototype = {
    draw: function () {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    },
    update: function () {
      for (var i = 0; i < this.count; i++) {
        this.particles[i].update();
      }
      this.draw();
    }
  }


  var emitter = new Emitter(canvas.width / 2, canvas.height / 2);

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emitter.update();
    requestAnimFrame(loop);
  }

  loop();
}

const BlackholeWallet = () => {
  const { walletInfo, disconnect, connectAndGetBalance } = useContext(AppContext);
  const canvasRef = useRef(null)
  const [displayVortex, setDisplayVortex] = useState(false);
  React.useEffect(() => {
    if ((typeof window !== 'undefined')) {
      // console.log("runnning")
      if (!isMobile()) {

      }
      else {
        var doc = document.getElementById('canvas')
        if (doc) {
          doc.style.display = 'none'
        }
      }
      // setDisplayVortex(!isMobile())
    }
  }, [])

  return (
    <div>
      <div>
        <div>
          <div>
            {(walletInfo && walletInfo.address) ? (
              <button id='keplr-logo' className='btn-main color-1' onClick={disconnect}>Disconnect</button>
            ) : (
              <button id='keplr-logo' className='btn-main' onClick={connectAndGetBalance}>Connect Wallet</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};
export default BlackholeWallet;
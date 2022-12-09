import React from 'react';
import $ from 'jquery';

function run(){
var Slider = function() {
    var total, $slide, $slider, sliderWidth, increment = 120;
    var on = function() {
      $slider = $('.slider');
      $slide = $('.slide');
      sliderWidth = $slider.width();
      total = $slide.length;
      position();
    }
  
    var position = function() {
      var sign, half = $('.active').index(), x = 0, z = 0, zindex,scaleX = 1.3,scaleY = 1.3, transformOrigin;
      $slide.each(function(index, element) {
        scaleX = scaleY = 1;
        transformOrigin = sliderWidth / 2;
        if(index < half) {
          sign = 1;
          zindex = index + 1;
          x = sliderWidth / 2 - increment * (half - index + 1);
          z =  -increment * (half - index + 1);
        } else if(index > half) {
          sign = -1
          zindex = total - index;
          x = sliderWidth / 2 + increment * (index - half + 1);
          z =  -increment * (index - half + 1);
        } else {
          sign = 0;
          zindex = total;
          x = sliderWidth / 2;
          z = 1;
          scaleX = scaleY = 1.2;
          transformOrigin = 'initial';
        }
        $(element).css(
          {
            'transform': 'translate3d(' + calculateX(x, sign, 300) + 'px, 0,' + z + 'px) scale3d(' + scaleX + ',' + scaleY + ', 1)',
            'z-index': zindex,
            'transform-origin-x': transformOrigin
          }
        );
      });
    };
  
    var calculateX = function(position, sign, width) {
      switch(sign) {
        case 1:
        case 0: return position - width / 2;
        case -1: return position - width / 2;
      }
    }
    
    var imageSize = function() {
      return $slider.width() / 3;
    }
    
    var recalculateSizes = function() {
      sliderWidth = $slider.width();
      position();
    }
    
    var clickedImage = function() {
      $('.active').removeClass('active');
      $(this).addClass('active');
      position();
    }
    
    var addEvents = function() {
      $( window ).resize(recalculateSizes);
      $(document).on('click','.slide', clickedImage);
    }
    
    return {
      init: function() {
        on();
        addEvents();
      }
    };
  }();
  
  $(function(){
    var slider = Slider.init();
  })
}



const Roadmap = () => {
    React.useEffect(() => {
      if ((typeof window !== 'undefined')){
      run()
      }
    }, [])
    return (
        <><div className="slider">
            <div className="slide active">
                <div className="slide-container">
                    <h2 className="slide-Title">Q3 - 2022</h2>
                    <div className="slide-description">
                        <ul>
                            <li>Black Token Airdrop on Juno Network.</li>
                            <li>HOLE Listing on Osmosis DEX.</li>
                            <li>Execute First BlackHole Vote and Burn.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="slide">
                <div className="slide-container">
                    <h2 className="slide-Title">Q4 - 2022</h2>
                    <div className="slide-description">
                        <ul>
                            <li>Launch Interest Bearing Pulse Account.</li>
                            <li>Nunc blandit justo ac dolor lobortis suscipit.</li>
                            <li>Et tincidunt lectus porta sit amet.</li>
                            <li>Nulla dignissim ligula nec faucibus feugiat.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="slide">
                <div className="slide-container">
                    <h2 className="slide-Title">Q3 - 2021</h2>
                    <div className="slide-description">
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Nunc blandit justo ac dolor lobortis suscipit.</li>
                            <li>Et tincidunt lectus porta sit amet.</li>
                            <li>Nulla dignissim ligula nec faucibus feugiat.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="slide">
                <div className="slide-container">
                    <h2 className="slide-Title">Q4 - 2021</h2>
                    <div className="slide-description">
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Nunc blandit justo ac dolor lobortis suscipit.</li>
                            <li>Et tincidunt lectus porta sit amet.</li>
                            <li>Nulla dignissim ligula nec faucibus feugiat.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="slide">
                <div className="slide-container">
                    <h2 className="slide-Title">Q1 - 2022</h2>
                    <div className="slide-description">
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Nunc blandit justo ac dolor lobortis suscipit.</li>
                            <li>Et tincidunt lectus porta sit amet.</li>
                            <li>Nulla dignissim ligula nec faucibus feugiat.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="slide">
                <div className="slide-container">
                    <h2 className="slide-Title">Q2 - 2022</h2>
                    <div className="slide-description">
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Nunc blandit justo ac dolor lobortis suscipit.</li>
                            <li>Et tincidunt lectus porta sit amet.</li>
                            <li>Nulla dignissim ligula nec faucibus feugiat.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div></>
    )

};
export default Roadmap;
function slidersInit() {
   $('.shores__slider').slick({
      arrows: true,
      asNavFor: '.shores__nav',
      infinite: true,
      fade: true,
      draggable: true,
      prevArrow: $('.header__icon-arrow_left'),
      nextArrow: $('.header__icon-arrow_right'),
   });
   $('.shores__nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.shores__slider',
      focusOnSelect: true
   });


   $('.shores__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      let index = nextSlide + 1
      document.querySelector(`.map__path_${currentSlide + 1}`).classList.remove('map__path_active')
      document.querySelector(`.map__point_${currentSlide + 1}`).classList.remove('map__point_active')
      document.querySelector(`.map__destination_${currentSlide + 1}`).classList.remove('map__destination_active')

      document.querySelector(`.map__path_${index}`).classList.add('map__path_active')
      document.querySelector(`.map__point_${index}`).classList.add('map__point_active')
      document.querySelector(`.map__destination_${index}`).classList.add('map__destination_active')
   });
}

function setCurrentDate() {
   let month = new Date().getMonth() + 1;
   let formatedMonth = month < 10 ? `0${month}` : month;
   document.querySelector('.date__day').innerHTML = new Date().getDate();
   document.querySelector('.date__small').innerHTML = `${formatedMonth} | ${new Date().getFullYear()}`;
}

function checkLocation(url) {
   let map = document.querySelector('.img');
   let locationSymbol = document.querySelector('.location')

   let x = map.width / 360;
   let y = map.height / 145;

   fetch(url)
      .then(res => res.json())
      .then(body => {

         if (body.city && body.country) {
            document.querySelector('.locationText').innerHTML = `${body.city} | ${body.country}`
            document.querySelector('.header__city').innerHTML = `${body.city}`
         }

         if (body.longitude && body.latitude) {
            let posX = (+body.longitude + 170) * x;
            let posY = (95 - +body.latitude) * y;
            locationSymbol.style.top = posY + 'px';
            locationSymbol.style.left = posX + 'px';
            locationSymbol.style.display = 'block';
         }
      })
}


slidersInit()
setCurrentDate()
checkLocation('http://free.ipwhois.io/json/')



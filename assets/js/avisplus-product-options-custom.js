/* source: assets/js/avisplus-product-options-custom-b1b4f2bc-2.js */
let interval = setInterval(function () {
  let apElements = document.querySelector('#avpoptions-container__v2');
  let apValueSelect = $('.apo-select-fonts .avp-productdescfont.avp-productoptiontextcolor.avp-productoptionbackground').val();
  let fontValue = null
  if (apElements){
    if (apValueSelect) {
      fontValue = apValueSelect
      $('.apo-text input').css('font-family', fontValue)
    }
  }
}, 100);

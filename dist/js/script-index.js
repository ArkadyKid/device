'use strict';

(function () {
  var modalShowClass = 'modal--show';
  var overflowBodyClass = 'body--overflow';
  var modalErrorClass = 'modal-feedback__wrapper--error';
  var nameStorage;
  var emailStorage;

  var isStorageSupport = true;

  var body = document.querySelector('.body');
  var modalMapElement = document.querySelector('.modal-map');
  var modalFeedbackElement = document.querySelector('.modal-feedback');
  var mapButtonElement = document.querySelector('.about__contacts-link');
  var modalCloseElement = document.querySelectorAll('.modal__close');
  var closeArray = Array.prototype.slice.call(modalCloseElement);
  var feedbackButtonElement = document.querySelector('.about__contacts-button');
  var modalNameElement = modalFeedbackElement.querySelector('#name');
  var modalEmailElement = modalFeedbackElement.querySelector('#email');
  var modalTextElement = modalFeedbackElement.querySelector('#text');
  var modalWrapperElement = modalFeedbackElement.querySelector('.modal__wrapper');
  var modalFormElement = modalFeedbackElement.querySelector('.modal-feedback__form');
  var modalShowElement = document.querySelectorAll('.modal');
  var modalShowArray = Array.prototype.slice.call(modalShowElement);

  var showMap = function (evt) {
    evt.preventDefault();
    modalMapElement.classList.add(modalShowClass);
    body.classList.add(overflowBodyClass);
  };

  var showFeedback = function (evt) {
    evt.preventDefault();
    modalFeedbackElement.classList.add(modalShowClass);
    body.classList.add(overflowBodyClass);

    if (nameStorage && emailStorage) {
      modalNameElement.value = nameStorage;
      modalEmailElement.value = emailStorage;
      modalTextElement.focus();
    } else {
      modalNameElement.focus();
    }
  };

  var modalLocalStorage = function (evt) {
    if (!modalNameElement.value || !modalEmailElement.value || !modalTextElement.value) {
      evt.preventDefault();
      modalWrapperElement.classList.add(modalErrorClass);
    } else {

      if (isStorageSupport) {
        localStorage.setItem('modalNameElement', modalNameElement.value);
        localStorage.setItem('modalEmailElement', modalEmailElement.value);
      }
    }
  };

  var closeModal = function () {
    modalMapElement.classList.remove(modalShowClass);
    modalFeedbackElement.classList.remove(modalShowClass);
    body.classList.remove(overflowBodyClass);
  };

  var closeModalEvt = function (evt) {
    evt.preventDefault();
    closeModal();
  };

  var escClose = function (evt) {
    if (evt.keyCode === 27) {
      modalMapElement.classList.remove(modalShowClass);
      modalFeedbackElement.classList.remove(modalShowClass);
      body.classList.remove(overflowBodyClass);
    }
  };

  try {
    nameStorage = localStorage.getItem('modalNameElement');
    emailStorage = localStorage.getItem('modalEmailElement');
  } catch (error) {
    isStorageSupport = false;
  }

  feedbackButtonElement.addEventListener('click', showFeedback);
  mapButtonElement.addEventListener('click', showMap);
  document.addEventListener('keydown', escClose);

  closeArray.forEach(function (element) {
    element.addEventListener('click', closeModalEvt)
  });

  modalFormElement.addEventListener('submit', modalLocalStorage
  );

  modalShowArray.forEach(function (element) {
    element.addEventListener('click', function (event) {
      if (event.target === element) {
        closeModal();
      }
    })
  });


  var sliderNoneID = 'slider-none';
  var sliderLabelDelivery = 'slider-label--delivery';
  var sliderShowDeliveryID = 'slider-show--delivery';
  var sliderShowWarrantyID = 'slider-show--warranty';
  var sliderShowCreditID = 'slider-show--credit';
  var sliderLabelElement = document.querySelectorAll('.slider-services__label');
  var sliderLabelArray = Array.prototype.slice.call(sliderLabelElement);
  var sliderDeliveryLabelElement = document.querySelector('.slider-services__label--delivery');
  var sliderWarrantyLabelElement = document.querySelector('.slider-services__label--warranty');
  var sliderCreditLabelElement = document.querySelector('.slider-services__label--credit');
  var sliderDeliveryBlockElement = document.querySelector('.slider-services__block--delivery');
  var sliderWarrantyBlockElement = document.querySelector('.slider-services__block--warranty');
  var sliderCreditBlockElement = document.querySelector('.slider-services__block--credit');

  var sliderHoverClass = 'slider-services__label--hover';

  sliderLabelArray.forEach(function (element) {
    element.addEventListener('mouseenter', function (event) {
      if (event.target === sliderDeliveryLabelElement) {
        sliderDeliveryLabelElement.removeAttribute('id');
        sliderDeliveryBlockElement.id = sliderShowDeliveryID;
        sliderWarrantyBlockElement.id = sliderNoneID;
        sliderCreditBlockElement.id = sliderNoneID;
      }
      if (event.target === sliderWarrantyLabelElement) {
        sliderDeliveryLabelElement.id = sliderLabelDelivery;
        sliderDeliveryLabelElement.id = sliderLabelDelivery;
        sliderDeliveryBlockElement.id = sliderNoneID;
        sliderWarrantyBlockElement.id = sliderShowWarrantyID;
        sliderCreditBlockElement.id = sliderNoneID;
      }
      if (event.target === sliderCreditLabelElement) {
        sliderDeliveryLabelElement.id = sliderLabelDelivery;
        sliderDeliveryBlockElement.id = sliderNoneID;
        sliderWarrantyBlockElement.id = sliderNoneID;
        sliderCreditBlockElement.id = sliderShowCreditID;
      }
    });

  });

}());

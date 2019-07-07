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

  // Оживление слайдера

  var sliderNoneID = 'slider-none';
  var sliderLabelDeliveryID = 'slider-label--delivery';
  var sliderLabelWarrantyID = 'slider-label--warranty';
  var sliderLabelCreditID = 'slider-label--credit';
  var sliderBlockDeliveryID = 'slider-services__block--delivery';
  var sliderBlockWarrantyID = 'slider-services__block--warranty';
  var sliderBlockCreditID = 'slider-services__block--credit';
  var sliderHoverClass = 'slider-services__label--hover';

  var sliderServicesElement = document.querySelector('.slider-services');
  var sliderLabelElement = sliderServicesElement.querySelectorAll('.slider-services__label');
  var sliderLabelArray = Array.prototype.slice.call(sliderLabelElement);
  var sliderDeliveryLabelElement = sliderServicesElement.querySelector('.slider-services__label--delivery');
  var sliderWarrantyLabelElement = sliderServicesElement.querySelector('.slider-services__label--warranty');
  var sliderCreditLabelElement = sliderServicesElement.querySelector('.slider-services__label--credit');
  var sliderDeliveryBlockElement = sliderServicesElement.querySelector('.slider-services__block--delivery');
  var sliderWarrantyBlockElement = sliderServicesElement.querySelector('.slider-services__block--warranty');
  var sliderCreditBlockElement = sliderServicesElement.querySelector('.slider-services__block--credit');

  sliderLabelArray.forEach(function (element) {
    element.addEventListener('mouseenter', function (event) {
      if (event.target === sliderDeliveryLabelElement) {

        sliderDeliveryLabelElement.removeAttribute('id');

        sliderWarrantyLabelElement.id = sliderLabelWarrantyID;
        sliderCreditLabelElement.id = sliderLabelCreditID;

        sliderDeliveryBlockElement.id = sliderBlockDeliveryID;
        sliderWarrantyBlockElement.id = sliderNoneID;
        sliderCreditBlockElement.id = sliderNoneID;

        sliderDeliveryLabelElement.classList.add(sliderHoverClass);
        sliderWarrantyLabelElement.classList.remove(sliderHoverClass);
        sliderCreditLabelElement.classList.remove(sliderHoverClass);

      }
      if (event.target === sliderWarrantyLabelElement) {

        sliderWarrantyLabelElement.removeAttribute('id');

        sliderDeliveryLabelElement.id = sliderLabelDeliveryID;
        sliderCreditLabelElement.id = sliderLabelCreditID;

        sliderDeliveryBlockElement.id = sliderNoneID;
        sliderWarrantyBlockElement.id = sliderBlockWarrantyID;
        sliderCreditBlockElement.id = sliderNoneID;

        sliderDeliveryLabelElement.classList.remove(sliderHoverClass);
        sliderWarrantyLabelElement.classList.add(sliderHoverClass);
        sliderCreditLabelElement.classList.remove(sliderHoverClass);

      }
      if (event.target === sliderCreditLabelElement) {

        sliderCreditLabelElement.removeAttribute('id');

        sliderDeliveryLabelElement.id = sliderLabelDeliveryID;
        sliderWarrantyLabelElement.id = sliderLabelWarrantyID;

        sliderDeliveryBlockElement.id = sliderNoneID;
        sliderWarrantyBlockElement.id = sliderNoneID;
        sliderCreditBlockElement.id = sliderBlockCreditID;

        sliderDeliveryLabelElement.classList.remove(sliderHoverClass);
        sliderWarrantyLabelElement.classList.remove(sliderHoverClass);
        sliderCreditLabelElement.classList.add(sliderHoverClass);
      }
    });
  });
}());

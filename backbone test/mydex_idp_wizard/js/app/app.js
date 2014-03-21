var app = app || {};

// create our bus for communication between objects
app.pubsub = app.pubsub || _.extend({}, Backbone.Events);

var ENTER_KEY = 13;

jQuery(function ($) {
  'use strict';

  // kick things off by creating the `App`
  new app.ConnectionWizardView();

  // then see if we can make the wizard
  app.ConnectionList.reset();

  app.ConnectionList.add([
    {
      type: 'MobileProvider',
      machine_name: 'MobileProvider',
      title: 'Mobile Provider',
      smsSent: false,
      name: "Joe Bloggs",
      account_number: "321654987",
      address_first_line: '123 Somewhere Drive',
      address_second_line: 'North Ham',
      town: 'Demosville',
      postcode: 'N17 DEMO'
    },
    {
      title: 'HM Passport Office',
      machine_name: 'PassportAgency',
      passport_number: null,
      verifying: null,
      date_of_birth: "28.03.1982",
      place_of_birth: 'Shropshire',
      nationality: 'British Citizen'
    },
    {
      title: 'Driver and Vehicle Licencing Agency',
      machine_name: 'DVLA',
      driving_license_number: null,
      verifying: null,
      date_of_birth: "28.03.1982",
      place_of_birth: 'Shropshire',
      nationality: 'British Citizen'
    },
    {
      title: 'Bank',
      machine_name: 'Bank',
      provider_name: "HSBC",
      account_type: 'Current Plus Account'
    },
    {
      title: 'Utility',
      machine_name: 'Utility',
      provider_name: 'Npower',
      password: null,
      account_number: null
    }

    // { title: 'TV License'}
  ]);
  // Move this into a Drupal setting or something
  // using variable_get/set for integrating into the platform
  app.ConnectionList.requiredConnections = 3;

// convenience functions to show the correct pages, when developing.
//
// _.delay(function(){ $('.intro a.button').click();}, 200);

// _.delay(function(){ $('li.mobile_provider').click();}, 400);

// _.delay(function(){ $('#mobile-provider-form input[name="mobile_number"]').val('123456')}, 500);
// _.delay(function(){ $('#mobile-provider-form').submit()}, 500);
// _.delay(function(){ $('#code-confirm-form').submit()}, 500);

// _.delay(function(){ $('li.hm_passport').click()}, 900);
// _.delay(function(){ $('#passport-form input[name="edit-passport-number"]').val("09877512")}, 1100);
// _.delay(function(){ $('#passport-form input[name="edit-passport-name"]').val("Joe Bloggs")}, 1100);
// _.delay(function(){ $('#passport-form').submit()}, 1200);
// _.delay(function(){ $('#passport-form').submit()}, 1300);
// _.delay(function(){ $('li.bank').click()}, 1350);
// _.delay(function(){ $('#passport-form').submit()}, 1400);
// _.delay(function(){ $('#bank-login-form').submit()}, 1450);

// _.delay(function(){ $('.link_to_idp_connection .button').click()}, 1500);
// _.delay(function(){ $('.link_to_idp_connection a.button').click()}, 1550);
// _.delay(function(){ $('.connection_builder a.button').click()}, 1900);


});




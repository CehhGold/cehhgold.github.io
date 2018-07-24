$(document).ready(function(){
  $('#submit-form').submit(function(e) {
    e.preventDefault(); 
  });

  $('#signature').on('keyup',function() {
    if(/^0x[0-9a-fA-F]{130}$/.test($(this).val())) {
      $(this).addClass('is-valid');
      $(this).removeClass('is-invalid');
      $('#submit-button').removeClass('disabled');

    } else {
      $(this).removeClass('is-valid');
      $(this).addClass('is-invalid');
      $('#submit-button').addClass('disabled');
    }
  });

  particlesJS.load('particles-js', './particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
  });

  var Web3 = require('web3');

  if (typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/metamask"));
  }

  web3.eth.getAccounts(function(e,v){
    if(e) {
      console.log(e)
    } else {
      web3.eth.defaultAccount = v[0];
    }
    
    if(web3.eth.defaultAccount){
      $('#web3-status').addClass('badge-success');
      $('#web3-status').removeClass('badge-error');
      $('#web3-status').text('web3 active');
    } else {
      $('#web3-status').addClass('badge-warning');
      $('#web3-status').removeClass('badge-error');
      $('#web3-status').text('web3 inactive');
    }
  });

  var CehhGold = web3.eth.contract(abi).at('0xAb8ea41e0D433E89fC4aa564ef46667c08587A2E');

  $('#submit-button').on('click',function() {
    const sig = $('#signature').val();
    if(/^0x[0-9a-fA-F]{130}$/.test(sig)) {
      CehhGold.claimWithSignature(sig, function(err, ans){
      }) 
    } else {
      window.alert('Invalid signature format. The signature must begin with 0x and be 132 characters long in total.')
    }
  });
});


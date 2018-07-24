$(document).ready(function(){
  $('#submit-form').submit(function(e) {
    e.preventDefault(); 
  });
  
  $('#signature').on('keyup',function() {
    if(/^0x[0-9a-fA-F]{130}$/.test($(this).val())) {
      $(this).addClass('is-valid');
      $(this).removeClass('is-invalid');
      
    } else {
      $(this).removeClass('is-valid');
      $(this).addClass('is-invalid');
    }
  });
});                      

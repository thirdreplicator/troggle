$(function() {
  // .troggle( model_string, attribute_string, [plural form of model string] )
  //
  // Description: This JQuery plugin is for toggling a Ruby on Rails 2.x attribute
  // It assumes Rails 2.x with authenticity token checking on.
  // It should work for any model and attribute with a standard REST update function.
  // For models with irregular plural forms, the irregular plural can be passed in
  // as a third argument.  
  // Required fields set in the Rails view:
  //
  // AUTH_TOKEN: the rails authenticity token must be set in a javascript tag. 
  // iid:   the integer id of the model instance must be set on the displaying div tag
  // value: model.attribute must be set on the displaying div tag
  //
  // 
  // Example:
  //  <script type='javascript'>var AUTH_TOKEN = #{form_authenticity_token.inspect};</script>
  //  <div iid='3' value='true'></div>  
  //  <div iid='4' value='false'></div>  
  //  $('.toggle_publish').troggle("user", "publish");

  jQuery.fn.troggle = function (m, a, plural) {
    return this.each(function() {
      $(this).click(function() {
        $(this).fadeOut();
        if (plural == undefined)
          var plural = m + 's';
        var iid = $(this).attr('iid');
        var current_value = $(this).attr('value');
        var new_value;
        if (current_value == 'true'){
          new_value = 'false';
        }else{
          new_value = 'true';
        }
        var clicked_elt = this;
        // Build the rails form name for the attribute.
        var form_attribute_name = m + "[" + a + "]";
        // Set Rails specific variables.
        var post_vars = { '_method': 'PUT', 'authenticity_token': encodeURIComponent(AUTH_TOKEN) };
        post_vars[form_attribute_name] = new_value;
        $.post('/' + plural + '/' + iid, post_vars, function(data){
          if (data[m][a]){
            $(clicked_elt).attr('value', 'true');
            $(clicked_elt).html('Yes');
          }else {
            $(clicked_elt).attr('value', 'false');
            $(clicked_elt).html('No');
          }
          $(clicked_elt).fadeIn();
        }, 'json');
      });
    });
  };
});

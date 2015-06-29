var app = app || {};

app.ColorPickerView = Backbone.View.extend({
  el: $('.color-picker'),
  events : {
      "change" :"changed"
  },
  initialize : function() {
    this.render();
  },
  render : function () {
    // this.$el.detach();
    $('.color-picker')
    .append('<h1> Select Color</h1><select><option value="#f43377">Red</option><option value="#3960FA">Blue</option><option value="#10E822">Green</option></select>');
  },
  changed: function(){
    var color= $('select option:selected').val();
    $('head').append('<style>.line {stroke:'+color+';}</style>');
  }
});
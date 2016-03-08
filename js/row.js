// Row object
Row.prototype = {
  init: function() {
    var obj = this;

    obj.addRow();
    obj.removeRowsBtns();
  },
  addRow: function() {
    // add row when button clicked
    var obj = this;
    var i = 1;
    obj.r.on('click','button.btn--green' , function() {
      obj.createRow(i).appendTo('.advanced-search__select-area');  
      i++;
    });
  },
  removeRowsBtns: function() {
    // remove all category buttons and rows
    var obj = this;

    obj.r.on('click','#remove-all' , function() {
      obj.r.find('.categories-wrap li').remove();
      obj.r.find('.advanced-search__select-row').remove();
    });
  },
  addRemoveBtn: function(dd) {
    // create remove btn
    var btn = $('<div/>')
        .addClass('remove btn')
        .text('x')
        .appendTo(dd);
  },
  removeRow: function(rw) {
    // function to delete row
    rw.on('click','.remove' , function() {
      $(this).parents(':eq(1)').remove();
    });
  },
  createRow: function(num) {
    // function to create row element and initial .dropdown item
    var row = $('<div/>')
        .addClass('advanced-search__select-row clearfix');
    var dd = DropDown.prototype.createDdDiv();
    var rowWrap = $('<div/>')
        .addClass('select-row-wrap');
    var span = DropDown.prototype.createDdSpan();
    var list = DropDown.prototype.createDdMenu();
    var reg = DropDown.prototype.createDdLi('reg-date', 'Registration date');
    var user = DropDown.prototype.createDdLi('usergroup', 'Usergroup');

    reg.appendTo(list);
    user.appendTo(list);
    span.appendTo(dd);
    list.appendTo(dd);
    dd.appendTo(rowWrap);
    rowWrap.appendTo(row);
    return row;
  }
};


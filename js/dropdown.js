// DropDown object
DropDown.prototype = {
  initEvents : function() {
    var obj = this;

    // Toggle showing dropdown menu
    obj.dd.on('click', '.dropdown', function(event) {
      $(this).toggleClass('active');
      event.stopPropagation();
    }); 
  },
  liClick: function() {
    // function to change span text when dropdown
    // li is clicked
    var obj = this;

    obj.dd.on('click', '.dropdown li', function(e) {
      var li = $(this);
      var div = li.parents(':eq(1)');
      var row = li.parents(':eq(3)').find('.select-row-wrap');
      var span = div.find('span');
      var liText = li.text();
      var linkId = li.find('a').attr('id');

      // check to see if it an li with 
      // checkboxes
      if (li.is('.li-checkboxes')) {
        e.stopPropagation();
      } else {
        // no checkboxes and continue building
        e.preventDefault();
        span.text(liText);
        obj.whichDropdown(linkId, row, div);
      }
    });
  },
  whichDropdown: function(ddId, elem, rm) {
    // function to decide which 
    // dropdown to create
    var obj = this;

    switch (ddId) {
      // If it is to create a registration filter
      case 'reg-date':
      case 'menu--reg-date':
        var whenDateArr = ['before', 'after', 'on'];
        obj.removeSiblings(rm);
        obj.addDropDown(elem, whenDateArr);
        break;

      // create second part filter for registration  
      case 'menu--before':
      case 'menu--after':
      case 'menu--on':
        obj.calendarDropdown(elem);
        Row.prototype.addRemoveBtn(elem);
        Row.prototype.removeRow(elem);
        addCatBtn('Registration', elem);
        removeCatBtn(elem);
        break;

      // If it is to create a usergroup filter
      case 'usergroup':
      case 'menu--usergroup':
        obj.removeSiblings(rm);
        DdCheckbox.prototype.addDdCheckboxes(elem);
        Row.prototype.addRemoveBtn(elem);
        Row.prototype.removeRow(elem);
        addCatBtn('User', elem);
        removeCatBtn(elem);
        break;
    }
  },
  createDdLi: function(liId, liText) {
    // create dropdown li
    var obj = this;

    liText = liText || liId;
    var li = $('<li/>');
    var liLink = $('<a/>')
        .attr('id', 'menu--'+liId)
        .text(liText);
    liLink.appendTo(li);
    return li;
  },
  createDdMenu: function() {
    // create inner .dropdown ul.dropdown__menu 
    var list = $('<ul/>')
        .addClass('dropdown__menu');
    return list;
  },
  createDdDiv: function() {
    // create div wrapper for .dropdown
    var div = $('<div/>')
        .addClass('dropdown gradient-gray-bg');
    return div;
  },
  createDdSpan: function(spanTxt) {
    // create span element for .dropdown 
    spanTxt = spanTxt || 'Choose:';
    var span = $('<span/>')
        .text(spanTxt);
    return span;
  },
  calendarDropdown: function(el) {
    // dropdown for calendar
    var obj = this;

    var div = obj.createDdDiv();
    var span = obj.createDdSpan();
    var list = obj.createDdMenu();
    var li = $('<li/>');

    var datepicker = $('<div/>')
        .addClass('datepicker-here')
        .attr('data-language', 'en');

    datepicker.appendTo(li);
    li.appendTo(list);
    span.appendTo(div);
    list.appendTo(div);

    div.appendTo(el);

    // initialize datepicker
    $('.datepicker-here').datepicker({
      onSelect: function onSelect(fd) {
        // put selected date to span text
        span.text(fd);
      }
    });
  },
  addDropDown: function(el, items) {
    // create dropdown ul
    var obj = this;

    var div = obj.createDdDiv();
    var span = obj.createDdSpan();
    var list = obj.createDdMenu();

    $.each(items, function(i) {
        obj.createDdLi(this).appendTo(list);
    });

    span.appendTo(div);
    list.appendTo(div);
    div.appendTo(el);
  },
  removeSiblings: function(rs) {
    // remove sibling .dropdown 
    rs.siblings().remove();
  }
};
// End DropDown object

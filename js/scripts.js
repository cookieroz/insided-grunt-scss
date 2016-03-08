// create category button
function createCatBtn(btnText, el) {
  var li = $('<li/>');
  var btn = $('<button/>')
      .addClass('btn btn--gradient gradient-gray-bg');
  var iconBtn = $('<i/>')
      .addClass('fa fa-times')
      .text(btnText);

  iconBtn.appendTo(btn);

  // connect button to row
  btn.on('click', function() {
    // remove row
    el.parent().remove();
  });
  btn.appendTo(li);

  return li;
}

// add category button
function addCatBtn(txt, el) {
  createCatBtn(txt, el).appendTo($('.categories-wrap ul'));
}

// remove category button
function removeCatBtn(el) {
  $('.content').on('click','.categories-wrap button' , function() {
    $(this).parent().remove();
  });
}


// create new objects
$(function() {
  var contentElem = $('.content');
  var dd = new DropDown(contentElem);
  var ddCh = new DdCheckbox(contentElem);
  var r = new Row(contentElem);
});

function DropDown(el) {
  this.dd = el;
  this.initEvents();
  this.liClick();
}

function DdCheckbox(el) {
  this.ddCh = el;
  this.init();
}

function Row(el) {
  this.r = el;
  this.init();
}

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


// Dropdown Checkboxes object
DdCheckbox.prototype = {
  init: function() {
    var obj = this;
    var theCheckboxes = '.dd-checkboxes__group input:checkbox';

    obj.ddCheckUncheck('#dd-check-all', theCheckboxes, true);
    obj.ddCheckUncheck('#dd-uncheck-all', theCheckboxes, false);
    obj.checkboxAllResults();
    obj.checkboxResults();
  },
  addDdCheckboxes: function(elem) {
    // create dropdown checkboxes for usergroup
    var obj = this;

    var div = DropDown.prototype.createDdDiv();
    var span = DropDown.prototype.createDdSpan();
    var list = DropDown.prototype.createDdMenu();
    var li = $('<li/>')
        .addClass('li-checkboxes');
    var wrap = $('<div/>')
        .addClass('dd-checkboxes');

    obj.ddCheckAllDiv().appendTo(wrap);
    // loop through 3 groups
    for (var i = 1; i < 4; i++) {
        obj.ddCheckGroup([i]).appendTo(wrap);
    }

    wrap.appendTo(li);
    li.appendTo(list);
    list.appendTo(div);
    span.appendTo(div);
    div.addClass('dropdown--user-options');

    div.appendTo(elem);
  },
  ddCheckGroup: function(num) {
    // create checkboxes group
    var obj = this;

    var divGroup = $('<div/>')
        .addClass('dd-checkboxes__group');
    var pTag = $('<p/>')
        .text('Group '+ num)
        .appendTo(divGroup);

    // loop through 3 groups
    for (var i=1; i<4; i++) {
      obj.ddCheckbox(num, [i]).appendTo(divGroup);
    }

    return divGroup;
  },
  ddCheckbox: function(group, check) {
    // create actual checkbox
    var obj = this;
    var divCheckbox = $('<div/>')
        .addClass('group__checkbox');
    var chkbox = $('<input type="checkbox">')
        .attr('id', 'group'+group+'__checkbox-'+check)
        .appendTo(divCheckbox);
    var label = $('<label/>')
        .attr('for', 'group'+group+'__checkbox-'+check)
        .text('Option #'+check+'for group'+group)
        .appendTo(divCheckbox);
    return divCheckbox;
  },
  ddCheckAllDiv: function() {
    // create check all links for dropdown checkboxes
    var obj = this;

    var divCheck = $('<div/>')
        .addClass('dd-check-links');
    var checkLink = $('<a/>')
        .attr('id', 'dd-check-all')
        .text('Check all').appendTo(divCheck);
    var uncheckLink = $('<a/>')
        .attr('id', 'dd-uncheck-all')
        .text('Uncheck all').appendTo(divCheck);

    return divCheck;
  },
  ddCheckUncheck: function(id, boxes, tf){
    // Check all checkboxes  or uncheck them
    var obj = this;

    obj.ddCh.on('click', id, function(e) {
      $(boxes).prop('checked', tf);
    });
  },
  ifChecked: function(el, rowClass, highlight) {
    // function to add/remove class on grandparent element if 
    // checkbox is checked
    var $check = $(el),
          $div = $check.closest(rowClass);

    if ($check.prop('checked')) {
      $div.addClass(highlight);
    } else {
      $div.removeClass(highlight);
    }
  },
  unlessNoneChecked: function(ele, removeEl) {
    // function to show/hide results footer if at least one 
    // checkbox is checked
    var $checkedCount = $(ele),
        $div = $(removeEl);

    if ($checkedCount.length === 0) {
      $div.hide();   
    } else {
      $div.show();
    }
  },
  checkboxAllResults: function() {
    // checkmark all user results add highlight class 
    var obj = this;

    $("#search-results__checkbox-all").on('change',function () {
      $(".search-results-td input:checkbox").prop('checked', $(this).prop("checked"));
      obj.unlessNoneChecked('.search-results-td input:checkbox:checked', '.search-results__footer');
      obj.ifChecked('.search-results-td input:checkbox', '.search-results__row', 'checked-row');
    });
  },
  checkboxResults: function() {
    // check for individual checkbox changes
    // add highlight class 
    var obj = this;

    $(".search-results-td input:checkbox").on('change',function () {
      obj.ifChecked(this, '.search-results__row', 'checked-row');
      obj.unlessNoneChecked('.search-results-td input:checkbox:checked', '.search-results__footer');
    });
  }
};
// End Dropdown Checkboxes object


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





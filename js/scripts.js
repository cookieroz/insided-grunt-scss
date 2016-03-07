// TODOS: 
//  function to disable, enable drop 
//  downs based based on selection
//  
//  function to add rows to advanced search
//  
//  function to make red close button work
//  
//  function to create button tags
//  based on previous selections
//  in advanced search
//  
//  function to remove button tags
//  if clicked on
//  
//  function to remove all tags

// create remove btn
function addRemoveBtn(dd) {
  var btn = $('<div/>')
      .addClass('remove btn')
      .text('x')
      .appendTo(dd);
}

// function to delete row
function removeRow(r) {
  r.on('click','.remove' , function() {
    $(this).parents(':eq(1)').remove();
  });
}

// function to add row
function createRow(num) {
  var row = $('<div/>')
      .addClass('advanced-search__select-row clearfix');
  var dd = $('<div/>')
      .addClass('dropdown gradient-gray-bg');
  var rowWrap = $('<div/>')
      .addClass('select-row-wrap');
  var span = $('<span>Choose:</span>'); // refactor later
  var list = $('<ul/>')
      .addClass('dropdown__menu');
  var reg = createDropdownLi('reg-date', 'Registration date');
  var user = createDropdownLi('usergroup', 'Usergroup');

  reg.appendTo(list);
  user.appendTo(list);
  span.appendTo(dd);
  list.appendTo(dd);
  dd.appendTo(rowWrap);
  rowWrap.appendTo(row);
  return row;
}

// remove sibling dropdowns 
function removeSiblings(rs) {
    rs.siblings().remove();
}

// create category button
function createCatBtn(btnText, el) {
  var li = $('<li/>');
  var btn = $('<button/>')
      .addClass('btn btn--gradient gradient-gray-bg');
  var iconBtn = $('<i/>')
      .addClass('fa fa-times')
      .text(btnText);

  iconBtn.appendTo(btn);
  btn.on('click', function(){
    console.log(el);
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


// function to add/remove class 
// on grandparent element if 
// checkbox is checked
function ifChecked(el, rowClass, highlight) {
  var $check = $(el),
        $div = $check.closest(rowClass);

  if ($check.prop('checked')) {
    $div.addClass(highlight);
  } else {
    $div.removeClass(highlight);
  }
}

// function to show/hide results footer
// if at least one checkbox is checked
function unlessNoneChecked(ele, removeEl) {
  var $checkedCount = $(ele),
      $div = $(removeEl);

  if ($checkedCount.length === 0) {
    $div.hide();   
  } else {
    $div.show();
  }
}

// checkmark all user results
// add highlight class
$("#search-results__checkbox-all").on('change',function () {
  $(".search-results-td input:checkbox").prop('checked', $(this).prop("checked"));
  unlessNoneChecked('.search-results-td input:checkbox:checked', '.search-results__footer');
  ifChecked('.search-results-td input:checkbox', '.search-results__row', 'checked-row');
});

// check for checkbox changes
// add highlight class
$(".search-results-td input:checkbox").on('change',function () {
  ifChecked(this, '.search-results__row', 'checked-row');
  unlessNoneChecked('.search-results-td input:checkbox:checked', '.search-results__footer');
});


// add button to category

// inspired from
// http://tympanus.net/Tutorials/CustomDropDownListStyling/index3.html
// function for using ul as dropdowns
$(function() {
  var dd = new DropDown($('.content'));
  var ddCh = new DdCheckboxes($('.content'));
});

function DropDown(el) {
  this.dd = el;
  this.initEvents();
  this.liClick();
  //this.addRow();
  this.removeRowsBtns();
}
DropDown.prototype = {
  initEvents : function() {
    var obj = this;

    obj.dd.on('click', '.dropdown', function(event){
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

      if (li.is('.li-checkboxes')) {
        console.log(li.children().is('.dd-checkboxes'));
        e.stopPropagation();
      } else {
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
      case 'reg-date':
      case 'menu--reg-date':
        var whenDateArr = ['before', 'after', 'on'];
        removeSiblings(rm);
        obj.addDropDown(elem, whenDateArr);
        addCatBtn('Registration', elem);
        removeCatBtn(elem);
        break;
      case 'usergroup':
      case 'menu--usergroup':
        removeSiblings(rm);
        DdCheckboxes.prototype.addDdCheckboxes(elem);
       // obj.addDdCheckboxes(elem); // user ddCheckbox object
        addRemoveBtn(elem);
        removeRow(elem);
        addCatBtn('User', elem);
        removeCatBtn(elem);
        break;
      case 'menu--before':
      case 'menu--after':
      case 'menu--on':
        obj.calendarDropdown(elem);
        addRemoveBtn(elem);
        removeRow(elem);
        break;
    }
  },
  createDropdownLiArr: function(liId, liText) {
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
  createInnerDropdown: function(liItems, spanTxt, ulClass) {
    // create inner ul.dropdown structure
    ulClass = ulClass || 'dropdown gradient-gray-bg';
    spanTxt = spanTxt || 'Choose:';
    liItems = liItems || '';

    var obj = this;

    var div = $('<div/>')
        .addClass(ulClass);
    var span = $('<span/>')
        .text(spanTxt);
    var list = $('<ul/>')
        .addClass('dropdown__menu');
    var li = '';

    if (liItems.length > 1) {
      $.each(liItems, function(i){
        obj.createDropdownLiArr(this).appendTo(list);
      });
    } else if (ulClass === 'dropdown dropdown--user-options gradient-gray-bg') {
      var wrap = $('<div/>')
      .addClass('dd-checkboxes');
      li = $('<li/>')
      .addClass('li-checkboxes');

      ddCheckAll().appendTo(wrap);
      // loop through 3 groups
      for (var i=1; i<4; i++) {
        ddCheckGroup([i]).appendTo(wrap);
      }
      wrap.appendTo(li);
      li.appendTo(list);
    } else {
      li = $('<li/>');
      var datepicker = $('<div/>')
          .addClass('datepicker-here')
          .attr('data-language', 'en');

      datepicker.appendTo(li);
      li.appendTo(list);
    }

    span.appendTo(div);
    list.appendTo(div);
    return div;
  },
  calendarDropdown: function(el) {
    // dropdown for calendar
    var obj = this;

    var div = obj.createInnerDropdown('', 'Choose: date');

    div.appendTo(el);

    $('.datepicker-here').datepicker({
      onSelect: function onSelect(fd) {
        div.find('span').text(fd);
      }
    });
  },
  addDdCheckboxes: function(el) {
    // create dropdown checkboxes
    // for usergroup
    var obj = this;

    var div = obj
        .createInnerDropdown('', 'Select one or more', 
          'dropdown dropdown--user-options gradient-gray-bg');

    div.appendTo(el);
  },
  addDropDown: function(el, items) {
    // create dropdown ul
    var obj = this;

    var div = obj.createInnerDropdown(items);

    div.appendTo(el);
  },
  addRow: function() {
    // add row when button clicked
    var obj = this;
    var i = 1;
    obj.dd.on('click','button.btn--green' , function() {
      createRow(i).appendTo('.advanced-search__select-area'); // refactor 
      i++;
    });
  },
  removeRowsBtns: function() {
    // remove all category buttons
    // and rows
    var obj = this;
    obj.dd.on('click','#remove-all' , function() {
      obj.dd.find('.categories-wrap li').remove();
      obj.dd.find('.advanced-search__select-row').remove();
    });
  },
};

function DdCheckboxes(el) {
  this.ddCh = el;
  this.init();
}

// need to refactor DdCheckboxes

//maybe create row object
DdCheckboxes.prototype = {
  init: function() {
    var obj = this;
    obj.ddCheckAll();
    obj.ddUncheckAll();
  },
  addDdCheckboxes: function(elem) {
    // create dropdown checkboxes
    // for usergroup
    var obj = this;

    // var div = obj
    //     .createInnerDropdown('', 'Select one or more', 
    //       'dropdown dropdown--user-options gradient-gray-bg');

    // div.appendTo(el);
    var div = $('<div/>')
        .addClass('dropdown dropdown--user-options gradient-gray-bg');
    var wrap = $('<div/>')
        .addClass('dd-checkboxes');
    var span = $('<span>Choose:</span>'); // refactor later
    var list = $('<ul/>')
        .addClass('dropdown__menu');
    var li = $('<li/>')
        .addClass('li-checkboxes');

    obj.ddCheckAllDiv().appendTo(wrap);
    // loop through 3 groups
    for (var i = 1; i < 4; i++) {
        obj.ddCheckGroup([i]).appendTo(wrap);
    }
    wrap.appendTo(li);
    li.appendTo(list);
    list.appendTo(div);
    span.appendTo(div);

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
    // create check all links
    // for dropdown checkboxes
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
  ddCheckAll: function(){
    // Check all checkboxes in 
    // dropdownlist
    $('.content').on('click','#dd-check-all', function(e) {
      $(".dd-checkboxes__group input:checkbox").prop('checked', true);
    });
  },
  ddUncheckAll: function(){
    // Uncheck all checkboxes in 
    // dropdownlist
    $('.content').on('click','#dd-uncheck-all', function(e) {
      $(".dd-checkboxes__group input:checkbox").prop('checked', false);
    });
  }
};



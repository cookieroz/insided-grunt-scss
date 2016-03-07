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
//  



// add span to dropdown list
function addSpan(txt, elem) {
  $(txt).prependTo(elem);
}

// create inner dropdown menu
function createDropdownLi(liId, liText) {
  liText = liText || liId;
  var li = $('<li/>');
  var liLink = $('<a/>')
      .attr('id', 'menu--'+liId)
      .text(liText);
  liLink.appendTo(li);
  return li;
}

// find a way to connect these two

// create dropdown ul
function addDropDown(el, items) {

  var div = $('<div/>')
      .addClass('dropdown gradient-gray-bg');
  var span = $('<span>Choose:</span>');
  var list = $('<ul/>')
      .addClass('dropdown__menu');
  //var testLi = $('<li><a href="#">before</a></li>');
  $.each(items, function(i){
    createDropdownLi(this).appendTo(list);
  });

  //testLi.appendTo(list);
  list.appendTo(div);
  span.appendTo(div);

  div.appendTo(el);
  //console.log(el);
}

// create check all links
// for dropdown checkboxes
function ddCheckAll() {
  var divCheck = $('<div/>')
      .addClass('dd-check-links');
  var checkLink = $('<a/>')
      .attr('id', 'dd-check-all')
      .text('Check all').appendTo(divCheck);
  var uncheckLink = $('<a/>')
      .attr('id', 'dd-uncheck-all')
      .text('Uncheck all').appendTo(divCheck);
  return divCheck;
}

// create actual checkbox
function ddCheckbox(group, check) {
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
}

// create checkboxes group
function ddCheckGroup(num) {
  var divGroup = $('<div/>')
      .addClass('dd-checkboxes__group');
  var pTag = $('<p/>')
      .text('Group '+ num)
      .appendTo(divGroup);

  // loop through 3 groups
  for (var i=1; i<4; i++) {
    ddCheckbox(num, [i]).appendTo(divGroup);
  }

  return divGroup;
}

// create dropdown checkboxes
// for usergroup
function addDdCheckboxes(el) {
  var div = $('<div/>')
      .addClass('dropdown dropdown--user-options gradient-gray-bg');
  var wrap = $('<div/>')
      .addClass('dd-checkboxes');
  var span = $('<span>Choose:</span>'); // refactor later
  var list = $('<ul/>')
      .addClass('dropdown__menu');
  var li = $('<li/>')
      .addClass('li-checkboxes');

  ddCheckAll().appendTo(wrap);
  // loop through 3 groups
  for (var i=1; i<4; i++) {
    ddCheckGroup([i]).appendTo(wrap);
  }
  wrap.appendTo(li);
  li.appendTo(list);
  list.appendTo(div);
  span.appendTo(div);

  div.appendTo(el);
}

// dropdown for calendar
function calendarDropdown(el) {
  var div = $('<div/>')
      .addClass('dropdown gradient-gray-bg');
  var span = $('<span>Choose date:</span>'); // refactor later
  var list = $('<ul/>')
      .addClass('dropdown__menu');
  var li = $('<li/>');
  var datepicker = $('<div/>')
      .addClass('datepicker-here')
      .attr('data-language', 'en');

  datepicker.appendTo(li);
  li.appendTo(list);
  span.appendTo(div);
  list.appendTo(div);

  div.appendTo(el);
  $('.datepicker-here').datepicker({
    onSelect: function onSelect(fd) {
    span.text(fd);
  }
  });
}

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

// add row when button clicked
function addRow() {
  var i = 1;
  $('.advanced-search').on('click','button.btn--green' , function() {
    createRow(i).appendTo('.advanced-search__select-area');
    i++;
    //return false;
  });
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
    //console.log($(this).parents(':eq(5)'));
    //.closest(el)
    //el.parents(':eq(1)').remove();
  });
}

// remove all category buttons
// and rows
function removeRowsBtns() {
  $('.content').on('click','#remove-all' , function() {
    $('.content').find('.categories-wrap li').remove();
    $('.content').find('.advanced-search__select-row').remove();
  });
}

// function to decide which 
// dropdown to create
function whichDropdown(ddId, elem, rm) {
  var chosenDropdown;
  switch (ddId) {
    case 'reg-date':
    case 'menu--reg-date':
      var whenDateArr = ['before', 'after', 'on'];
      removeSiblings(rm);
      addDropDown(elem, whenDateArr);
      console.log(rm);
      break;
    case 'usergroup':
    case 'menu--usergroup':
      removeSiblings(rm);
      addDdCheckboxes(elem);
      addRemoveBtn(elem);
      removeRow(elem);
      addCatBtn('User', elem);
      removeCatBtn(elem);
      break;
    case 'menu--before':
    case 'menu--after':
    case 'menu--on':
      calendarDropdown(elem);
      addRemoveBtn(elem);
      removeRow(elem);
      break;
  }
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

$('.content').on('click','#dd-check-all', function(e) {
  //e.preventDefault();
  console.log('check');
  $(".dd-checkboxes__group input:checkbox").prop('checked', true);
});

$('.content').on('click','#dd-uncheck-all', function(e) {
  //e.preventDefault();
  console.log('uncheck');
  $(".dd-checkboxes__group input:checkbox").prop('checked', false);
});


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
  addRow();
  removeRowsBtns();
});

function DropDown(el) {
  this.dd = el;
  this.initEvents();
  this.liClick();
}
DropDown.prototype = {
  initEvents : function() {
    var obj = this;

    obj.dd.on('click', '.dropdown', function(event){
      $(this).toggleClass('active');
      event.stopPropagation();
    }); 
  },
  logTest: function(){
    console.log('test');
  },
  liClick: function() {
    // function to change span text when dropdown
    // li is clicked
    var obj = this;

    obj.logTest();
    obj.dd.on ('click', '.dropdown li', function(e) {
      var li = $(this);
      var div = li.parents(':eq(1)');
      var row = li.parents(':eq(3)').find('.select-row-wrap');
      var span = div.find('span');
      var liText = li.text();
      var linkId = li.find('a').attr('id');

      if (li.is('.li-checkboxes')) {
        console.log(li.children().is('.dd-checkboxes'));
        //li.unbind(e);
        e.stopPropagation();
      } else {
        e.preventDefault();
        span.text(liText);
        //addDropDown(row, linkId);
        whichDropdown(linkId, row, div);
      }

      console.log(linkId);
      console.log(li.is('.li-checkboxes'));
      
    });
  }
};



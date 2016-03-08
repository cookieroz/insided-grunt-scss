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

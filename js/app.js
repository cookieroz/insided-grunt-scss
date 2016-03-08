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



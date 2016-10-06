
var tinydiff = require('../../../build/tinydiff');

exports.onp = function(test) {

  function onp(a, b) {
    return tinydiff.createDiff().onp(
        tinydiff.createStringDiffComparable(a, b) );
  }

  test.equal(onp('a', 'a'), 0);
  test.equal(onp('a', 'aaa'), 2);
  test.equal(onp('aba', 'aca'), 2);
  test.equal(onp('aaa', 'bbb'), 6);
  test.equal(onp('aaa', ''), 3);
  test.equal(onp('abc', 'bc'), 1);
  test.equal(onp('abc', 'ac'), 1);
  test.equal(onp('an apple.', 'a maple.'), 3);
  test.done();
};

exports.diff = function(test) {

  function diff_(l, r) {

    var target = tinydiff.createStringDiffComparable(l, r);

    var editor = tinydiff.createPathEditor(target);

    editor.insertLeft = function(posLeft, beginRight, endRight) {
      console.log('+' + posLeft + ',' + beginRight + '~' + endRight);
      tmpL = tmpL.substring(0, posLeft) +
        r.substring(beginRight, endRight) +
        tmpL.substring(posLeft);
    };

    editor.removeLeft = function(beginLeft, endLeft) {
      console.log('-' + beginLeft + '~' + endLeft);
      tmpL = tmpL.substring(0, beginLeft) + 
        tmpL.substring(endLeft);
    };

    editor.insertRight = function(posRight, beginLeft, endLeft) {
      tmpR = tmpR.substring(0, posRight) +
        l.substring(beginLeft, endLeft) +
        tmpR.substring(posRight);
    };

    editor.removeRight = function(beginRight, endRight) {
      tmpR = tmpR.substring(0, beginRight) + 
        tmpR.substring(endRight);
    };

    console.log('[' + l + '] => [' + r + ']');

    var tmpR = r;
    var tmpL = l;

    // before edit
    test.equal(l, tmpL);
    test.equal(r, tmpR);

    var diff = tinydiff.createDiff();
    diff.onp(target);
    diff.trace(editor);

    // after edit
    // l to r, r to l
    test.equal(l, tmpR);
    test.equal(r, tmpL);
  }

  function diff(l, r) {
    diff_(l, r);
    if (l !== r) {
      diff_(r, l);
    }
  }

  diff('', '');
  diff('aaa', 'aaa');
  diff('aaa', 'bbb');
  
  diff('aba', 'bab');
  diff('aaa', 'aab');
  diff('aab', 'aaa');

  diff('aba', 'abab');
  diff('bab', 'aaba');
  diff('aaa', 'aaab');
  diff('aab', 'aaaa');

  diff('aaba', 'bab');
  diff('abab', 'aba');
  diff('aaaa', 'aab');
  diff('aaab', 'aaa');

  diff('baba', 'bab');
  diff('bbab', 'aba');
  diff('baaa', 'aab');
  diff('baab', 'aaa');

  diff('vvaxa', 'xffxf');

  diff('here is an apple.', 'here comes a maple.');

  test.done();
};

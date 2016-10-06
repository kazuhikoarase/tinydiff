$(function() {

  var update = function() {

    var split = (s : string) => s.replace(/\s+$/g, '').split(/\r?\n/g);
    var lLines = split($('#lText').val() );
    var rLines = split($('#rText').val() );

    var target = tinydiff.createListDiffComparable(lLines, rLines);
    var lPos = lLines.length;
    var rPos = rLines.length;

    var result : [number, number][] = [];

    var diff = tinydiff.createDiff();
    diff.onp(target);
    diff.trace({
      trace : function(deltaX, deltaY) {
        if (deltaX == 0) {
          for (var i = 0; i < deltaY; i += 1) {
            rPos -= 1;
            result.push([null, rPos]);
          }
        } else if (deltaY == 0) {
          for (var i = 0; i < deltaX; i += 1) {
            lPos -= 1;
            result.push([lPos, null]);
          }
        } else {
          for (var i = 0; i < deltaX; i += 1) {
            lPos -= 1;
            rPos -= 1;
            result.push([lPos, rPos]);
          }
        }
      }
    } );
    result.reverse();

    // update result table.
    $('#result').children().remove();
    $.each(result, function(i, item) {
      var className = item[0] == null? 'rightOnly' :
        item[1] == null? 'leftOnly' : 'both';
      var l = item[0] != null? lLines[item[0]] : '';
      var r = item[1] != null? rLines[item[1]] : '';
      $('#result').append($('<tr></tr>').addClass(className).
        append($('<td></td>').text(l + '\u00a0') ).
        append($('<td></td>').text(r + '\u00a0') ) );
    });
  };

  $('#lText, #rText').on('keyup', function(event) {
    update();
  } );
});

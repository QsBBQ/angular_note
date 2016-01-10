angular.module("myDirectives", [])
.directive('notepad', function(notesFactory) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {
      scope.restore = function() {
        scope.editMode = false;
        scope.index = -1;
        scope.noteText = '';
      };
      scope.openEditor = function(index) {
        scope.editMode = true;

        if (index !== undefined) {
          scope.noteText = notesFactory.get(index).content;
          scope.index = index;
        } else {
          scope.noteText = undefined;
        }
      };
      scope.save = function() {
        if (scope.noteText !== '') {
          var note = {};

          note.title = scope.noteText.length > 10 ? scope.noteText.substring(0, 10) + '. . .' : scope.noteText;
          note.content = scope.noteText;
          note.id = scope.index != -1 ? scope.index : localStorage.length;
          scope.notes = notesFactory.put(note);
        }
        scope.restore();
      };
      var editor = elem.find('#editor');

      scope.restore();  // initialize our app controls
      scope.notes = notesFactory.getAll(); // load notes

      editor.bind('keyup keydown', function() {
        scope.noteText = editor.text().trim();
      });
    },
    templateUrl: 'templates/directives/templateurl.html'
  };
});

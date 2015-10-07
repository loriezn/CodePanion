$(function() {

  var gh_username, gh_pas, gh_url, gh_path, gh_path_len, gh_commit_msg, gh_path_pieces, gh_data;

  $('#gh-commit-changes').click(function(e) {
    e.preventDefault();

    gh_username = $('#gh-username').val();
    gh_pas = $('#gh-pas').val();
    gh_url = $('#gh-url').val();
    gh_path = $('#gh-path').val();
    gh_commit_msg = $('#gh-commit-msg').val();
    gh_path_pieces = gh_path.split('/');
    gh_path_len = gh_path_pieces.length;

    //spell out the path
    var _path = '';
    for (var i = 2; i < gh_path_len; i++) {
      if (i === (gh_path_len - 1)) {
        _path += gh_path_pieces[i];
      } else {
        _path += gh_path_pieces[i] + "/";
      }
    }

    $.ajax({
      url: gh_url
    }).success(function(data) {

      gh_data = data;

      var github = new Github({
        token: gh_pas,
        auth: 'oauth'
      });

      var repo = github.getRepo(gh_username, gh_path_pieces[0]);

      repo.write(gh_path_pieces[1], _path, gh_data, gh_commit_msg, function(err) {
        $('#data_dump').text(err || gh_data);
      });

    });

  });

});
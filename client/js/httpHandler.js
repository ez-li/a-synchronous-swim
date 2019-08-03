(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  // Get request
  // pull data from the server
  //

  const getCommand = () => {
    $.get(serverUrl, (data) => {SwimTeam.move(data)});
  };

  const getBackground = () => {
    $.get(serverUrl+'/background.jpg', (data) => {console.log(data)});
  };

  // const getBackground= () => {
  //   $.ajax({
  //     url: serverUrl,
  //       type: "GET",
  //       // dataType:"image/jpg",
  //       success: function(data) {
  //         console.log(data);
  //         /* alert(data); */
  //           // $("#imgalign").html('<img src="' + data + '" />');
  //     }
  //   });
  //   // $.get(serverUrl, (data) => {console.log(data)});
  // };

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (url) => {
        document.getElementsByClassName('background').style.backgroundImage = url(url);
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  // setInterval(getCommand,500);
  setInterval(getBackground,500);

  $('form').on('submit', function(e) {
    e.preventDefault();
    // getCommand();
    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

})();

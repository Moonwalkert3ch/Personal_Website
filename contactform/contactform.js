jQuery(document).ready(function($) {
  "use strict";

  // Contact Form Submission
  $('#sendMessageButton').on('click', function(event) {
    event.preventDefault(); // Prevent default button behavior

    var f = $('.contactForm').find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // Validate all inputs
      var i = $(this); // Current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // Error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    f.children('textarea').each(function() { // Validate textareas
      var i = $(this); // Current textarea
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // Error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    if (ferror) return false; // Stop if there are errors

    // Send email using sendMail function
    sendMail();
  });

  // Send email using EmailJS
  function sendMail() {
    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var messageField = document.getElementById("message");

    if (!nameField || !emailField || !messageField) {
      console.error("Form fields are missing");
      return;
    }

    var params = {
      name: nameField.value,
      email: emailField.value,
      message: messageField.value,
    };

    const serviceID = "service_ifn11gd";
    const templateID = "template_f27lgpl";

    emailjs.send(serviceID, templateID, params)
      .then(res => {
        nameField.value = "";
        emailField.value = "";
        messageField.value = "";
        console.log(res);
        alert("Your message sent successfully!!");
      })
      .catch(err => console.log(err));
  }
});

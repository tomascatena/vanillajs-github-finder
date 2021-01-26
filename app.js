// Init Github
const github = new Github();
// Init UI
const ui = new UI();

// Search input
const serachUser = document.getElementById('searchUser');

let delayTimer;
function doSearch(text) {}
// Search inputs event listener
serachUser.addEventListener('keyup', (e) => {
  clearTimeout(delayTimer);
  delayTimer = setTimeout(function () {
    // Get input text
    const userText = e.target.value.trim();

    if (userText !== '') {
      // Make http call
      github
        .getUser(userText)
        .then((data) => {
          if (data.profile.message === 'Not Found') {
            // Show alert
            ui.showAlert('User not found', 'alert alert-danger');
          } else {
            // Show the profile
            ui.showProfile(data.profile);
            ui.showRepos(data.repos);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      // Clear the profile
      ui.clearProfile();
    }
  }, 500);
});

<b>Project Title</b>

Displaying a list of repositories from gitHub.

[DEMO-LINK](https://bogdan-kotsupey.github.io/git-api/)

<b>Description</b>

When you enter a user's name, a list of their repositories is displayed with the name and photo of the author.

When you click on the name of the repository, go to the page with detailed information about the repository.

<b>Local development</b>

<b>Dependencies</b>

Node v12.16.3 and higher
NPM v6.14.4 and higher

<b>Installing</b>

Fork and clone this repository
Run npm install in your terminal
Run npm start


<b>Task:</b> 

Application should use githab API and have 2 pages:
- list of repositories of the specific user
- detailed page of selected repository

List of repositories page should have:
- List of repositories of specific githab user
- Each repository have title, details, last update date, rating
- Repositories filter as text field (filter should work on client side)
- Dropdown, which allows to sort list by date and title
- Author picture and name
- Redirect to details page by clicking on title
- Repository list call should performs only once. When page opens second time, this call shouldn't be performed

Details page should have:
- Details
- Tags
- README.md
- Ability to download zip archive
- Details text should be editable
- In case if user update details, not save and close browser tab, details in edit mode should show last unsaved version, and also warning message, which describes that last updates wasn't saved

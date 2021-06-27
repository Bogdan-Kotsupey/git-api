[DEMO-LINK](https://bogdan-kotsupey.github.io/git-api/)

Task : 

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

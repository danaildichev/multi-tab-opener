# multi-tab-opener

## Features
- Copy/Paste or type entries into a text area
  - Manually
  - Or with Paste button
- Open multiple tabs with the press of button
  - Open in reverse order
  - Replace the multi-tab-opener itself with the first entry
- Prepend entries with "", "https://", or "http://"
- Optional timed delay for opening tabs
  - Toggle on or off
  - Change delay value with:
    - Number input field
    - Slider
  - Dismissable warning for low delay values
    - Also a button to automatically fix low delay values
- Clear entries
- At run time
  - Ignores blank lines in URL entries
  - Strips whitespace from URL entries
  
## To Do
- Open in batches
  - Be able to open/close a particular batch from the MTO
- Test Bed
  - Send an HTTP request to each URL entry to determine reachability
  - Display pass/fail test progress as a loading bar or some other UI
  - Display results of tests
  - Open all URLs that passed test
  - Open individual URLs that passed test
- Add/Remove URL groups in local storage
  - UI for managing data in local storage
  - Be able to save options along with group
- Additional paste actions for URL entries
  - Prepend
  - Append
- Advanced UI for managing URL entries
  - CRUD
  - Rearrange with:
    - Up and down buttons
    - Click and drag
- Add UI for hints/explanations
- Be able to save your own default options

## R&D
- Get all URLS of other currently open tabs

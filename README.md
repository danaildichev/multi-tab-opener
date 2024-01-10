# Multi Tab Opener

![Static Badge](https://img.shields.io/badge/version-2-blue)

Time released links with options and storage. It's like bookmarks on steroids.

Unlike bookmarks, with the `Multi Tab Opener`you can control how fast your list of links will open. Instead of shocking your bandwidth with opening 10, 20, 30, or more URLS all at once- the Multi Tab Opener will slowly open each link one at a time in a new tab. You can also save and edit lists of links to your browser's local storage.

## Table of Contents

- [Live Demo](#live-demo)
- [Install](#install)
- [Usage](#usage)
	- [Main Screen](#main-screen)
	- [Main Screen Options](#main-screen-options)
	- [Storage](#storage)
- [API](#api)
- [Issues](#issues)
- [Contributing](#contributing)
- [To Do](#to-do)
- [License](#license)

## Live Demo
[https://danaildichev.net/portfolio/tools-apps/multi-tab-opener](https://danaildichev.net/portfolio/tools-apps/multi-tab-opener)

## Install

 - Clone this repo
 - Open `index.html`in a browser

## Usage

### Main screen

- Copy/paste a list of links into the URL textarea. One on each line.
- Press the 'Open' and then each link will open in a new tab.

### Main Screen Options

1. Millisecond delay
	- how long `MTO` will wait before opening the next link in the list

2. Protocol
	- Specify if you want the `MTO` to use http:// or https://
	- This setting does not overwrite what's in the URL textarea (yet)

3. Replace this tab with the first entry
	- The tab that the `MTO` is open in will replace itself with the first entry from the URL textarea

4. Open in reverse order
	- Opens URL entries in reverse order

5. Paste
	- Pastes whatever is in your clipboard into the URL textarea
	- There is a dropdown on the Paste button for appending or prepending clipboard contents to whatever is currently in the URL textarea

6. Clear
	- Removes any text from the URL textarea

### Storage

Uses the browser's local storage. If there are no URL lists saved, there will be an 'Add' button which brings up a form to save a URL list and give it a group name and description.

When there are 1 or more saved URL lists in storage you will be able to see:

1. The Actions & Stats section
2. Each saved URL list.

The Actions & Stats section will tell you how much of your local storage is being used- in KB and as a percentage of the total amount of storage your browser permits a domain to have. You can also add or remove URL lists. The `MTO` does not have the ability to edit a URL list yet. You can delete and recreate a list, or go into your browser's local storage and edit the JSON.

For each saved URL group you can copy the list, load the list in the textarea of the main screen, or open each link individually.

## API

The `MTO` is not intended to expose any functions or data.

## Issues

Open an issue or hit me up.

## Contributing

PRs accepted.

## To Do
- Open in batches
  - Be able to open/close a particular batch from the MTO
- Test Bed
  - Send an HTTP request to each URL entry to determine reachability
  - Display pass/fail test progress as a loading bar or some other UI
  - Display results of tests
  - Open all URLs that passed test
  - Open individual URLs that passed test
- Additional paste actions for URL entries
  - Overwrite
- Advanced UI for managing URL entries
  - Update URL entries
  - Rearrange with:
    - Up and down buttons
    - Click and drag
- Add UI for hints/explanations
- Be able to save your own default options
- Be able to save a list from the main screen
- Be able to import from file
  - txt
  - json

## License

GPL-3.0

class MultiTabOpener
{
    /**
     * fn: constructor()
     *
     * @param elements {Object}
     *
     * */
    constructor(elements)
    {
        this.elements = elements;
        this.delayValue = elements.inputs.delay.val();
        this.delayMinimum = 1000;
        this.init()
    }
    // end fn: constructor()


    /**
     * fn: initialize()
     *
     * */
    init()
    {

        // assign form actions to buttons
        this.assignFormActionsToButtons();

        // calculate storage capacity
        this.calculateStorageCapacity();

        // initialize storage UI
        this.initStorage();

        // initialize settings UI
        this.initSettings();
    }
    // end fn: initialize


    /**
     * fn: assignFormActionsToButtons()
     *
     * */
    assignFormActionsToButtons()
    {
        // -------------
        // paste actions

        // paste
        this.elements.buttons.paste.click(() => this.pasteFromClipboard(this.elements.inputs.urls));

        // paste - prepend
        //this.elements.buttons.paste_prepend.click(() => this.prependFromClipboard());
        this.elements.buttons.paste_prepend.click(() => this.prependFromClipboard(this.elements.inputs.urls));

        // paste - append
        // this.elements.buttons.paste_append.click(() => this.appendFromClipboard());
        this.elements.buttons.paste_append.click(() => this.appendFromClipboard(this.elements.inputs.urls));

        // paste - upload
        this.elements.buttons.paste_upload.click(() => this.uploadAsUrlEntries());

        // end paste actions
        // -----------------

        // clear URLs from textarea
        this.elements.buttons.clear.click(() => this.clearURLs());

        // open URLs from textarea as new tabs
        this.elements.buttons.open.click(() => this.openTabs());

        // test URLs from textarea for validity
        this.elements.buttons.test.click(() => this.testPaths());

        // toggle display of open and test buttons
        this.elements.inputs.validityTest.click(() => this.toggleTestAndOpenButtons());

        // toggle disability of delay inputs
        this.elements.inputs.delayCheck.click(() => this.toggleDelayInputsDisability(this.elements.inputs.delayCheck));

        // update delay values
        this.elements.inputs.delay.change(() => this.updateDelayValues(this.elements.inputs.delay));
        this.elements.inputs.delaySlider.change(() => this.updateDelayValues(this.elements.inputs.delaySlider));

        // dismiss delay alert
        this.elements.buttons.dismissLowDelay.click(() => this.dismissDelayAlert());

        // fix low delay
        this.elements.buttons.fixLowDelay.click(() => this.fixLowDelay());

    }
    // end fn: assignFormActionsToButtons()


    /**
     * fn: initStorage()
     *
     * */
    initStorage()
    {
        // =============================
        // initialize storage UI buttons

        // -----------------------------------------------
        // initialize first URL group input fields buttons

        // add
        this.elements.buttons.storage.firstUrlGroup.add.click(() => this.addFirstUrlGroup());

        // paste
        this.elements.buttons.storage.firstUrlGroup.paste.click(() => this.pasteFromClipboard(this.elements.inputs.storage.firstUrlGroup.urls));
        this.elements.buttons.storage.firstUrlGroup.paste.blur(() => this.validateFirstUrlGroupInputLength());

        // clear
        this.elements.buttons.storage.firstUrlGroup.clear.click(() => this.clearFirstUrlGroupInputs());

        // save
        this.elements.buttons.storage.firstUrlGroup.save.click(() => this.saveFirstUrlGroup());

        // cancel
        this.elements.buttons.storage.firstUrlGroup.cancel.click(() => this.cancelFirstUrlGroupInput());

        // end initialize first URL group input fields buttons
        // ---------------------------------------------------

        // ----------------------------
        // initialize add new url group

        // paste
        this.elements.buttons.storage.newUrlGroup.paste.click(() =>
        {
            this.pasteFromClipboard(this.elements.inputs.storage.newUrlGroup.urls);
            this.removeNewUrlGroupWarningUI();
        });

        // clear
        this.elements.buttons.storage.newUrlGroup.clear.click(() => this.clearNewUrlGroupInputs());

        // save
        this.elements.buttons.storage.newUrlGroup.save.click(() => this.saveNewUrlGroup());
        this.elements.inputs.storage.newUrlGroup.urls.change(() => this.validateNewUrlGroupInputLength());
        this.elements.inputs.storage.newUrlGroup.urls.blur(() => this.validateNewUrlGroupInputLength());

        // cancel
        this.elements.buttons.storage.newUrlGroup.cancel.click(() => this.cancelNewUrlGroupInput());

        // end initialize add new url group
        // --------------------------------

        // -------------------------
        // initialize edit url group

        // end initialize edit url group
        // -----------------------------

        // ---------------------------
        // initialize delete url group

        // clear
        this.elements.buttons.storage.deleteUrlGroup.clear.click(() => this.clearDeleteUrlGroupSelection());

        // delete
        this.elements.buttons.storage.deleteUrlGroup.delete.click(() => this.deleteUrlGroupSelection());

        // cancel
        this.elements.buttons.storage.deleteUrlGroup.cancel.click(() => this.cancelUrlGroupDeletion());

        // select all
        this.elements.inputs.storage.deleteUrlGroup.selectAll.click(() => this.toggleSelectAllDeleteUrlGroupsRows());

        // end initialize delete url group
        // -------------------------------

        // end initialize storage UI buttons
        // =================================

        // initialize storage capacity UI
        this.initStorageCapacityUI();

        // check for url groups in local storage
        if (!localStorage.getItem("mto-url-groups"))
        {
            let mtoGroups = [];
            localStorage.setItem("mto-url-groups", JSON.stringify(mtoGroups));
        }

        // get the stored url groups as JSON
        let urlGroups = JSON.parse(this.getStoredUrlGroups());

        // if there are no url groups
        // display UI for adding a url group
        if (!urlGroups.length)
        {
            $("#offcanvas-storage-no-url-groups").toggleClass("d-none");
            this.elements.inputs.storage.firstUrlGroup.urls.change(() => this.validateFirstUrlGroupInputLength());
        }
        // else display url groups UI
        else
        {
            // display stored URL groups UI
            this.displayStoredUrlGroups();
            $("#offcanvas-storage-has-url-groups").toggleClass("d-none");

            // initialize accordion buttons
            this.initAccordionItemsCopyAndLoadButtons();

            // init delete url groups UI
            this.initDeleteUrlGroupUI();
        }
    }
    // end fn: initStorage()


    /**
     * fn: initialize accordionItemsCopyAndLoadButtons()
     *
     * */
    initAccordionItemsCopyAndLoadButtons()
    {
        // copy urls from group
        this.elements.buttons.storage.copyUrlGroup = $(".btn-copyUrlGroup");
        this.elements.buttons.storage.copyUrlGroup.click((event) => this.copyUrlGroupToClipboard(event));

        // load urls from group
        this.elements.buttons.storage.loadUrlGroup = $(".btn-loadUrlGroup");
        this.elements.buttons.storage.loadUrlGroup.click((event) => this.loadUrlGroupToMainTextArea(event));
    }
    // end fn: accordionItemsCopyAndLoadButtons()


    /**
     * fn: copyUrlGroupToClipboard()
     *
     * @param event {event} the event from the button that triggered this action
     *
     * */
    copyUrlGroupToClipboard(event)
    {
        // get the element that triggered this event
        const target = $(event.target);

        // get the data-urlgroupid attribue from the event
        const pos = target.attr("data-urlgroupid");

        // update target element UI to indicate copy action was fired
        target.toggleClass(["bg-secondary", "bg-success"]);

        // get URLs from mto-url-groups array in local storage as multiline text
        const urlsAsMultiLineString = this.getUrlsAsMultilineString(pos);

        // set urls as multiline string to clipbaord
        this.copyToClipboard(urlsAsMultiLineString);

        // reset target element UI
        setTimeout(function ()
        {
            // update target element UI to indicate copy action was fired
            target.toggleClass(["bg-success", "bg-secondary"]);

        }, 1000);

    }
    // end fn: copyUrlGroupToClipboard()


    /**
     * fn: loadUrlGroupToMainTextArea()
     *
     * @param event {event} the event from the button that triggered this action
     *
     * */
    loadUrlGroupToMainTextArea(event)
    {
        // get the element that triggered this event
        const target = $(event.target);

        // get the data-urlgroupid attribue from the event
        const pos = target.attr("data-urlgroupid");

        // get URLs from mto-url-groups array in local storage as multiline text
        const urlsAsMultiLineString = this.getUrlsAsMultilineString(pos);

        // -----------------
        // update storage UI

        // close the accordion item
        const accordionItemBody = target.closest("div.accordion-collapse");
        const accordionItem = accordionItemBody.closest(".accordion-item");
        const accordionItemButton = accordionItem.find($("h2 button.accordion-button"));

        accordionItemButton.toggleClass("collapsed");
        accordionItemButton.attr("aria-expanded", "false");
        accordionItemBody.toggleClass("show");
        // end close the accordion item

        // close the storage offcanvas
        const storageCanvas = bootstrap.Offcanvas.getInstance($("#offcanvas-storage"));
        storageCanvas.hide();

        // end update storage UI
        // ---------------------

        // put the text of the url group into the main text area
        $("#input-urls").val(urlsAsMultiLineString);
    }
    // end fn: loadUrlGroupToMainTextArea()


    /**
     * fn: getUrlsAsMultilineText()
     *
     * @param pos {int} the position in the array to pull from
     *
     * */
    getUrlsAsMultilineString(pos)
    {
        // get the stored urls
        const storedUrlGroups = JSON.parse(this.getStoredUrlGroups());

        // find the urls in position
        const urls = storedUrlGroups[pos].urls;

        // return urls as multiline text
        return urls.join("\r\n");
    }
    // end fn: getUrlsAsMultilineText()


    /**
     * fn: initStorageCapacityUI()
     *
     * */
    initStorageCapacityUI()
    {
        // get available storage size
        const availableStorageKB = localStorage.getItem("size");

        // set available storage size
        $("#storageCapacity").text(availableStorageKB);

        // determine KB size of local storage data
        let usedKB = this.getSizeOfUsedLocalStorageInKB();

        // calculate used storage space as percent of available
        const usedPercent = (usedKB / availableStorageKB).toFixed(9);

        // set used storage size
        $("#usedStorageSpace").text(usedKB + " KB");

        // set used storage percent
        $("#usedStoragePercent").text(usedPercent);

    }
    // end fn: initStorageCapacityUI()


    /**
     * fn: getSizeOfUsedLocalStorageInKB()
     *
     * */
    getSizeOfUsedLocalStorageInKB()
    {
        const localStorageAsString = JSON.stringify(localStorage);
        let usedKB = this.convertBytesToKB(this.getSizeInBytesFromString(localStorageAsString));
        return usedKB;

    }
    // end fn: getSizeOfUsedLocalStorageInKB()


    /**
     * fn: getSizeInBytesFromString()
     *
     * @param str {string}
     *
     * @returns {int}
     *
     * */
    getSizeInBytesFromString(str)
    {
        return new Blob([str]).size;
    }
    // end fn: getSizeInBytesFromString()


    /**
     * fn: convertBytesToKB()
     *
     * @param bytes {int}
     *
     * @return {float}
     *
     * */
    convertBytesToKB(bytes)
    {
        let kb = bytes / 1000;
        return kb.toFixed(3);
    }
    // end fn: convertBytesToKB()


    /**
     * fn: addUrlGroupAccordionItem()
     *
     * @param pos {int}
     * @param accordion {object}
     * @param urlGroups {object}
     *
     * */
    addUrlGroupAccordionItem(pos, accordion, urlGroups)
    {
        // get url groups accordion
        let urlGroupsAccordion = accordion;

        // get stored URL groups as JS object
        let storedUrlGroups = urlGroups;

        // get a clone of an accordion item
        let clone = $("#accordion-item-cloneSource-existingUrlGroup").clone();
        let cloneStructure =
        {
            "header": clone.find(".accordion-header"),
            "headerButton": clone.find(".accordion-button"),
            "bodyWrapper": clone.find(".accordion-collapse"),
            "bodyContent": clone.find(".accordion-body")
        };

        const suffix = "ulrGroup-" + pos;

        // update id of accordion item
        clone.attr("id", "accordion-item-" + suffix);
        clone.removeClass("d-none");

        // update id of accordion item header
        cloneStructure.header.attr("id", "urlGroupHeader-" + suffix);

        // update attributes of the accordion item header button
        cloneStructure.headerButton.attr("data-bs-target", "#urlGroupBody-" + suffix);
        cloneStructure.headerButton.attr("aria-controls", "urlGroupBody-" + suffix);

        // determine button label
        let buttonLabelParts =
        {
            "timeStamp": new Date(storedUrlGroups[pos].date).toDateString(),
            "urlCount": storedUrlGroups[pos].urls.length,
            "groupName": ""
        };

        if (storedUrlGroups[pos].name.length > 0) { buttonLabelParts.groupName += storedUrlGroups[pos].name; }
        else { buttonLabelParts.groupName += "URL Group " + (pos + 1); }
        // end determine button label parts

        // get button label from parts
        let buttonLabel = buttonLabelParts.timeStamp + " - " + buttonLabelParts.urlCount + " URLs - " + buttonLabelParts.groupName;

        // set button label
        cloneStructure.headerButton.html("<i class=\"fa-solid fa-bars me-2\"></i>" + buttonLabel);

        // update attributes of the accordion item body wrapper
        cloneStructure.bodyWrapper.attr("id", "urlGroupBody-" + suffix);
        cloneStructure.bodyWrapper.attr("aria-labelledby", "urlGroupHeader-" + suffix);

        // update accordion item body content
        let bodyContent = "";

        if (storedUrlGroups[pos].description.length > 0)
        {
            bodyContent +=
                "<p>" +
                    "<button class='btn btn-sm btn-secondary me-2 btn-copyUrlGroup' data-urlgroupid='" + pos + "'><i class=\"fa-solid fa-copy me-2\"></i>Copy</button>" +
                    "<button class='btn btn-sm btn-secondary me-2 btn-loadUrlGroup' data-urlgroupid='" + pos + "'><i class=\"fa-solid fa-up-right-from-square me-2\"></i>Load</button>" +
                    "<strong>Description: </strong> " + storedUrlGroups[pos].description +
                "</p><hr>";
        }

        else
        {
            bodyContent +=
                "<p>" +
                    "<button class='btn btn-sm btn-secondary me-2 btn-copyUrlGroup' data-urlgroupid='" + pos + "'><i class=\"fa-solid fa-copy me-2\"></i>Copy</button>" +
                    "<button class='btn btn-sm btn-secondary me-2 btn-loadUrlGroup' data-urlgroupid='" + pos + "'><i class=\"fa-solid fa-up-right-from-square me-2\"></i>Load</button>" +
                "</p><hr>";
        }

        for (let url of storedUrlGroups[pos].urls)
        {
            bodyContent += "<p class='mb-1'><a href='" + url + "' target='_blank'>" + url + "</a></p>";
        }

        // set clone's body content
        cloneStructure.bodyContent.html(bodyContent);

        // append clone to accordion
        clone.appendTo(urlGroupsAccordion);
    }
    // end fn: addUrlGroupAccordionItem()


    /**
     * fn: displayStoredUrlGroups()
     *
     * */
    displayStoredUrlGroups()
    {
        // get url groups accordion
        let urlGroupsAccordion = $("#accordion-existing-url-groups");

        // get stored URL groups as JS object
        let storedUrlGroups = JSON.parse(this.getStoredUrlGroups());

        // for all stored url groups
        for (let i = 0; i < storedUrlGroups.length; i++)
        {
            this.addUrlGroupAccordionItem(i, urlGroupsAccordion, storedUrlGroups);
        }
        // end for all stored url groups
    }
    // end fn: displayStoredUrlGroups()


    /**
     * fn: appendStoredUrlGroups()
     *
     * @param pos {int}
     *
     * */
    appendStoredUrlGroup(pos)
    {
        // get url groups accordion
        let urlGroupsAccordion = $("#accordion-existing-url-groups");

        // get stored URL groups as JS object
        let storedUrlGroups = JSON.parse(this.getStoredUrlGroups());

        this.addUrlGroupAccordionItem(pos - 1, urlGroupsAccordion, storedUrlGroups);

        // initialize accordion buttons
        this.initAccordionItemsCopyAndLoadButtons();
    }
    // end fn: appendStoredUrlGroups()


    /**
     * fn: getStoredUrlGroups()
     *
     * */
    getStoredUrlGroups()
    {
        return localStorage.getItem("mto-url-groups");
    }
    // end fn: getStoredUrlGroups()


    /**
     * fn: addFirstUrlGroup()
     *
     * */
    addFirstUrlGroup()
    {
        this.elements.buttons.storage.firstUrlGroup.add.fadeTo(600, 0);
        this.elements.buttons.storage.firstUrlGroup.add.prop("disabled", true);
    }
    // end fn: addFirstUrlGroup()


    /**
     * fn: addFirstUrlGroupWarningUI()
     *
     * */
    addFirstUrlGroupWarningUI()
    {
        $("#help-input-firstUrlGroup").removeClass("d-none");
        this.elements.inputs.storage.firstUrlGroup.urls.addClass(["border", "border-warning", "border-3"]);
    }
    // end fn: addFirstUrlGroupWarningUI()


    /**
     * fn: addNewUrlGroupWarningUI()
     *
     * */
    addNewUrlGroupWarningUI()
    {
        $("#help-input-newUrlGroup").removeClass("d-none");
        this.elements.inputs.storage.newUrlGroup.urls.addClass(["border", "border-warning", "border-3"]);
    }
    // end fn: addNewUrlGroupWarningUI()


    /**
     * fn: removeFirstUrlGroupWarningUI()
     *
     * */
    removeFirstUrlGroupWarningUI()
    {
        $("#help-input-firstUrlGroup").addClass("d-none");
        this.elements.inputs.storage.firstUrlGroup.urls.removeClass(["border", "border-warning", "border-3"]);
    }
    // end fn: removeFirstUrlGroupWarningUI()


    /**
     * fn: removeNewUrlGroupWarningUI()
     *
     * */
    removeNewUrlGroupWarningUI()
    {
        $("#help-input-newUrlGroup").addClass("d-none");
        this.elements.inputs.storage.newUrlGroup.urls.removeClass(["border", "border-warning", "border-3"]);
    }
    // end fn: removeNewUrlGroupWarningUI()


    /**
     * fn: validateFirstUrlGroupInputLength()
     *
     * */
    validateFirstUrlGroupInputLength()
    {
        // check for URL entries
        let hasBlankUrls = this.elements.inputs.storage.firstUrlGroup.urls.val().length === 0;

        // if user input has no URLs, then show warning UI
        if (hasBlankUrls) { this.addFirstUrlGroupWarningUI(); }

        // else remove warning UI
        else { this.removeFirstUrlGroupWarningUI(); }
    }
    // end fn: validateFirstUrlGroupInputLength()


    /**
     * fn: validateNewUrlGroupInputLength()
     *
     * */
    validateNewUrlGroupInputLength()
    {
        // check for URL entries
        let hasBlankUrls = this.elements.inputs.storage.newUrlGroup.urls.val().length === 0;

        // if user input has no URLs, then show warning UI
        if (hasBlankUrls) { this.addNewUrlGroupWarningUI(); }

        // else remove warning UI
        else { this.removeNewUrlGroupWarningUI(); }
    }
    // end fn: validateNewUrlGroupInputLength()


    /**
     * fn: saveFirstUrlGroup()
     *
     * */
    saveFirstUrlGroup()
    {
        // check that URL entries are not blank
        if (this.elements.inputs.storage.firstUrlGroup.urls.val().length === 0)
        {
            this.addFirstUrlGroupWarningUI();
        }

        // else perform update to local storage
        else
        {
            // get input urls, group name, and description
            let urls = this.urlEntriesToArray(this.elements.inputs.storage.firstUrlGroup.urls);
            let groupName = this.elements.inputs.storage.firstUrlGroup.groupName.val().trim();
            let groupDescription = this.elements.inputs.storage.firstUrlGroup.groupDescription.val().trim();

            // make JS object with user input
            let firstGroup =
            {
                "name": groupName,
                "description": groupDescription,
                "date": Date.now(),
                "urls": urls,
            };

            // get mto-url-groups from local storage
            // and parse JSON to JS object
            let existingGroups = JSON.parse(this.getStoredUrlGroups());

            // add user input to existingGroups array
            existingGroups.push(firstGroup);

            // add updated array to local storage as JSON
            localStorage.setItem("mto-url-groups", JSON.stringify(existingGroups));

            // update offcanvas storage UI
            $("#offcanvas-storage-no-url-groups").slideUp(600);
            setTimeout(() => {
                this.displayStoredUrlGroups();
                let animationTarget = $("#offcanvas-storage-has-url-groups");
                animationTarget.css("opacity", 0);
                animationTarget.toggleClass("d-none");
                animationTarget.animate({opacity: 1}, 600);

                // update local storage capacity UI
                this.initStorageCapacityUI();

                // init delete URL groups UI
                this.initDeleteUrlGroupUI();

                // init copy and load buttons
                this.initAccordionItemsCopyAndLoadButtons();

            }, 600);
            // end update offcanvas storage UI
        }
        // end else perform update to local storage
    }
    // end fn: saveFirstUrlGroup()


    /**
     * fn: saveNewUrlGroup()
     *
     * */
    saveNewUrlGroup()
    {
        // check that URL entries are not blank
        if (this.elements.inputs.storage.newUrlGroup.urls.val().length === 0)
        {
            this.addNewUrlGroupWarningUI();
        }

        // else perform update to local storage
        else
        {
            // get input urls, group name, and description
            let urls = this.urlEntriesToArray(this.elements.inputs.storage.newUrlGroup.urls);
            let groupName = this.elements.inputs.storage.newUrlGroup.groupName.val().trim();
            let groupDescription = this.elements.inputs.storage.newUrlGroup.groupDescription.val().trim();

            // make JS object with user input
            let newGroup =
            {
                "name": groupName,
                "description": groupDescription,
                "date": Date.now(),
                "urls": urls,
            };

            // get mto-url-groups from local storage
            // and parse JSON to JS object
            let existingGroups = JSON.parse(this.getStoredUrlGroups());

            // add user input to existingGroups array
            existingGroups.push(newGroup);

            // add updated array to local storage as JSON
            localStorage.setItem("mto-url-groups", JSON.stringify(existingGroups));

            // clear new URL group inputs
            this.clearNewUrlGroupInputs();

            // add new URL group to UI
            this.appendStoredUrlGroup(existingGroups.length);

            // update storage capacity UI
            this.initStorageCapacityUI();

            // update rows of URL groups for deletion table
            this.appendNewUrlGroupToDeletionTable();

            // flash alert: new group saved
            this.elements.alerts.storage.newGroupSaved.toggleClass(["d-none", "show"]);
            setTimeout(() =>
            {
                this.elements.alerts.storage.newGroupSaved.toggleClass(["d-none", "show"]);

            }, 3000);

        }
        // end else perform update to local storage
    }
    // end fn: saveNewUrlGroup()


    /**
     * fn: clearFirstUrlGroupInputs()
     *
     * */
    clearFirstUrlGroupInputs()
    {
        this.elements.inputs.storage.firstUrlGroup.urls.val("");
        this.elements.inputs.storage.firstUrlGroup.groupName.val("");
        this.elements.inputs.storage.firstUrlGroup.groupDescription.val("");
    }
    // end fn: clearFirstUrlGroupInputs()


    /**
     * fn: clearNewUrlGroupInputs()
     *
     * */
    clearNewUrlGroupInputs()
    {
        this.elements.inputs.storage.newUrlGroup.urls.val("");
        this.elements.inputs.storage.newUrlGroup.groupName.val("");
        this.elements.inputs.storage.newUrlGroup.groupDescription.val("");
    }
    // end fn: clearNewUrlGroupInputs()


    /**
     * fn: cancelFirstUrlGroupInput()
     *
     * */
    cancelFirstUrlGroupInput()
    {
        this.clearFirstUrlGroupInputs();
        setTimeout(() =>
        {
            this.elements.buttons.storage.firstUrlGroup.add.prop("disabled", false);
            this.elements.buttons.storage.firstUrlGroup.add.fadeTo(100, 1);

        }, 600);
    }
    // end fn: cancelFirstUrlGroupInput()


    /*
    * fn: cancelNewUrlGroupInput()
    *
    * */
    cancelNewUrlGroupInput()
    {
        this.clearNewUrlGroupInputs();
        $('#pane-addUrlGroup').toggleClass(["show", "active"]);
        $('#tab-addUrlGroup').toggleClass("active");
    }
    // end fn: cancelNewUrlGroupInput()


    /**
     * fn: initDeleteUrlGroupUI()
     *
     * */
    initDeleteUrlGroupUI()
    {
        // get stored URL groups as JS object
        let storedUrlGroups = JSON.parse(this.getStoredUrlGroups());

        // get clone append to target
        let cloneAppendTarget = $("#cloneAppendTarget-deleteUrlGroupRow");

        // for every URL group
        for (let i = 0; i < storedUrlGroups.length; i++)
        {
            // build row clone
            let clone = this.buildDeleteUrlGroupRow(storedUrlGroups, i);

            // append row to table body
            clone.appendTo(cloneAppendTarget);

        }
        // end for every URL group

        // on click of a delete URL group row
        this.handleClickRowDeleteUrlGroup()
    }
    // end fn: initDeleteUrlGroupUI()


    /**
     * fn: appendNewUrlGroupToDeletionTable()
     *
     * */
    appendNewUrlGroupToDeletionTable()
    {
        // get stored URL groups as JS object
        let storedUrlGroups = JSON.parse(this.getStoredUrlGroups());

        // get clone append to target
        let cloneAppendTarget = $("#cloneAppendTarget-deleteUrlGroupRow");

        // build clone
        let clone = this.buildDeleteUrlGroupRow(storedUrlGroups, storedUrlGroups.length - 1);

        // append row to table body
        clone.appendTo(cloneAppendTarget);

        clone.click(function ()
        {
            // get the checkbox in the row that was just clicked
            let checkbox = clone.find("input[type=checkbox]");

            // toggle whether that box is checked or not
            let checked = checkbox.prop("checked");
            checkbox.prop("checked", !checked);

            // toggle hidden state of checkbox
            checkbox.toggleClass("d-none");

            // toggle class "table-active" on this row
            clone.toggleClass(["bg-warning", "bg-opacity-10"]);
        });

    }
    // end fn: appendNewUrlGroupToDeletionTable()


    /**
     * fn: buildDeleteUrlGroupRow()
     *
     * @param storedUrlGroups {array} the URL groups to work with
     * @param i {int} the position of the URL group in local storage
     *
     * @return clone {object} the cloned HTML
     *
     * */
    buildDeleteUrlGroupRow(storedUrlGroups, i)
    {
        // clone the table row for selecting a url group
        let clone = $("#clone-row-deleteUrlGroup").clone();
        let cloneStructure =
            {
                "groupId": clone.find(".clone-cell-deleteUrlGroup-groupId"),
                "checkbox": clone.find("#clone-input-deleteUrlGroup-checkbox"),
                "date": clone.find(".clone-cell-deleteUrlGroup-date"),
                "urls": clone.find(".clone-cell-deleteUrlGroup-urls"),
                "name": clone.find(".clone-cell-deleteUrlGroup-name"),
                "description": clone.find(".clone-cell-deleteUrlGroup-description"),
            }

        // set table row id
        let tableRowId = "row-deleteUrlGroup-" + i;
        clone.attr("id", tableRowId);
        clone.attr("data-urlgroupid", i);

        // make table row unhidden
        clone.removeClass("d-none");

        let dateTimeStamp = new Date(storedUrlGroups[i].date).toDateString();

        // set values of row cells
        cloneStructure.groupId.text(i + 1);
        cloneStructure.date.text(dateTimeStamp);
        cloneStructure.urls.text(storedUrlGroups[i].urls.length);
        cloneStructure.name.text(storedUrlGroups[i].name);
        cloneStructure.description.text(storedUrlGroups[i].description);
        // end set values of row cells

        // set attributes of checkbox
        cloneStructure.checkbox.attr("id", "checkbox-deleteUrlGroup-" + i);
        cloneStructure.checkbox.attr("name", "checkbox-deleteUrlGroup-" + i);
        cloneStructure.checkbox.attr("data-urlgroupid", i);
        cloneStructure.checkbox.addClass(["checkbox-deleteUrlGroup", "d-none"]);

        // return clone
        return clone;
    }
    // end fn: buildDeleteUrlGroupRow()


    /**
     * fn: toggleSelectAllDeleteUrlGroupsRows()
     *
     * */
    toggleSelectAllDeleteUrlGroupsRows()
    {
        // get current state of check all checkbox
        let isChecked = $("#checkbox-selectAll-urlGroupsForDeletion").is(":checked");
        isChecked ? this.selectAllDeleteUrlGroupRows() : this.deselectAllDeleteUrlGroupRows();
    }
    // end fn: toggleSelectAllDeleteUrlGroupsRows()


    /**
     * fn: selectAllDeleteUrlGroupRows()
     *
     * */
    selectAllDeleteUrlGroupRows()
    {
        // get all delete URL group rows
        let rows = $("tr.tableRow-urlGroupForDeletion");

        // get all checkboxes in the rows
        let checkboxes = $(".checkbox-deleteUrlGroup");

        // toggle checkbox hidden
        checkboxes.removeClass("d-none");

        // select all check boxes
        checkboxes.prop("checked", true);

        // highlight all rows
        rows.addClass(["bg-warning", "bg-opacity-10"]);

    }
    // end fn: selectAllDeleteUrlGroupRows()


    /**
     * fn: deselectAllDeleteUrlGroupRows()
     *
     * */
    deselectAllDeleteUrlGroupRows()
    {
        // get all delete URL group rows
        let rows = $("tr.tableRow-urlGroupForDeletion");

        // get all checkboxes in the rows
        let checkboxes = $(".checkbox-deleteUrlGroup");

        // toggle checkbox hidden
        checkboxes.addClass("d-none");

        // select all check boxes
        checkboxes.prop("checked", false);

        // highlight all rows
        rows.removeClass(["bg-warning", "bg-opacity-10"]);
    }
    // end fm: deselectAllDeleteUrlGroupRows()



    /**
     * fn: handleClickRowDeleteUrlGroup()
     *
     * */
    handleClickRowDeleteUrlGroup()
    {
        // get all delete URL group rows
        let rows = $("tr.tableRow-urlGroupForDeletion");

        // for each delete URL group row
        rows.each(function ()
        {
            // get the row that was just clicked
            let clickedRow = $(this);
            this.addEventListener("click", function ()
            {
                // get the checkbox in the row that was just clicked
                let checkbox = clickedRow.find("input[type=checkbox]");

                // toggle checkbox hidden
                checkbox.toggleClass("d-none");

                // toggle whether that box is checked or not
                let checked = checkbox.prop("checked");

                checkbox.prop("checked", !checked);

                // toggle class "table-active" on this row
                clickedRow.toggleClass(["bg-warning", "bg-opacity-10"]);
            })
        });
        // end for each delete URL group row
    }
    // end fn: handleClickRowDeleteUrlGroup()


    /**
     * fn: clearDeleteUrlGroupSelection()
     *
     * */
    clearDeleteUrlGroupSelection()
    {
        this.deselectAllDeleteUrlGroupRows();
        $("#checkbox-selectAll-urlGroupsForDeletion").prop("checked", false);
    }
    // end fn: clearDeleteUrlGroupSelection()


    /**
     * fn: deleteUrlGroupSelection()
     *
     * */
    deleteUrlGroupSelection()
    {

        // get checked boxes
        let checkedBoxes = $(".checkbox-deleteUrlGroup:checked");

        // get the rows that contain the checked boxes
        let rowsWithCheckedBoxes = checkedBoxes.closest("tr");

        // get the corresponding positions of the checked boxes in the mto-url-groups array
        let positions = [];
        checkedBoxes.each(function() { positions.push($(this).attr("data-urlgroupid")); });

        console.log(positions);

        // get the accordion items whose ids selected positions
        let accordionItems = [];
        for (const pos of positions)
        {
            accordionItems.push($("#accordion-item-ulrGroup-" + pos));
        }

        // ----------------------------------------------
        // delete the selected records from local storage

        // get the stored URLs as an object
        let storedUrlGroups = JSON.parse(this.getStoredUrlGroups());

        // make a new array to hold url groups that won't be deleted
        let newUrlGroups = [];

        // iterate through stored url groups
        for (let i = 0; i < storedUrlGroups.length; i++)
        {
            // if the current iteration is not found in the selected positions
            if ( !positions.includes(i.toString()) )
            {
                // add the current iteration to the new url groups array
                newUrlGroups.push(storedUrlGroups[i]);
            }
        }

        // update local storage
        localStorage.setItem("mto-url-groups", JSON.stringify(newUrlGroups));

        // end delete the selected records from local storage
        // --------------------------------------------------

        // update the delete table UI
        rowsWithCheckedBoxes.hide();

        // update the accordion UI
        accordionItems.forEach(element => element.hide());

        // uncheck the select all checkbox
        $("#checkbox-selectAll-urlGroupsForDeletion").prop("checked", false);

        // update local storage usage stats UI
        this.initStorageCapacityUI();

    }
    // end fn: deleteUrlGroupSelection()


    /**
     * fn: cancelUrlGroupDeletion()
     *
     * */
    cancelUrlGroupDeletion()
    {
        this.clearDeleteUrlGroupSelection();
        $('#pane-deleteUrlGroup').toggleClass(["show", "active"]);
        $('#tab-deleteUrlGroup').toggleClass("active");

    }
    // end fn: cancelUrlGroupDeletion()


    /**
     * fn: calculateStorageCapacity()
     *
     * */
    calculateStorageCapacity()
    {
        if (localStorage.getItem('size') === null)
        {
            // make a backup of local storage
            const localStorageSnapshot = JSON.stringify(localStorage);

            // clear out local storage
            localStorage.clear();

            // determine max size of local storage
            this.determineMaxSizeOfLocalStorage();

            // restore local storage from snapshot
            this.restoreLocalStorage(localStorageSnapshot);
        }
    }
    // end fn: calculateStorageCapacity()


    /**
     * fn: determineMaxSizeOfLocalStorageInKB()
     *
     * */
    determineMaxSizeOfLocalStorage()
    {
        let i = 0;
        try
        {
            // Test up to 10 MB
            for (i; i <= 10000; i += 250)
            {
                localStorage.setItem('test', this.getArrayForTestingMaxLocalStorageSize(i));
            }
        }

        // when testing fails
        catch (e)
        {
            // remove test value
            localStorage.removeItem('test');

            // set value of 'size' to whatever value 'i' was before failure
            localStorage.setItem('size', i ? i - 250 : 0);
        }
    }
    // end fn: determineMaxSizeOfLocalStorage()


    /**
     * fn: getArrayForTestingMaxLocalStorageSize()
     *
     * @param num {int}
     *
     * @returns {array}
     *
     * */
    getArrayForTestingMaxLocalStorageSize(num)
    {
        return new Array((num * 1024) + 1).join('a');
    }
    // end fn: getArrayForTestingMaxLocalStorageSize()


    /**
     * fn: restoreLocalStorage()
     *
     * @param snapshot {string}
     *
     * */
    restoreLocalStorage(snapshot)
    {
        const data = JSON.parse(snapshot);
        for (const i in data)
        {
            localStorage.setItem(i, data[i]);
        }
    }
    // end fn: restoreLocalStorage()


    /**
     * fn: initSettings()
     *
     * */
    initSettings()
    {
        this.elements.offcanvas.settings.append("<p class='lead text-center'>This feature is currently under development</p>");
    }
    // end fn: initSettings()


    /**
     * fn: canUseClipboard()
     *
     * */
    canUseClipboard()
    {
        return !!(navigator.clipboard);
    }
    // end fn: canUseClipboard()


    /**
     * fn: alertNoClipboard()
     *
     * */
    alertNoClipboard()
    {
        let message = "Your browser is blocking clipboard functions. \r\nYou can use this feature if you grant clipboard permissions to this app.";
        alert(message);
    }
    // end fn: alertNoClipboard()


    /**
     * fn: pasteFromClipboard()
     *
     * @param el {element} the target element for the pasted text
     *
     * */
    async pasteFromClipboard(el)
    {
        if (!this.canUseClipboard()) { this.alertNoClipboard() }
        else
        {
            let text = await navigator.clipboard.readText();
            el.val(text);
            el.focus();
        }
    }
    // end fn: pasteFromClipboard()


    /**
     * fn: prependFromClipboard()
     *
     * @param el {element} the target element for the pasted text
     *
     * */
    async prependFromClipboard(el)
    {
        if (!this.canUseClipboard()) { this.alertNoClipboard() }
        else
        {
            let currentText = el.val();
            let prepend = await navigator.clipboard.readText();
            el.val(prepend + "\r\n" + currentText);
        }
    }
    // end fn: prependFromClipboard()


    /**
     * fn: appendFromClipboard()
     *
     * @param el {element} the target element for the pasted text
     *
     * */
    async appendFromClipboard(el)
    {
        if (!this.canUseClipboard()) { this.alertNoClipboard() }
        else
        {
            let currentText = el.val();
            let append = await navigator.clipboard.readText();
            el.val(currentText + "\r\n" + append);
        }
    }
    // end fn: appendFromClipboard()


    /**
     * fn: copyToClipboard()
     *
     * @param text {string} the value to be copied to the clipboard
     *
     * */
    async copyToClipboard(text)
    {
        if (!this.canUseClipboard()) { this.alertNoClipboard() }
        else
        {
            const type = "text/plain";
            const blob = new Blob([text], { type });
            const data = [new ClipboardItem({ [type]: blob })];

            await navigator.clipboard.write(data);
        }
    }
    // end fn: copyToClipboard()


    /**
     * fn: uploadAsUrlEntries()
     *
     * */
    uploadAsUrlEntries()
    {
        alert('This feature is currently under development');
    }
    // end fn: uploadAsUrlEntries()


    /**
     * fn: clearURLs()
     *
     * clear URLs from textarea
     *
     * */
    clearURLs()
    {
        this.elements.inputs.urls.val("");
    }
    // end fn: clearURLs()


    /**
     * fn: openTabs()
     *
     * open URLs from textarea as new tabs
     *
     * */
    openTabs()
    {
        let urls = this.getURLs();
        this.newTabs(urls, this.delayValue);

        // close the multi tab opener when finished
        // let closeTab = this.elements.inputs.closeTab.is(":checked");

    }
    // end fn: openTabs()


    /**
     * fn: urlEntriesToArray()
     *
     * @param userEntries {text} user input from urls textarea
     *
     * */
    urlEntriesToArray(userEntries)
    {
        // array to hold urls
        let urls = [];

        // break up user input into an array
        let entries = userEntries.val().split("\n");

        // remove any blank lines
        for (const e of entries) { if(e !== "") { urls.push(e.trim()); } }

        return urls;
    }
    // end fn: urlEntriesToArray()


    /**
     * fn: getURLs()
     *
     * @return urls {array}
     *
     * */
    getURLs()
    {
        // format user input URLs as array
        let urls = this.urlEntriesToArray(this.elements.inputs.urls);

        // prepend protocol
        let prepend = this.elements.inputs.prepend.val();
        if (prepend) { urls = this.prependProtocol(urls, prepend); }

        // handle if entries should be reversed
        let reverseOrder = this.elements.inputs.openReverse.is(":checked");
        if (reverseOrder) { return urls.reverse(); }
        else { return urls; }
    }
    // end fn: getURLs()


    /**
     * fn: prependProtocol()
     *
     * @param urls {array}
     * @param rewrite {array}
     *
     * */
    prependProtocol(urls, rewrite)
    {
        let newURLs = [];
        for (const u of urls) { newURLs.push(rewrite + "://" + u); }
        return newURLs;
    }
    // end fn: prependProtocol()


    /**
     * fn: newTabs()
     *
     * */
    newTabs(urls, delay)
    {
        // check for flag to replace the multi tab opener
        let replaceTab = this.elements.inputs.replaceTab.is(":checked");

        // open new tabs without replacing the multi tab opener
        if (!replaceTab)
        {
            for (let i = 0; i < urls.length; i++)
            {
                if (i === 0) { this.newTab(urls[i]); }
                else { this.newTabWithDelay(urls[i], i, delay); }
            }
        }

        // or open all new tabs except the first
        // and replace the multi tab opener with the first url in the array
        else
        {
            // push a copy of the first url to the end of urls array
            urls[urls.length] = urls[0];

            // vars to save some compute time
            let len = urls.length;
            let upToLast = len - 1;

            // skip the original first url and then
            for (let i = 1; i < len; i++)
            {
                // open the 1th url
                if (i === 1) { this.newTab(urls[i]); }

                // delay open the other urls which are not the last one in the array
                else if (i < upToLast) { this.newTabWithDelay(urls[i], i, delay); }

                // replace the current window with
                else if (i === upToLast) { setTimeout(() => { location = urls[i];}, i * delay); }
            }
        }
    }
    // end fn: newTabs()

    /**
     * fn: newTab()
     *
     * @param url {string}
     *
     * */
    newTab(url)
    {
        //console.log("time to open " + url);
        window.open(url, "_blank");
    }
    // end fn: newTab()


    /**
     * fn: newTabWithDelay()
     *
     * @param url {string}
     * @param i {int}
     * @param delay {int}
     *
     * */
    newTabWithDelay(url, i, delay)
    {
        setTimeout(() => this.newTab(url), i * delay);
    }
    // end fn: newTabWithDelay()


    /**
     * fn: testPaths()
     *
     * test URLs from textarea for validity
     *
     * */
    testPaths()
    {
        const testBed = document.getElementById("testBed");
        testBed.addEventListener('shown.bs.collapse', event => {
            $("#devMessage").toggleClass("show");
        });
        testBed.addEventListener('hide.bs.collapse', event => {
            $("#devMessage").toggleClass("show");
        });
    }
    // end fn: testPaths()


    /**
     * fn: toggleTestAndOpenButtons()
     *
     * toggle display of open and test buttons
     *
     * */
    toggleTestAndOpenButtons()
    {
        this.elements.buttons.test.toggleClass("d-none");
        this.elements.buttons.open.toggleClass("d-none");
    }
    // end fn: toggleTestAndOpenButtons()


    /**
     * fn: toggleDelayInputsDisability()
     *
     * @param checkbox {Object}
     *
     * */
    toggleDelayInputsDisability(checkbox)
    {
        let isChecked = checkbox.is(":checked");
        if (isChecked) { this.resetDelayInputs(this.delayValue); }
        else { this.resetDelayInputs(0) }
    }
    // end fn: toggleDelayInputsDisability()


    /**
     * fn: resetDelayInputs()
     *
     * */
    resetDelayInputs(delayValue)
    {
        this.elements.inputs.delay.val(delayValue);
        this.toggleDisabled(this.elements.inputs.delay);
        this.elements.inputs.delaySlider.val(delayValue);
        this.toggleDisabled(this.elements.inputs.delaySlider);
        //this.toggleDelayAlert();
        if(delayValue <= 999) { this.showDelayAlert(); }
        else { this.dismissDelayAlert(); }
    }
    // end fn: resetDelayInputs()


    /**
     * fn: toggleDisabled()
     *
     * */
    toggleDisabled(el)
    {
        let isDisabled = el.is(":disabled");
        el.prop("disabled", !isDisabled);
    }
    // end fn: toggleDisabled()


    /**
     * fn: updateDelayValues()
     *
     * */
    updateDelayValues(el)
    {
        let newVal = el.val();
        this.elements.inputs.delay.val(newVal);
        this.elements.inputs.delaySlider.val(newVal);
        this.delayValue = newVal;
        if(newVal <= 999) { this.showDelayAlert(); }
        else { this.dismissDelayAlert(); }
    }
    // end fn: updateDelayValues()


    /**
     * fn: clearDelayAlert()
     *
     * */
    dismissDelayAlert()
    {
        this.elements.alerts.lowDelay.addClass("d-none");
    }
    // end fn: clearDelayAlert()


    /**
     * fn: showDelayAlert()
     *
     * */
    showDelayAlert()
    {
        this.elements.alerts.lowDelay.removeClass("d-none");
    }
    // end fn: showDelayAlert()


    /**
     * fn: fixLowDelay()
     *
     * */
    fixLowDelay()
    {
        this.elements.inputs.delay.val(this.delayMinimum);
        this.elements.inputs.delay.prop("disabled", false);
        this.elements.inputs.delaySlider.val(this.delayMinimum);
        this.elements.inputs.delaySlider.prop("disabled", false);
        this.elements.inputs.delayCheck.prop("checked", true);
        this.delayValue = this.delayMinimum;
        this.dismissDelayAlert();
    }
    // end fn: fixLowDelay()

}

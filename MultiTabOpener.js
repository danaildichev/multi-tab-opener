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
        // ------------------------------
        // assign form actions to buttons

        // paste contents of clipboard into URL entry textarea
        this.elements.buttons.paste.click(() => this.pasteFromClipboard());

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

        // end assign form actions to buttons
        // ----------------------------------
    }
    // end fn: initialize


    /**
     * fn: pasteFromClipboard()
     *
     * */
    async pasteFromClipboard()
    {
        if (!navigator.clipboard) { alert("Your browser is blocking this.") }
        else
        {
            let text = await navigator.clipboard.readText();
            this.elements.inputs.urls.val(text);
        }
    }
    // end fn: pasteFromClipboard()


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
     * fn: getURLs()
     *
     * @return urls {array}
     *
     * */
    getURLs()
    {
        // array to hold urls
        let urls = [];

        // break up user input into an array
        let entries = this.elements.inputs.urls.val().split("\n");

        // remove any blank lines
        for (const e of entries) { if(e !== "") { urls.push(e); } }

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

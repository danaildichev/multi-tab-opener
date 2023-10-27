<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Index</title>

    <!-------------------->
    <!-- CSS: Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    <!----------------------->
    <!-- CSS: Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Style overrides -->
    <style>
        .offcanvas-fullscreen
        {
            height: 100vh !important;
            overflow-y: scroll;
        }

        .accordion-item
        {
            border-color: var(--bs-dark);
        }

        .max-height-400-with-overflow-scroll
        {
            max-height: 400px;
            overflow: scroll;
        }

        .max-height-700-with-overflow-scroll
        {
            max-height: 700px;
            overflow: scroll;
        }

        .font-color-dark
        {
            color: var(--bs-dark);
        }

        .popover
        {
            border-color: var(--bs-dark);
            --bs-popover-arrow-border: var(--bs-dark);
        }

        .popover-header
        {
            background-color: var(--bs-dark);
        }

        .nav-link.active
        {
            background-color: var(--bs-secondary) !important;
        }

    </style>
    <!-- end Style overrides -->

</head>
<body class="text-bg-dark">

<!------------------>
<!-- Page Content -->

<main>

    <!-- Title Bar -->
    <section class="container mt-5 mb-3">
        <div class="row align-items-center">

            <!-- Column: Page title -->
            <div class="col ps-0">
                <h1>Multi Tab Opener</h1>
            </div>
            <!-- end Column: Page title -->

            <!-- Column: Title Bar Button Group -->
            <div class="col-auto pe-0">
                <div class="btn-group float-end" role="group" aria-label="Basic example">

                    <!-- btn: storage -->
                    <button type="button" class="btn btn-secondary"
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvas-storage"
                            aria-controls="offcanvas-storage">
                        <i class="fa-solid fa-database me-2"></i>
                        Storage
                    </button>
                    <!-- end btn: storage -->

                    <!-- btn: settings -->
                    <!--<button type="button" class="btn btn-secondary"-->
                    <!--        data-bs-toggle="offcanvas" data-bs-target="#offcanvas-settings"-->
                    <!--        aria-controls="offcanvas-settings">-->
                    <!--    <i class="fa-solid fa-gear me-2"></i>-->
                    <!--    Settings-->
                    <!--</button>-->
                    <!-- end btn: settings -->

                </div>
            </div>
            <!-- end Column: Title Bar Button Group -->

        </div>
    </section>
    <!-- end Title Bar -->


    <!-- Input Panel -->
    <section class="container py-3 bg-secondary rounded">

        <!-- form: urls to be opened -->
        <div class="row g-3">

            <!-- Column: URLs input -->
            <div class="col-md-12 col-lg-8">

                <h2>
                    <i class="fa-solid fa-bars me-2"></i>
                    URLs
                </h2>

                    <!-- textarea: urls -->
                    <div class="mb-3">
                        <label for="input-urls" class="form-label">Copy-Paste or type each web address onto a separate line. Blank lines and extra whitespace will be ignored.</label>
                        <textarea class="form-control" id="input-urls" rows="12"></textarea>
                        <!--<div id="help-input-urls" class="form-text text-white">*Your browser will try to block this the first time you use this form.</div>-->
                    </div>
                    <!-- textarea: urls -->

            </div>
            <!-- end Column: URLs input -->

            <!-- Options -->
            <div class="col-md-12 col-lg-4">

                <h2>
                    <i class="fa-solid fa-anchor me-2"></i>
                    Options
                </h2>

                <!-- delay -->
                <div id="help-input-delay" class="form-text text-white d-block">
                    <label for="input-delay" class="form-label">Millisecond delay before each new tab:</label>
                </div>
                <!-- input group: delay -->
                <div class="input-group mb-3">
                    <div class="input-group-text">
                        <input type="checkbox" id="check-delay" class="form-check-input mt-0" aria-label="Checkbox for delay" checked>
                    </div>
                    <input type="number" id="input-delay" class="form-control rounded-end" value="2000" aria-label="Text input with checkbox for delay">

                    <input type="range" class="form-range" min="1" max="10000" id="slider-delay" value="2000">

                </div>
                <!-- end input group: delay -->
                <!-- alert: low delay -->
                <div id="alert-lowDelay" class="alert alert-warning alert-dismissible fade show d-none" role="alert">
                    <p class="lead"><strong><i class="fa-solid fa-triangle-exclamation me-2"></i> Warning</strong></p>
                    <p>This operation can be <u>very</u> resource intensive.<br>You should use at least a 1-second delay.</p>
                    <button id="btn-fixLowDelay" class="btn btn-warning" type="button">Fix</button>
                    <button type="button" id="dismiss-lowDelay" class="btn-close" aria-label="Dismiss Low Delay alert"></button>
                </div>
                <!-- end alert: low delay -->
                <!-- end delay -->

                <!-- overwrite -->
                <div id="help-input-overwrite" class="form-text text-white d-block">
                    <label for="input-delay" class="form-label">Prepend entries with://</label>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text" for="input-overwrite">Protocol</label>
                    <select class="form-select" id="input-overwrite">
                        <option value="" selected></option>
                        <option value="https">https</option>
                        <option value="http">http</option>
                    </select>
                </div>
                <!-- end overwrite -->

                <!-- close this tab -->
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="input-replaceThisTab">
                    <label class="form-check-label" for="input-replaceThisTab">Replace this tab with first entry</label>
                </div>
                <!-- end close this tab -->

                <!-- open in reverse order -->
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="input-openReverse">
                    <label class="form-check-label" for="input-openReverse">Open in reverse order</label>
                </div>
                <!-- end open in reverse order -->

                <!-- advanced: testing and batching -->
                <!--<div class="form-check form-switch mt-3">
                    <input class="form-check-input" type="checkbox" role="switch" id="input-testValidPath">
                    <label class="form-check-label" for="input-testValidPath">Use advanced options</label>
                </div>-->
                <!-- end advanced: testing and batching -->

                <!-- buttons -->
                <div class="mt-4 text-center">
                    <div class="btn-group" role="group" aria-label="Actions cuttons">

                        <!-- btn group: paste actions -->
                        <div class="btn-group">
                            <!-- btn: paste from clipboard -->
                            <button type="button" id="btn-paste" class="btn btn-dark">
                                <i class="fa-solid fa-clipboard me-2"></i>
                                Paste
                            </button>
                            <!-- end btn: paste from clipboard -->
                            <!-- btn dropdown: paste actions -->
                            <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <!-- paste: prepend -->
                                <li>
                                    <button class="dropdown-item" id="btn-paste-prepend">
                                        <i class="fa-solid fa-forward-step me-2"></i>
                                        Prepend
                                    </button>
                                </li>
                                <!-- end paste: prepend -->

                                <!-- paste: append -->
                                <li>
                                    <button class="dropdown-item" id="btn-paste-append">
                                        <i class="fa-solid fa-backward-step me-2"></i>
                                        Append
                                    </button>
                                </li>
                                <!-- end paste: append -->

                                <li><hr class="dropdown-divider"></li>

                                <!-- paste: upload -->
                                <li>
                                    <button class="dropdown-item" id="btn-paste-upload">
                                        <i class="fa-solid fa-file-arrow-up me-2"></i>
                                        Upload
                                    </button>
                                </li>
                                <!-- end paste: upload -->

                            </ul>
                            <!-- end btn dropdown: paste actions -->
                        </div>
                        <!-- end btn group: paste actions -->

                        <!-- btn: test -->
                        <!--<button id="btn-testURLs" type="button" class="btn btn-primary d-none"-->
                        <!--        data-bs-toggle="collapse" data-bs-target="#testBed"-->
                        <!--        aria-expanded="false" aria-controls="testBed">-->
                        <!--    <i class="fa-solid fa-circle-down me-2"></i>-->
                        <!--    Test-->
                        <!--</button>-->

                        <!-- btn: open -->
                        <button id="btn-openTabs" type="button" class="btn btn-success">
                            <i class="fa-solid fa-up-right-from-square me-2"></i>
                            Open
                        </button>

                        <!-- btn: clear -->
                        <button id="btn-clearURLs" type="button" class="btn btn-dark">
                            <i class="fa-solid fa-delete-left me-2"></i>
                            Clear
                        </button>

                    </div>
                </div>
                <!-- end buttons -->

            </div>
            <!-- end Options -->

        </div>
        <!-- end form: urls to be opened -->

    </section>
    <!-- end Input Panel -->

    <!-- Test Bed -->
    <!--<div class="collapse" id="testBed">
    <section class="container mt-3 py-3 bg-secondary rounded">
        <div class="col">

            <h2 class="text-center fade" id="devMessage">This feature is currently under development.</h2>

        </div>
    </section>
    </div>-->
    <!-- end Test Bed -->

</main>


<!-- Off Canvas: Storage -->
<aside>

    <div class="offcanvas offcanvas-top offcanvas-fullscreen text-bg-dark" data-bs-scroll="true" tabindex="-1" id="offcanvas-storage" aria-labelledby="offcanvas-storage">

        <div class="container">

            <!-- offcanvas - storage: title bar -->
            <div class="row">
                <div class="col">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                            <i class="fa-solid fa-database me-2"></i>
                            Storage
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                                data-bs-toggle="tooltip" data-bs-title="Press 'esc' to close this panel"
                                aria-label="Close"></button>
                    </div>
                </div>
            </div>
            <!-- end offcanvas - storage: title bar -->

            <!-- offcanvas - storage: body -->
            <div class="row">
                <div class="col">
                    <div class="offcanvas-body" id="offcanvas-body-storage">
                        
                        
                        <!-- Storage: no url groups -->
                        <div id="offcanvas-storage-no-url-groups" class="d-none">
                            <p class="lead text-center mb-1">You have not saved any URLs yet.</p>
                            <p class="text-center">Add a list to reuse in the future.</p>
                            <p class="text-center">
                                <button id="btn-addFirstUrlGroup" class="btn btn-secondary btn-add-urlGroup"
                                        data-bs-toggle="collapse" data-bs-target="#collapse-add-UrlGroup"
                                        aria-expanded="false" aria-controls="collapse-add-UrlGroup">
                                    <i class="fa-solid fa-plus me-2"></i>
                                    Add
                                </button>
                            </p>
                            <div class="collapse" id="collapse-add-UrlGroup">
                                <div class="card card-body col-md-12 col-lg-8 mx-auto text-bg-secondary">
                                    <!-- inputs: add first url group -->
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-1">URLs *</p>
                                            <!-- textarea: urls -->
                                            <div class="mb-3">
                                                <label for="input-firstUrlGroup-urls" class="form-label">Copy-Paste or type each web address onto a separate line. Blank lines and extra whitespace will be ignored.</label>
                                                <textarea class="form-control" id="input-firstUrlGroup-urls" rows="12"></textarea>
                                                <div id="help-input-firstUrlGroup" class="form-text text-warning d-none">* Required.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-5">
                                        <div class="col">
                                            <!-- text: group name -->
                                            <label class="form-check-label" for="input-firstUrlGroup-groupName">Group name</label>
                                            <input type="text" id="input-firstUrlGroup-groupName" class="form-control" placeholder="" aria-label="Group name">
                                        </div>
                                        <div class="col">
                                            <!-- text: group description -->
                                            <label class="form-check-label" for="input-firstUrlGroup-groupDescription">Description</label>
                                            <input type="text" id="input-firstUrlGroup-groupDescription" class="form-control" placeholder="" aria-label="Description">
                                        </div>
                                    </div>
                                    <!-- end inputs: add first url group -->
                                    <!-- buttons: first url group -->
                                    <div class="row">
                                        <div class="col-auto mx-auto">

                                            <div class="btn-group" role="group" aria-label="Basic example">

                                                <!-- btn: paste into first url group textarea -->
                                                <button type="button" id="btn-firstUrlGroup-paste" class="btn btn-dark">
                                                    <i class="fa-solid fa-clipboard me-2"></i>
                                                    Paste
                                                </button>

                                                <!-- btn: clear first url group inputs -->
                                                <button type="button" id="btn-firstUrlGroup-clear" class="btn btn-dark">
                                                    <i class="fa-solid fa-delete-left me-2"></i>
                                                    Clear
                                                </button>

                                                <!-- btn: save first url group -->
                                                <button type="button" id="btn-firstUrlGroup-save" class="btn btn-success">
                                                    <i class="fa-solid fa-plus me-2"></i>
                                                    Save
                                                </button>

                                                <!-- btn: cancel inputting first url group -->
                                                <button type="button" id="btn-firstUrlGroup-cancel" class="btn btn-dark"
                                                        data-bs-toggle="collapse" data-bs-target="#collapse-add-UrlGroup"
                                                        aria-expanded="true" aria-controls="collapse-add-UrlGroup">
                                                    <i class="fa-solid fa-ban me-2"></i>
                                                    Cancel
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                    <!-- end buttons: first url group -->
                                </div>
                            </div>
                        </div>
                        <!-- end Storage: no url groups -->

                        <!-- Storage: has url groups -->
                        <div id="offcanvas-storage-has-url-groups" class="d-none">

                            <!-- accordion: existing url groups -->
                            <div class="accordion" id="accordion-existing-url-groups">

                                <!-- accordion-item: storage actions -->
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="accordion-item-storage-actions">
                                        <button class="accordion-button collapsed text-bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#urlGroupBody-storageActions" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            <i class="fa-solid fa-plus-minus me-2"></i>
                                            Actions &amp; Stats
                                        </button>
                                    </h2>
                                    <div id="urlGroupBody-storageActions" class="accordion-collapse collapse" aria-labelledby="accordion-item-storage-actions" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">

                                            <div class="container px-0">

                                                <!-- row: storage capacity - has been calculated -->
                                                <div class="row" id="row-storageCapacity">

                                                    <div class="col text-center">
                                                        <p class="lead">

                                                            You are using <span class="fw-bold" id="usedStorageSpace"></span> out of <span id="storageCapacity"></span>. <span class="fw-bold">(<span id="usedStoragePercent"></span>%)</span>

                                                            <a tabindex="0" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title="Local Storage" data-bs-content="Used by all tools on this domain">
                                                                <i class="fa-solid fa-circle-question ms-2 font-color-dark"></i>
                                                            </a>
                                                        </p>
                                                    </div>

                                                </div>
                                                <!-- end row: storage capacity - has been calculated -->

                                                <!-- row: storage actions -->
                                                <div class="row" id="row-storageActions">

                                                    <!-- nav tabs: storage actions -->
                                                    <ul class="nav nav-pills nav-justified pe-0 mb-3" id="myTab" role="tablist">

                                                        <!-- tab: add url group -->
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link" id="tab-addUrlGroup" data-bs-toggle="tab" data-bs-target="#pane-addUrlGroup" type="button" role="tab" aria-controls="pane-addUrlGroup" aria-selected="false">
                                                                <i class="fa-solid fa-plus me-2"></i>
                                                                Add
                                                            </button>
                                                        </li>
                                                        <!-- end tab: add url group -->

                                                        <!-- tab: edit url group -->
                                                        <!--<li class="nav-item" role="presentation">-->
                                                        <!--    <button class="nav-link" id="tab-editUrlGroup" data-bs-toggle="tab" data-bs-target="#pane-editUrlGroup" type="button" role="tab" aria-controls="pane-editUrlGroup" aria-selected="false">-->
                                                        <!--        <i class="fa-solid fa-pen-to-square me-2"></i>-->
                                                        <!--        Edit-->
                                                        <!--    </button>-->
                                                        <!--</li>-->
                                                        <!-- end tab: edit url group -->

                                                        <!-- tab: delete url group(s) -->
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link" id="tab-deleteUrlGroup" data-bs-toggle="tab" data-bs-target="#pane-deleteUrlGroup" type="button" role="tab" aria-controls="pane-deleteUrlGroup" aria-selected="false">
                                                                <i class="fa-solid fa-minus me-2"></i>
                                                                Delete
                                                            </button>
                                                        </li>
                                                        <!-- end tab: delete url group(s) -->

                                                    </ul>
                                                    <!-- nav tabs: storage actions -->

                                                    <!-- panes: storage actions -->
                                                    <div class="tab-content px-0" id="myTabContent">

                                                        <!----------------------------->
                                                        <!-- pane: add new url group -->
                                                        <div class="tab-pane fade" id="pane-addUrlGroup" role="tabpanel" aria-labelledby="tab-addUrlGroup" tabindex="0">

                                                            <!-- alert: successful new group save -->
                                                            <div id="alert-newGroupSaved" class="alert alert-success alert-dismissible d-none fade" role="alert">
                                                                <i class="fa-solid fa-check me-2"></i> New URL group saved.
                                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            </div>
                                                            <!-- end alert: successful new group save -->

                                                            <!-- form: add new URL group -->
                                                            <div class="">
                                                                <!-- inputs: add new url group -->
                                                                <div class="row">
                                                                    <div class="col">
                                                                        <p class="mb-1">URLs *</p>
                                                                        <!-- textarea: urls -->
                                                                        <div class="mb-3">
                                                                            <label for="input-newUrlGroup-urls" class="form-label">Copy-Paste or type each web address onto a separate line. Blank lines and extra whitespace will be ignored.</label>
                                                                            <textarea class="form-control" id="input-newUrlGroup-urls" rows="12"></textarea>
                                                                            <div id="help-input-newUrlGroup" class="form-text text-warning d-none">* Required.</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row mb-5">
                                                                    <div class="col">
                                                                        <!-- text: group name -->
                                                                        <label class="form-check-label" for="input-newUrlGroup-groupName">Group name</label>
                                                                        <input type="text" id="input-newUrlGroup-groupName" class="form-control" placeholder="" aria-label="Group name">
                                                                    </div>
                                                                    <div class="col">
                                                                        <!-- text: group description -->
                                                                        <label class="form-check-label" for="input-newUrlGroup-groupDescription">Description</label>
                                                                        <input type="text" id="input-newUrlGroup-groupDescription" class="form-control" placeholder="" aria-label="Description">
                                                                    </div>
                                                                </div>
                                                                <!-- end inputs: add new url group -->
                                                                <!-- buttons: new url group -->
                                                                <div class="row">
                                                                    <div class="col-auto mx-auto">

                                                                        <div class="btn-group" role="group" aria-label="Basic example">

                                                                            <!-- btn: paste into new url group textarea -->
                                                                            <button type="button" id="btn-newUrlGroup-paste" class="btn btn-secondary">
                                                                                <i class="fa-solid fa-clipboard me-2"></i>
                                                                                Paste
                                                                            </button>

                                                                            <!-- btn: clear new url group inputs -->
                                                                            <button type="button" id="btn-newUrlGroup-clear" class="btn btn-secondary">
                                                                                <i class="fa-solid fa-delete-left me-2"></i>
                                                                                Clear
                                                                            </button>

                                                                            <!-- btn: save new url group -->
                                                                            <button type="button" id="btn-newUrlGroup-save" class="btn btn-success">
                                                                                <i class="fa-solid fa-plus me-2"></i>
                                                                                Save
                                                                            </button>

                                                                            <!-- btn: cancel inputting new url group -->
                                                                            <button type="button" id="btn-newUrlGroup-cancel" class="btn btn-secondary"
                                                                                    data-bs-toggle="collapse" data-bs-target="#collapse-add-UrlGroup"
                                                                                    aria-expanded="true" aria-controls="collapse-add-UrlGroup">
                                                                                <i class="fa-solid fa-ban me-2"></i>
                                                                                Cancel
                                                                            </button>

                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <!-- end buttons: new url group -->
                                                            </div>
                                                            <!-- end form: add new URL group -->

                                                        </div>
                                                        <!-- end pane: add new url group -->
                                                        <!--------------------------------->


                                                        <!-------------------------->
                                                        <!-- pane: edit url group -->
                                                        <!--<div class="tab-pane fade" id="pane-editUrlGroup" role="tabpanel" aria-labelledby="tab-editUrlGroup" tabindex="0">-->
                                                        <!--    <p class="lead text-center">This feature is currently under development.</p>-->
                                                        <!--</div>-->
                                                        <!-- end pane: edit url group -->
                                                        <!------------------------------>


                                                        <!------------------------------->
                                                        <!-- pane: delete url group(s) -->
                                                        <div class="tab-pane fade max-height-700-with-overflow-scroll" id="pane-deleteUrlGroup" role="tabpanel" aria-labelledby="tab-deleteUrlGroup" tabindex="0">

                                                            <!-- buttons: delete URL groups -->
                                                            <div class="d-flex justify-content-center">
                                                                <div class="btn-group my-3" role="group" aria-label="Basic example">
                                                                    <button type="button" id="btn-deleteUrlGroup-clear" class="btn btn-secondary">
                                                                        <i class="fa-solid fa-delete-left me-2"></i>
                                                                        Clear
                                                                    </button>
                                                                    <button type="button" id="btn-deleteUrlGroup-delete" class="btn btn-danger">
                                                                        <i class="fa-solid fa-trash-can me-2"></i>
                                                                        Delete
                                                                    </button>
                                                                    <button type="button" id="btn-deleteUrlGroup-cancel" class="btn btn-secondary">
                                                                        <i class="fa-solid fa-ban me-2"></i>
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <!-- end buttons: delete URL groups -->

                                                            <div id="container-deleteUrlGroups" class="table-responsive">

                                                                <p class="text-center mb-1">WARNING: Deletion cannot be undone.</p>

                                                                <p class="text-center">Click on a row to toggle selection.</p>

                                                                <!-- table: URL groups for deletion -->
                                                                <table class="table table-hover">
                                                                    <thead>
                                                                    <tr>
                                                                        <th scope="col"></th>
                                                                        <th scope="col">
                                                                            <input type="checkbox" id="checkbox-selectAll-urlGroupsForDeletion" name="checkbox-selectAll-urlGroupsForDeletion">
                                                                        </th>
                                                                        <th scope="col">Date</th>
                                                                        <th scope="col">URLs</th>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Description</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody id="cloneAppendTarget-deleteUrlGroupRow" class="table-group-divider">

                                                                    <!-- clone: table row - URL group for deletion -->
                                                                    <tr id="clone-row-deleteUrlGroup" class="tableRow-urlGroupForDeletion d-none">

                                                                        <!-- cell: url group ordinal id -->
                                                                        <th scope="row" class="clone-cell-deleteUrlGroup-groupId"></th>

                                                                        <!-- cell: checkbox for url group for deletion -->
                                                                        <td class="clone-cell-deleteUrlGroup-checkbox">
                                                                            <input type="checkbox" id="clone-input-deleteUrlGroup-checkbox" class="" name="" data-urlgroupid="">
                                                                        </td>

                                                                        <!-- cell: date -->
                                                                        <td class="clone-cell-deleteUrlGroup-date"></td>

                                                                        <!-- cell: URLs -->
                                                                        <td class="clone-cell-deleteUrlGroup-urls"></td>

                                                                        <!-- cell: name -->
                                                                        <td class="clone-cell-deleteUrlGroup-name"></td>

                                                                        <!-- cell: description -->
                                                                        <td class="clone-cell-deleteUrlGroup-description"></td>

                                                                    </tr>
                                                                    <!-- end clone: table row - URL group for deletion -->

                                                                    </tbody>
                                                                </table>
                                                                <!-- end table: URL groups for deletion -->

                                                            </div>

                                                        </div>
                                                        <!-- end pane: delete url group(s) -->
                                                        <!----------------------------------->

                                                    </div>
                                                    <!-- panes: storage actions -->

                                                </div>
                                                <!-- end row: storage actions -->

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <!-- end accordion-item: stroage actions -->

                                <!-- clone source: accordion item -->
                                <div class="accordion-item d-none" id="accordion-item-cloneSource-existingUrlGroup">
                                    <h2 class="accordion-header" id="urlGroupHeader-cloneSource">
                                        <button class="accordion-button collapsed text-bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#urlGroupBody-cloneSource" aria-expanded="false" aria-controls="urlGroupBody-cloneSource">
                                            <i class="fa-solid fa-bars me-2"></i>
                                            HEADER
                                        </button>
                                    </h2>
                                    <div id="urlGroupBody-cloneSource" class="accordion-collapse collapse" aria-labelledby="urlGroupHeader-cloneSource">
                                        <div class="accordion-body max-height-400-with-overflow-scroll">
                                            BODY
                                        </div>
                                    </div>
                                </div>
                                <!-- end clone source: accordion item -->

                            </div>
                            <!-- end accordion: existing url groups -->

                        </div>
                        <!-- end Storage: has url groups -->
                        
                        
                    </div>
                </div>
            </div>
            <!-- end offcanvas - storage: body -->

        </div>

    </div>

</aside>
<!-- end Off Canvas: Storage -->


<!-- Off Canvas: settings -->
<!--<aside>-->
<!---->
<!--    <div class="offcanvas offcanvas-top offcanvas-fullscreen text-bg-dark" data-bs-scroll="true" tabindex="-1" id="offcanvas-settings" aria-labelledby="offcanvas-settings">-->
<!---->
<!--        <div class="container">-->
<!---->
                <!-- offcanvas - settings: title bar -->
<!--            <div class="row">-->
<!--                <div class="col">-->
<!--                    <div class="offcanvas-header">-->
<!--                        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">-->
<!--                            <i class="fa-solid fa-gear me-2"></i>-->
<!--                            Settings-->
<!--                        </h5>-->
<!--                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"-->
<!--                                data-bs-toggle="tooltip" data-bs-title="Press 'esc' to close this panel"-->
<!--                                aria-label="Close"></button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
                <!-- end offcanvas - settings: title bar -->
<!---->
                <!-- offcanvas - settings: body -->
<!--            <div class="row">-->
<!--                <div class="col">-->
<!--                    <div class="offcanvas-body" id="offcanvas-body-settings"></div>-->
<!--                </div>-->
<!--            </div>-->
                <!-- end offcanvas - settings: body -->
<!---->
<!--        </div>-->
<!---->
<!--    </div>-->
<!---->
<!--</aside>-->
<!-- end Off Canvas: settings -->


<!-- end Page Content -->
<!---------------------->


<!------------->
<!-- scripts -->

<!---------------->
<!-- JS: jQuery -->
<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>

<!------------------->
<!-- JS: Bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

<!------------------------>
<!-- JS: MultiTabOpener -->
<script src="MultiTabOpener.js"></script>
<script>

    // ====
    // main
    $(document).ready(function() {

        // ---------------
        // enable tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        // ---------------
        // enable popovers
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

        // -----------------
        // get form elements
        const elements =
        {
            "inputs":
            {
                "urls": $("#input-urls"),
                "delayCheck": $("#check-delay"),
                "delay": $("#input-delay"),
                "delaySlider": $("#slider-delay"),
                "prepend": $("#input-overwrite"),
                "validityTest": $("#input-testValidPath"),
                "replaceTab": $("#input-replaceThisTab"),
                "openReverse": $("#input-openReverse"),
                "storage":
                {
                    "firstUrlGroup":
                    {
                        "urls": $("#input-firstUrlGroup-urls"),
                        "groupName": $("#input-firstUrlGroup-groupName"),
                        "groupDescription": $("#input-firstUrlGroup-groupDescription"),
                    },
                    "newUrlGroup":
                    {
                        "urls": $("#input-newUrlGroup-urls"),
                        "groupName": $("#input-newUrlGroup-groupName"),
                        "groupDescription": $("#input-newUrlGroup-groupDescription"),
                    },
                    "editUrlGroup": {},
                    "deleteUrlGroup":
                    {
                        "selectAll": $("#checkbox-selectAll-urlGroupsForDeletion"),
                        "checkboxes": $(".checkbox-deleteUrlGroup"),
                    }
                }
            },

            "alerts":
            {
                "lowDelay": $("#alert-lowDelay"),
                "storage":
                {
                    "newGroupSaved": $("#alert-newGroupSaved")
                }
            },

            "buttons":
            {
                "paste": $("#btn-paste"),
                "paste_prepend": $("#btn-paste-prepend"),
                "paste_append": $("#btn-paste-append"),
                "paste_upload": $("#btn-paste-upload"),
                "test": $("#btn-testURLs"),
                "open": $("#btn-openTabs"),
                "clear": $("#btn-clearURLs"),
                "fixLowDelay": $("#btn-fixLowDelay"),
                "dismissLowDelay": $("#dismiss-lowDelay"),
                "storage":
                {
                    "firstUrlGroup":
                    {
                        "add": $("#btn-addFirstUrlGroup"),
                        "paste": $("#btn-firstUrlGroup-paste"),
                        "clear": $("#btn-firstUrlGroup-clear"),
                        "save": $("#btn-firstUrlGroup-save"),
                        "cancel": $("#btn-firstUrlGroup-cancel"),
                    },
                    "newUrlGroup":
                    {
                        "paste": $("#btn-newUrlGroup-paste"),
                        "clear": $("#btn-newUrlGroup-clear"),
                        "save": $("#btn-newUrlGroup-save"),
                        "cancel": $("#btn-newUrlGroup-cancel"),
                    },
                    "editUrlGroup": {},
                    "deleteUrlGroup":
                    {
                        "clear": $("#btn-deleteUrlGroup-clear"),
                        "delete": $("#btn-deleteUrlGroup-delete"),
                        "cancel": $("#btn-deleteUrlGroup-cancel"),
                    },
                }
            },

            "offcanvas":
            {
                "storage": $("#offcanvas-body-storage"),
                "settings": $("#offcanvas-body-settings"),
            }
        }
        // end get form elements
        // ---------------------

        // --------------------------------------------------
        // initialize the multi tab opener with page elements
        const mto = new MultiTabOpener(elements);

    });
    // end main
    // ========

</script>
<!-- end JS: MultiTabOpener -->

<!-- end scripts -->
<!----------------->

</body>
</html>

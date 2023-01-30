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

</head>
<body class="text-bg-dark">

<!------------------>
<!-- Page Content -->

<main>

    <!-- Title Bar -->
    <section class="container my-3">
        <div class="row">
            <div class="col text-center">
                <h1>Multi Tab Opener</h1>
            </div>
        </div>
    </section>
    <!-- end Title Bar -->

    <!-- Input Panel -->
    <section class="container py-3 bg-secondary rounded">

        <!-- form: urls to be opened -->
        <div class="row g-3">

            <!-- Column: URLs input -->
            <div class="col-md-12 col-lg-8">

                <h2>URLs</h2>

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

                <h2>Options</h2>

                <!-- delay -->
                <div id="help-input-delay" class="form-text text-white d-block">
                    <label for="input-delay" class="form-label">Millisecond delay before each new tab:</label>
                </div>
                <!-- input group: delay -->
                <div class="input-group mb-3">
                    <div class="input-group-text">
                        <input type="checkbox" id="check-delay" class="form-check-input mt-0" aria-label="Checkbox for delay" checked>
                    </div>
                    <input type="number" id="input-delay" class="form-control" value="2000" aria-label="Text input with checkbox for delay">

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
                    <label for="input-delay" class="form-label">Prepend entries with:</label>
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

                <!-- test valid path -->
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="input-testValidPath">
                    <label class="form-check-label" for="input-testValidPath">Test for reachability before opening</label>
                </div>
                <!-- end test valid path -->

                <!-- close this tab -->
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="input-replaceThisTab">
                    <label class="form-check-label" for="input-replaceThisTab">Replace this tab with first entry</label>
                </div>
                <!-- end close this tab -->

                <!-- close this tab -->
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="input-openReverse">
                    <label class="form-check-label" for="input-openReverse">Open in reverse order</label>
                </div>
                <!-- end close this tab -->

                <!-- buttons -->
                <div class="mt-4 text-center">
                    <div class="btn-group" role="group" aria-label="Form action">

                        <!-- btn: paste from clipboard -->
                        <button id="btn-paste" type="button" class="btn btn-dark">
                            <i class="fa-solid fa-clipboard me-2"></i>
                            Paste
                        </button>

                        <!-- btn: test -->
                        <button id="btn-testURLs" type="button" class="btn btn-primary d-none"
                                data-bs-toggle="collapse" data-bs-target="#testBed"
                                aria-expanded="false" aria-controls="testBed">
                            <i class="fa-solid fa-circle-down me-2"></i>
                            Test
                        </button>

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
    <div class="collapse" id="testBed">
    <section class="container mt-3 py-3 bg-secondary rounded">
        <div class="col">

            <h2 class="text-center fade" id="devMessage">This feature is currently under development.</h2>

        </div>
    </section>
    </div>
    <!-- end Test Bed -->

</main>

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

    $(document).ready(function() {

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
            },

            "alerts":
            {
                "lowDelay": $("#alert-lowDelay"),
            },

            "buttons":
            {
                "paste": $("#btn-paste"),
                "test": $("#btn-testURLs"),
                "open": $("#btn-openTabs"),
                "clear": $("#btn-clearURLs"),
                "fixLowDelay": $("#btn-fixLowDelay"),
                "dismissLowDelay": $("#dismiss-lowDelay")
            }
        }

        const mto = new MultiTabOpener(elements);

    });

</script>
<!-- end JS: MultiTabOpener -->

<!-- end scripts -->
<!----------------->

</body>
</html>

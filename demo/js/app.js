$(function() {
    // Create new instance of the API library
    // Demo purposes only, follow OAuth best practices to protect your keys and tokens
    // The default setting connects to localhost:8000 (if you're running the reference implementation server)
    var onderwijsData = new Surfnet.OnderwijsData("http://localhost:8000"); 

    // If you have oauth auth in place, you can pass the token like so:
    // var onderwijsData = new Surfnet.OnderwijsData("<your api endpoint here>", "<your oauth access token here>");
 
    // Called when hash changes
    window.onhashchange = function() {
        showViewForHash();
    };

    // Show view based on current hash
    function showViewForHash() {
        var url = location.hash.replace("#", "");
        var params = url.split("=");
        var model = params[0];
        var id = params[1];

        if (id != "") {
            showView(id, model);
        } else {
            showView(null, model);
        }

        // Make navigation button active
        $("#nav a").removeClass("active");
        var selector = "a[data-type='" + model + "']";
        $(selector).addClass('active');
    }

    // Show view
    function showView(id, model) {
        var client = getClientForName(model);
        var template = model;

        if (id != null) {
            client.getById(id, function(error, data) {
                if (data) {
                    if (!("data" in data)) {
                        template += "_detail";
                    }

                    // Insert schedule, test results and course results
                    if (model == "persons") {
                        var scheduleClient = onderwijsData.createScheduleClient();
                        scheduleClient.getByPersonId(data.id, {start : "1997-07-16T19:20:30.45", end : "2014-07-16T19:20:30.45Z"}, function (error, scheduleData) {
                            if (scheduleData) {
                                data.schedule = scheduleData.data;
                                renderTemplate(template, data);
                            }
                        });
                        
                        var testResultClient = onderwijsData.createTestResultClient();
                        testResultClient.getByPersonId(data.id, {start : "1997-07-16T19:20:30.45", end : "2014-07-16T19:20:30.45Z"}, function (error, testresultData) {
                            if (testresultData) {
                                data.testresults = testresultData.data;
                                renderTemplate(template, data);
                            }
                        });

                        var courseResultClient = onderwijsData.createCourseResultClient();
                        courseResultClient.getByPersonId(data.id, {start : "1997-07-16T19:20:30.45", end : "2014-07-16T19:20:30.45Z"}, function (error, courseResultData) {
                            if (courseResultData) {
                                data.courseresults = courseResultData.data;
                                renderTemplate(template, data);
                            }
                        });
                    }
 
                    if (model == "rooms") {
                        var scheduleClient = onderwijsData.createScheduleClient();
                        scheduleClient.getByRoomId(data.id, {start : "1997-07-16T19:20:30.45", end : "2014-07-16T19:20:30.45Z"}, function (error, scheduleData) {
                            if (scheduleData) {
                                data.schedule = scheduleData.data;
                                renderTemplate(template, data);
                            }
                        });
                    }

                    renderTemplate(template, data);
                }
            });
        } else {
            client.getList(function (error, data) {
                if (data) {
                    renderTemplate(template, data.data);
                }
            });
        }
    }

    // Get client for data type attribute
    function getClientForName(name){
        var client;

        switch(name) {
            case 'persons':
                client = onderwijsData.createPersonClient();
            break;
            
            case 'buildings':
                client = onderwijsData.createBuildingClient();
            break;
            
            case 'rooms':
                client = onderwijsData.createRoomClient();
            break;
            
            case 'groups':
                client = onderwijsData.createGroupClient();
            break;
                            
            case 'newsfeeds':
                client = onderwijsData.createNewsFeedClient();
            break;
            
            case 'newsitems':
                client = onderwijsData.createNewsItemClient();
            break;

            case 'courses':
                client = onderwijsData.createCourseClient();
            break;
            
            case 'courseresults':
                client = onderwijsData.createCourseResultClient();
            break;
            
            case 'minors':
                client = onderwijsData.createMinorClient();
            break;
            
            case 'testresults':
                client = onderwijsData.createTestResultClient();
            break;
            
            case 'schedule':
                client = onderwijsData.createScheduleClient();
            break;
            
            default:
        }

        return client;
    }

    // Render template
    function renderTemplate(model, data){
        var source   = $("#"+model).html();
        var template = Handlebars.compile(source);

        var html = template(data);
        $('#page').html(html);

        $('.footable').footable({
            addRowToggle: false
        });
        
        updateDateFormatting();
        initializeSearchMap(model);
        initializeDetailMap();
    }
    
    function updateDateFormatting () {
        var dateFormat = 'dd/MM HH:mm';
        $(".dateFormat").each(function (idx, elem) {
            $(elem).text($.format.date($(elem).text(), dateFormat));
        });
    }

    function initializeSearchMap () {
        var $map = $('.search-map'),
            $form = $('.search-form');

        if ($map.length > 0) {
            var lat_lng = new google.maps.LatLng($map.data('latitude'),$map.data('longitude'));

            var options = {
                center: lat_lng,
                zoom: 13
            };

            var map = new google.maps.Map($map.get(0), options);

            /**
            new google.maps.Marker({
                position: lat_lng,
                map: map
            });
             */
        }

        if ($form.length > 0) {
            $form.on('submit', function(e) {
                e.preventDefault();

                var $form = $(this),
                    client = getClientForName($form.data('model')),
                    params = {
                        'll': $form.find('input[name=lon]').val() + ',' + $form.find('input[name=lat]').val(),
                        'r': $form.find('select[name=r]').val()
                    };

                client.getByLocation(params, function (error, markerData) {
                    if (markerData) {
                        for (var i in markerData) {
                            var data = markerData[i];

                            var lat_lng = new google.maps.LatLng(data.lat,data.lon);

                            new google.maps.Marker({
                                position: lat_lng,
                                map: map,
                                title: data.name
                            });
                        }
                    }
                });
            });
        }
    }

    function initializeDetailMap () {
        $('.map').each(function() {
            var $map = $(this);

            var lat_lng = new google.maps.LatLng($map.data('latitude'),$map.data('longitude'));

            var options = {
                center: lat_lng,
                zoom: 13
            };

            var map = new google.maps.Map(this, options);

            new google.maps.Marker({
                position: lat_lng,
                map: map
            });
        });
    }

    // Open persons by default
    if (location.hash == "") {
        location.hash = "#persons";
    }

    // Show view for current hash
    showViewForHash();
});

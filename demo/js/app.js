$(function() {
    // Create new instance of the API library
    var onderwijsData = new Surfnet.OnderwijsData('http://imogen.surfnet.nl:8001/'); 

    // Called when hash changes
    window.onhashchange = function() {
        showViewForHash();
    }

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
        var client = getClientForName(model)
        var template = model;

        if (id != null) {
            client.getById(id, function (error, data) {
                if (data) {
                    if (!("data" in data)) {
                        template += "_detail";
                    }

                    // Insert schedule data for persons and rooms
                    if (model == "persons" || model == "rooms") {
                        var schedule = client.scheduleClientById(data.id);
                        schedule.getList({start : "1997-07-16T19:20:30.45", end : "2014-07-16T19:20:30.45Z"}, function (error, scheduleData) {
                            if (scheduleData) {
                                data.schedule = scheduleData.data;
                                renderTemplate(template, data);
                            }
                        })
                    }

                    renderTemplate(template, data);
                }
            })
        } else {
            client.getList(function (error, data) {
                if (data) {
                    renderTemplate(template, data.data);
                }
            })
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
    }
    
    function updateDateFormatting () {
        var dateFormat = 'dd/MM HH:mm';
        $(".dateFormat").each(function (idx, elem) {
            $(elem).text($.format.date($(elem).text(), dateFormat));
        });
    }

    // Open persons by default
    if (location.hash == "") {
        location.hash = "#persons";
    }

    // Show view for current hash
    showViewForHash();
});
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

        if (id != null) {
            showView(id, model);
        } else {
            showView(null, model);
        }
        
        // Make navigation button active
        $("#nav a").removeClass("active");
        var selector = "a[data-type='"+model+"']";
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
                client = onderwijsData.personClient();
            break;
            
            case 'buildings':
                client = onderwijsData.buildingClient();
            break;
            
            case 'rooms':
                client = onderwijsData.roomClient();
            break;
            
            case 'groups':
                client = onderwijsData.groupClient();
            break;
                            
            case 'newsfeeds':
                client = onderwijsData.newsFeedClient();
            break;
            
            case 'newsitems':
                client = onderwijsData.newsItemClient();
            break;

            case 'courses':
                client = onderwijsData.courseClient();
            break;
            
            case 'courseresults':
                client = onderwijsData.courseResultClient();
            break;
            
            case 'minors':
                client = onderwijsData.minorClient();
            break;
            
            case 'testresults':
                client = onderwijsData.testResultClient();
            break;
            
            case 'schedule':
                client = onderwijsData.scheduleClient();
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
    }

    // Open persons by default
    if (location.hash == "") {
        location.hash = "#persons";
    }

    // Show view for current hash
    showViewForHash();
});
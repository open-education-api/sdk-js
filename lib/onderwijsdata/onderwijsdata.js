var Surfnet = Surfnet || {};

Surfnet.OnderwijsData = function (url) { 
    this.config = {endPoint: url};

    /**
     * Returns a new person client.
     */
    this.personClient = function(){
        return new this.PersonClient(this.config);
    }

    /**
     * Returns a new building client.
     */
    this.buildingClient = function(){
        return new this.BuildingClient(this.config);
    }

    /**
     * Returns a new room client.
     */
    this.roomClient = function(){
        return new this.RoomClient(this.config);
    }

    /**
     * Returns a new group client.
     */
    this.groupClient = function(){
        return new this.GroupClient(this.config);
    }

    /**
     * Returns a new affiliation client.
     */
    this.affiliationClient = function(){
        return new this.AffiliationClient(this.config);
    }

    /**
     * Returns a new newsfeed client.
     */
    this.newsfeedClient = function(){
        return new this.NewsFeedClient(this.config);
    }

    /**
     * Returns a new newsitem client.
     */
    this.newsItemClient = function(){
        return new this.NewsItemClient(this.config);
    }

    /**
     * Returns a new grouprole client.
     */
    this.groupRoleClient = function(){
        return new this.GroupRoleClient(this.config);
    }
};

Surfnet.OnderwijsData.APIClient = {};
Surfnet.OnderwijsData.APIClient.prototype = function (test) {
    /**
     * Get model data list
     *
     * @param {Object} params Parameters.
     * @param {Function} callback(error, data)
     */
    function getList (params, callback) {
        // If first argument is the callback, reassign to the correct var
        if (arguments.length == 1) {
            if (Object.prototype.toString.call(params) == "[object Function]") {
                callback = params; 
            }
        }
        validateCallback(callback); 
        fetchData.call(this, this.modelUrl, params, callback);  
    }

    /**
     * Get model data based on params
     *
     * @param {Object} params Parameters.
     * @param {Function} callback(error, data)
     */
    function get (params, callback) {
        validateCallback(callback);
        fetchData.call(this.modelUrl, params, callback);
    }

    /**
     * @private
     * Fetches data from remote API
     *
     * @param {string} modelUrl API model url paramater.
     * @param {Object} params Parameters.
     * @param {Function} callback(error, data)
     */
    function fetchData (modelUrl, params, callback) {
        var url = this.config.endPoint + modelUrl;
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();// IE7+, Firefox, Chrome, Opera, Safari
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); // for IE6, IE5
        }

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept","application/json");
        xhr.onreadystatechange = function() {
            var status;
            var data;
            if (xhr.readyState == 4) {
                status = xhr.status;
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    callback(null, data);
                } else {
                    callback(xhr.responseText, null);
                }
            }
        }
        xhr.send();

        // Used for testing
        /*
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            data : params,
            success: function(data, textStatus, jqXHR) {
                callback(null, data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                callback(errorThrown, null);
            }
        }); 
        */
    }
    
    /**
     * @private
     * Check if callback is correctly set
     *
     * @param {Function} callback(error, data)
     */
    function validateCallback (callback) {
        if (callback == null && Object.prototype.toString.call(callback) != "[object Function]") {
            throw new Error('getList(), needs "function (error, data) { }" as parameter');
        }
    }

    return {
        getList: getList,
        get: get       
    };
}();
var Surfnet = Surfnet || {};

Surfnet.OnderwijsData = function(url, token) { 
    this.config = {endpoint: url, auth: {token: token}};

    this.init = function() {
        if (this.config.endpoint.slice(-1) != "/") {
            this.config.endpoint += "/";
        }
    };

    /**
     * Returns a new person client.
     */
    this.createPersonClient = function() {
        return new this.PersonClient(this.config);
    };

    /**
     * Returns a new building client.
     */
    this.createBuildingClient = function() {
        return new this.BuildingClient(this.config);
    };

    /**
     * Returns a new room client.
     */
    this.createRoomClient = function() {
        return new this.RoomClient(this.config);
    };

    /**
     * Returns a new group client.
     */
    this.createGroupClient = function() {
        return new this.GroupClient(this.config);
    };

    /**
     * Returns a new newsfeed client.
     */
    this.createNewsFeedClient = function() {
        return new this.NewsFeedClient(this.config);
    };

    /**
     * Returns a new newsitem client.
     */
    this.createNewsItemClient = function() {
        return new this.NewsItemClient(this.config);
    };

    /**
     * Returns a new course result client.
     */
    this.createCourseResultClient = function() {
        return new this.CourseResultClient(this.config);
    };

    /**
     * Returns a new minor client.
     */
    this.createMinorClient = function() {
        return new this.MinorClient(this.config);
    };

    /**
     * Returns a new test result client.
     */
    this.createTestResultClient = function() {
        return new this.TestResultClient(this.config);
    };

    /**
     * Returns a new course client.
     */
    this.createCourseClient = function() {
        return new this.CourseClient(this.config);
    };

    /**
     * Returns a new schedule client.
     */
    this.createScheduleClient = function() {
        return new this.ScheduleClient(this.config);
    };

    this.init();
};

Surfnet.OnderwijsData.APIClient = {};
Surfnet.OnderwijsData.APIClient.prototype = function() {

    /**
     * @private
     * Serializes object
     *
     * @param {Object}
     */
    function serialize(object) {
        var str = [];
        for(var property in object)
        if (object.hasOwnProperty(property)) {
          str.push(encodeURIComponent(property) + "=" + encodeURIComponent(object[property]));
        }
        return str.join("&");
    }

    /**
     * @private
     * Check if callback is correctly set
     *
     * @param {Function} callback(error, data)
     */
    function validateCallback(callback) {
        if (callback == null && Object.prototype.toString.call(callback) != "[object Function]") {
            throw new Error('Callback is missing, include "function (error, data) { }" as parameter');
        }
    }

    /**
     * @private
     * Check for function
     *
     * @param {Function}
     */
    function isFunction(property) {
        return (Object.prototype.toString.call(property) == "[object Function]");
    }
    
    /**
     * @private
     * Returns endpoint with a trailing slash
     *
     */
    function getEndpoint() {
        var url = this.config.endpoint;
        if (url.slice(-1) != "/") {
            url += "/";
        }
        
        return url;
    }

    /**
     * @private
     * Fetches data from remote API
     *
     * @param {string} url API request url.
     * @param {Object} params Parameters.
     * @param {Function} callback(error, data)
     */
    function fetchData(url, params, callback) {
        if (params != null) {
            url = url + "?" + serialize(params); 
        }

        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();// IE7+, Firefox, Chrome, Opera, Safari
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); // for IE6, IE5
        }

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept","application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + this.config.auth.token);
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
        };
        xhr.send();
    }

    /**
     * Get model first result data
     *
     * @param {Object} params Parameters.
     * @param {Function} callback(error, data)
     */
    function getList (params, callback) {
        // If first argument is the callback, reassign to the correct var
        if (arguments.length == 1) {
            if (isFunction(params)) {
                callback = params; 
                params = null;
            }
        }
    
        validateCallback(callback);
        var url = getEndpoint.call(this) + this.modelUrl; 
        fetchData.call(this, url, params, callback);  
    }

    /**
     * Get model data based on url and params
     *
     * @param {string} url
     * @param {Object} params Parameters.
     * @param {Function} callback(error, data)
     */
    function get (url, params, callback) {
        // If second argument is the callback, reassign to the correct var
        if (arguments.length == 2) {
            if (isFunction(params)) {
                callback = params; 
                params = null;
            }
        }

        if (url == null || isFunction(url)) {
            throw new Error('First argument should be "url"'); 
        }

        validateCallback(callback);
        fetchData.call(this, url, params, callback);
    }

    /**
     * Get model data based on id and params
     *
     * @param {string} id
     * @param {Object} params Parameters.
     * @param {Function} callback(error, data)
     */
    function getById (id, params, callback) {
        // If second argument is the callback, reassign to the correct var
        if (arguments.length == 2) {
            if (isFunction(params)) {
                callback = params; 
                params = null;
            }
        }

        if (id == null || isFunction(id)) {
            throw new Error('First argument should be "id"'); 
        }

        // Make url
        var url = getEndpoint.call(this) + this.modelUrl;
        url += "/" + id.toString();

        get.call(this, url, params, callback);
    }

    return {
        getList: getList,
        getById: getById,
        get: get       
    };
}();

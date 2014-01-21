if (!Surfnet) {
    var Surfnet = {};
}

Surfnet.OnderwijsData = function (url) { 
    this.endPoint = url;
    var self = this;
  
    this.personClient = function(){
        var person = new self.PersonClient();
        person.setEndPoint(this.endPoint);
        return person;
    }
};

Surfnet.OnderwijsData.APIClient = {};
Surfnet.OnderwijsData.APIClient.prototype = function () {
    this.endPoint = null; 

    setEndPoint = function(url) {
        this.endPoint = url;
    },
    
    /**
     * Get model data list
     * @param
     */
    getList = function(pageNumber, callback) {
        // If first argument is the callback, reassign to the correct var
        if (arguments.length == 1) {
            if (Object.prototype.toString.call(pageNumber) == "[object Function]") {
                callback = pageNumber; 
            }
        }
    
        // Tell user, we need at least a function
        if (callback == null && Object.prototype.toString.call(callback) != "[object Function]") {
            throw new Error('getList(), needs "function (error, data) { }" as parameter');
        }
        
        if (pageNumber) {
            var params = {page : pageNumber}; 
        }
    
        fetchData(this.modelUrl, pageNumber, callback);  
    },

    /**
     * Get model data based on params
     * @param
     */
    get = function(params, callback) {
        // TODO: error stuff
        fetchData(this.modelUrl, params, callback);
    },

    /**
     * Fetches data from remote API
     * @param
     */
    fetchData = function(modelUrl, params, callback) {
        var url = this.endPoint + modelUrl;
        //var url = "http://localhost:8888/test.json"
        
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
    }

    // Public
    return {
        setEndPoint: setEndPoint,
        getList: getList,
        get: get
       
    };
}();
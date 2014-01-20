if (!Surfnet) {
    var Surfnet = {};
}

Surfnet.OnderwijsData = function() {};
Surfnet.OnderwijsData.APIClient = function() { 
    this.apiURL = "http://localhost:8000/"; 
};

/**
 * Gets first set of persons
 * @param
 */
Surfnet.OnderwijsData.APIClient.prototype.getList = function(callback) {
    this.fetchData(this.modelUrl, null, callback);
};

/**
 * Gets specific person
 * @param
 */
Surfnet.OnderwijsData.APIClient.prototype.get = function(params) {};

/**
 * Fetches data from remote API
 * @param
 */
Surfnet.OnderwijsData.APIClient.prototype.fetchData = function(modelUrl, params, callback) {
    url = this.apiURL + modelUrl;

    $.ajax({
        url: this.apiURL + modelUrl,
        dataType: "json",
        data: {
            format: "json",
        },
            
        success: function(data, textStatus, jqXHR) {
            callback(null, data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            callback(errorThrown, null);
        }
    }); 
};

/**
 * Person model
 */
Surfnet.OnderwijsData.PersonClient = function() {
    this.modelUrl = "persons";
};

/**
 * Building model
 */
Surfnet.OnderwijsData.BuildingClient = function() {
/*
    // Forces use of new, otherwise getting global var (because it wouldn't be set on the object
    if (!(this instanceof Person))
        return new Person(name)
*/

    this.modelUrl = "building";
};

// TODO: should be private
var apiClient = Surfnet.OnderwijsData.APIClient;
var personClient = Surfnet.OnderwijsData.PersonClient;
var buildingClient = Surfnet.OnderwijsData.BuildingClient;

// TODO: needs to have some sort of constructor
personClient.prototype = new apiClient();
personClient.prototype.constructor = personClient;

buildingClient.prototype = new buildingClient();
buildingClient.prototype.constructor = buildingClient;

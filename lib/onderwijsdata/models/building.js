/**
 * Building model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.BuildingClient = function(config) {
    this.config = config;
    this.modelUrl = "buildings";

    this.getByLocation = function(params, callback) {
        var url = this.config.endpoint + this.modelUrl + "/nearby";
        this.get(url, params, callback)
    }
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.BuildingClient, Surfnet.OnderwijsData.APIClient);
/**
 * Person model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.PersonClient = function(config) {
    this.config = config;
    this.modelUrl = "persons";

    this.getByLocation = function(params, callback) {
        var url = this.config.endpoint + this.modelUrl + "/nearby";
        this.get(url, params, callback)
    }
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.PersonClient, Surfnet.OnderwijsData.APIClient);
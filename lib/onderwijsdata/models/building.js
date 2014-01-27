/**
 * Building model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.BuildingClient = function(config) {
    this.config = config;
    this.modelUrl = "buildings";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.BuildingClient, Surfnet.OnderwijsData.APIClient);
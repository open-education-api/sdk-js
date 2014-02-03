/**
 * Minor model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.MinorClient = function(config) {
    this.config = config;
    this.modelUrl = "minors";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.MinorClient, Surfnet.OnderwijsData.APIClient);

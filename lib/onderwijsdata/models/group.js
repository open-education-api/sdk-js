/**
 * Group model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.GroupClient = function(config) {
    this.config = config;
    this.modelUrl = "groups";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.GroupClient, Surfnet.OnderwijsData.APIClient);

/**
 * Grouproles model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.GroupRoleClient = function(config) {
    this.config = config;
    this.modelUrl = "grouproles";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.GroupRoleClient, Surfnet.OnderwijsData.APIClient);

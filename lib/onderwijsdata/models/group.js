/**
 * Group model
 */
Surfnet.OnderwijsData.prototype.GroupClient = function() {
    this.modelUrl = "groups";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.GroupClient, Surfnet.OnderwijsData.APIClient);

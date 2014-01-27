/**
 * Person model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.PersonClient = function(config) {
    this.config = config;
    this.modelUrl = "persons";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.PersonClient, Surfnet.OnderwijsData.APIClient);

/**
 * Affiliation model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.AffiliationClient = function(config) {
    this.config = config;
    this.modelUrl = "affiliations";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.AffiliationClient, Surfnet.OnderwijsData.APIClient);

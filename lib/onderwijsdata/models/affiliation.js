/**
 * Affiliation model
 */
Surfnet.OnderwijsData.prototype.AffiliationClient = function() {
    this.modelUrl = "affiliations";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.AffiliationClient, Surfnet.OnderwijsData.APIClient);

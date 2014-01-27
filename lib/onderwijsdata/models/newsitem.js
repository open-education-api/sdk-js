/**
 * Newsitem model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.NewsItemClient = function(config) {
    this.config = config;
    this.modelUrl = "newsitems";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.NewsItemClient, Surfnet.OnderwijsData.APIClient);

/**
 * Newsitem model
 */
Surfnet.OnderwijsData.prototype.NewsItemClient = function() {
    this.modelUrl = "newsitems";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.NewsItemClient, Surfnet.OnderwijsData.APIClient);

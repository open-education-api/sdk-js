/**
 * Newsfeed model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.NewsFeedClient = function(config) {
    this.config = config;
    this.modelUrl = "newsfeeds";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.NewsFeedClient, Surfnet.OnderwijsData.APIClient);

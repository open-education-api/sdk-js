/**
 * Newsfeed model
 */
Surfnet.OnderwijsData.prototype.NewsFeedClient = function() {
    this.modelUrl = "newsfeeds";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.NewsFeedClient, Surfnet.OnderwijsData.APIClient);

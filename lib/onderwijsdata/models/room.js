/**
 * Room model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.RoomClient = function(config) {
    this.config = config;
    this.modelUrl = "rooms";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.RoomClient, Surfnet.OnderwijsData.APIClient);

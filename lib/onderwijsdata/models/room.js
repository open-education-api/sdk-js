/**
 * Room model
 */
Surfnet.OnderwijsData.prototype.RoomClient = function() {
    this.modelUrl = "rooms";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.RoomClient, Surfnet.OnderwijsData.APIClient);

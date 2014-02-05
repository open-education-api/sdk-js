/**
 * Room model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.RoomClient = function(config) {
    this.config = config;
    this.modelUrl = "rooms";
    
    this.scheduleClient = function(url) {
        var config = {endPoint: url};
        return new Surfnet.OnderwijsData.prototype.ScheduleClient(config);
    }

    this.scheduleClientById = function(id) {
        var url = this.config.endPoint + this.modelUrl + "/" + id;
        var config = {endPoint: url};
        return new Surfnet.OnderwijsData.prototype.ScheduleClient(config);
    }

};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.RoomClient, Surfnet.OnderwijsData.APIClient);

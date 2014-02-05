/**
 * Person model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.PersonClient = function(config) {
    this.config = config;
    this.modelUrl = "persons";
    
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
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.PersonClient, Surfnet.OnderwijsData.APIClient);

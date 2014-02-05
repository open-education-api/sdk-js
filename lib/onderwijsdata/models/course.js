/**
 * Course model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.CourseClient = function(config) {
    this.config = config;
    this.modelUrl = "courses";
    
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
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.CourseClient, Surfnet.OnderwijsData.APIClient);

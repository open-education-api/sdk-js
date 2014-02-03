/**
 * Schedule model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.ScheduleClient = function(config) {
    this.config = config;
    this.modelUrl = "schedule";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.ScheduleClient, Surfnet.OnderwijsData.APIClient);

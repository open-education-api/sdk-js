/**
 * Courseresult model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.CourseResultClient = function(config) {
    this.config = config;
    this.modelUrl = "courseresults";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.CourseResultClient, Surfnet.OnderwijsData.APIClient);

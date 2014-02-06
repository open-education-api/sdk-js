/**
 * Course model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.CourseClient = function(config) {
    this.config = config;
    this.modelUrl = "courses";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.CourseClient, Surfnet.OnderwijsData.APIClient);

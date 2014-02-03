/**
 * Test result model
 * @param {Object} config
 */
Surfnet.OnderwijsData.prototype.TestResultClient = function(config) {
    this.config = config;
    this.modelUrl = "testresults";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.TestResultClient, Surfnet.OnderwijsData.APIClient);

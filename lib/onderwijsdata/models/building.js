/**
 * Building model
 */
Surfnet.OnderwijsData.prototype.BuildingClient = function() {
    this.modelUrl = "buildings";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.BuildingClient, Surfnet.OnderwijsData.APIClient);
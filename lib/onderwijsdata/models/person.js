/**
 * Person model
 */
Surfnet.OnderwijsData.prototype.PersonClient = function() {
    this.modelUrl = "persons";
};
Surfnet.OnderwijsData.Tools.extend(Surfnet.OnderwijsData.prototype.PersonClient, Surfnet.OnderwijsData.APIClient);

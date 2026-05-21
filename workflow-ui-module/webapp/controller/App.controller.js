sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function(BaseController,JSONModel) {
      "use strict";
  
      return BaseController.extend("workflownew.workflowuimodule.controller.App", {
        onInit() {
          var oData = {
                nodes: []
          };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel,"mTreeTable");
            this.fnSetTreeTableData();
        },

        fnSetTreeTableData: function(){
            var oModel = this.getView().getModel("context");
            var mTreetableModel = this.getView().getModel("mTreeTable");
            var aSkills = oModel.getProperty("/skills");
            var sName = oModel.getProperty("/name");
            var sEmail = oModel.getProperty("/email");
            var sReviewer = oModel.getProperty("/reviewer");
            var sYearsOfExperience = oModel.getProperty("/yearsOfExperience");
            var sComments = oModel.getProperty("/comments");
            var aNodes = [];
            
            aSkills.forEach(function(skill){
                var oNode = {
                    skill : skill,
                    yearsOfExperience : sYearsOfExperience,
                    children : [
                        {
                            name : sName,
                            email : sEmail,
                            reviewer : sReviewer,
                            comments : sComments
                        }
                    ]

                }
                aNodes.push(oNode);
            });

            mTreetableModel.setProperty("/nodes",aNodes);
        },

         onRowSelection: function () {

            var oModel = this.getView().getModel("context");
            var aTable = this.getView().byId("treeTable");
            var aSelectedItems = [];
            var aSelectedIndex = aTable.getSelectedIndices();

            aSelectedIndex.forEach(function (oIndex) {
                var oContext = aTable.getContextByIndex(oIndex);
                var oData = oContext.getObject();
                console.log(oData);
                if (oData) {
                    if(oData.skill){
                        aSelectedItems.push({
                            skill : oData.skill,
                        });
                    }
                }
            });

            oModel.setProperty("/selectedSkills", aSelectedItems);

            
        },
      });
    }
  );
  
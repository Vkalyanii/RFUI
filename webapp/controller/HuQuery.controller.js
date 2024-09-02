sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device"
], function (Controller,Device) {
    "use strict";

    return Controller.extend("com.app.rfscreens.controller.HuQuery", {
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("com/app/rfscreens/model/data2.json"));
            this.getView().setModel(oModel);
            var i18nModel = this.getOwnerComponent().getModel("i18n"); 
            var oTable = this.byId("HuDetailsTable"); 
            var oQuantityHeader = this.byId("_IDGenText3");
            var oProductDescriptionHeader = this.byId("_IDGenText5");
                                             
             if (Device.system.phone) { 
                oQuantityHeader.setText(i18nModel.getResourceBundle().getText("qty"));
                oProductDescriptionHeader.setText(i18nModel.getResourceBundle().getText("pr.des"));


              } 
              else { 
                oQuantityHeader.setText(i18nModel.getResourceBundle().getText("quantity"));
                oProductDescriptionHeader.setText(i18nModel.getResourceBundle().getText("productdescription"));

             }
        },
        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
        },
        Onpresssubmit: function () {

            this.getView().byId("icon1").setVisible(false);
            this.getView().byId("icon2").setVisible(true);
            this.getView().byId("_IDGenButton1111").setVisible(true);

        },
        onHUContentPress: function () {
           

            this.getView().byId("icon1").setVisible(false);
            this.getView().byId("icon2").setVisible(false);
            this.getView().byId("icon3").setVisible(true);
            this.getView().byId("icon4").setVisible(false);
            this.getView().byId("_IDGenButton1111").setVisible(false);
            this.getView().byId("_IDGenButton1122").setVisible(true);

        },
        onHUHierarchyPress: function () {

            this.getView().byId("icon1").setVisible(false);
            this.getView().byId("icon2").setVisible(false);
            this.getView().byId("icon3").setVisible(false);
            this.getView().byId("icon4").setVisible(true);
            this.getView().byId("_IDGenButton1111").setVisible(false);
            this.getView().byId("_IDGenButton1122").setVisible(true);
        },

        Onpressback1: function () {

            this.getView().byId("icon1").setVisible(false);
            this.getView().byId("icon2").setVisible(true);
            this.getView().byId("icon3").setVisible(false);
            this.getView().byId("icon4").setVisible(false);
            this.getView().byId("_IDGenButton1111").setVisible(true);
            this.getView().byId("_IDGenButton1122").setVisible(false);

        },
        Onpressback2: function () {

            this.getView().byId("icon1").setVisible(true);
            this.getView().byId("icon2").setVisible(false);
            this.getView().byId("icon3").setVisible(false);
            this.getView().byId("icon4").setVisible(false);

        },
        Onpresssubmit:function(){
       var t= this.byId("_IDGenInput1").getValue();
    //             debugger
    //    var oModel = this.getOwnerComponent().getModel();
    //    oModel.read("/hu_detailsSet('"+t+"')",{success:function(oData){
    //     sap.m.MessageToast("successfully fetched");
    //    },
    // errror:function(oError){
    //     MessageBox.error(oError);
    // }})
        }


    });
});

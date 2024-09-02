sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/m/MessageToast" // Import MessageToast for user feedback
], function (Controller, Device, MessageToast) {
    "use strict";

    return Controller.extend("com.app.rfscreens.controller.StockBinQueryByBin", {
        onInit: function () {
            // Initialize if needed
        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
        },

        Onpresssubmit: function () {
            this.getView().byId("idBinPage").setVisible(false);
            this.getView().byId("idBinDetailsPage").setVisible(true);
            this.getView().byId("idBackinStockBinQueryByBin1").setVisible(true);
        },

        onHuInfoPress: function () {
            // Get the Table control and selected items
            var oTable = this.getView().byId("idStorageBinDetailsTable");
            var aSelectedItems = oTable.getSelectedItems();

            // Check if any item is selected
            if (aSelectedItems.length > 0) {
                // Show HU Info table and hide Product Info table
                this.getView().byId("idHuInfoTable").setVisible(true);
                this.getView().byId("idHuDetailsPanel").setVisible(true);

                this.getView().byId("idProductInfoPanel").setVisible(false);
                this.getView().byId("idProductInfoTable").setVisible(false);
                this.getView().byId("idBinPage").setVisible(false);
                this.getView().byId("idBackinStockBinQueryByBin1").setVisible(true);
            } else {
                // Show a MessageToast if no item is selected
                MessageToast.show("Please select any one line item in the Storage Bin table.");
            }
        },

        onProductInfoPress: function () {
            var oTable = this.getView().byId("idStorageBinDetailsTable");
            var aSelectedItems = oTable.getSelectedItems();

            // Check if any item is selected
            if (aSelectedItems.length > 0) {
                this.getView().byId("idProductInfoTable").setVisible(true);
                this.getView().byId("idProductInfoPanel").setVisible(true);

                this.getView().byId("idHuDetailsPanel").setVisible(false);
                this.getView().byId("idHuInfoTable").setVisible(false);
                this.getView().byId("idBinPage").setVisible(false);
            } else {
                // Show a MessageToast if no item is selected
                MessageToast.show("Please select any one line item in the Storage Bin table.");
            }
        },

        onPressBackInStockBinQueryByBin1: function () {
            this.getView().byId("idBinPage").setVisible(true);
            this.getView().byId("idBinDetailsPage").setVisible(false);
            this.getView().byId("idBackinStockBinQueryByBin1").setVisible(false);
        },

        onStorageBinSelectionChange: function (oEvent) {
            var oTable = this.getView().byId("idStorageBinDetailsTable");
            var aSelectedItems = oTable.getSelectedItems();

            // If no items are selected, hide HU Info and Product Info tables
            if (aSelectedItems.length === 0) {
                this.getView().byId("idHuInfoTable").setVisible(false);
                this.getView().byId("idHuDetailsPanel").setVisible(false);
                this.getView().byId("idProductInfoTable").setVisible(false);
                this.getView().byId("idProductInfoPanel").setVisible(false);
            }
        }
    });
});

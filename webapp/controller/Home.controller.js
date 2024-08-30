sap.ui.define([
    "./BaseController",
    "sap/ui/Device",
    "sap/m/MessageBox",
    'sap/ui/core/SeparatorItem',
    "sap/m/MessageToast",

],
    function (Controller, Device, MessageBox,SeparatorItem,MessageToast) {
        "use strict";

        return Controller.extend("com.app.rfscreens.controller.Home", {
            onInit: function () {

            },
            onCloseDialog: function () {
                if (this.ologinDialog.isOpen()) {
                    this.ologinDialog.close()
                }
            },
            // onResourceLoginBtnPress: function () {
            //     this.getRouter().navTo("RouteUsermenu")
            // },
            onPressSignupBtn: async function () {
                if (!this.oActiveLoansDialog) {
                    this.oActiveLoansDialog = await this.loadFragment("SignUpDetails")
                }
                this.oActiveLoansDialog.open();
            },

            //Register Dialog close Btn...
            onCloseRegisterDialog: function () {
                this.oActiveLoansDialog.close();
            },
            handleLinkPress: async function () {
                if (!this.oforgotDialog) {
                    this.oforgotDialog = await this.loadFragment("Forgotpassword")
                }
                this.oforgotDialog.open();
            },
            onRsesetPress: function () {
                this.oforgotDialog.close();
            },
            onClearRegisterDialog: function () {
                var oView = this.getView();
                oView.byId("idEmployeeIDInput").setValue("");
                oView.byId("idResourceNameInput").setValue("");
                oView.byId("idCreatePasswordInput").setValue("");
                oView.byId("idInputuserType").setValue("");
                oView.byId("idInputPhoneNumber").setValue("");

                // Unselect checkboxes
                oView.byId("idRoesurcetypeInput").setSelectedItem(null);

                // Clear the selected keys from GroupSelect MultiComboBox
                oView.byId("GroupSelect").setSelectedKeys([]);

                // Reset other controls if necessary
                oView.byId("idAreaInboundCheckBox").setSelected(false);
                oView.byId("idAreaOutboundCheckBox").setSelected(false);
                oView.byId("idAreaInternalCheckBox").setSelected(false);
            },
            /**Based on Selected key DropDown Should be visible */
            onCheckBoxSelect: function () {
                // Get the checkbox states
                var isInboundSelected = this.byId("inboundCheckBox").getSelected();
                var isOutboundSelected = this.byId("outboundCheckBox").getSelected();
                var isInternalSelected = this.byId("internalCheckBox").getSelected();

                // Create a filter array to hold the selected filters
                var filters = [];

                if (isInboundSelected) {
                    filters.push(new sap.ui.model.Filter("Area", sap.ui.model.FilterOperator.EQ, "Inbound"));
                }
                if (isOutboundSelected) {
                    filters.push(new sap.ui.model.Filter("Area", sap.ui.model.FilterOperator.EQ, "Outbound"));
                }
                if (isInternalSelected) {
                    filters.push(new sap.ui.model.Filter("Area", sap.ui.model.FilterOperator.EQ, "Internal"));
                }

                // Get the Select control and bind it with the filtered data
                var oMultiComboBox = this.byId("GroupSelect");
                var oModel = this.getView().getModel();

                // Create the binding
                oMultiComboBox.bindAggregation("items", {
                    path: "/RFUISet",
                    template: new sap.ui.core.Item({
                        key: "{Resourcegroup}",
                        text: "{Resourcegroup}"
                    }),
                    filters: filters,
                    sorter: {
                        path: "Area",
                        group: true
                    },
                    groupHeaderFactory: this.getGroupHeader.bind(this)
                });
            },
            /**Getting Signup form Details*/
            onSubmitPress: function () {

                const oUserView = this.getView();
                // Get the form inputs
                var sEmployeeID = this.byId("idEmployeeIDInput").getValue();
                var sResourceName = this.byId("idResourceNameInput").getValue();
                var oResourceTypeComboBox = oUserView.byId("idRoesurcetypeInput");
                var oSelectedItem = oResourceTypeComboBox.getSelectedItem();
                var sPhone = this.byId("idInputPhoneNumber").getValue();
                var oEmail = this.byId("idInputEmail").getValue();

                // Get the selected checkboxes
                var oArea = this.getSelectedArea();
                // Get the selected groups from the MultiComboBox
                var oItem = this.byId("GroupSelect").getSelectedKeys();
                var resourceGroup = oItem.join(", ");


                /**generating Password */
                function generatePassword() {
                    const regex = /[A-Za-z@!#$%&]/;
                    const passwordLength = 8;
                    let password = "";

                    for (let i = 0; i < passwordLength; i++) {
                        let char = '';
                        while (!char.match(regex)) {
                            char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                        }
                        password += char;
                    }

                    return password;
                }
                var oPassword = generatePassword();

                var bValid = true;
                var bAllFieldsFilled = true;

                // Validate fields and set value state and messages
                if (!sEmployeeID) {
                    oUserView.byId("idEmployeeIDInput").setValueState("Information");
                    oUserView.byId("idEmployeeIDInput").setValueStateText("Employee ID is mandatory");
                    bValid = false;
                    bAllFieldsFilled = false;
                } else if (!/^\d{6}$/.test(sEmployeeID)) {
                    oUserView.byId("idEmployeeIDInput").setValueState("Information");
                    oUserView.byId("idEmployeeIDInput").setValueStateText("Resource ID must be a 6-digit numeric value");
                    bValid = false;
                } else {
                    oUserView.byId("idEmployeeIDInput").setValueState("None");
                }

                if (!sResourceName) {
                    oUserView.byId("idResourceNameInput").setValueState("Information");
                    oUserView.byId("idResourceNameInput").setValueStateText("Resource Name cannot be empty");
                    bValid = false;
                    bAllFieldsFilled = false;
                } else {
                    oUserView.byId("idResourceNameInput").setValueState("None");
                }

                if (!oSelectedItem) {
                    oUserView.byId("idRoesurcetypeInput").setValueState("Information");
                    oUserView.byId("idRoesurcetypeInput").setValueStateText("Please select Resource Type");
                    bValid = false;
                    bAllFieldsFilled = false;
                } else {
                    oUserView.byId("idRoesurcetypeInput").setValueState("None");
                }

                // Validate Phone Number
                if (!sPhone) {
                    oUserView.byId("idInputPhoneNumber").setValueState("Information");
                    oUserView.byId("idInputPhoneNumber").setValueStateText("Phone number is mandatory");
                    bValid = false;
                    bAllFieldsFilled = false;
                } else if (sPhone.length !== 10 || !/^\d+$/.test(sPhone)) {
                    oUserView.byId("idInputPhoneNumber").setValueState("Information");
                    oUserView.byId("idInputPhoneNumber").setValueStateText("Phone number must be a 10-digit numeric value");
                    bValid = false;
                } else {
                    oUserView.byId("idInputPhoneNumber").setValueState("None");
                }

                if (!bAllFieldsFilled) {
                    sap.m.MessageToast.show("Please fill all mandatory details");
                    return;
                }

                if (!bValid) {
                    sap.m.MessageToast.show("Please enter correct data");
                    return;
                }


                if (!bValid) {
                    sap.m.MessageToast.show("Please fill all the required fields correctly.");
                    return; // Prevent further execution
                }

                var oModel = this.getView().getModel();
                var that = this;
                oModel.create("/RFUISet", {
                    Resourceid: sEmployeeID,
                    Validity: false,
                    Resourcename: sResourceName,
                    Resouecetype: oSelectedItem.getKey(), // assuming getKey() gives the value you need
                    Area: oArea,
                    Email: oEmail,
                    Phonenumber: sPhone,
                    Resourcegroup: resourceGroup,
                    Password :oPassword
                }, {
                    success: function (oData) {
                        sap.m.MessageToast.show("your details are sent to supervisior please wait until you get the approval");
                        that.oActiveLoansDialog.close();
                    },
                    error: function (oError) {
                        MessageBox.error("Error");
                    }
                })
                oUserView.byId("idEmployeeIDInput").setValue("");
                oUserView.byId("idResourceNameInput").setValue("");
                oUserView.byId("idCreatePasswordInput").setValue("");
                oUserView.byId("idInputuserType").setValue("");
                oUserView.byId("idInputPhoneNumber").setValue("");

                // Unselect checkboxes
                oUserView.byId("idRoesurcetypeInput").setSelectedItem(null);

                // Clear the selected keys from GroupSelect MultiComboBox
                oUserView.byId("GroupSelect").setSelectedKeys([]);

                // Reset other controls if necessary
                oUserView.byId("idAreaInboundCheckBox").setSelected(false);
                oUserView.byId("idAreaOutboundCheckBox").setSelected(false);
                oUserView.byId("idAreaInternalCheckBox").setSelected(false);
            },
            getGroupHeader: function (oGroup) {
                return new SeparatorItem({
                    text: oGroup.key
                });
            },

            getSelectedArea: function () {
                // Helper method to get selected areas from checkboxes
                var sSelectedArea = null;
                if (this.byId("inboundCheckBox").getSelected()) {
                    sSelectedArea = 'Inbound';
                } else if (this.byId("outboundCheckBox").getSelected()) {
                    sSelectedArea = 'Outbound';
                } else if (this.byId("internalCheckBox").getSelected()) {
                    sSelectedArea = 'Internal';
                }
                return sSelectedArea;
            },
            onResourceLoginBtnPress: async function () {
                var oView = this.getView();

                // Retrieve values from input fields
                var sWarehouseNumber = oView.byId("idwhInput").getValue();
                var sResourceId = oView.byId("IdResourceInput").getValue();
                var sPassword = oView.byId("Idpassword").getValue();

                // Perform validation checks
                if (!sWarehouseNumber) {
                    MessageToast.show("Please enter the Warehouse Number.");
                    return;
                }
                if (!sResourceId) {
                    MessageToast.show("Please enter the Resource ID.");
                    return;
                }
                if (!sPassword) {
                    MessageToast.show("Please enter the Password.");
                    return;
                }
                if (!(sWarehouseNumber && sResourceId && sPassword)) {
                    MessageToast.show("Please enter all the details");
                    return;
                }

                // Get the model from the component
                var oModel = this.getOwnerComponent().getModel();

                // Make the API call to check if the resource exists
                try {
                    await oModel.read("/RFUISet('" + sResourceId + "')", {
                        success: function (oData) {
                            var Id = oData.Resourceid;
                            this.getOwnerComponent().getRouter().navTo("RouteUsermenu", { id: Id });
                            // You can perform further actions here, like navigating to the next view
                        }.bind(this),
                        error: function () {
                            sap.m.MessageToast.show("User does not exist");
                        }
                    });
                } catch (error) {
                    MessageToast.show("An error occurred while checking the user.");
                }
            },


            onClearPress: function () {
                var oView = this.getView();
                oView.byId("idwhInput").setValue("");
                oView.byId("IdResourceInput").setValue("");
                oView.byId("Idpassword").setValue("");
            },

            handleLinkPress: function () {
                // Implement the forgot password link logic here
            }

        });
    });

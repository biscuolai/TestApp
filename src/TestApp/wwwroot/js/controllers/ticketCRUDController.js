﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('ticketCRUDController', ['$http', '$controller', '$location', '$rootScope', 'Constants', '$filter', ticketCRUDController]);

    //AngularJS controller method
    function ticketCRUDController($http, $controller, $location, $rootScope, Constants, $filter) {

        GetAllTickets();
       
        //To Get all Ticket records  
        function GetAllTickets() {
            $http.get('/api/tickets').success(function (Ticket) {
                $rootScope.Tickets = Ticket.data;

                LoadAllDropDownLists(false);
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading tickets!";
            });
        }

        //function GetProjectName() {
        //    $http.get('/api/projects/' + $rootScope.Ticket.projectId).success(function (Project) {
        //        $rootScope.Project = Project.data;
        //    })
        //    .error(function () {
        //        $rootScope.error = "An Error has occured while loading Project!";
        //    });
        //}

        function LoadAllDropDownLists(findItems) {
            $http.get('/api/values/' + Constants.LookupValues['ContactType']).success(function (ContactType) {
                $rootScope.ContactType = {
                    availableOptions: ContactType.data,
                    selectedOption: ContactType.data[0]
                };

                if (findItems === true) {
                    $rootScope.ContactType.selectedOption = $filter('filter')($rootScope.ContactType.availableOptions, { id: $rootScope.Ticket.contactTypeId })[0];
                }
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading ContactType drop down list!";
            });
            $http.get('/api/values/' + Constants.LookupValues['Category']).success(function (Category) {
                $rootScope.Category = {
                    availableOptions: Category.data,
                    selectedOption: Category.data[0]
                };

                if (findItems === true) {
                    $rootScope.Category.selectedOption = $filter('filter')($rootScope.Category.availableOptions, { id: $rootScope.Ticket.categoryId })[0];
                }
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading Category drop down list!";
            });
            $http.get('/api/values/' + Constants.LookupValues['ConfigurationItem']).success(function (ConfigurationItem) {
                $rootScope.ConfigurationItem = {
                    availableOptions: ConfigurationItem.data,
                    selectedOption: ConfigurationItem.data[0]
                };

                if (findItems === true) {
                    $rootScope.ConfigurationItem.selectedOption = $filter('filter')($rootScope.ConfigurationItem.availableOptions, { id: $rootScope.Ticket.configurationItemId })[0];
                }
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading Category drop down list!";
            });
            $http.get('/api/values/' + Constants.LookupValues['TicketStatus']).success(function (TicketStatus) {
                $rootScope.TicketStatus = {
                    availableOptions: TicketStatus.data,
                    selectedOption: TicketStatus.data[0]
                };

                if (findItems === true) {
                    $rootScope.TicketStatus.selectedOption = $filter('filter')($rootScope.TicketStatus.availableOptions, { id: $rootScope.Ticket.ticketStatus })[0];
                }
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading Category drop down list!";
            });
            $http.get('/api/values/' + Constants.LookupValues['Priority']).success(function (Priority) {
                $rootScope.Priority = {
                    availableOptions: Priority.data,
                    selectedOption: Priority.data[0]
                };

                if (findItems === true) {
                    $rootScope.Priority.selectedOption = $filter('filter')($rootScope.Priority.availableOptions, { id: $rootScope.Ticket.priority })[0];
                }
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading Category drop down list!";
            });
            $http.get('/api/projects').success(function (Project) {
                $rootScope.Projects = {
                    availableOptions: Project.data,
                    selectedOption: Project.data[0]
                };
                if (findItems === true) {
                    $rootScope.Projects.selectedOption = $filter('filter')($rootScope.Projects.availableOptions, { id: $rootScope.Ticket.projectId })[0];
                }
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading Project!";
            });
            $http.get('/api/admin/users').success(function (User) {
                $rootScope.Users = {
                    availableOptions: User.data,
                    selectedOption: User.data[0]
                };
                if (findItems === true) {
                    $rootScope.Users.selectedOption = $filter('filter')($rootScope.Users.availableOptions, { userName: $rootScope.Ticket.assignedTo })[0];
                }
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading Project!";
            });
        }

        $rootScope.editTicket = function (Ticket) {
            // get Ticket by TicketId
            $http.get('/api/tickets/' + Ticket.ticketId).success(function (data) {
                // success
                $rootScope.Ticket = data.data;
                //debugger;
                //$rootScope.TicketId = $rootScope.Ticket.ticketId;
                //$rootScope.ProjectId = $rootScope.Ticket.projectId;
                //$rootScope.ContactTypeId = $rootScope.Ticket.contactTypeId;
                //$rootScope.CategoryId = $rootScope.Ticket.categoryId;
                //$rootScope.ConfigurationItemId = $rootScope.Ticket.configurationItemId;
                //$rootScope.Title = $rootScope.Ticket.title;
                //$rootScope.Details = $rootScope.Ticket.details;
                //$rootScope.isHtml = $rootScope.Ticket.isHtml;
                //$rootScope.TagList = $rootScope.Ticket.tagList;
                //$rootScope.AssignedTo = $rootScope.Ticket.assignedTo;
                //$rootScope.TicketStatus = $rootScope.Ticket.ticketStatus;
                //$rootScope.Priority = $rootScope.Ticket.priority;
                $rootScope.Action = "Update";

                $rootScope.errorMessage = "Successfully loaded " + $rootScope.Ticket.title;

                LoadAllDropDownLists(true);

                $location.path('/editTicket'); //redirect to edit Ticket template
            })
            .error(function () {
                $rootScope.error = "An Error has occured while loading ticket!";
                $rootScope.errorMessage = "Failed to Load " + error;
            });
        }

        //$rootScope.AddUpdateTicket = function () {
        //    var Ticket = {
        //        Title: $rootScope.TicketTitle,
        //        Author: $rootScope.TicketAuthor,
        //        Publisher: $rootScope.TicketPublisher,
        //        Isbn: $rootScope.TicketIsbn
        //    };
        //    var getTicketAction = $rootScope.Action;

        //    if (getTicketAction == "Update") {
        //        Ticket.Id = $rootScope.TicketId;
        //        var getTicketData = updateTicket(Ticket);
        //        getTicketData.then(function (msg) {
        //            GetAllTickets();
        //            alert(msg.data);
        //            $rootScope.divTicket = false;
        //        }, function () {
        //            alert('Error in updating Ticket record');
        //        });
        //    } else {
        //        var getTicketData = AddTicket(Ticket);
        //        getTicketData.then(function (msg) {
        //            GetAllTickets();
        //            alert(msg.data);
        //            $rootScope.divTicket = false;
        //        }, function () {
        //            alert('Error in adding Ticket record');
        //        });
        //    }
        //}

        //$rootScope.AddTicketDiv = function () {
        //    ClearFields();
        //    $rootScope.Action = "Add";
        //}

        $rootScope.deleteTicket = function (Ticket) {
            var getTicketData = DeleteTicket(Ticket.Id);
            getTicketData.then(function (msg) {
                alert(msg.data);
                GetAllTickets();
            }, function () {
                alert('Error in deleting Ticket record');
            });
        }

        function ClearFields() {
            $rootScope.projectId = "";
            $rootScope.ContactTypeId = "";
            $rootScope.CategoryId = "";
            $rootScope.ConfigurationItemId = "";
            $rootScope.Title = "";
            $rootScope.Details = "";
            $rootScope.isHtml = "";
            $rootScope.TagList = "";
            $rootScope.AssignedTo = "";
            $rootScope.TicketStatus = "";
            $rootScope.Priority = "";
            $rootScope.assignedTo = "";
        }

        $rootScope.cancel = function () {
            ClearFields();
            $location.path('/'); // cancel and redirect to dashboard
        };

        $rootScope.searchTicket = ""; // set the default search / filter term to empty string

        //Edit/Update operation
        $rootScope.UpdateTicket = function (Ticket) {
            // read fresh data from all dropdownlists
            ReadFreshDataFromDropDownLists(Ticket);

            $http.put('/api/tickets/' + Ticket.ticketId, Ticket).success(function (data) {
                alert("Updated successfully!");             
                GetAllTickets();
                ClearFields();
                $location.path('/'); // Updated successfully and redirect to dashboard
            }).error(function (data) {
                $rootScope.error = "An Error has occured while updating! " + data;                
            });
        };

        function ReadFreshDataFromDropDownLists(Ticket) {
            // read fresh data from all dropdownlists
            Ticket.projectId = $rootScope.Projects.selectedOption.projectId;
            Ticket.contactTypeId = $rootScope.ContactType.selectedOption.id;
            Ticket.categoryId = $rootScope.Category.selectedOption.id;
            Ticket.configurationItemId = $rootScope.ConfigurationItem.selectedOption.id;
            Ticket.ticketStatus = $rootScope.TicketStatus.selectedOption.id;
            Ticket.priority = $rootScope.Priority.selectedOption.id;
            Ticket.assignedTo = $rootScope.Users.selectedOption.userName;
        }

        // Insert operation / add ticket
        $rootScope.AddTicket = function (Ticket) {

            // read fresh data from all dropdownlists
            ReadFreshDataFromDropDownLists(Ticket);

            Ticket.createdBy = "System";
            Ticket.createdDate = new Date();
            Ticket.currentStatusDate = new Date();
            Ticket.currentStatusSetBy = "biscuolai";
            Ticket.lastUpdateBy = "biscuolai";
            Ticket.lastUpdateDate = new Date();
            Ticket.owner = "ilson_biscuola@dialog.com.au";

            $http.post('/api/tickets', Ticket).success(function (data) {
                alert("Added successfully!!");                
                $rootScope.Tickets.push(data);
                ClearFields();
                $location.path('/'); // Added successfully and redirect to dashboard
            }).error(function (data) {
                $rootScope.error = "An error has occured while adding! " + data;                
            });
        };

        //Delete Ticket
        $rootScope.DeleteTicket = function (Ticket) {     
            $http.delete('/api/tickets/' + Ticket.TicketID).success(function (data) {
                alert("Deleted successfully!!");
                $http.get('/api/tickets').success(function (data) {
                    $rootScope.Tickets = data;                    
                })
            }).error(function (data) {
                $rootScope.error = "An error has occured while deleting! " + data;                
            });
        };
    }
})();

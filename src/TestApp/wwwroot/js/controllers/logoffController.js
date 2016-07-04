﻿(function () {
    'use strict';

    angular.module('Authentication')
    .controller('logoffController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'MessageService', '$http', '$interval',
            function ($scope, $rootScope, $location, AuthenticationService, MessageService, $http, $interval) {

            $scope.logoff = function () {

                // if user is logged in
                if ($rootScope.globals.currentUser) {

                    // log off current user
                    $scope.loggingOff = true;
                    AuthenticationService.Logoff(function (response) {

                        if (response.success) {

                            // reset user credentials
                            AuthenticationService.ClearCredentials();
                            // go back to login page
                            $location.path('/login');

                        } else {

                            // error message
                            $scope.error = response.message;
                            $scope.loggingOff = false;
                        }
                    });
                }
            };

            setInterval(function () {
                $scope.initFirst();
            }, 120000)

            $scope.initFirst = function () {
                $http.get('/api/admin/' + $scope.globals.currentUser.userData.id + '/notifications').success(function (Notifications) {
                    $scope.notifications = Notifications.data;

                    $scope.countUnRead = 0;
                    $scope.countNew = 0;

                    // counting unread and new notifications 
                    for (var i = 0; i < $scope.notifications.length; i++) {
                        if (!$scope.notifications.isRead) {
                            $scope.countUnRead++;
                        }
                        if (!$scope.notifications.isNew) {
                            $scope.countNew++;
                        }
                    }
                })
                .error(function () {
                    // show in alerts error message
                    MessageService.clearAlert();
                    MessageService.addAlert('An error has occured while loading list of all notifications!', 'danger');
                });
            }

            $scope.markAsRead = function (id) {
                $http.put('/api/admin/' + $scope.globals.currentUser.userData.id + '/notifications/' + id, $scope.globals.currentUser.userData.id, id)
                    .success(function (data) {
                }).error(function (data) {
                    // show in alerts error message
                    MessageService.clearAlert();
                    MessageService.addAlert('An error has occured while updating notifications ticket id = ' + id, 'danger');
                });
            }

            $scope.clearNotifications = function () {
                debugger;
                $http.put('/api/admin/' + $scope.globals.currentUser.userData.id + '/notifications/clear', $scope.globals.currentUser.userData.id)
                    .success(function (data) {
                        $scope.countNew = 0;
                        $scope.countUnRead = 0;
                    }).error(function (data) {
                        // show in alerts error message
                        MessageService.clearAlert();
                        MessageService.addAlert('An error has occured while clearing notifications', 'danger');
                    });
            }
        }]);
})();

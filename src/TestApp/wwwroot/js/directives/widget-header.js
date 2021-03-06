﻿(function() {
    'use strict';

    angular
    .module('app')
    .directive('appWidgetHeader', appWidgetTitle);

    function appWidgetTitle() {
        var directive = {
            requires: '^appWidget',
            scope: {
                title: '@',
                icon: '@'
            },
            transclude: true,
            template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-6 widget-search" ng-transclude></div></div></div>',
            restrict: 'E'
        };
        return directive;
    }

})();
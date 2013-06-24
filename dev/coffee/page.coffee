angular.module('myApp',['ngCookies'])
PlayerCtrl = ($scope,$cookieStore) ->
  $scope.boys = $cookieStore.get('boys') || []
  $scope.girls = $cookieStore.get('girls') || []

  $scope.addBoy = ->
    $scope.boys.push {name:$scope.playerName}
    $cookieStore.put('boys', $scope.boys)
    $scope.playerName = ''

  $scope.addGirl = ->
    $scope.girls.push {name:$scope.playerName}
    $cookieStore.put('girls', $scope.girls)
    $scope.playerName = ''

  $scope.delBoy = () ->
    boys = $scope.boys
    $scope.boys = [];
    angular.forEach boys, (boy) ->
      $scope.boys.push boy unless boy.check
    $cookieStore.put('boys', $scope.boys)
    $scope.playerName = ''

  $scope.delGirl = () ->
    girls = $scope.girls
    $scope.girls = [];
    angular.forEach girls, (girl) ->
      $scope.girls.push girl unless girl.check
    $cookieStore.put('girls', $scope.girls)

$ ->
  $('.navi.navi-player').on 'click', ->
    $('body').toggleClass 'display-player'
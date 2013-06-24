var PlayerCtrl;

angular.module('myApp', ['ngCookies']);

PlayerCtrl = function($scope, $cookieStore) {
  $scope.boys = $cookieStore.get('boys') || [];
  $scope.girls = $cookieStore.get('girls') || [];
  $scope.addBoy = function() {
    $scope.boys.push({
      name: $scope.playerName
    });
    $cookieStore.put('boys', $scope.boys);
    return $scope.playerName = '';
  };
  $scope.addGirl = function() {
    $scope.girls.push({
      name: $scope.playerName
    });
    $cookieStore.put('girls', $scope.girls);
    return $scope.playerName = '';
  };
  $scope.delBoy = function() {
    var boys;

    boys = $scope.boys;
    $scope.boys = [];
    angular.forEach(boys, function(boy) {
      if (!boy.check) {
        return $scope.boys.push(boy);
      }
    });
    $cookieStore.put('boys', $scope.boys);
    return $scope.playerName = '';
  };
  return $scope.delGirl = function() {
    var girls;

    girls = $scope.girls;
    $scope.girls = [];
    angular.forEach(girls, function(girl) {
      if (!girl.check) {
        return $scope.girls.push(girl);
      }
    });
    return $cookieStore.put('girls', $scope.girls);
  };
};

$(function() {
  return $('.navi.navi-player').on('click', function() {
    return $('body').toggleClass('display-player');
  });
});

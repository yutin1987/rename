var PlayerCtrl, Q, QTemp, i, _i, _ref;

Q = ['與{player}對他深情款款的告白', '自己脫去一件衣服並與{player}穿上', '與{player}幫你脫去一件衣服', '與{player}公主抱10秒', 'KISS一位異性的臉頰', 'KISS一位異性的肚臍', '與{player}互吸手指頭10秒', '與{player}在你耳邊吹氣10秒', '與{player}和你一起吃掉一個零食', '找兩位異性用拖鞋各打一邊腳掌', '與{player}熊抱10秒', '學『變態假面』內褲套頭，並做出標準POSE', '找一位異性火車便當姿勢繞場一圈', '在一位異性身上翻滾10秒', '用屁股寫出你最喜歡的人的名字', '仰臥起坐吃零食三次，壓腳的異性咬著零食', '指定一位異背著繞場一圈', '指定兩位異性舔手臂從手掌到肩膀', '與{player}當鋼管並對他跳豔舞10秒', '性感的起立蹲下重複2次', '與一位異性十指交扣並深情款款看著10秒', '扶立挺身吃零食三次，躺著的異性咬著零食', '與{player}喝交杯酒', '拉開褲頭，與{player}幫你倒入冰塊', '拉開上衣，與{player}幫你倒入冰塊', '幫一位異性拉下拉鍊，限用嘴巴', 'Funnel喝酒一次', '與{player}拿皮帶打你屁股三次', '對大家擠胸5秒，然後問說我帥/美嗎？', '與{player}在棉被裡交換一件衣物（限時30秒）', '與{player}趴在胯下然後跳江南style 10秒', '與{player}協助你老漢推車爬一圈', '與{player}把酒瓶/杯放在下面重點餵你喝酒', '與{player}互相甜光對方身上的三個奶油', '學『蠟筆小新』跳高叉舞10次', '背對大家露出1/2屁股並扭屁股大喊：大象屁股圓又圓', '內褲外穿舉起雙手大喊：我是Superman我要拯救地球', '指定兩位異性親你兩側的奶頭/大腿', '把頭埋在指定的一位異性胸口轉動10秒', '與{player}從背後熊抱餵你喝一杯酒', '浴巾內只穿內褲並打開給指定的異性看10秒', '與{player}臉對臉夾住氣球繞一圈', '把指定的異性壓到牆角並深情款款的說：我愛你', '指定兩位異性一起舔你的耳朵', '指定兩位異性一起舔你的脖子', '與{player}在棉被裡幫你脫掉內褲，並拿給大家看', '與{player}互相摩鼻子10秒', '把屁股翹高，並指定兩位異性每邊用手各打一下', '對指定的異性用淫蕩的表情吸舔手指頭10秒', '與{player}舌頭碰舌頭10秒', '把指定的異性壓到牆角並深情的說：我喜歡你的叫聲', '用屁股磨蹭與{player}的重點部位10秒', '指定兩位異性分別彈你兩邊耳朵各1下', '與{player}躺在你大腿上喂他喝酒', '與{player}火車便當抱10秒', '與{player}在他耳邊發出舒服的叫聲3次', '坐著讓指定的異性坐爆大腿上的氣球1次'];

Array.prototype.rand = function() {
  var num;

  num = Math.floor(Math.random() * this.length);
  return this.splice(num, 1)[0];
};

QTemp = [];

for (i = _i = 1, _ref = Q.length; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
  QTemp.push(Q.rand());
}

Q = QTemp;

Q.sort(function() {
  return 0.5 - Math.random();
});

angular.module('myApp', ['ngCookies']);

PlayerCtrl = function($scope, $cookieStore) {
  $scope.display = "";
  $scope.assignment = "";
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
  $scope.viewPlayer = function() {
    return $scope.display = $scope.display === 'display-player' ? '' : 'display-player';
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
  $scope.delGirl = function() {
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
  $scope.getQ4Boy = function() {
    var player;

    $scope.display = 'display-boy';
    player = $scope.girls;
    return $scope.assignment = Q.rand().replace(/{player}/g, function() {
      return player.rand().name;
    });
  };
  $scope.getQ4Girl = function() {
    var player;

    $scope.display = 'display-girl';
    player = $scope.boys;
    return $scope.assignment = Q.rand().replace(/{player}/g, function() {
      return player.rand().name;
    });
  };
  return $scope.back = function() {
    return $scope.display = '';
  };
};

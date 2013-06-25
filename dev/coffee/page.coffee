Q = [
  '對{player}深情款款的告白'
  '自己脫去一件衣服並讓{player}穿上'
  '讓{player}幫你脫去一件衣服'
  '對{player}公主抱10秒'
  'KISS{player}的臉頰'
  'KISS{player}的肚臍'
  '與{player}互吸手指頭10秒'
  '讓{player}在你耳邊吹氣10秒'
  '{player}和你一起吃掉一個零食'
  '讓{player}和{player}用拖鞋各打一邊腳掌'
  '對{player}熊抱10秒'
  '學『變態假面』內褲套頭，並做出標準POSE'
  '對{player}用火車便當姿勢抱起繞場一圈'
  '在{player}身上翻滾10秒'
  '用屁股寫出你最喜歡的人的名字'
  '仰臥起坐吃零食三次，壓腳的{player}咬著零食'
  '背著{player}繞場一圈'
  '請{player}和{player}舔你手臂從手掌到肩膀'
  '請{player}當鋼管並對他跳豔舞10秒'
  '性感的起立蹲下重複2次'
  '與{player}十指交扣並深情的看著10秒'
  '扶立挺身吃零食三次，躺著的{player}咬著零食'
  '與{player}喝交杯酒'
  '拉開褲頭，讓{player}幫你倒入冰塊'
  '拉開上衣，讓{player}幫你倒入冰塊'
  '幫{player}拉下拉鍊，限用嘴巴'
  'Funnel喝酒一次，{player}負責倒酒'
  '請{player}拿皮帶打你屁股三次'
  '對大家擠胸5秒，然後問說我帥/美嗎？'
  '與{player}在棉被裡交換一件衣物（限時30秒）'
  '請{player}趴在胯下然後跳江南style 10秒'
  '請{player}幫你抬腳做老漢推車爬一圈'
  '請{player}把酒瓶/杯放在下面重點餵你喝酒'
  '請把{player}身上的三個奶油舔光'
  '學『蠟筆小新』跳高叉舞10次'
  '背對大家露出1/2屁股並扭屁股大喊：大象屁股圓又圓'
  '內褲外穿舉起雙手大喊：我是Superman我要拯救地球'
  '請{player}和{player}親你兩側的奶頭/大腿'
  '把頭埋在{player}的胸口轉動10秒'
  '請{player}從背後熊抱餵你喝一杯酒'
  '浴巾內只穿內褲並打開給{player}看10秒'
  '與{player}臉對臉夾住氣球繞一圈'
  '把{player}壓到牆角並深情款款的說：我愛你'
  '請{player}和{player}一起舔你的耳朵'
  '請{player}和{player}一起舔你的脖子'
  '請{player}在棉被裡幫你脫掉內褲，並拿給大家看'
  '與{player}互相摩鼻子10秒'
  '把屁股翹高，並請{player}和{player}每邊打一下'
  '對{player}用淫蕩的表情吸舔手指頭10秒'
  '與{player}舌頭碰舌頭10秒'
  '把指定的異性壓到牆角並深情的說：我喜歡你的叫聲'
  '用屁股磨蹭{player}的重點部位10秒'
  '請{player}和{player}分別彈你兩邊耳朵各1下'
  '請{player}躺在你大腿上喂他喝酒'
  '將{player}用火車便當姿勢抱起10秒'
  '在{player}的耳邊發出舒服的叫聲3次'
  '坐著讓{player}坐爆大腿上的氣球1次'
]

Array.prototype.rand = () ->
  return '' if this.length < 1
  num = Math.floor(Math.random() * this.length)
  return this.splice(num,1)[0]

QItem = []

resetQ = () ->
  QTemp = Q
  QItem.push QTemp.rand() for i in [1..QTemp.length]
  QItem.sort () -> 0.5 - Math.random()

angular.module('myApp',['ngCookies'])
PlayerCtrl = ($scope,$cookieStore) ->
  $scope.display = ""
  $scope.assignment = ""
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

  $scope.viewPlayer = ->
    $scope.display = if $scope.display is 'display-player' then '' else 'display-player'

  $scope.delBoy = () ->
    boys = $scope.boys
    $scope.boys = []
    angular.forEach boys, (boy) ->
      $scope.boys.push boy unless boy.check
    $cookieStore.put('boys', $scope.boys)
    $scope.playerName = ''

  $scope.delGirl = () ->
    girls = $scope.girls
    $scope.girls = []
    angular.forEach girls, (girl) ->
      $scope.girls.push girl unless girl.check
    $cookieStore.put('girls', $scope.girls)

  $scope.getQ4Boy = () ->
    $scope.display = 'display-boy'
    player = angular.copy $scope.girls
    resetQ() if QItem.length < 1
    $scope.assignment = QItem.rand().replace /{player}/g, -> '<span class="girl">' + (player.rand().name || 'GIRL') + '</span>'

  $scope.getQ4Girl = () ->
    $scope.display = 'display-girl'
    player = angular.copy $scope.boys
    resetQ() if QItem.length < 1
    $scope.assignment = QItem.rand().replace /{player}/g, -> '<span class="boy">' + (player.rand().name || 'BOY') + '</span>'

  $scope.back = () ->
    $scope.display = ''
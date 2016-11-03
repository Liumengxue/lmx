angular.module('starter.controllers', [])
.controller('AccountCtrl',function($window,$ionicLoading,$timeout,$scope,$rootScope,$ionicPopup,$ionicModal,$state,$ionicTabsDelegate,$ionicSlideBoxDelegate,AccountService){

$rootScope.isLogin = false;
$ionicModal.fromTemplateUrl('templates/tab-account-login.html',{
  scope:$scope,
  animation:'slide-in-up'

}).then(function(modal){
  $scope.modal = modal;
});

$scope.loginData = {
  username:'',
  password: ''
} 

$scope.regData = {
  email:'',
  username:'',
  password: ''
}

$scope.user = {
  account: "未登录"
}

$scope.login = function(){
AccountService.login($scope.loginData.username,
      $scope.loginData.password,function(user){
      $scope.user = user,
      $rootScope.isLogin = true;
      $scope.modal.hide();
      $window.location.reload();
      console.log('reload');
    });
}

$scope.register = function(){

  AccountService.reg($scope.regData.name, 
    $scope.regData.email, $scope.regData.password).success(function(data){
      if(data.status==true){

        $ionicLoading.show({
        template:'注册成功',
        noBackdrop:true
      })


       $timeout(function(){
         $ionicLoading.hide();
        },1000);

       
       $timeout(function(){
         accountSlide.slide(0);
        },2000);

      return true;       
      }
    })
}


$scope.uData = AccountService.getCacheUser();

$scope.doRefresh = function(){

  AccountService.user(function(result){

    if(result.status == false){
      $ionicPopup.alert({
        title:'提示',
        template:result.msg
      });
    }

    $scope.user = result;

    $scope.$broadcast('scroll.refreshComplete');

  });

}

$scope.goDetails = function()
{

  if($rootScope.isLogin == false)
  {
   
   $scope.modal.show()
   
  }else{

    $state.go('tab.account-details');

    $ionicTabsDelegate.showBar(false);
  }

}

 $scope.$on('$ionicView.beforeEnter',function(){
  console.log('已经成为活动视图');
 var user = AccountService.getCacheUser();
  if(user == undefined){
    $rootScope.isLogin = false;
    $scope.user = {};
  }else{
    if(user.status!=false){
      $rootScope.isLogin = true;
      $scope.uesr = user;
    }
  }

  $ionicTabsDelegate.showBar(true);
 })

var accountSlide = $ionicSlideBoxDelegate.$getByHandle('accountSlide');
var accountTab= $ionicTabsDelegate.$getByHandle('accountTab')
$scope.AccountSlideChanged =function(index){
  accountTab.select(accountSlide.currentIndex());
}

$scope.accountselectTab = function(index){
  accountSlide.slide(index);
}
})
// AccountDetailsCtrl
.controller('AccountDetailsCtrl',function($scope,
  $rootScope,$ionicHistory,$state,AccountService){
$scope.logout = function(){
  console.log('logout');
  window.localStorage.removeItem(cache.user);
  window.localStorage.removeItem(cache.token);
  $rootScope.isLogin =false;
  // $state.go('tab.account');
  $ionicHistory.goBack();
}
console.log(AccountService.getCacheUser());
$scope.user = AccountService.getCacheUser();
$scope.doRefresh  = function()
{
  AccountService.user(function(user){
    $scope.user = user;
    $rootScope.isLogin=true;
    $scope.$broadcast('scroll.refreshComplete');
  })
}
})
.controller('BaseCtrl', function($scope,$rootScope,$ionicTabsDelegate,$ionicSlideBoxDelegate,$ionicScrollDelegate) {
        $rootScope.imgUrl = imgUrl;
        $scope.slides = $scope.classify;
        $scope.tabs = $scope.classify;

        $scope.getData = function (c) {
            // 安卓平台不会自动触发加载
            if (ionic.Platform.isAndroid()) {
                c.doRefresh();
            }
            // 初始化数据，和回调函数 
            c.isload = false;
            c.callback = function () {
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }
        // 初始化第一个tab的数据
        $scope.getData($scope.classify[0]);
        //重要：因为页面中用了n个tabs组建，所以这里通过每个controller对应的currentTabId来判断哪个tabs来做选中操作。
        var selectTab = function (index) {
            // 优化 使用delegate-handle来操作tabs # currentTabId
            $ionicTabsDelegate.$getByHandle($scope.currentTabId)
            .select(index);
        }

        $scope.slideChanged = function (index) {
            var c = $scope.classify[index]
            $scope.getData(c);
            //选中tabs
            selectTab(index);
        };

        $scope.$on('$ionicView.afterEnter', function () {
            //选中tabs
            selectTab($ionicSlideBoxDelegate
              .$getByHandle($scope.currentSlide).currentIndex());
        });

        $scope.selectedTab = function (index) {
            //滑动的索引和速度
            $ionicSlideBoxDelegate.slide(index)
        }
        $scope.$on('$ionicView.beforeEnter', function () {
            console.log('已经成为活动视图');
            $ionicTabsDelegate.showBar(true);
        });

})

.controller('Tab1Ctrl', function($state
  ,$scope,$controller,Tab1Service,$ionicTabsDelegate) {
  
$scope.classify = Tab1Service.getTab1Menu();
  $scope.currentTabId = "tab1";
  $controller('BaseCtrl',{$scope:$scope});

  $scope.goDetails = function(item){
    var title ="",name="";
  if(item.title){
    title +=item.title;
  }
   if(item.name){
    name +=item.name;
  }

  $state.go('tab.tab1-details',{id:item.id,title:item.title});
  $ionicTabsDelegate.showBar(false);
  }       
})
 .controller('Tab1DetailsCtrl',
     function ($scope, $stateParams, $timeout,
      $ionicLoading,$ionicActionSheet, $ionicPopover,AccountService, $ionicActionSheet,
       Tab1Service,FavService) {
  $scope.favorite =function(){  
   var user = AccountService.getCacheUser();
    if(user == undefined ){
      $ionicLoading.show({
        template:'请登录',
        noBackdrop:true
      })
    }else{

 var hideSheet =$ionicActionSheet.show({
    buttons:[
     {text:'收藏'}
     ],
     titleText:'加入收藏夹',
     cancelText:'取消',
     cancel:function(){
     },
     buttonClicked:function(index){
      FavService.addFav(id).success(function(data){
        console.log(data.status);
        if(data.status==true){
             $ionicLoading.show({
            template:'收藏成功',
            noBackdrop:true
          })
           
        }else{
           $ionicLoading.show({
            template:'收藏失败',
            noBackdrop:true
          })
        
        }
       
        $timeout(function(){
         $ionicLoading.hide();
        },1000)

      });

      return true;

     }
   })

    }
  
    $timeout(function(){
      $ionicLoading.hide();
     },1000);

    return;
   
 }
    
        var id = $stateParams.id;
        // var type = $stateParams.type;
        $scope.title = $stateParams.title;
        Tab1Service.getDetails(id).success(function (response) {
            $scope.item = response.data;
        })


})
 .controller('Tab2Ctrl', function($timeout,$ionicSlideBoxDelegate,$scope,$state,Tab2Service,$controller,$ionicTabsDelegate) {

$scope.classify = Tab2Service.getTab2Menu();

// console.log($scope.classify);

$scope.currentTabId = "tab1";
$controller('BaseCtrl',{$scope:$scope});

$scope.goDetails = function(item){
  var title ="",name="";
  if(item.title){
    title +=item.title;
  }
   if(item.name){
    name +=item.name;
  }

  $state.go('tab.tab2-details',{id:item.id,title:item.title});
  $ionicTabsDelegate.showBar(false);
// $state.go('tab.tab2-details',{id:item.id,title:item.title});
   
  //  $ionicTabsDelegate.showBar(false);

}
})

.controller('Tab2DetailsCtrl', function($scope,$stateParams,Tab2Service) {
var id = $stateParams.id;
// console.log($stateParams.title);
$scope.title = $stateParams.title;
Tab2Service.getDetails(id)
.success(function(response){
// console.log(response.data);
$scope.item = response.data;
})
})

.controller('Tab3Ctrl', function($scope,Tab3Service,$controller,$state,$ionicTabsDelegate) {
  $scope.classify = Tab3Service.getTab3Menu();
  $scope.currentTabId = "tab1";
  $controller('BaseCtrl',{$scope:$scope});

  $scope.goDetails = function(item){
    var title ="",name="";
  if(item.title){
    title +=item.title;
  }
   if(item.name){
    name +=item.name;
  }

  $state.go('tab.tab3-details',{id:item.id,title:item.title});
  $ionicTabsDelegate.showBar(false);

  }   
})


.controller('Tab3DetailsCtrl', function($scope,$stateParams,Tab3Service) {
var id = $stateParams.id;
// console.log($stateParams.title);
$scope.title = $stateParams.title;
Tab3Service.getDetails(id)
.success(function(response){
// console.log(response.data);

$scope.item = response.data;
})
})

.controller('Tab4Ctrl', function($scope) {})
.controller('FavCtrl', function($state,$scope,$timeout,FavService,$state,$ionicLoading,$ionicListDelegate) {
$scope.shouldShowDelete = false;
$scope.shouldShowReorder = false;
$scope.listCanSwipe = true;
 FavService.getFavorites().success(function(data){
$scope.items = data.data;
 })

// var vm = $scope.vm = {
//   row:1,
//   isload:false,
//   items:[],
//   load:function(){
//     FavService.getFavorites()
//     .success(function(response){

//    console.log(response);

//       if(response.data.length==0){
//         vm.isload =true;
//       }else{
//         vm.row +=1;
//         vm.items = vm.items.concat(response.data);
//       }
//     }).finally(function(){
//       $scope.$broadcast('scroll.refreshComplete');
//       $scope.$broadcast('scroll.infiniteScrollComplete');
//     })
//   },
//   doRefresh:function(){
//     vm.items = [];
//     vm.row = 1;
//     vm.load();
//   },

//   loadMore:function(){
//     vm.load;
//   }
// }

  $scope.goDetails = function(item){
    $state.go('tab.account'
      ,{id:item.id,title:item.title})
  }
  $scope.removeItem = function(item){
    FavService.deleteFav(item.id)
    .success(function(data){

    // console.log(data);

      if(data.status==true){
        $scope.items.splice($scope
          .items.indexOf(item),1);
        $ionicListDelegate.closeOptionButtons();

        $ionicLoading.show({
          template:'已删除',
          noBackdrop:true
        })
      }else{
        $ionicLoading.show({
          template:'删除失败',
          noBackdrop:true
        })
      }

     $timeout(function(){
      $ionicLoading.hide();
     },1000)

     return true;

    })
  }
});

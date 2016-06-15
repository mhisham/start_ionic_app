var salons = [{
    id:1,
    src:"https://www.salonpricelady.com/wp-content/uploads/2016/02/hair-salon-inside.jpg",
    title:"Test 1"
  },{
    id:2,
    src:"http://ell.h-cdn.co/assets/cm/15/02/980x653/54ab24c9d8812_-_elle-alabama-birmingham-muse-salon.jpg",
    title:"Test2" 
  },
  {
    id:3,
    src:"https://www.salonpricelady.com/wp-content/uploads/2016/02/hair-salon-inside.jpg",
    title:"Test 3"
  }
  ];
angular.module('starter.controllers', ['satellizer'])
//Home Screen After Login
.controller('ListController',function($scope,$auth,$state,$ionicHistory){
  if(!$auth.isAuthenticated())
  {
      $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
      });
      $state.go('auth.welcome');
      return;
  }


  $scope.items = salons;
//   $scope.doRefresh = function(){
    //   alert('ssss');
      //$scope.$broadcast('scroll.refreshComplete');
//   }
})
//Login
.controller('LoginController',function($auth,$translate,$filter,$http,$ionicHistory,$state,$ionicPopup,$scope,$stateParams,$ionicLoading,$rootScope){
    //Change langueage test
    // $rootScope.change_lang('ar');
    $scope.user = {};
    $scope.login = function(){
        $credintials = {
            email: $scope.user.email,
            password: $scope.user.password
        }
        $ionicLoading.show();
        $auth.login($credintials)
        .then(function(results)
        {
            $http.get(api_base_url+'/user').then(function(response)
            {//Success
                $ionicLoading.hide();
                var user = JSON.stringify(response.data.user);
                localStorage.setItem('user',user);
                $ionicHistory.nextViewOptions({
                    disableBack:true
                });
                $state.go('tab.home');
            },function(err)
            {//Error
                $ionicLoading.hide();
                $ionicPopup.alert({title:"Error"});
            });
        })
        .catch(function(response) {
            $ionicLoading.hide();
            $ionicPopup.alert({title:$filter("translate")("Invalid username or password")});
        });
    };
})
// Register
.controller('RegisterController',function($scope,$stateParams){})
.controller('BookController',function($scope,$stateParams)
{
 var vm = this;   
    for (var i in salons) {
        if (salons.hasOwnProperty(i) && salons[i]['id'] == $stateParams.salonId) 
        {
            $scope.salon =  salons[i];
            console.log('found', salons[i]);
            break;
        }
    }
    $scope.carouselOptions = {
            carouselId    : 'carousel-1',
            align         : 'left',
            selectFirst   : true,
            centerOnSelect: false
        };
    $scope.onSelectCarousel = function (item){
        console.log('test:',item);
    };
    $scope.carouselData = carouselData =  
    [
        {
            id:1,
            display:'item 1'
        },
        {
            id:2,
            display:'item 2'
        },
        {
            id:3,
            display:'item 3'
        },
        {
            id:4,
            display:'item 4'
        },
        {
            id:5,
            display:'item 1'
        },
        {
            id:6,
            display:'item 2'
        },
        {
            id:7,
            display:'item 3'
        },
        {
            id:8,
            display:'item 4'
        },
        {
            id:9,
            display:'item 1'
        },
        {
            id:10,
            display:'item 2'
        },
        {
            id:11,
            display:'item 3'
        },
        {
            id:12,
            display:'item 4'
        }
    ];
    
    
    
})
.controller('HistoryController',function($scope){})
.controller('OffersController',function($scope){})
.controller('ProfileController',function($scope){});

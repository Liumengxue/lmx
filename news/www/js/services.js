angular.module('starter.services', [])
.service('BaseService',function($http){
this.loadMore = function($this){
  console.log('正在加载更多数据...'+$this.page);
  $http.get($this.url+'?page='+$this.page)
  .success(function(response){
    if (response.data.length==0) {        
    console.log('没有数据了，谢谢');
    $this.isload=true; 
    }else{
      $this.items = $this.items.concat(response.data);
      $this.page++;
    }
    $this.callback();
  })
}

this.doRefresh = function($this)
{
  console.log('正在执行refresh操作...');
  $http.get($this.url+"?page="+$this.page)
  .success(function(response){

    console.log('doRefresh');
    $this.page = 1;
    $this.items = response.data;
    $this.callback();
    $this.isload = false;
  })
}
})

.service("Tab1Service",function($http,BaseService){
  this.getDetails = function(id){
     return $http.get(urls.show + id);
   }

  this.getTab1Menu = function(){
    return [

    {
            name:"国内新闻",
            isload:true,
            url:domain + 'info/list',
            type:'xue',
            page:1,
            items:[],
            loadMore:function(){
              // console.log(this);

              BaseService.loadMore(this);
            },
            doRefresh:function(){
              BaseService.doRefresh(this);
            },
            callback:function(){

            }
    },
        {
            name:"国际新闻",
            isload:true,
            url:domain + 'info/list',
            type:'jun',
            page:1,
            items:[],
            loadMore:function(){
              // console.log(this);

              BaseService.loadMore(this);
            },
            doRefresh:function(){
              BaseService.doRefresh(this);
            },
            callback:function(){

            }
    }

    ]
  }


})
.service('Tab2Service',function($http,BaseService){

this.getDetails = function(id){

     return $http.get(urls.show + id);
   }

  this.getTab2Menu = function(){
    return [

    {
            name:"明星八卦",
            isload:true,
            url:domain + 'other/list',
            type:'xue',
            page:1,
            items:[],
            loadMore:function(){
              // console.log(this);

              BaseService.loadMore(this);
            },
            doRefresh:function(){
              BaseService.doRefresh(this);
            },
            callback:function(){

            }
    },
        {
            name:"时尚资讯",
            isload:true,
            url:domain + 'info/list',
            type:'jun',
            page:1,
            items:[],
            loadMore:function(){
              // console.log(this);

              BaseService.loadMore(this);
            },
            doRefresh:function(){
              BaseService.doRefresh(this);
            },
            callback:function(){

            }
    }

    ]
  }
})
.service('Tab3Service',function(BaseService,$http){

  this.getDetails = function(id){

     return $http.get(urls.show + id);
   }

  this.getTab3Menu = function(){
    return [

    {
            name:"国内军事",
            isload:true,
            url:domain + 'other/list',
            type:'xue',
            page:1,
            items:[],
            loadMore:function(){
              // console.log(this);

              BaseService.loadMore(this);
            },
            doRefresh:function(){
              BaseService.doRefresh(this);
            },
            callback:function(){

            }
    },
        {
            name:"国际军事",
            isload:true,
            url:domain + 'info/list',
            type:'jun',
            page:1,
            items:[],
            loadMore:function(){
              // console.log(this);

              BaseService.loadMore(this);
            },
            doRefresh:function(){
              BaseService.doRefresh(this);
            },
            callback:function(){

            }
    }

    ]
  }


})

.service('Tab4Service',function($http){
  
  var loadMore=function($this){
    console.log('正在加载更多数据...'+$this.page);
    $http.get($this.url+"?page="+$this.page)
    .success(function(response){
      if(response.data.length==0){
        console.log('没有数据了，谢谢');
        $this.isload=true;
      }else{
        
        $this.items=$this.items.concat(response.data);
        $this.page++;
      }
      $this.callback();


      
    })
  }

  var doRefresh=function($this){
    console.log('正在执行refresh操作...');
    $http.get($this.url+"?page="+$this.page)
    .success(function(response){
      if(response.data){
        $this.page=2;
        $this.items=response.data;
      }
      $this.callback();
      $this.isload=true;
    })
  }
  this.getDetails=function(id){
    return $http.get(urls.show+id);
  }
  this.getTab4Menu=function(){
    return [

    {
      name:'体育新闻',
      isload:true,
      url:domain+'info/list',
      type:'tiyuxinwen',
      page:1,
      items:[],
      loadMore:function(){
        // console.log($this);
        loadMore(this);
      },
      doRefresh:function(){
        doRefresh(this);
      },
      callback:function(){

      }
    },
    {
      name:'体育八卦',
      isload:true,
      url:domain+'other/list',
      type:'tiyubagua',
      page:1,
      items:[],
      loadMore:function(){
        // console.log($this);
        loadMore(this);
      },
      doRefresh:function(){
        doRefresh(this);
      },
      callback:function(){

      }
    },


    ]
  }
})
.service('AccountService',function($http){

var $this = this;

// $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

this.getCacheUser = function()
{
  return angular.fromJson(window.localStorage[cache.user]);
}

this.login = function(username,password,callback){
  $http.post(infos.login,{grant_type:settings.grant_type,
    client_id:settings.client_id,
    client_secret:settings.client_secret,
    username:username,password:password})
    .success(function(data){
    // console.log(data);
    // console.log(window.localStorage[cache.token]);
    if(data.status==false){

      alert('用户名和密码不匹配');
      
    }else{

      window.localStorage[cache.token] = data.access_token;
      $this.user(callback);

    }
   
  })
}


this.user = function(callback){

  var url = infos.user + "?access_token=" + window.localStorage[cache.token];

    $http.get(url).success(function(data){

        window.localStorage[cache.user] = angular.toJson(data);

        callback(data)
    })
}

this.reg = function(name,email,password){
return $http.post(infos.reg,{name:name,email:email,password:password});
  
  }
})

.service('FavService',function($http){
this.getFavorites = function(){
  return $http.get(infos.favourite
    +"?access_token=" + window.localStorage[cache.token]);
}
this.addFav = function(id){
 return $http.get(infos.favouriteAdd+"/"+id
  +"?access_token=" + window.localStorage[cache.token]);

}

this.deleteFav = function(id){
  return  $http.get(infos.favouriteDelete+id+
    "?access_token="
     + window.localStorage[cache.token]); 
}
})
;

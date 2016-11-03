var domain = "http://192.168.1.134/api/";

var imgUrl = "http://192.168.1.134/";


// var userUrl="http://192.168.1.133/api/";


var urls = {
	show:"http://192.168.1.134/api/show/"
}

var cache = {
	user: "news"
}
// client_id
// grant_type
// password
// client_secret
// username

var settings = {
	grant_type:"password",
	client_id:"f3d259ddd3ed8ff3843839b",
	client_secret:"4c7f6f8fa93d59c45502c0ae8c4a95b"
}


var infos = {
	login: domain+'oauth/access_token',
	reg: domain+'register',
	user: domain +'user',
	favourite: domain +'favourite',
	favouriteAdd: domain +'favourite/add',
	favouriteDelete: domain +'favourite/delete/',

}
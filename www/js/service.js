angular.module('starter.service', [])

.factory('beforeAuth', function($http) {
    // var baseUrl = 'http://198.50.174.69/futsalservice/index.php/main/';
    var baseUrl = 'http://localhost/ionic_projects/futsalservice/index.php/main/';
    return {
        getUserId: function (uId){
            return $http.get(baseUrl+'datauser.php?id='+uId); 
        },
        p_daftar: function (datadaftar){
            return $http.post(baseUrl+'p_daftar',datadaftar,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                },
            });
        },
        p_login: function(f_login) {
            return $http.post(baseUrl+'p_login', f_login,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        }
    };
    
});

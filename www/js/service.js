angular.module('starter.service', [])

.factory('beforeAuth', function($http) {
    var baseUrl = 'http://localhost/ionic_projects/futsalservice/index.php/main/';
    return {
        getAll: function() {
            return $http.get(baseUrl+'ambilteman.php');
        },
        getId: function (temanId){
            return $http.get(baseUrl+'ambiltemanid.php?id='+temanId); 
        },
        create: function (datateman){
            // console.log(datateman);
            return $http.post(baseUrl+'tambahteman.php',datateman,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                },
                data:datateman
            });
        }, 
        p_daftar: function (datadaftar){
            return $http.post(baseUrl+'p_daftar',datadaftar,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                },
            });
        },
        update: function (datateman){
            return $http.post(baseUrl+'updateteman.php',datateman,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'hapusteman.php?id='+id);
        }
    };
    
});

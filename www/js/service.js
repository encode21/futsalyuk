angular.module('starter.service', [])

.factory('beforeAuth', function($http) {
    // var baseUrl = 'http://localhost/ionic_projects/futsalservice/index.php/main/';
    var baseUrl = 'http://198.50.174.69/futsalservice/index.php/main/';
    return {
        cekKoneksi: function () {
            return $http.get(baseUrl+'cek_koneksi');
        },
        getUserId: function (uId){
            return $http.get(baseUrl+'datauser?id_user='+uId); 
        },
        getTeamId: function (uId){
            return $http.get(baseUrl+'datateam?id_team='+uId); 
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
        },
        /*After Login*/
        getTimeline: function() {
            
            return $http.get(baseUrl+'ambil_timeline',function(response) {
                $scope.newMessage = response.data.queries.request.totalResults;
                $scope.messages.push($scope.newMessage);
            });
        },
        get_tempatFutsal: function() {
            return $http.get(baseUrl+'ambil_tempatfutsal');
        },
        get_tempatFutsalid: function(idLap) {
            return $http.get(baseUrl+'ambil_tempatfutsalid?id_lap='+idLap);
        },
        get_bookingpenyedia: function(id) {
            return $http.get(baseUrl+'ambil_bookingdipenyedia?id_penyedia='+id);
        },
        ambil_gallerylapanganLim: function(id) {
            return $http.get(baseUrl+'ambil_gallerylapanganLim?id_lap='+id);
        },
        ambil_listuserchat: function(id) {
            return $http.get(baseUrl+'listuser_chat?id='+id);
        },        
        ambil_isichat: function(id,idu) {
            return $http.get(baseUrl+'isi_chat?id_peng='+id+'&id_pen='+idu);
        },
        ambil_userid: function(id) {
            return $http.get(baseUrl+'ambil_userid?iduser='+id);
        }
    };
});

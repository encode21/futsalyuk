/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('logCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,ionicMaterialMotion,ionicMaterialInk){
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
    });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
    });
})
.controller('loginCtrl', function($scope, $stateParams,$ionicPopup, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth){
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();

    /*Processes*/
    $scope.showAlertError = function(msg){
        $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-assertive'
      });
    }

    $scope.flogin = {};
    $scope.p_login = function() {
        if (!$scope.flogin.username) {
            $scope.showAlertError({
                title: "Information",
                message: "Username mohon diisi"
            });
        }else if (!$scope.flogin.password) {
            $scope.showAlertError({
                title: "Information",
                message: "Password mohon diisi",
            });
        }else{
            beforeAuth.p_login({
                username: $scope.flogin.username,
                password: $scope.flogin.password,
            }).success(function(data){
                
                // $scope.hideLoader();
                // console.log(data);
                if (data.msg=='error_auth') {
                    $scope.showAlertError({
                        title: "Error",
                        message: "Silahkan cek kembali username dan password Anda :)"
                    });
                }else{
                    $scope.showAlertError({
                        title: "Sukses",
                        message: "Berhasil Login"
                    });
                    window.location='#/profile';
                }
                $("#formlogin")[0].reset();
            }).error(function() {
                $scope.showAlertError({
                    title: "Error",
                    message: "Gagal Login"
                });
                // $scope.hideLoader();
            });
            // $scope.loader();
        }
    }
    /*Processes*/
})
.controller('profileCtrl', function($scope, $stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk){
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
})
.controller('registerCtrl', function($scope, $stateParams,$ionicPopup,$ionicLoading, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 0);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
    
    var cb = $("#coba"),ld = $("#loadernya");
    ld.hide();
    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-assertive'
      });
    }
    $scope.loader = function() {
        ld.show();
        $ionicLoading.show({
            template:'<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
        cb.removeClass('ion-checkmark');
    };
    $scope.hideLoader = function() {
        ld.hide();
        $ionicLoading.hide({
            template:'<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });
        cb.addClass('ion-checkmark');
    }
    $scope.datadaftar={};
    $scope.daftar = function (){
        if (!$scope.datadaftar.email){
            $scope.showAlert({
                title: "Information",
                message: "Email mohon diisi"
            });
            // $("input[id='email']").attr('focus',true);
        }else if (!$scope.datadaftar.username){
            $scope.showAlert({
                title: "Information",
                message: "Username mohon diisi"
            });
        }else if (!$scope.datadaftar.pwd){
            $scope.showAlert({
                title: "Information",
                message: "Password mohon diisi"
            });
        }else if (!$scope.datadaftar.nama){
            $scope.showAlert({
                title: "Information",
                message: "Nama Team mohon diisi"
            });
        }else if (!$scope.datadaftar.jml){
            $scope.showAlert({
                title: "Information",
                message: "Jumlah anggota mohon diisi"
            });
        }else if (!$scope.datadaftar.tlp){
            $scope.showAlert({
                title: "Information",
                message: "No.Telp mohon diisi"
            });
        }else if (!$scope.datadaftar.regional){
            $scope.showAlert({
                title: "Information",
                message: "Data Regional mohon diisi"
            });
        }else{
            // $scope.showAlert({
            //     title: "Information",
            //     message: "Sukses!"
            // });
            beforeAuth.p_daftar({
                email: $scope.datadaftar.email,
                username: $scope.datadaftar.username,
                pwd: $scope.datadaftar.pwd,
                nama: $scope.datadaftar.nama,
                jml: $scope.datadaftar.jml,
                reg: $scope.datadaftar.regional,
                tlp: $scope.datadaftar.tlp
            }).success(function(data){
                $scope.showAlert({
                    title: "Information",
                    message: "Data Telah Tersimpan"
                });
                $scope.hideLoader();
                $("#fdaftar")[0].reset();
                // window.location = "#/profile";
            }).error(function() {
                $scope.showAlert({
                    title: "Error",
                    message: "Data Gagal Disimpan"
                });
                $scope.hideLoader();
            });
            $scope.loader();
        }
    } 
})
.controller('sewaCtrl', function($scope, $stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk) {
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 0); 
})
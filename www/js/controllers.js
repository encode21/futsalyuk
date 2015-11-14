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
                // var dt = $.parseJSON(data);
                console.log(data);
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
                    if (data.statusUser=='penyewa') {
                        var id= $("#idUser").val(data.id);
                        // console.log(id);
                        window.location='#/home';
                    }else if (data.statusUser=='penyedia') {
                        var id= $("#idUser").val(data.id);
                        window.location='#/penyedia';
                    }
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
.controller('homeCtrl', function($scope, $stateParams,$ionicPopover,$ionicModal,$cordovaCamera, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth){
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

    var template =  '<ion-popover-view style="height:160px;">' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">Sumarna Team</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content>' +
                    '       <div class="list">' +
                    '            <a class="item item-icon-left">' +
                    '                <i class="icon ion-android-person"></i> Profile' +
                    '           </a>' +
                    '           <a class="item item-icon-left">' +
                    '               <i class="icon ion-log-out"></i> Logout' +
                    '            </a>' +
                    '        </div>' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    ionicMaterialInk.displayEffect();
    var id = $("#idUser").val();
    $scope.getTeamId = function() {
        beforeAuth.getTeamId(id).success(function(dataTeam) {
            $scope.dataTeam = dataTeam;
        });
        beforeAuth.getUserId(id).success(function(dataUser) {
            $scope.dataUser = dataUser;
        });
    };
    $scope.getTeamId();
    var options = { 
        quality : 75, 
        destinationType : Camera.DestinationType.FILE_URI, 
        sourceType : 1, 
        allowEdit : true,
        encodingType: 0,
        targetWidth: 380,
        targetHeight: 450,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };
    $scope.takePicture = function() {

        navigator.geolocation.getCurrentPosition(getLocCoords);

        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.imgURI = imageData;
          id ++;
          var post = { id: id, image: $scope.imgURI }
          // Posts.addPost(post);
          console.log(post);
        }),function(err) {

        };
    }
    $ionicModal.fromTemplateUrl('edit.html', function(modal){
        $scope.taskModal = modal;
    }, {
        scope : $scope,
        animation : 'slide-in-up'   
    });
    $scope.editModal = function(){
        $scope.taskModal.show();
    };
    
    $scope.batal = function(){
        $scope.taskModal.hide();
        $scope.showDataId();
    };

})
.controller('registerCtrl', function($scope,$ionicPopover, $stateParams,$ionicPopup,$ionicLoading, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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
                // $scope.p_login();
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
.controller('sewaCtrl', function($scope, $ionicPopover,$stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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
    /*popover*/

    // .fromTemplate() method
    var template =  '<ion-popover-view style="height:160px;">' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">Sumarna Team</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content>' +
                    '       <div class="list">' +
                    '            <a class="item item-icon-left">' +
                    '                <i class="icon ion-android-person"></i> Profile' +
                    '           </a>' +
                    '           <a class="item item-icon-left">' +
                    '               <i class="icon ion-log-out"></i> Logout' +
                    '            </a>' +
                    '        </div>' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });

    // Get Lapangan
    $scope.tempatfutsal = function() {
        beforeAuth.get_tempatFutsal().success(function(dtlap) {
            $scope.dtlap = dtlap;
        });
    };
    $scope.tempatfutsal();
})
.controller('detailLapangan', function($scope, $ionicPopover,$stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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
    $scope.showPopup = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'You are now my subscribed to Cat Facts',
            template: 'You will meow receive fun daily facts about CATS!'
        });

        $timeout(function() {
            ionicMaterialInk.displayEffect();
        }, 0);
    };
    /*popover*/
    // console.log(idnya);

    var template =  '<ion-popover-view style="height:160px;">' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">Sumarna Team</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content>' +
                    '       <div class="list">' +
                    '            <a class="item item-icon-left">' +
                    '                <i class="icon ion-android-person"></i> Profile' +
                    '           </a>' +
                    '           <a class="item item-icon-left">' +
                    '               <i class="icon ion-log-out"></i> Logout' +
                    '            </a>' +
                    '        </div>' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    var idnya = $stateParams.dtId_penyedia;
    console.log(idnya);
    // Get detail lapangan
    $scope.tempatfutsalid = function() {
        beforeAuth.get_tempatFutsalid(idnya).success(function(dtlapdetail) {
            $scope.dtlapdetail = dtlapdetail;
        });
        beforeAuth.get_bookingpenyedia(idnya).success(function(dtbookingpenyedia) {
            $scope.dtbookingpenyedia = dtbookingpenyedia;
        });
        beforeAuth.ambil_gallerylapanganLim(idnya).success(function(dtgallery) {
            $scope.dtgallery = dtgallery;
        });
    };
    $scope.tempatfutsalid();
})
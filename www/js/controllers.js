/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ng-mfb'])
.run(function($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Oops!",
                        content: "Masalah koneksi ke server. Untuk melanjutkan silahkan hidupkan Mobile Network atau hubungkan ke Wi-fi"
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });
    })
.controller('tabCtrl', function($scope){
})
.controller('logCtrl', function($scope, $ionicModal, $ionicPopover,$ionicPopup, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth){
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
    // $scope.showPopupError = function(msg){
    //     $ionicPopup.alert({
    //       title: "Error",
    //       template: "Pastikan smartphone Anda terkoneksi ke Internet.",
    //       // okText: 'Ok',
    //       // okType: 'button-assertive',
    //       buttons : [{
    //             text : 'Coba lagi',
    //             type : 'button-assertive',
    //             onTap: function(e) {
    //                 e.preventDefault();
    //                 // alert('kampret');
    //                 $ionicPopup.close;
    //                 window.location.reload(); 
    //             }
    //         }
    //       ]
    //   });
    // };
    // $scope.ck = function() {
    //     beforeAuth.cekKoneksi().success(function(cn) {
    //         var connected = cn.conn;
    //         if (connected=='berhasil') {
    //             // $scope.showPopupError();
    //         }else if (connected='tidak') {
    //             $scope.showPopupError();
    //         }
    //         // console.log(cn.conn);
    //     });
    // };
    // $scope.ck();
})
.controller('loginCtrl', function($scope,$ionicPopover,$state, $stateParams,$ionicPopup,$ionicLoading, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth){
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

    var cb = $("#coba"),ld = $("#loadernya");
    ld.hide();
    $scope.showAlertError = function(msg){
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
                $scope.hideLoader();
                console.log(data);
                if (data.msg=='error_auth') {
                    $scope.showAlertError({
                        title: "Error",
                        message: "Silahkan cek kembali username dan password Anda :)"
                    });
                    $scope.hideLoader();
                }else{
                    if (data.statusUser=='penyewa') {
                        var id= $("#idUser").val(data.id);
                        // console.log(id);
                        $state.go("tab.home");
                    }else if (data.statusUser=='penyedia') {
                        var id= $("#idUser").val(data.id);
                        // window.location='#/home';
                        $state.go("penyedia");
                    }
                    $scope.hideLoader();
                }
                $("#formlogin")[0].reset();
            }).error(function() {
                $scope.showAlertError({
                    title: "Error",
                    message: "Gagal Login"
                });
                $scope.hideLoader();
            });
            $scope.loader();
        }
    }
    /*Processes*/
})
.controller('homeCtrl', function($scope, $stateParams,$ionicPopover,$ionicModal,$ionicLoading, $location,$timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth){
    var id = $("#idUser").val();
    $scope.getTeamId = function() {
        beforeAuth.getTeamId(id).success(function(dataTeam) {
            $scope.dataTeam = dataTeam;
            // $ionicLoading.hide();
        });
        beforeAuth.getUserId(id).success(function(dataUser) {
            $scope.dataUser = dataUser;
            // $ionicLoading.hide();
        });
        beforeAuth.getTimeline().success(function(dttl) {
            $scope.dttl = dttl;
            $ionicLoading.hide();
        });
    };
    $scope.showData = function() {
        beforeAuth.getTimeline().success(function(dttl) {
            $scope.dttl = dttl;
            $ionicLoading.hide();
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();
    // $scope.doRefresh = function() {
    
    // console.log('Refreshing!');
    //     $timeout( function() {
    //       //simulate async response

    //       //Stop the ion-refresher from spinning
    //       $scope.$broadcast('scroll.refreshComplete');
        
    //     }, 1000);
    // }
    $scope.loadingIndicator = $ionicLoading.show({
        content: 'Loading Data',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 800,
        showDelay: 0
    });
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

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
    
    /*popover*/
    var options = {
         maximumImagesCount: 10,
         width: 800,
         height: 800,
         quality: 80
     };

     $scope.ImagePicker=function() {
       document.addEventListener("deviceready", function () {

        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
      };

          $cordovaCamera.getPicture(options).then(function(imageData) {
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
          }, function(err) {
          // error
      });

      }, false);
     }
     
     
    // .fromTemplate() method
    // $ionicPopover.fromTemplateUrl('popovercoba.html', {
    //     scope: $scope
    // }).then(function(popover) {
    //     $scope.popover = popover;
    // });

    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }

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
.controller('sewaCtrl', function($scope, $ionicPopover,$stateParams,$ionicLoading, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }

    // Get Lapangan
    
    $ionicLoading.show({
        content: 'Loading Data',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    $scope.tempatfutsal = function() {
        beforeAuth.get_tempatFutsal().success(function(dtlap) {
            $scope.dtlap = dtlap;
            $ionicLoading.hide();
        });
    };
    $scope.tempatfutsal();
})
.controller('detailLapangan', function($scope, $ionicPopover,$stateParams, $timeout,$ionicModal, $ionicSlideBoxDelegate,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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

    $scope.aImages = [{
        'src' : 'http://ionicframework.com/img/ionic-logo-blog.png', 
        'msg' : 'Swipe me to the left. Tap/click to close'
    }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg', 
        'msg' : ''
    }, { 
        'src' : 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png', 
        'msg' : ''
    }];
  
    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.$on('change', function() {
        $scope.modal.hide();
    });

    $scope.openModal = function() {
      $ionicSlideBoxDelegate.slide(0);
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
  
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
  
    $scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    }
  
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };

    /*popover*/

    // .fromTemplate() method
   $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }
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
    
    var idnya = $stateParams.dtId_penyedia;
    // console.log(idnya);
    // Get detail lapangan
    $scope.tempatfutsalid = function() {
        beforeAuth.get_tempatFutsalid(idnya).success(function(dtlapdetail) {
            $scope.dtlapdetail = dtlapdetail;
        });
        beforeAuth.get_bookingpenyedia(idnya).success(function(dtbookingpenyedia) {
            $scope.dtbookingpenyedia = dtbookingpenyedia;
        });
        beforeAuth.ambil_gallerylapangan(idnya).success(function(dtgallery) {
            $scope.dtgallery = dtgallery;
        });
    };
    $scope.tempatfutsalid();
    $scope.alertGal=function(data) {
        // body...
        alert(data);
    }
})
.controller('setting', function($scope, $ionicPopover,$stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }
})
.controller('profile', function($scope, $ionicPopover,$stateParams, $timeout,$ionicModal, $ionicSlideBoxDelegate,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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
    
    $scope.aImages = [{
        'src' : 'http://ionicframework.com/img/ionic-logo-blog.png', 
        'msg' : 'Swipe me to the left. Tap/click to close'
        }, {
        'src' : 'http://ionicframework.com/img/ionic_logo.svg', 
        'msg' : ''
      }, { 
        'src' : 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png', 
        'msg' : ''
    }];
  
    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.$on('change', function() {
        $scope.modal.hide();
    });

    $scope.openModal = function() {
      $ionicSlideBoxDelegate.slide(0);
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
  
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
  
    $scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    }
  
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };

    /*popover*/

    // .fromTemplate() method
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

    $scope.demo = 'android';
    $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }

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
})
.controller('akunCtrl', function($scope, $ionicPopover,$stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
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
    /*popover*/

    // .fromTemplate() method
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }

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
})
.controller('pesanTeam', function($scope, $ionicPopover,$stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {
    $scope.CallNumber = function(){ 
        var number = '08994453710' ; 
        window.plugins.CallNumber.callNumber(function(){
        //success logic goes here
        }, function(){
         alert("nomor telponnya ga ada");
        }, number) 
    };

    $scope.updateEditor = function() {
        var element = document.getElementById("inputArea");
        element.style.height = element.scrollHeight + "px";
    };
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
    /*popover*/
    var idnya = $stateParams.dtId_user;
    var id = $("#idUser").val();
    $scope.datapesan = function() {
        beforeAuth.ambil_isichat(id,idnya).success(function(datachat) {
            $scope.datachat = datachat;

        });
        beforeAuth.ambil_userid(idnya).success(function(dtuid) {
            $scope.dtuid = dtuid;
        })
    };
    $scope.datapesan();
    // .fromTemplate() method
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }
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
})
.controller('pesanCtrl', function($scope, $ionicPopover,$stateParams,$ionicPopup, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    var id = $("#idUser").val();
    $scope.datanya = function() {
        beforeAuth.ambil_listuserchat(id).success(function(listuserchat) {
            $scope.listuserchat = listuserchat;
            // console.log(listuserchat);
        });
    };
    $scope.datanya();


    ionicMaterialInk.displayEffect();
    /*popover*/

    // .fromTemplate() method
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.hide();
    });
    ionicMaterialInk.displayEffect();
})
.controller('jadwal',function($scope, $ionicPopover,$stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
    /*popover*/
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }

    ionicMaterialInk.displayEffect();

    var idnya = $stateParams.dtId_penyedia;
    console.log(idnya);
    // Get detail lapangan
    $scope.tempatfutsalid = function() {
        beforeAuth.get_tempatFutsalid(idnya).success(function(dtlapdetail) {
            $scope.dtlapdetail = dtlapdetail;
        });
        };
    $scope.tempatfutsalid();

    $scope.groups = [];
  for (var i=1; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: [''],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + ' VS ' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
})
.controller('booking',function($scope, $ionicPopover,$stateParams, $timeout,ionicMaterialMotion,ionicMaterialInk,beforeAuth) {

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
    /*popover*/
    $ionicPopover.fromTemplateUrl('templates/popovercoba.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.$on('change', function() {
        $scope.popover.hide();
    });

      $scope.demo = 'android';
      $scope.setPlatform = function(p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
      }
    $scope.getValue = function (status) {
        console.log('clicked on:' + status);
        $scope.popover.hide();
    }

    ionicMaterialInk.displayEffect();

   var idnya = $stateParams.dtsewId_penyedia;
   $("#idPenyediaK").val(idnya);
    console.log(idnya);
    // Get detail lapangan
    $scope.tempatfutsalid = function() {
        beforeAuth.get_tempatFutsalid(idnya).success(function(dtlapdetail) {
            $scope.dtlapdetail = dtlapdetail;
        });
        // beforeAuth.get_bookingpenyedia(idnya).success(function(dtbookingpenyedia) {
        //     $scope.dtbookingpenyedia = dtbookingpenyedia;
        // });
        beforeAuth.ambil_gallerylapangan(idnya).success(function(dtgallery) {
            $scope.dtgallery = dtgallery;
        });
    };
    $scope.tempatfutsalid();
    $scope.alertGal=function(data) {
        // body...
        alert(data);
    }
})
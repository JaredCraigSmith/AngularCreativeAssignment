
var jungleImage = "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/S15GBCm/videoblocks-cartoon-landscape-with-deep-jungle-background-with-space-for-your-text-or-logo-colorful-forest-animation-full-hd-game-background-4k-rain-forest-with-lake-animation_s-ocon3kz_thumbnail-small07.jpg"
var leopardImage = "https://mbtskoudsalg.com/images/leopard-transparent-background-6.png"
var IcyImage = "https://us.123rf.com/450wm/neyro2008/neyro20081510/neyro2008151000150/45979918-cartoon-winter-landscape-with-iceberg-and-ice-snow-and-cloudy-sky-seamless-vector-nature-background-.jpg?ver=6"
var polarBearImage = "http://pngimg.com/uploads/polar_bear/polar_bear_PNG23507.png"
var jungleGrassImage = "https://img.clipartxtras.com/e4a88de1add89ef2a4e3a3c48906f333_grass-patch-png-clipart-gallery-yopriceville-high-quality-jungle-grass-clipart_6000-2247.png"
var iceChunkImage = "https://img00.deviantart.net/5d35/i/2014/170/8/1/ice_mountain_full_hd_png_transparent___free_use_by_theartist100-d7n2nie.png"

var app = angular.module('myApp', ['ngAnimate', 'ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('pages', {
                    url: '/pages',
                    templateUrl: '/pages.html',
                    controller: 'PagesCtrl'
                });

            $urlRouterProvider.otherwise('home');
        }]) 
    .factory('pageFactory', [function () {
        var o = {
            pages: [{
                backgroundImage: jungleImage,
                checked: "checked",
                content: [{
                    image: leopardImage,
                    hideImage: jungleGrassImage,
                    hideVerticalPosition: "502px",
                    text: "Find and click on the checkbox to see who I am!",
                    verticalPosition: "337px",
                    horizontalPostion: "0px",
                    height: "160px",
                    width: "210px"
                }]
            },
                {
                    backgroundImage: IcyImage,
                    checked: "checked",
                    content: [{
                        image: polarBearImage,
                        hideImage: iceChunkImage,
                        hideVerticalPosition: "583px",
                        text: "I am big and white!",
                        verticalPosition: "337px",
                        horizontalPostion: "0px",
                        height: "233px",
                        width: "230px"
                    }]
            }
            ]
        };
        return o;
    }])
    .controller('MainCtrl', [
        '$scope',
        'pageFactory',
        function ($scope, pageFactory) {
            
            $scope.pages = pageFactory.pages;
            $scope.currentPage = pageFactory.pages[0];
            $scope.currentPageNumber = 0;
            $scope.shouldNotSkip = true;

            $scope.changePage = function (buttonId) {

                var pageNumber = $scope.currentPageNumber;
                if ($scope.shouldNotSkip) {

                    var pageAmount = pageFactory.pages.length;

                    if (buttonId == "prevButton") {
                        pageNumber = pageNumber - 1;
                        if (pageNumber == -1) {
                            pageNumber = pageAmount - 1;
                        }
                    }
                    else if (buttonId == "nextButton") {
                        pageNumber = (pageNumber + 1) % pageAmount;
                    }

                    $scope.currentPageNumber = pageNumber;
                }
                else {
                    $scope.shouldNotSkip = true;
                }
                

                if ($scope.checked) {
                    $scope.currentPage = pageFactory.pages[pageNumber];
                }
                else {
                    $scope.checked = true;

                    setTimeout(function () {
                        $scope.currentPage = pageFactory.pages[pageNumber];
                        $scope.shouldNotSkip = false;
                        document.getElementById(buttonId).click();
                    }, 1100);
                }
            };

        }])
    .controller('PagesCtrl', [
        '$scope',
        'pageFactory',
        function ($scope, pageFactory) {
            $scope.Page = {
                backgroundImage: jungleImage,
                checked: "checked",
                content: [{
                    image: leopardImage,
                    hideImage: jungleGrassImage,
                    hideVerticalPosition: "502px",
                    text: "I have lots of spots!",
                    verticalPosition: "337px",
                    horizontalPostion: "0px",
                    height: "160px",
                    width: "210px"
                }]
            };

            $scope.EditType = "background";
            $scope.EditText = "Enter background Image address:";
            $scope.AlreadyAdded = true;

            $scope.ChangeEditType = function (EditType) {
                if (EditType == "background") {
                    $scope.EditType = "background";
                    $scope.EditText = "Enter background Image address:";
                }
                else if (EditType == "animal") {
                    $scope.EditType = "animal";
                    $scope.EditText = "Enter animal Image address:";
                }
                else if (EditType == "text") {
                    $scope.EditType = "text";
                    $scope.EditText = "Enter text:";
                }
                else if (EditType == "position") {
                    $scope.EditType = "position";
                    $scope.EditText = "Enter number between 170 - 500:";
                }
                else if (EditType == "hide") {
                    $scope.EditType = "hide";
                    $scope.EditText = "Enter hiding spot Image address:";
                }
                $scope.EditInput = '';
            }

            $scope.ApplyChanges = function () {
                $scope.AlreadyAdded = false;
                if ($scope.EditType == "background") {
                    $scope.Page.backgroundImage = $scope.EditInput;
                }
                else if ($scope.EditType == "animal") {
                    $scope.Page.content[0].image = $scope.EditInput;
                }
                else if ($scope.EditType == "text") {
                    $scope.Page.content[0].text = $scope.EditInput;
                }
                else if ($scope.EditType == "position") {
                    $scope.Page.content[0].verticalPosition = $scope.EditInput + "px";
                    var VP = parseInt($scope.EditInput) + 165;
                    $scope.Page.content[0].hideVerticalPosition = VP + "px";
                }
                else if ($scope.EditType == "hide") {
                    $scope.Page.content[0].hideImage = $scope.EditInput;
                }

               
            }

            $scope.AddPageToBook = function () {
                if ($scope.AlreadyAdded == false) {
                    pageFactory.pages.push($scope.Page)
                    $scope.AlreadyAdded = true;
                }
                else {
                    alert("You already added this page, try making a new one!")
                }
                
            }



            

            
        }]);
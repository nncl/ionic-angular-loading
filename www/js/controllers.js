angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function( valid ) {
    if (valid) {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);

    };
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.number = $stateParams.playlistId;
  console.log('Log:' + $scope.number);
})

.controller('ProgressCtrl', function($scope, $interval) {
  $scope.seconds = 0;

  var timer = $interval(function() {
    $scope.seconds += 5;
  }, 1000, 10);

  timer.then(function(){
    setTimeout(function(){
      alert('STOP STOP STOP!!');
    }, 500);
  });

})

.directive('quiz', function(quizFactory) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'templates/question.html',
        link: function(scope, elem, attrs) {
            scope.start = function() {
                scope.id = 0;
                scope.quizOver = false;
                scope.inProgress = true;
                scope.getQuestion();
            };

            scope.reset = function() {
                scope.inProgress = false;
                scope.score = 0;
            }

            scope.getQuestion = function() {
                var q = quizFactory.getQuestion(scope.id);
                if(q) {
                    scope.question = q.question;
                    scope.options = q.options;
                    scope.answer = q.answer;
                    scope.answerMode = true;
                } else {
                    scope.quizOver = true;
                }
            };

            scope.checkAnswer = function() {
                if(!document.querySelectorAll('input[name=answer]:checked').length) return;

                var ans = document.querySelector('input[name=answer]:checked').value;
                console.log(ans);

                if(ans == scope.options[scope.answer]) {
                    scope.score++;
                    scope.correctAns = true;
                } else {
                    scope.correctAns = false;
                }

                scope.answerMode = false;
            };

            scope.nextQuestion = function() {
                scope.id++;
                scope.getQuestion();
            }

            scope.reset();
        }
    }
})

.factory('quizFactory', function() {
    var questions = [
        {
            question: "Which is the largest country in the world by population?",
            options: ["India", "USA", "China", "Russia"],
            answer: 2
        },
        {
            question: "When did the second world war end?",
            options: ["1945", "1939", "1944", "1942"],
            answer: 0
        },
        {
            question: "Which was the first country to issue paper currency?",
            options: ["USA", "France", "Italy", "China"],
            answer: 3
        },
        {
            question: "Which city hosted the 1996 Summer Olympics?",
            options: ["Atlanta", "Sydney", "Athens", "Beijing"],
            answer: 0
        },
        {
            question: "Who invented telephone?",
            options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
            answer: 1
        }
    ];

    return {
        getQuestion: function(id) {
            if(id < questions.length) {
                return questions[id];
            } else {
                return false;
            }
        }
    };
});

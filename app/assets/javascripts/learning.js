$(document).ready(function(){

	var station = 1; 
	$( document).keydown(function( event ) {
		if ( event.which == 39 ) {
			rob = $('.Robert');
			if (station <= 4){
				rob.addClass('Walk_Right').delay(2800).fadeIn(10, function() { rob.removeClass('Walk_Right').addClass('Robert_station' + station); station += 1;});
			}
			if (station == 5){
	    		//rob.addClass('Walk_Right').delay(4300).fadeIn(10, function() { rob.removeClass('Walk_Right').addClass('Robert_station' + station); station += 1;});
	    		rob.addClass('Walk_Down').delay(2800).fadeIn(10, function() { rob.removeClass('Walk_Down').addClass('Robert_station' + station); station += 1;});
	    	}
	    	if (station > 5){
	    		//rob.addClass('Walk_Right').delay(4300).fadeIn(10, function() { rob.removeClass('Walk_Right').addClass('Robert_station' + station); station += 1;});
	    		rob.addClass('Walk_Left').delay(2800).fadeIn(10, function() { rob.removeClass('Walk_Left').addClass('Robert_station' + station); station += 1;});

	    	}
	    	if (station > 8){
	    		location.reload();
	    	}
	    	console.log(station);	
	    	
	    }
	});
});

function Station(id, name, language, title, description){
    	this.id = id;
		this.name = name;
		this.language = language;
		this.description = [];
};

var station1 = new Station('1','station1','At the airport');
station1.description = ['Bonjour. S’il vous plaît… (Hello, please…)','Oui / Non (Yes / No)', 'Parlez-vous anglais ? (Do you speak English?)'];
var station2 = new Station('2','station2','To get information / direction'); 
station2.description = ['Où est-ce que je peux trouver un plan de la ville ? (Where can I find a city map?)',' Merci beaucoup ! (Thank you very much!)'];
var station3 = new Station('3','station3', 'At the transportation');
station3.description = ['Où est le guichet ? (Where is the ticket window?)','Je cherche le bus/train/métro. Où est l’arrêt le plus près? (I am looking for the bus/train/subway. Where is the nearest stop?)'];
var station4 = new Station('4','station4','To get a room');
var station5 = new Station('5','station4','To start a conversation');
var station6 = new Station('6','station6','In a restaurant / coffee shop');
var station7 = new Station('7','station7','In a hangout , activities');
var station8 = new Station('8','station8','To do a shopping');
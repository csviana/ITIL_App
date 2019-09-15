if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', {scope: '/'})
	.then(function(reg) {
		
		// console.log('Registration succeeded. Scope is ' + reg.scope);
		}).catch(function(error) {
		// console.log('Registration failed with ' + error);
	});
}
var classname=document.getElementsByClassName("d-none");
function procurar(texto){
	var n = 0;
	var str = $(texto).val();
    var txt, i, found;
    if (str == "") {
        return false; 
        console.log("Pesquisa vazia");
	}
    try{
		for (var j = 0; j < classname.length; ++j) {
			var item = classname[j];  
			item.classList.remove('d-none');
		}
	}catch(ex){console.log(ex);}
	
    if (window.find) {
        if (!window.find(str)) {
            while (window.find(str, false, true)) {
                n++;
			}
			} else {
            n++;
		}
        if (n == 0) {
            console.log("Not found.");
		}
		} else if (window.document.body.createTextRange) {
        txt = window.document.body.createTextRange();
        found = true;
        i = 0;
        while (found === true && i <= n) {
            found = txt.findText(str);
            if (found) {
                txt.moveStart("character", 1);
                txt.moveEnd("textedit");
			}
            i += 1;
		}
        if (found) {
			
            txt.moveStart("character", -1);
            var parentid=txt.parent();
            var parentcount =0;
            while(parentid != "introducao" || parentcount <10){
				parentcount
                if(parentid.hasClass("d-none"))
                parentid.removeClass("d-none");
                try{
					if(parentid.id=="introducao"){
						parentid="introducao";
						}else{
						parentid = parentid.parent();
					}
					
				}catch(ex){console.log(ex);}
			}
            txt.findText(str);
            txt.select();
            $('html, body').animate({ scrollTop:   txt.offset().top }, 500);
            n++;
			} else {
            if (n > 0) {
                n = 0;
                findInPage(str);
			}
            console.log("Not found.");
		}
	}
    try{
		for (var j = 0; j < classname.length; ++j) {
			var item = classname[j];
			item.classList.add('d-none');
		}
	}catch(ex){console.log(ex);}
    return false;
}

//
var mapa;

$(document).ready(function(){
	// Activate Carousel
	$("#apresents").carousel({interval: 30000});
});

(function (window) {
	'use strict';
	/*
	var fabPushElement = document.querySelector('.fab__push');
	var fabPushImgElement = document.querySelector('.fab__image');
	
	function isPushSupported() {
		
		if (Notification.permission === 'denied') {
			alert('User has blocked push notification.');
			return;
		}
		
		if (!('PushManager' in window)) {
			alert('Sorry, Push notification isn\'t supported in your browser.');
			return;
		}
		navigator.serviceWorker.ready
		.then(function (registration) {
			registration.pushManager.getSubscription()
			.then(function (subscription) {
				
				if (subscription) {
					changePushStatus(true);
				}
				else {
					changePushStatus(false);
				}
			})
			.catch(function (error) {
				console.error('Error occurred while enabling push ', error);
			});
		});
	}
	
	function subscribePush() {
		navigator.serviceWorker.ready.then(function(registration) {
			if (!registration.pushManager) {
				alert('Your browser doesn\'t support push notification.');
				return false;
			}
			registration.pushManager.subscribe({
				userVisibleOnly: true
			})
			.then(function (subscription) {
				try{
					toast('Subscribed successfully.');}catch(ex){console.log(ex);
				}
				console.info('Push notification subscribed.');
				console.log(subscription);
				
				changePushStatus(true);
			})
			.catch(function (error) {
				changePushStatus(false);
				console.error('Push notification subscription error: ', error);
			});
		});
	}
	
	
	function unsubscribePush() {
		navigator.serviceWorker.ready
		.then(function(registration) {
			
			registration.pushManager.getSubscription()
			.then(function (subscription) {
				
				if(!subscription) {
					alert('Unable to unregister push notification.');
					return;
				}
				
				
				subscription.unsubscribe()
				.then(function () {
					try{
					toast('Unsubscribed successfully.');}catch(ex){console.log(ex);}
					console.info('Push notification unsubscribed.');
					console.log(subscription);
					
					changePushStatus(false);
				})
				.catch(function (error) {
					console.error(error);
				});
			})
			.catch(function (error) {
				console.error('Failed to unsubscribe push notification.');
			});
		})
	}
	
	
	function changePushStatus(status) {
		fabPushElement.dataset.checked = status;
		fabPushElement.checked = status;
		if (status) {
			fabPushElement.classList.add('active');
			fabPushImgElement.src = '/nt.svg';
		}
		else {
			fabPushElement.classList.remove('active');
			fabPushImgElement.src = '/snt.png';
		}
	}
	
	fabPushElement.addEventListener('click', function () {
		var isSubscribed = (fabPushElement.dataset.checked === 'true');
		if (isSubscribed) {
			unsubscribePush();
		}
		else {
			subscribePush();
		}
	});
	
	
	isPushSupported();
	*/
	
	$.getJSON( "mapa.json", function( data ) {
		
		var introducao = $("#introducao");
		
		$.each( data, function( key0, val0 ) {
			var nivel0 = document.createElement("div");
			if (findkey(key0)){
				nivel0.setAttribute("name",key0);
				nivel0.setAttribute("class","alert btn-dark submenu");
				nivel0.appendChild(document.createTextNode(key0+": "));
			}
			if(isJson(val0)){
				
				$.each( val0, function( key1, val1 ) {
					var nivel1 = document.createElement("div");
					
					if (findkey(key1)){
						nivel1.setAttribute("name",key1);
						nivel1.setAttribute("class","alert btn-dark d-none submenu");
						nivel1.appendChild(document.createTextNode(key1+": "));
					}
					if(isJson(val1)){
						$.each( val1, function( key2, val2 ) {
							var nivel2 = document.createElement("div");
							if (findkey(key2)){
								nivel2.setAttribute("name",key2);
								nivel2.setAttribute("class","alert btn-dark d-none submenu");
								nivel2.appendChild(document.createTextNode(key2+": "));
							}
							if(isJson(val2)){
								$.each( val2, function( key3, val3 ) {
									var nivel3 = document.createElement("div");
									if (findkey(key3)){
										nivel3.setAttribute("name",key3);
										nivel3.setAttribute("class","d-none alert btn-dark submenu");
										nivel3.appendChild(document.createTextNode(key3+": "));
									}
									if(isJson(val3)){
										$.each( val3, function( key4, val4 ) {
											var nivel4 = document.createElement("div");
											if (findkey(key4)){
												nivel4.setAttribute("name",key4);
												nivel4.setAttribute("class","d-none alert btn-dark submenu");
												nivel4.appendChild(document.createTextNode(key4+": "));
											}
											if(isJson(val4)){
                        $.each( val4, function( key5, val5 ) {
                          var nivel5 = document.createElement("div");
                          if (findkey(key5)){
                            nivel5.setAttribute("name",key5);
                            nivel5.setAttribute("class","d-none alert btn-dark submenu");
                            nivel5.appendChild(document.createTextNode(key5+": "));
                          }
                          if(isJson(val5)){
												
														
											}else  nivel5.appendChild(document.createTextNode(val5));
											
											nivel4.appendChild(nivel5);
										});
										
												
											}else  nivel4.appendChild(document.createTextNode(val4));
											
											nivel3.appendChild(nivel4);
										});
										
										
									}else  nivel3.appendChild(document.createTextNode(val3));
									
									nivel2.appendChild(nivel3);
								});
								
								
							}else  nivel2.appendChild(document.createTextNode(val2));
							
							nivel1.appendChild(nivel2);
						});
						
					}else  nivel1.appendChild(document.createTextNode(val1));
					
					nivel0.appendChild(nivel1);
				});
			}else  nivel0.appendChild(document.createTextNode(val0));
			document.getElementById("introducao").appendChild(nivel0);
		});
		
		$( ".submenu").mouseup(function(e) {
			e.stopPropagation();
			try{
				if($(this).children().hasClass("d-none")){
					$(this).children().removeClass("d-none");
					} else if(!$(this).children().hasClass("d-none")){
					$(this).children().addClass("d-none");
					$('html, body').animate({ scrollTop:  $(this).offset().top-100 }, 500);
					
				}}catch(ex){
				
			}
		});
	});
	
	
	$('path').click(function(){
		console.log("clicou");
		
	});
	
})(window);

function isJson(str) {
	try{
		$.each( str, function( key, val ) {
			if (!key && !val){
				
			}
		});
	}catch(ex){return false}
	
	return true;
}

function findkey(key){
	switch (key) {
		case "c1":
		return false;
		break;
		
		case "c2":
		return false;
		break;
		
		case "c3":
		return false;
		break;
		
		case "c4":
		return false;
		break;
		case "c5":
		return false;
		break;
	}
	try{
		if (!isNaN(key)){
			return false;
		} 
		}catch(ex){
		return true;
	}
	return true;
}
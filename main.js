var bindListeners,capitalize,fractions,generateText,loadThings,places,processKeydown,randomInt,randomMember,rollbackText,showNext,skipChange,state,stateFromHash,switchFraction,things,updateSwitcher,updateText,updateUrl,slice=[].slice;fractions=["либераст","крымнашовец"];places=["Европе","Америке"];things=null;state=null;skipChange=false;showNext=function(){state.place=randomMember(places);state.thing=randomMember(things);updateText();return updateUrl()};stateFromHash=function(){var t;t=location.hash.replace("#","").split("-").map(function(t){return parseInt(t)});return{fraction:fractions[t[0]],place:places[t[1]],thing:things[t[2]]}};rollbackText=function(){if(skipChange){return skipChange=false}state=stateFromHash();updateText();return updateSwitcher()};updateUrl=function(){var t,e,n,a;t=state.fraction,n=state.place,a=state.thing;skipChange=true;e=[fractions.indexOf(t),places.indexOf(n),things.indexOf(a)].join("-");return location.hash=e};updateText=function(){return document.querySelector("#text").innerHTML=generateText()};updateSwitcher=function(){var t;t=slice.call(document.querySelector("#switch").children);return t.forEach(function(t){t.classList.remove("m-active");if(state.fraction===t.dataset.fraction){t.classList.add("m-active")}return true})};generateText=function(){var t,e,n;t=state.fraction,e=state.place,n=state.thing;if(t==="либераст"){return capitalize(n)+" лучше в "+e+", чем в России"}else{return"В России "+n+" лучше, чем в "+e}};switchFraction=function(){state.fraction=state.fraction===fractions[0]?fractions[1]:fractions[0];updateUrl();updateSwitcher();return updateText()};processKeydown=function(t){var e;e=t.keyCode;if(!(e===13||e===32)){return}t.preventDefault();return showNext()};capitalize=function(t){return t[0].toUpperCase()+t.slice(1)};randomMember=function(t){var e;e=randomInt(0,t.length);return t[e]};randomInt=function(t,e){return Math.floor(Math.random()*(e-t))+t};bindListeners=function(){document.querySelector("#more").addEventListener("click",showNext);document.querySelector("#switch").addEventListener("click",switchFraction);window.addEventListener("hashchange",rollbackText);return document.body.addEventListener("keydown",processKeydown)};loadThings=function(){var t;t=new XMLHttpRequest;t.onload=function(){things=t.response.split("\n");bindListeners();state=stateFromHash();if(Object.keys(state).every(function(t){return state[t]!=null})){updateText()}else{state.fraction=fractions[0];showNext()}return updateSwitcher()};t.open("get","/things.txt");return t.send()};document.addEventListener("DOMContentLoaded",loadThings);
var innerHTMLtext="",Location=function(a){var b=this;this.title=ko.observable(a.title),this.query=ko.observable(a.query),this.tags=ko.observable(a.tags),this.position=ko.observable(a.position),this.description=ko.observable(a.description),this.id=ko.observable(a.id),this.gif=ko.observable(a.gif),this.liked=ko.observable(a.liked),this.hover=ko.observable(!1),this.searchTerm=ko.observable(a.searchTerm),this.owner=ko.observable(a.owner),this.icon=a.iconImage,this.detailedInfo=ko.observable(""),foursquareDetails(this,this.detailedInfo),this.marker=new google.maps.Marker({title:a.title,position:a.position,description:a.description,icon:a.iconImage,gif:a.gif,id:a.id,liked:a.liked,animation:google.maps.Animation.DROP}),this.getHighlight=ko.pureComputed(function(){return b.hover()?"hover":"noHighlight"})},ViewModel=function(){var a=this;this.locations=ko.observableArray([]),this.selectedLocationId=ko.observable(null),this.filter=ko.observable(""),this.kathi=ko.observable(!0),this.kj=ko.observable(!0),this.getKathiStatus=ko.pureComputed(function(){return a.kathi()?"active":"not-active"}),this.getKJStatus=ko.pureComputed(function(){return a.kj()?"active":"not-active"}),this.highlightedIcon=this.makeMarkerIcon("6eb9d4"),this.selectedIcon=this.makeMarkerIcon("ebfd1b"),locations.forEach(function(b){var c=new Location(b);c.marker.addListener("mouseover",function(b){return function(){a.showMinimizedInfoWindow(b.marker),b.hover(!0)}}(c)),c.marker.addListener("mouseout",function(b){return function(){a.hideMinimizedInfoWindow(b.marker),b.hover(!1)}}(c)),c.marker.addListener("click",function(b){return function(){b.id();a.selectedLocationId(b.id()),a.showInfoWindow(b)}}(c)),c.selected=ko.pureComputed(function(){return a.selectedLocationId()===c.id()},c),c.getGif=function(a){var b=50,d="https://api.giphy.com/v1/gifs/search?q="+c.searchTerm()+"&limit="+b+"&api_key=dc6zaTOxFJmzC";setTimeout(function(){$.ajax({dataType:"json",url:d,timeout:a,success:function(a){var d=Math.floor(Math.random()*b);this.giphy="https://i.giphy.com/"+a.data[d].id+".gif",c.gif(this.giphy)}})},a),$(document).ajaxStart(function(){for(var a=document.getElementsByClassName("gif-image"),b=0;b<a.length;b++)a[b].style.cursor="wait"}).ajaxStop(function(){for(var a=document.getElementsByClassName("gif-image"),b=0;b<a.length;b++)a[b].style.cursor="pointer"})},c.getSelected=ko.pureComputed(function(){return a.selectedLocationId()===c.id()?(c.marker.setIcon(a.selectedIcon),"selected"):c.hover()?(c.marker.setIcon(a.highlightedIcon),"hover"):(c.marker.setIcon(c.icon),"noHighlight")},c),a.locations.push(c)}),this.locations().forEach(function(a){a.marker.setMap(map),bounds.extend(a.marker.position)}),map.fitBounds(bounds),this.chooseLocation=function(b){a.showInfoWindow(b)},this.mouseOver=function(b){a.showMinimizedInfoWindow(b.marker),b.hover(!0)},this.mouseOut=function(b){a.hideMinimizedInfoWindow(b.marker),b.hover(!1)},this.filteredLocations=ko.computed(function(){a.hideMinimizedInfoWindow(location.marker),a.selectedLocationId(-1),infoWindow.marker=null,infoWindow.close(),cornerInfoWindow.style.visibility="hidden";var b=a.filter().toLowerCase();return a.kathi()&&a.kj()&&!b?(a.locations().forEach(function(a){a.marker.setVisible(!0)}),a.locations()):ko.utils.arrayFilter(a.locations(),function(c){var d=!0,e=c.owner().toLowerCase().indexOf("kathi"),f=c.owner().toLowerCase().indexOf("kj");return d=!(!a.kathi()&&!a.kj())&&(!(!a.kathi()||e===-1)||!(!a.kj()||f===-1)),d===!1?c.marker.setVisible(!1):(d=c.title().toLowerCase().indexOf(b)!==-1||c.tags().toLowerCase().indexOf(b)!==-1||c.description().toLowerCase().indexOf(b)!==-1||c.searchTerm().indexOf(b)!==-1,d?c.marker.setVisible(!0):c.marker.setVisible(!1)),d})})};ViewModel.prototype.showInfoWindow=function(a){function b(b,e){if(e==google.maps.StreetViewStatus.OK){var f=b.location.latLng,g=google.maps.geometry.spherical.computeHeading(f,d.position);cornerInfoWindow.innerHTML='<div id="pano"></div><div class="infowindow-text"><div id="close-thick"></div><h2>'+d.title+"</h2>"+a.detailedInfo()+'<p id="quote">'+d.description+"</p></div>";var h={position:f,pov:{heading:g,pitch:10}};new google.maps.StreetViewPanorama(document.getElementById("pano"),h)}else cornerInfoWindow.innerHTML='<div id="close-thick"></div><div class="infowindow-text"><h2>'+d.title+"</h2>"+a.detailedInfo()+'<p id="quote">'+d.description+"</p></div>",""!==innerHTMLtext&&(cornerInfoWindow.innerHTML+=innerHTMLtext);var i=document.getElementById("close-thick");i.addEventListener("click",function(){cornerInfoWindow.style.visibility="hidden",cornerInfoWindow.marker=null,c.selectedLocationId(null)},!1)}var c=this;this.hideMinimizedInfoWindow(a.marker),this.selectedLocationId(a.id());var d=a.marker,e=window.matchMedia("(min-width: 700px)");if(1==e.matches){if(infoWindow.marker=null,infoWindow.close(),cornerInfoWindow.marker!=d){cornerInfoWindow.marker=d,cornerInfoWindow.innerHTML="",cornerInfoWindow.style.visibility="visible";var f=new google.maps.StreetViewService,g=25;f.getPanoramaByLocation(d.position,g,b)}}else cornerInfoWindow.style.visibility="hidden",cornerInfoWindow.marker=null,infoWindow.marker!=d&&(infoWindow.marker=d,infoWindow.setContent(""),infoWindow.setContent('<div "class="infowindow-text"><h2>'+d.title+"</h2>"+a.detailedInfo()+'<p id="quote">'+d.description+"</p></div>"),infoWindow.addListener("closeclick",function(){infoWindow.marker=null,c.selectedLocationId(null)}),infoWindow.open(map,d))},ViewModel.prototype.showMinimizedInfoWindow=function(a){infoWindow.marker!=a&&cornerInfoWindow.marker!=a&&(miniInfoWindow.marker=a,miniInfoWindow.setContent(""),miniInfoWindow.open(map,a),miniInfoWindow.setContent('<div id="min-infowindow" class="infowindow-text">'+a.title+"</div>"),miniInfoWindow.open(map,a))},ViewModel.prototype.hideMinimizedInfoWindow=function(a){miniInfoWindow.close(),miniInfoWindow.marker=null},ViewModel.prototype.makeMarkerIcon=function(a){var b={url:"https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|"+a+"|40|_|%E2%80%A2",size:new google.maps.Size(21,34),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(10,34),scaledSize:new google.maps.Size(21,34)};return b},ViewModel.prototype.getPlacesDetails=function(a){var b=new google.maps.places.PlacesService(map);b.getDetails({placeId:a.id},function(a,b){b===google.maps.places.PlacesServiceStatus.OK?(innerHTMLtext="<div>",a.name&&(innerHTMLtext+="<strong>"+a.name+"</strong>"),a.formatted_address&&(innerHTMLtext+="<br>"+a.formatted_address),a.formatted_phone_number&&(innerHTMLtext+="<br>"+a.formatted_phone_number),a.opening_hours&&(innerHTMLtext+="<br><br><strong>Hours:</strong><br>"+a.opening_hours.weekday_text[0]+"<br>"+a.opening_hours.weekday_text[1]+"<br>"+a.opening_hours.weekday_text[2]+"<br>"+a.opening_hours.weekday_text[3]+"<br>"+a.opening_hours.weekday_text[4]+"<br>"+a.opening_hours.weekday_text[5]+"<br>"+a.opening_hours.weekday_text[6]),a.photos&&(innerHTMLtext+='<br><br><img src="'+a.photos[0].getUrl({maxHeight:100,maxWidth:200})+'">'),innerHTMLtext+="</div>"):console.log("status is not OK")})},ViewModel.prototype.toggleKathi=function(){this.kathi()===!0?this.kathi(!1):this.kathi(!0)},ViewModel.prototype.toggleKJ=function(){this.kj()===!0?this.kj(!1):this.kj(!0)};var foursquareDetails=function(a,b){var c="F34Z50BFJTO23D4GAKTW0TQ0XUWTUR4QLEIGLRNSYRLIDMU5",d="TKNU23MJ2WJFC3I5HSE54LJDN1ZFZQXTQS02B0ZHSRS5BN0Z",e=a.position().lat+","+a.position().lng,f=a.query(),g="https://api.foursquare.com/v2/venues/search?client_id="+c+"&client_secret="+d+"&v=20130815&ll=40.7,-74&ll="+e+"&query="+f+"&limit=1";$.ajax({dataType:"json",url:g,success:function(a){if(a.response.venues.length>0){var c=a.response.venues[0].name,d=a.response.venues[0].location.formattedAddress,e=d[0],f=d[1],g=d[2],h=a.response.venues[0].url,i=a.response.venues[0].categories[0].name,j="";j+="<div>",c&&(j+="<strong>"+i+"</strong>"),d&&(j+="<br>"+e,j+="<br>"+f,j+="<br>"+g),h&&(j+="<br><a href="+h+">"+c+"</a>"),j+='<br>(Information provided by <a href="https://foursquare.com/">Foursquare</a>)',j+="</div>",b(j)}else{var j="<div><p>(Error when loading Foursquare data)</p></div>";b(j)}}}).fail(function(){var a="<div><p>(Error when loading Foursquare data)</p></div>";b(a)})};
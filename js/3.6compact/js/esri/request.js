/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/request",["dojo/_base/array","dojo/_base/config","dojo/_base/Deferred","dojo/_base/lang","dojo/_base/url","dojo/_base/xhr","dojo/io/script","dojo/io/iframe","dojo/dom-construct","dojo/io-query","esri/kernel","esri/config","esri/sniff","esri/lang","esri/urlUtils","esri/deferredUtils"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){var _11;function _12(req,_13,_14,_15){var _16=false,_17=false,_18=true;if(_e.isDefined(_13)){if(_4.isObject(_13)){_16=!!_13.useProxy;_17=!!_13.usePost;_18=_e.isDefined(_13.crossOrigin)?_13.crossOrigin:_18;}else{_16=!!_13;}}req=_4.mixin({},req);if(req._ssl){req.url=req.url.replace(/^http:/i,"https:");}var _19=req.content,_1a=req.url,_1b=_14&&req.form,_1c=_c.defaults.io;req.load=function(_1d){var err;if(_1d){if(_1d.error){err=_4.mixin(new Error(),_1d.error);err.log=_2.isDebug;}else{if(_1d.status==="error"){err=_4.mixin(new Error(),_1d);err.log=_2.isDebug;}}if(err&&!_e.isDefined(err.httpCode)){err.httpCode=err.code;}}return err||_1d;};req.error=function(_1e,io){if(io&&io.xhr){io.xhr.abort();}if(!(_1e instanceof Error)){_1e=_4.mixin(new Error(),_1e);}_1e.log=_2.isDebug;_1c.errorHandler(_1e,io);return _1e;};if(req._token){req.content=req.content||{};req.content.token=req._token;}var len=0;if(_19&&_1a){len=_a.objectToQuery(_19).length+_1a.length+1;}req.timeout=_e.isDefined(req.timeout)?req.timeout:_1c.timeout;req.handleAs=req.handleAs||"json";try{var _1f,_20,_21=_18&&_f.canUseXhr(req.url)&&!(/https?:\/\/[^\/]+\/[^\/]+\/admin\/?(\/.*)?$/i.test(req.url)),_22=(_f.hasSameOrigin(req.url,window.location.href)||_21),_23=(_17||_14||len>_1c.postLength)?true:false,_24=(!_22&&req.handleAs.indexOf("json")!==-1&&req.callbackParamName&&!_14)?true:false,_25=(!!_f.getProxyRule(req.url)||_1c.alwaysUseProxy||_16||((!_24||_23)&&!_22))?true:false;if(_14&&!_d("esri-file-upload")&&!_25&&_21){_25=true;}if(_25){_1f=_f.getProxyUrl(_1a,_18);_20=_1f.path;if(_1f._xo){_21=true;}if(!_23&&(_20.length+1+len)>_1c.postLength){_23=true;}req.url=_20+"?"+_1a;if(_23){req.content=_4.mixin(_1f.query||{},_19);}else{var _26=_a.objectToQuery(_4.mixin(_1f.query||{},_19));if(_26){req.url+=("?"+_26);}req.content=null;}}if(_24&&!_23){if(!_e.isDefined(req.isAsync)&&_d("ff")<4){req.isAsync=true;}return _7.get(_11?_11(req):req);}else{var _27=req.headers;if(_21&&(!_27||!_27.hasOwnProperty("X-Requested-With"))){_27=req.headers=(_27||{});_27["X-Requested-With"]=null;}if(_14){var _28=req.callbackParamName||"callback.html",_29=req.callbackElementName||"textarea",_2a,_2b,_2c,i,il=_1b.elements?_1b.elements.length:0,el;_19=req.content;if(_19){for(_2a in _19){_2c=_19[_2a];if(_e.isDefined(_2c)){_2b=null;for(i=0;i<il;i++){el=_1b.elements[i];if(el.name===_2a){_2b=el;break;}}if(_2b){_2b.value=_2c;}else{if(_15){_1b.append(_2a,_2c);}else{_1b.appendChild(_9.create("input",{type:"hidden",name:_2a,value:_2c}));}}}}}if(_d("esri-file-upload")){_1.forEach(_1b.elements,function(el){if(el.name===_28){_1b.removeChild(el);}});req.contentType=false;req.postData=_15?_1b:new FormData(_1b);delete req.form;}else{_1b.enctype="multipart/form-data";if(_d("ie")<9){_1b.encoding="multipart/form-data";}_1b.method="post";if(!_1.some(_1b.elements,function(el){return el.name===_28;})){_1b.appendChild(_9.create("input",{type:"hidden",name:_28,value:_29}));}if(_1a.toLowerCase().indexOf("addattachment")!==-1||_1a.toLowerCase().indexOf("updateattachment")!==-1){req.url=_1a+((_1a.indexOf("?")===-1)?"?":"&")+_28+"="+_29;if(_25){req.url=_20+"?"+req.url;}}delete req.content;}}if(_21&&!req.hasOwnProperty("withCredentials")&&_b.id){var _2d=_b.id.findServerInfo(_25?_20:_1a);if(_2d&&_2d.webTierAuth){req.withCredentials=true;}}req=_11?_11(req):req;if(_23){if(_14&&!_d("esri-file-upload")){return _8.send(req);}else{return _6.post(req);}}else{return _6.get(req);}}}catch(e){var dfd=new _3();dfd.errback(req.error(e));return dfd;}};function _2e(url){var _2f=_c.defaults.io,_30=_2f._processedCorsServers,_31=new _5(url),_32=-1;_31=(_31.host+(_31.port?(":"+_31.port):"")).toLowerCase();_32=_f.canUseXhr(url,true);if(_32>-1){_2f.corsEnabledServers.splice(_32,1);}_30[_31]=1;return _32;};function _33(url){var _34=_c.defaults.io,_35=_34._processedCorsServers;if(!_34.corsDetection){return;}try{var _36=new _5(url);_36=(_36.host+(_36.port?(":"+_36.port):"")).toLowerCase();if(_d("esri-cors")&&(url&&url.toLowerCase().indexOf("/rest/services")!==-1)&&(!_f.hasSameOrigin(url,window.location.href)&&!_f.canUseXhr(url))&&!_35[_36]){_35[_36]=-1;_6.get({url:url.substring(0,url.toLowerCase().indexOf("/rest/")+"/rest/".length)+"info",content:{f:"json"},failOk:true,handleAs:"json",headers:{"X-Requested-With":null}}).then(function(_37){if(_37){_35[_36]=2;if(!_f.canUseXhr(url)){_34.corsEnabledServers.push(_36);}}else{_35[_36]=1;}},function(_38){_35[_36]=1;});}}catch(e){console.log("esri._detectCors: an unknown error occurred while detecting CORS support");}};function _39(_3a){_11=_3a;};function _3b(req,_3c){var dfd,_3d=req.form,_3e=_3c&&_3c.disableIdentityLookup,_3f=_3c&&_3c._preLookup,_40=_3d&&_3d.append,_41=_3d&&(_3d.elements?_1.some(_3d.elements,function(el){return el.type==="file";}):_40),_42=(req.url.toLowerCase().indexOf("token=")!==-1||(req.content&&req.content.token)||(_41&&_1.some(_3d.elements,function(el){return el.name==="token";})))?1:0;_33(req.url);if(req._usrDfd){dfd=req._usrDfd;}else{dfd=new _3(_10._dfdCanceller);dfd.addCallback(function(){var _43=req._credential;if(_43){var _44=_b.id.findServerInfo(_43.server),_45=_44&&_44.owningSystemUrl,_46;if(_45){_45=_45.replace(/\/?$/,"/sharing");_46=_b.id.findCredential(_45,_43.userId);if(_46){if(_b.id._getIdenticalSvcIdx(_45,_46)===-1){_46.resources.splice(0,0,_45);}}}}});dfd.addBoth(function(_47){delete req._credential;if(_47&&(!_d("ie")||!_47.nodeType)){_47._ssl=req._ssl;}});var ld=req.load,_48=req.error;if(ld){dfd.addCallback(function(_49){var _4a=dfd._pendingDfd,_4b=_4a&&_4a.ioArgs,_4c=_4b&&_4b.args;return ld.call(_4c,_49,_4b);});}if(_48){dfd.addErrback(function(_4d){var _4e=dfd._pendingDfd,_4f=_4e&&_4e.ioArgs,_50=_4f&&_4f.args;return _48.call(_50,_4d,_4f);});}}if(_b.id&&!_42&&!req._token&&!_b.id._isPublic(req.url)&&(!_3e||_3f)){var _51=_b.id.findCredential(req.url);if(_51){req._token=_51.token;req._ssl=_51.ssl;}}dfd._pendingDfd=_12(req,_3c,_41,_40);if(!dfd._pendingDfd){dfd.ioArgs=dfd._pendingDfd&&dfd._pendingDfd.ioArgs;var err=new Error("Deferred object is missing");err.log=_2.isDebug;req._usrDfd=null;dfd.errback(err);dfd._pendingDfd=null;return dfd;}dfd._pendingDfd.addCallback(function(_52){dfd.ioArgs=dfd._pendingDfd&&dfd._pendingDfd.ioArgs;req._usrDfd=null;dfd.callback(_52);dfd._pendingDfd=null;}).addErrback(function(_53){if(_53&&_53.code==403&&(_53.subcode==4||(_53.message&&_53.message.toLowerCase().indexOf("ssl")>-1&&_53.message.toLowerCase().indexOf("permission")===-1))){if(!req._ssl){req._ssl=req._sslFromServer=true;req._usrDfd=dfd;_3b(req,_3c);return;}}else{if(_53&&_53.status==415){var _54=_2e(req.url);if(!req._err415){req._err415=1;req._usrDfd=dfd;_3b(req,_3c);return;}}else{if(_b.id&&_1.indexOf(_b.id._errorCodes,_53.code)!==-1&&!_b.id._isPublic(req.url)&&!_3e&&(_53.code!=403||!_e.isDefined(_53.subcode)||_53.subcode==2)){dfd._pendingDfd=_b.id.getCredential(req.url,{token:req._token,error:_53});dfd._pendingDfd.addCallback(function(_55){req._token=_55.token;req._usrDfd=dfd;req._credential=_55;req._ssl=req._sslFromServer||_55.ssl;_3b(req,_3c);}).addErrback(function(_56){req._usrDfd=null;dfd.errback(_56);dfd._pendingDfd=null;});return;}}}dfd.ioArgs=dfd._pendingDfd&&dfd._pendingDfd.ioArgs;req._usrDfd=null;dfd.errback(_53);dfd._pendingDfd=null;});return dfd;};_3b._request=_12;_3b._disableCors=_2e;_3b._detectCors=_33;_3b.setRequestPreCallback=_39;if(_d("extend-esri")){_b.request=_3b;_b._request=_12;_b._disableCors=_2e;_b._detectCors=_33;_b.setRequestPreCallback=_39;}return _3b;});
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
define("esri/toolbars/edit","dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/_base/Color dojo/has esri/kernel esri/lang esri/sniff esri/toolbars/_toolbar esri/toolbars/_Box esri/toolbars/_GraphicMover esri/toolbars/_VertexEditor esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol".split(" "),function(t,n,l,h,c,m,u,s,z,v,w,x,y,f,e){var k=t(v,{declaredClass:"esri.toolbars.Edit",constructor:function(a,b){this._map=a;this._tool=0;if(this._map.loaded)this._scratchGL=
a.graphics;else var d=l.connect(this._map,"onLoad",this,function(){l.disconnect(d);d=null;this._scratchGL=this._map.graphics});var g=m("esri-touch")||m("esri-pointer");this._defaultOptions=n.mixin({vertexSymbol:new f(f.STYLE_CIRCLE,g?20:12,new e(e.STYLE_SOLID,new c([0,0,0,0.5]),1),new c([128,128,128])),ghostVertexSymbol:new f(f.STYLE_CIRCLE,g?18:10,new e(e.STYLE_SOLID,new c([0,0,0,0.5]),1),new c([255,255,255,0.75])),ghostLineSymbol:new e(e.STYLE_DOT,new c([128,128,128]),2),allowDeleteVertices:!0,
allowAddVertices:!0,rotateHandleOffset:g?24:16,boxLineSymbol:new e(e.STYLE_DASH,new c([64,64,64]),1),boxHandleSymbol:new f(f.STYLE_SQUARE,g?16:9,new e(e.STYLE_SOLID,new c([0,0,0,0.5]),1),new c([255,255,255,0.75]))},b||{})},activate:function(a,b,d){this.deactivate();this._graphic=b;this._options=n.mixin(n.mixin({},this._defaultOptions),d||{});var g=k.MOVE;d=k.EDIT_VERTICES;var e=k.SCALE,c=k.ROTATE,f=!1,h=!1,m=!1,p=this._map,q=p.spatialReference,r=b.geometry.spatialReference;this._geo=!(!q||!r||q.equals(r)||
!(q.isWebMercator()&&4326===r.wkid));(a&g)===g&&(f=this._enableMove(b));g=(a&e)===e;c=(a&c)===c;if(g||c)m=this._enableBoxEditing(b,g,c);(a&d)===d&&(h=this._enableVertexEditing(b));if(!f&&!h&&!m)throw Error("[esri.toolbars.Edit::activate] Unable to activate the tool. Check if the tool is valid for the given geometry type.");if(this._tool=a)this._mapPanEndHandle=l.connect(p,"onPanEnd",this,this._mapPanEndHandler),this._mapExtChgHandle=l.connect(p,"onExtentChange",this,this._mapExtentChangeHandler),
this.onActivate(this._tool,b);p.snappingManager&&(f||h)&&p.snappingManager._startSelectionLayerQuery()},deactivate:function(){var a=this._tool,b=this._graphic;if(a){var d=!!this._modified;this._clear();l.disconnect(this._mapPanEndHandle);l.disconnect(this._mapExtChgHandle);this._graphic=this._geo=this._mapPanEndHandle=this._mapExtChgHandle=null;this.onDeactivate(a,b,{isModified:d});this._map.snappingManager&&this._map.snappingManager._stopSelectionLayerQuery()}},refresh:function(){this._refreshMoveables(!0)},
getCurrentState:function(){return{tool:this._tool,graphic:this._graphic,isModified:!!this._modified}},onActivate:function(a,b){},onDeactivate:function(a,b,d){},onGraphicMoveStart:function(a){},onGraphicFirstMove:function(a){this._modified=!0},onGraphicMove:function(a,b){},onGraphicMoveStop:function(a,b){},onGraphicClick:function(a,b){},onVertexMoveStart:function(a,b){},onVertexFirstMove:function(a,b){this._modified=!0},onVertexMove:function(a,b,d){},onVertexMoveStop:function(a,b,d){},onVertexAdd:function(a,
b){this._modified=!0},onVertexClick:function(a,b){},onVertexMouseOver:function(a,b){},onVertexMouseOut:function(a,b){},onVertexDelete:function(a,b){this._modified=!0},onScaleStart:function(a){},onScaleFirstMove:function(a){this._modified=!0},onScale:function(a,b){},onScaleStop:function(a,b){},onRotateStart:function(a){},onRotateFirstMove:function(a){this._modified=!0},onRotate:function(a,b){},onRotateStop:function(a,b){},_eventMap:{activate:["tool","graphic"],deactivate:["tool","graphic","info"],
"graphic-move-start":["graphic"],"graphic-first-move":["graphic"],"graphic-move":["graphic","transform"],"graphic-move-stop":["graphic","transform"],"graphic-click":["graphic","info"],"vertex-move-start":["graphic","vertexinfo"],"vertex-first-move":["graphic","vertexinfo"],"vertex-move":["graphic","vertexinfo","transform"],"vertex-move-stop":["graphic","vertexinfo","transform"],"vertex-add":["graphic","vertexinfo"],"vertex-click":["graphic","vertexinfo"],"vertex-mouse-over":["graphic","vertexinfo"],
"vertex-mouse-out":["graphic","vertexinfo"],"vertex-delete":["graphic","vertexinfo"],"scale-start":["graphic"],"scale-first-move":["graphic"],scale:["graphic","info"],"scale-stop":["graphic","info"],"rotate-start":["graphic"],"rotate-first-move":["graphic"],rotate:["graphic","info"],"rotate-stop":["graphic","info"]},_enableMove:function(a){var b=this._map;switch(a.geometry.type){case "point":case "polyline":case "polygon":return this._graphicMover=new x(a,b,this),!0}return!1},_enableVertexEditing:function(a){var b=
this._map;switch(a.geometry.type){case "multipoint":case "polyline":case "polygon":return this._vertexEditor=y.create(a,b,this),!0}return!1},_enableBoxEditing:function(a,b,d){var c=this._map;switch(a.geometry.type){case "polyline":case "polygon":return this._boxEditor=new w(a,c,this,b,d,this._options.uniformScaling),!0}return!1},_disableMove:function(){var a=this._graphicMover;a&&(a.destroy(),this._graphicMover=null)},_disableVertexEditing:function(){var a=this._vertexEditor;a&&(a.destroy(),this._vertexEditor=
null)},_disableBoxEditing:function(){var a=this._boxEditor;a&&(a.destroy(),this._boxEditor=null)},_clear:function(){this._disableMove();this._disableVertexEditing();this._disableBoxEditing();this._tool=0;this._modified=!1},_mapPanEndHandler:function(){this._refreshMoveables()},_mapExtentChangeHandler:function(a,b,d){d&&this._refreshMoveables()},_refreshMoveables:function(a){var b=h.filter([this._graphicMover,this._vertexEditor,this._boxEditor],s.isDefined);h.forEach(b,function(b){b.refresh(a)})},
_beginOperation:function(a){h.forEach(this._getAffectedTools(a),function(a){a.suspend()})},_endOperation:function(a){h.forEach(this._getAffectedTools(a),function(a){a.resume()})},_getAffectedTools:function(a){var b=[];switch(a){case "MOVE":b=[this._vertexEditor,this._boxEditor];break;case "VERTICES":b=[this._boxEditor];break;case "BOX":b=[this._vertexEditor]}return b=h.filter(b,s.isDefined)}});n.mixin(k,{MOVE:1,EDIT_VERTICES:2,SCALE:4,ROTATE:8});m("extend-esri")&&n.setObject("toolbars.Edit",k,u);
return k});
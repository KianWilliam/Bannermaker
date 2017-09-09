/*
  * @package component bannermaker for Joomla! 3.x
 * @version $Id: com_bannermaker 1.0.0 2017-7-10 23:26:33Z $
 * @author Kian William Nowrouzian
 * @copyright (C) 2017- Kian William Nowrouzian
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 
 This file is part of bannermaker.
    bannermaker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    bannermaker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with bannermaker.  If not, see <http://www.gnu.org/licenses/>.
*/


var counter = 1;

var imgthumb;
var imgname;
var imgtext;

var textshadowleft;
var textshadowtop;
var textshadowcolor;
var textshadowopacity;
var textleft;
var texttop;

var bannerbc;
var bannerfontsize;

var svgpatternwidth;
var svgpatternheight;
var svgpatternleft;
var svgpatterntop;
var svgimagewidth;
var svgimageheight;

var svgstroke;
var svgstrokecolor;

function jInsertEditorText(text, editor) {
	var newEl = new Element('span').set('html', text);
	var valeur = newEl.getChildren()[0].getAttribute('src');
	$(editor).value = valeur;
	addthumbnail(valeur, editor);
}


function addslidemy(imgname, imgthumb, imgtext, textshadowleft, textshadowtop, textshadowcolor, textshadowopacity, textleft, texttop, bannerbc, bannerfontsize,  svgpatternwidth, svgpatternheight,  svgpatternleft, svgpatterntop, svgimagewidth, svgimageheight, svgstroke, svgstrokecolor)
{

	var slide = new Element('li', {
		'class': 'myslide',
		'id': 'myslide' + counter
	});
	
	slide.set('html', '<div class="myslidehandle"><div class="myslidenumber">Slide Number: ' + counter + '</div></div>'+
	'<div class="del"><input name="myslidedelete' + counter + '" class="myslidedelete" type="button" value="' + Joomla.JText._('COM_BANNERMAKER_REMOVE', 'RemoveSlide') + '" onclick="javascript:removeslide(this.getParent().getParent());" />'+
	'<div class="sliderow"><div class="imgthumb"><img src="' + imgthumb + '" class="myimgth" width="64" height="64"/></div>'+
	'<input name="myslideimgname' + counter + '" id="myslideimgname' + counter + '" class="myslideimgname hasTip" title="Image::This is the main image for the slide, it will also be used to create the thumbnail" type="text" value="'+imgname+'" onchange="javascript:addthumbnail(this.value, this);" />'+
    '<a class="modal" href="' + JURI + 'administrator/index.php?option=com_media&view=images&tmpl=component&e_name=myslideimgname' + counter + '" rel="{handler:\'iframe\', size:{x: 570, y: 400}}" >' + Joomla.JText._('COM_BANNERMAKER_SELECTIMAGE', 'select image') + '</a>'+
	'</div>'+
    '<div class="explanation"><textarea name="myslidetext' + counter + '"  class="myslidetext">'+imgtext+'</textarea></div>'+
	'<div class="forsvg">Left distance shadow for banner text:(add no px)<input type="text" name="txtshadowleft" value="'+textshadowleft+'" class="txtshadowleft" /></div>'+
	'<div class="forsvg">Top distance shadow for banner text:(add no px)<input type="text" name="txtshadowtop" value="'+textshadowtop+'" class="txtshadowtop" /></div>'+
	'<div class="forsvg">Font-Size for banner text(add no em)<input type="text" name="txtfontsize" value="'+bannerfontsize+'" class="txtfontsize" /></div>'+
	'<div class="forsvg">Svg Pattern Width:(add no px)<input type="text" name="patternw" value="'+svgpatternwidth+'" class="patternw" /></div>'+
	'<div class="forsvg">Svg Pattern Height:(add no px)<input type="text" name="patternh" value="'+svgpatternheight+'" class="patternh" /></div>'+
	'<div class="forsvg">Svg Pattern Left:(add no px)<input type="text" name="patternl" value="'+svgpatternleft+'" class="patternl" /></div>'+
	'<div class="forsvg">Svg Pattern Top:(add no px)<input type="text" name="patternt" value="'+svgpatterntop+'" class="patternt" /></div>'+
	'<div class="forsvg">Svg Image Width:(add no px)<input type="text" name="imagew" value="'+svgimagewidth+'" class="imagew" /></div>'+
	'<div class="forsvg">Svg Image Height:(add no px)<input type="text" name="imageh" value="'+svgimageheight+'" class="imageh" /></div>'+
	'<div class="forsvg">Banner Left Distance:(add no px)<input type="text" name="txtleft" value="'+textleft+'" class="txtleft" /></div>'+
	'<div class="forsvg">Banner Top Distance:(add no px)<input type="text" name="txttop" value="'+texttop+'" class="txttop" /></div>'+
	'<div class="forsvg">Banner Stroke Width:(add no px)<input type="text" name="svgstroke" value="'+svgstroke+'" class="svgstroke"/></div>'+
	'<div class="forsvg">Banner Stroke Color:<input type="color" name="strokecolor" value="'+svgstrokecolor+'" class="strokecolor" /></div>'+
	'<div class="forsvg">Banner Background Color:<input type="color" name="bannerbc" value="'+bannerbc+'" class="bannerbc" /></div>'+
	'<div class="forsvg">Shadow Color:<input type="color" name="shadowcolor" value="'+textshadowcolor+'" class="shadowcolor" /></div>'+
	'<div class="forsvg">Textshadowopacity:(add no px)<input type="text" name="shadowopacity" value="'+textshadowopacity+'" class="shadowopacity" /></div>');
	document.id('myslideslist').adopt(slide);
	storeslide();
	makesortables();
	SqueezeBox.initialize({});
	SqueezeBox.assign(slide.getElement('a.modal'), {
		parse: 'rel'
	});	

	counter++;
}

function storeslide()
{

	var i = 0;
	var slides = new Array();
	document.id('myslideslist').getElements('.myslide').each(function(el) {
		slide = new Object();
		slide['imgname'] = el.getElement('.myslideimgname').value;		
		slide['imgthumb'] = el.getElement('img').src;
		slide['imgtext']=el.getElement('.myslidetext').value;	
        slide['textshadowleft']=el.getElement('.txtshadowleft').value;	
        slide['textshadowtop']=el.getElement('.txtshadowtop').value;	
        slide['textshadowcolor']=el.getElement('.shadowcolor').value;	
		slide['textshadowopacity']=el.getElement('.shadowopacity').value;	
        slide['textleft']=el.getElement('.txtleft').value;	
        slide['texttop']=el.getElement('.txttop').value;	
        slide['bannerbc']=el.getElement('.bannerbc').value;	
        slide['bannerfontsize']=el.getElement('.txtfontsize').value;
        slide['svgpatternwidth']=el.getElement('.patternw').value;		
        slide['svgpatternheight']=el.getElement('.patternh').value;
        slide['svgpatternleft']=el.getElement('.patternl').value;		
        slide['svgpatterntop']=el.getElement('.patternt').value;			
        slide['svgimagewidth']=el.getElement('.imagew').value;	
        slide['svgimageheight']=el.getElement('.imageh').value;	
        slide['svgstroke']=el.getElement('.svgstroke').value;			
		slide['svgstrokecolor']=el.getElement('.strokecolor').value;			
		slides[i] = slide;
		i++;
	});

	slides = JSON.encode(slides);	
	slides = slides.replace(/"/g, "|qq|");
	document.id('myslides').value = slides;
	

}

function makesortables() {
	var sb = new Sortables('myslideslist', {
		/* set options */
		clone: true,
		revert: true,
		handle: '.myslidehandle',
		/* initialization stuff here */
		initialize: function() {

		},
		/* once an item is selected */
		onStart: function(el, clone) {
			el.setStyle('background', '#add8e6');
			clone.setStyle('background', '#ffffff');
			clone.setStyle('z-index', '1000');
		},
		/* when a drag is complete */
		onComplete: function(el) {
			el.setStyle('background', '#fff');
			//storesetwarning();
		},
		onSort: function(el, clone) {
			clone.setStyle('z-index', '1000');
		}
	});
}

function addthumbnail(imgsrc, editor) {
	var slideimg = $(editor).getParent().getElement('img');
	var testurl = 'http';
	if (imgsrc.toLowerCase().indexOf(testurl.toLowerCase()) != -1) {
		slideimg.src = imgsrc;
	} else {
		slideimg.src = JURI + imgsrc;
	}

	slideimg.setProperty('width', '64px');
	slideimg.setProperty('height', '64px');
}

function removeslide(slide) {
	if (confirm(Joomla.JText._('COM_BANNERMAKER_REMOVE', 'Remove this slide') + ' ?')) {
		slide.destroy();
		counter--;
		storeslide();
	}
}

function callslides() {
	
	var slides = JSON.decode(document.id('myslides').value.replace(/\|qq\|/g, "\""));
	if (slides) {
		slides.each(function(slide) {
			addslidemy(slide['imgname'],
					slide['imgthumb'],
					slide['imgtext'],
					slide['textshadowleft'],
					slide['textshadowtop'],
					slide['textshadowcolor'],
					slide['textshadowopacity'],
					slide['textleft'],
					slide['texttop'],
					slide['bannerbc'],
					slide['bannerfontsize'],
					slide['svgpatternwidth'],
					slide['svgpatternheight'],
					slide['svgpatternleft'],
					slide['svgpatterntop'],
					slide['svgimagewidth'],
					slide['svgimageheight'],
                    slide['svgstroke'],
					slide['svgstrokecolor']
					);
		});
		
	}
}


window.addEvent('domready', function() {
	callslides();
	var script = document.createElement("script");
	script.setAttribute('type', 'text/javascript');
	script.text = "Joomla.submitbutton = function(task){"
			+ "storeslide();"
			+ "if (task == 'banner.cancel' || document.formvalidator.isValid(document.id('banner-form'))) {	Joomla.submitform(task, document.getElementById('banner-form'));"
			+ "if (self != top) {"
			+ "window.top.setTimeout('window.parent.SqueezeBox.close()', 1000);"
			+ "}"
			+ "} else {"
			+ "alert('Formulaire invalide');"
			+ "}}";
	document.body.appendChild(script);
});

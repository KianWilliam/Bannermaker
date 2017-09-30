<?php
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
?>
<?php


defined('_JEXEC') or die;

use Joomla\Registry\Registry;
JModelLegacy::addIncludePath(JPATH_SITE . '/components/com_bannermaker/models');


class PlgContentBannermaker extends JPlugin
{
	protected $db;
	
	public function onContentPrepare($context, &$row, &$params, $page = 0)
	{
		if($context=="mod_bannermaker" || $context=="com_bannermaker.banner")
		{
		 $app = JFactory::getApplication();
		$mymodel = JModelLegacy::getInstance('Banner','BannermakerModel');
			$item = $mymodel->getItem($params->get("title"));

	if($context=='mod_bannermaker')
	{
				$mparams = new JRegistry;								
                $mparams->loadString($item->params, 'JSON');								
				$item->params = $mparams;
				$mparams->loadString($params);
							     //true to be recursive just in case
				$mparams->merge($item->params, true);
                $item->params = $mparams;
	}
		
		
		$svgitems = json_decode(str_replace("|qq|", "\"", $item->params->get('slides')));
		
        foreach($svgitems as $i=>$itm)
        { 
	      $images[]=JURI::base().$itm->imgname;	
		  $texts[]=$itm->imgtext;
		  $txtshleft[]=$itm->textshadowleft;
          $txtshtop[]=$itm->textshadowtop;
		  $txtshcolor[]=$itm->textshadowcolor;
		  $txtshopacity[]=$itm->textshadowopacity;
		  $txtleft[]=$itm->textleft;
		  $txttop[]=$itm->texttop;
		  $bannerbc[]=$itm->bannerbc;
		  $bannerfontsize[]=$itm->bannerfontsize;
		  $svgpatternwidth[]=$itm->svgpatternwidth;
		  $svgpatternheight[]=$itm->svgpatternheight;
		  $svgpatternleft[]=$itm->svgpatternleft;
		  $svgpatterntop[]=$itm->svgpatterntop;
		  $svgimgwidth[]=$itm->svgimagewidth;
		  $svgimgheight[]=$itm->svgimageheight;
		  $svgstroke[]=$itm->svgstroke;
		  $svgstrokecolor[]=$itm->svgstrokecolor;
        }
		if(count($svgitems)==0)
			return false;
		else
		{
			for($i=0; $i<count($svgitems); $i++):
				$file = fopen('svgfile'.$i.'.svg', 'w');
                fwrite($file, '<?xml version="1.0" encoding="UTF-8"?>');
	            fwrite($file, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:x="http://www.w3.org/1999/xlink">');
                fwrite($file, '<style>svg{ background:'.$bannerbc[$i].';}text{font-family:'.$item->params->get('font_family').'; font-size:'.$bannerfontsize[$i].'em; font-weight:'.$item->params->get('font_weight').';stroke:'.$svgstrokecolor[$i].';stroke-width:'.$svgstroke[$i].'px;text-shadow:'.$txtshleft[$i].'px '.$txtshtop[$i].'px '.$txtshopacity[$i].'px '.$txtshcolor[$i].';}</style>');
				fwrite($file, '<defs><pattern id="p1" patternUnits="userSpaceOnUse" x="'.$svgpatternleft[$i].'" y="'.$svgpatterntop[$i].'" width="'.$svgpatternwidth[$i].'px" height="'.$svgpatternheight[$i].'px"><image  x:href="'.$images[$i].'" width="'.$svgimgwidth[$i].'px" height="'.$svgimgheight[$i].'px"/></pattern></defs>');
	            fwrite($file, '<text x="'.$txtleft[$i].'" y="'.$txttop[$i].'" fill="url(#p1)">'.$texts[$i].'</text>');
	            fwrite($file, '</svg>');
			    fclose($file);			
			endfor;
			
			for($i=0; $i<count($svgitems); $i++):
               echo '<a href="'.$item->params->get('general_link').'" style="display:block;"><object type="image/svg+xml" data="svgfile'.$i.'.svg" width="'.$item->params->get('general_width').'px" height="'.$item->params->get('general_height').'px" style="pointer-events:none;">';
               echo 'Browser does not support SVG!';
               echo '</object></a>';
            endfor;
			
				
		}  
  
   return true;
		}
	
	}

	
}

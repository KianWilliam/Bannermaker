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

defined('_JEXEC') or die('Restricted access');

jimport('joomla.html.html');
jimport('joomla.form.formfield');

class JFormFieldMyslidesmanager extends JFormField {
	
	protected $type = 'myslidesmanager';
	
	protected function getInput() {

		$document = JFactory::getDocument();
		$document->addScriptDeclaration("JURI='" . JURI::root() . "'");
		$path = 'administrator/components/com_bannermaker/models/fields/mybanners/';
		JHTML::_('behavior.modal');		
		JHTML::_('stylesheet', $path . 'banners.css');
		JHTML::_('script', $path . 'banners.js');
		$html = '<input name="' . $this->name . '" id="myslides" type="hidden" value="' . $this->value . '" />'
				. '<input name="myaddslide" id="myaddslide"  type="button" value="' . JText::_('COM_BANNERMAKER_ADD_SLIDE_TEXT_SVGATTRIBS') . '"  onclick="javascript:addslidemy();" />'
				. '<ul id="myslideslist" style="clear:both;"></ul>'
				. '<input name="myaddslide" id="myaddslide" type="button" value="' . JText::_('COM_BANNERMAKER_ADD_SLIDE_TEXT_SVGATTRIBS') . '"  onclick="javascript:addslidemy();" />';

		return $html;
	}
		
	protected function getLabel()
	{
		return $this->label;
	}
}





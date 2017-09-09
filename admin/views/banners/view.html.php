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
defined('_JEXEC') or die( 'Restricted access' );
jimport('joomla.application.component.view');
class BannermakerViewBanners extends JViewLegacy
{
	protected $items;
	protected $pagination;
	protected $state;
	public function display($tpl = null)
	{
		$this->items		= $this->get('Items');
		$this->pagination	= $this->get('Pagination');
		$this->state		= $this->get('State');
		
		if (count($errors = $this->get('Errors'))) {
		JFactory::getApplication()->enqueueMessage('Internal Server Error 500 ','Failure');
			return false;
		}
		
		$this->addToolbar();		
		parent::display($tpl);		
	}
	protected function addToolbar()
	{
		$title = JText::_('COM_BANNERMAKER'). " - ". JText::_('COM_BANNERMAKER_BANNERS');
		JToolBarHelper::title($title , 'generic.png');
		
		JToolBarHelper::addNew('banner.add','JTOOLBAR_NEW');
		JToolBarHelper::editList('banner.edit','JTOOLBAR_EDIT');
		JToolBarHelper::deleteList('COM_BANNERMAKER_BANNERS_APPROVE_DELETE', 'banners.delete','JTOOLBAR_DELETE');
		JToolBarHelper::divider();
		JToolBarHelper::custom('banners.publish', 'publish.png', 'publish_f2.png','JTOOLBAR_PUBLISH', true);
		JToolBarHelper::custom('banners.unpublish', 'unpublish.png', 'unpublish_f2.png', 'JTOOLBAR_UNPUBLISH', true);

	}



}
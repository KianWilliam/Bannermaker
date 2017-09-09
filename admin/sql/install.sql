CREATE TABLE IF NOT EXISTS `#__bannermaker` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL default '',
  `published` tinyint(1) NOT NULL default '0',
  `ordering` int(11) NOT NULL default '0',  
  `visual` text NOT NULL,
  `description` text NOT NULL,
  `checked_out` int(10) unsigned NOT NULL default '0',
  `checked_out_time` datetime NOT NULL default '0000-00-00 00:00:00',
  `params` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
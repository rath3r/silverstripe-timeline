Silverstripe Timeline Module
=========================================

Timeline module for the Silverstripe CMS.

## Author

Uses [jQuery-Timelinr](https://github.com/juanbrujo/jQuery-Timelinr) as inspiration

## Installation

Install this module either by downloading and adding to:

[silverstripe-root]/timeline

Then run: http://yoursiteurl.com/dev/build/

Or alternativly add to your projects composer.json

## Usage

Once installed, you must add the template variable $Timeline to any
templates you require a carousel to appear on.

Then, you can setup the timeline by logging into the admin interface and editing
the page you want to add a carousel to.

Then click the "Settings" tab, and tick the "add timeline" checkbox.

Once you have finished configuring, you can go back to editing you page, and a
"timeline" tab should have appeared in the right hand site of the editing pane.

To start the timeline add the code below to where ever you initialise your js. This can also be added to the `Timeline` 
init function in the `TimelinePage.php` extension. 

    $().timelinr({
      autoPlay: true,
      autoPlayDirection: 'forward',
      autoPlayPause: 6000
    })

## Styling

For the first project using this plugin the styling has bee added to the `assets` included in 
the plugin but perhaps it should be moved to the site's theme directory.
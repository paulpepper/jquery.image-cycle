jQuery.image-cycle
==================

jQuery plugin to cycle through a gallery of images.

Useage
------

1. Add an ``<img>`` element to the ``<body/>`` of your HTML file.
2. Set the ``<img>`` src attribute to the URL of the first image to display.
3. Set the ``<img>`` element's data-gallery-images with a comma-separated list image URLs.

### Basic Example

    <img src="/images/cat1.jpg" data-gallery-images="/images/cat2.jpg, /images/cat3.jpg" class="gallery" />

Ensure the jQuery library and jQuery.image-cycle.js file are included in the
``<head/>`` element of your HTML file:
    <script type="text/javascript" src="/js/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/js/jquery.image-cycle.js"></script>

Run the jQuery.image-cycle plugin wehn the browser has loaded the document:
    <script type="text/javascript">
        jQuery(document).ready(function() {
            jQuery('.gallery img').imageCycle();
        });
    </script>

Plugin Configuration
--------------------

The following are default values used by the plugin which may be overridden:

    displayTime:	8000    // Time (milliseconds) that images remain visible.
    transitionTime: 1000    // Time taken to transition from one image to next.
    navigation:     false   // Used to show or inhibit display of image navigation.

### Example Using Configuration
    <script type="text/javascript">
        jQuery(document).ready(function() {
            jQuery('.gallery img').imageCycle({
                displayTime:	5000,
                transitionTime: 1000,
                navigation:     true
            });
        });
    </script>

Styling
-------
If you use the navigation facility you will probably want to style the resulting
output. A CSS style sheet is provided with the plugin to get you started.

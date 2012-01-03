/**
 * Copyright (c) 2012 getpepper web & software development.
 * All rights reserved.
 *
 * Plugin:  jQuery Image Cycle
 * Version: 1.0.2
 * URL:     http://www.getpepper.co.uk/software/jquery-image-cycle.html
 * Company: getpepper web design & software development
 * Author:  Paul Pepper
 * Contact: software@getpepper.com
 * License:
 *    This program is free software; you can redistribute it and/or
 *    modify it under the terms of the GNU General Public License
 *    as published by the Free Software Foundation; either version 2
 *    of the License, or (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program; if not, write to the Free Software
 *    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301,
 *    USA.
 *
 * Description:
 *    Cycles through a selection of images, displaying one after the other,
 *    fading previous image out, while next image fades in.
 */

(function($) {

    $.imageCycle = {
        version: '1.0.2'
    };

    /**
	 * The plug-in function
	 */
    $.fn.imageCycle = function(callerConfig) {
        config = $.extend({
            displayTime:	8000,
            transitionTime: 1000,
            navigation:     false
        }, callerConfig || {});

        $(this).each(function() {
            var imageCycle = new ImageCycle($(this), config);
            imageCycle.init();
        });

        return this;
    };

    function ImageCycle($baseImage, config) {
        var currentIndex        = 0;
        var gallery             = new Array();
        var $container          = $('<div class="image-cycle-container" style="position: relative;"></div>');
        var cycleTimerId        = null;

        this.init = function() {
            createContainer();
            createImages();

            if (config.navigation) {
                createNavigation();
                updateNavigation(currentIndex);
            }
            
            cycleTimerId = setTimeout(showNextImage, config.displayTime);
        }

        function copyCss($dest, $src, properties) {
            if (!(properties instanceof Array)) {
                properties = new Array(properties);
            }

            $.each(properties, function(i, attr) {
                $dest.css(attr, $src.css(attr));
            });
        }

        function copyAttr($dest, $src, keys) {
            if (!(keys instanceof Array)) {
                keys = new Array(keys);
            }

            $.each(keys, function(i, key) {
                $dest.attr(key, $src.attr(key));
            })
        }

        function createContainer() {
            $container.insertBefore($baseImage)
                .append($baseImage);

            copyCss($container, $baseImage, ['width', 'height']);
            
            $baseImage.css({
                'position': 'absolute',
                'left':     '0',
                'right':    '0'
            });
        }

        function createImages() {
            // Make the $baseImage the first image in our image array.
            gallery[0] = {
                $image: $baseImage,
                $navItem: null
            };

            var srcUrls = $baseImage.attr('data-gallery-images').split(',');

            // Create the images and add them to the container.
            $.each(srcUrls, function(i, src) {
                gallery[i + 1] = {
                    $image: $(new Image()),
                    $navItem: null
                };
                
                gallery[i + 1].$image.attr('src', $.trim(src));

                copyCss(gallery[i + 1].$image, $baseImage, ['position', 'z-index', 'width', 'height', 'left', 'right', 'top', 'bottom']);
                copyAttr(gallery[i + 1].$image, $baseImage, ['width', 'height']);
                
                $container.append(gallery[i + 1].$image.hide());
            });
        }

        function createNavigation() {
            var $imageNavigation = $('<div class="image-navigation"><ul></ul></div>');
            
            $.each(gallery, function(i, elem) {
                var $link = $('<a href="#"><span>&bullet;</span></a>');

                $link.click(function(event) {
                    // Clear the cycle timer and show the selected image.
                    clearTimeout(cycleTimerId);
                    transitionImage(i);
                    
                    return false;
                });

                elem.$navItem = $('<li></li>').append($link);
                
                $imageNavigation.find('ul').append(elem.$navItem);
            });
            
            $container.append($imageNavigation);
        }

        function showNextImage() {
            // Transition images and increment index modulo image-array length.
            transitionImage((currentIndex + 1) % gallery.length);
        }

        function transitionImage(index) {
            if (currentIndex !== index) {
                // Transition images and set new index.
                gallery[currentIndex].$image.fadeOut(config.transitionTime);

                if (index >= gallery.length) {
                    index = 0;
                }

                currentIndex = index;

                if (config.navigation) {
                    updateNavigation(currentIndex);
                }

                gallery[currentIndex].$image.fadeIn(config.transitionTime);
            }
            
            cycleTimerId = setTimeout(showNextImage, config.displayTime + config.transitionTime);
        }

        function updateNavigation(currentIndex) {
            $container.find('.image-navigation li.current').removeClass('current');
            gallery[currentIndex].$navItem.addClass('current');
        }
    }

}) (jQuery);

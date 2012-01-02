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
			transitionTime: 1000
		}, callerConfig || {});

        $(this).each(function() {
            var imageCycle = new ImageCycle($(this), config);
            imageCycle.init();
        });

		return this;
	};

    function ImageCycle($baseImage, config) {
		var currentIndex	= 0;
        var images          = new Array();
        var $container      = $('<div class="image-cycle-container" style="position: relative;"></div>');

        this.init = function() {
            createContainer();
            createImages();
            setTimeout(showNextImage, config.displayTime);
        }

        function copyCss($dest, $src, attr) {
            $dest.css(attr, $src.css(attr));
        }

        function copyAttr($dest, $src, key) {
            $dest.attr(key, $src.attr(key));
        }

        function createContainer() {
            $container.insertBefore($baseImage)
                .append($baseImage);

            copyCss($container, $baseImage, 'width');
            copyCss($container, $baseImage, 'height');
            
            $baseImage.css({
                'position': 'absolute',
                'left':     '0',
                'right':    '0'
            });
        }

        function createImages() {
            // Make the existing, baseImage the first image in our array.
            images[0] = $baseImage;

            var srcUrls = $baseImage.attr('data-gallery-images');
            srcUrls = srcUrls.split(',');

            $.each(srcUrls, function(i, src) {
                images[i + 1] = $(new Image());
                images[i + 1].attr('src', $.trim(src));

                // Copy some css values from the base image.
                $.each(['position', 'z-index', 'width', 'height', 'left', 'right', 'top', 'bottom'],
                    function(j, attr) {
                        copyCss(images[i + 1], $baseImage, attr);
                    }
                );

                // Copy some image attributes from the base image.
                $.each(['width', 'height'], function(j, attr) {
                    copyAttr(images[i + 1], $baseImage, attr);
                });

                // Add the image below the base image, but keep it hidden.
                $baseImage.after(images[i + 1].hide());
            });
        }

        function showNextImage() {
            // Fade out current image.
            images[currentIndex].fadeOut(config.transitionTime);
            
            // Increment currentIndex modulo the length of the images array.
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }

            // Fade in the next image.
            images[currentIndex].fadeIn(config.transitionTime, function() {
                setTimeout(showNextImage, config.displayTime);
            });
        }
    }

}) (jQuery);

# NodeBB Google Adsense Plugin
NodeBB Google Adsense plugin is made to easily place ads on your forum in different areas.

## Installation

npm install nodebb-plugin-google-adsense

## Using custom template?
The plugin is made for a default NodeBB theme Persona. If you have a custom theme and want to display ads, make sure you have these classes in your page:

1. .posts li - for displaying the ad after first post.
2. .posts li .content - displaying the ad inside a post.
3. #content - ad on the header, before a content.
4. #footer - ad in the footer.

## Using

1. After activating plugin, you will see a reference in admin panel left menu called "Google Adsense". Here you will need to enter your unique publisher ID (pub-xxxxxxxxxxxxxxxx). You can find your ID by following instructions here: https://support.google.com/adsense/answer/105516?hl=en ;
2. Create new ad campaign on your Adsense account page. It is **recommended** to select "Responsive ad unit" ad;
3. Then on this page https://www.google.com/adsense/app#myads-viewall-adunits you will see ID of your created campaign. Simply copy this number to any of available ad slots in plugin's settings page to enable it;
4. That's all. I am sure your users will be happy to see ads ;)


## Screenshots

![Example screenshot](http://i.imgur.com/EnHBuVR.png)

# NodeBB Google Adsense Plugin
NodeBB Google Adsense plugin is made to easily place ads on your forum in different areas.

## Installation

npm install nodebb-plugin-adsense


## Using

1. After activating plugin and rebuilding, you will see a reference in admin panel left menu called "Google Adsense". Here you will need to enter your unique publisher ID (pub-xxxxxxxxxxxxxxxx). You can find your ID by following instructions here: https://support.google.com/adsense/answer/105516?hl=en ;
2. Fill in the ads.txt in the ACP if nodebb is hosted on the root domain. More info https://support.google.com/adsense/answer/12171612?hl=en
3. Create new ad campaign on your Adsense account page. It is **recommended** to select "Responsive ad unit" ad;
4. Then on this page https://www.google.com/adsense/app#myads-viewall-adunits you will see ID of your created campaign. Simply copy this number to the block id value in the adsense widget;
5. That's all. I am sure your users will be happy to see ads ;)


## Screenshots

![Example screenshot](http://i.imgur.com/EnHBuVR.png)

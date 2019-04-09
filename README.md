# EZSPLIT (ezsplit.herokuapp.com)
Bill splitting app to itemize receipts for shared purchases

Ezsplit is a revolutionary dining experience. We aim to remove the hassle of manually calculating item costs on the spot and instead allow for an immersive and collaborative experience with the click of a button. Users can snap a picture of their receipt and upload it at their leisure while allowing registered friends to live-update the item, price, and friends they wish to split the cost with. 

Ezsplit integrates the use of socket.io, QR reading, and real-time receipt parsing software. Also, built with react, redux, express, and node, while also incorporating dual database architecture.

<a href="exsplit.herokuapp.com">EZSPLIT/</a>

# Getting Started
On the main screen you may sign up or login via google. Once on your user landing page, you may navigate to the friends page which allows your to ad a friend.
Once ready, you may upload the receipt on the user landing page via the upload button. Please follow the prompts provided on the following page once the receipt is parsed. 

# Installing
Please npm install prior to starting the app.

# Deployment
ezsplit was deployed using continuous integration via Travis CI and deploy via Heroku.

# Built With
Node
Express
React
Redux
Taggun.io
Socket.io
MongoDB
PostgresSQL
Authors
Aman Thapar
Terence Thai
Henry Zheng
Yuva Chang

# Acknowledgments
Thanks to taggun.io and their receipt parsing api for making this possible

# Disclaimer
ezsplit does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (ezsplit), is strictly at your own risk. ezsplit will not be liable for any losses and/or damages in connection with the use of our website. 
From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
Please be also aware that the image file you  upload should be under 1 mb for swift parsing of the receipt in formation.

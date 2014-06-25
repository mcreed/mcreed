mcreed.com
======

Now powered by Grunt!

## Site

index.html goes on mcreed.com

## CDN

All /assets go on cdn.mcreed.com/mcreed for caching by CloudFlare

## CloudFlare front

The entire site including cdn.mcreed.com if fronted by CloudFlare on High Performance

## Commands

grunt - Builds, optimizes, and updates CDN asset paths /app -> /dist (also watches for changes via LiveReload)

grunt deploy - SFTPs index.html to mcreed.com

grunt deploy:assets - SFTPs /assets to cdn.mcreed.com/mcreed

#ionicMaps

POC using Ionic Framework, and Google Maps with GeoJson layers.

I wanted to create a POC to experiement with the Ionic Framework, as well as using Gulp.js for the first time.
That being said, this project is built using CoffeeScript, with relevant gulp tasks for JS generation, minification, concatenation, and sourcemaps to view CoffeeScript source code right in the web inspector.
Pretty happy being able to have minified JS files that carry sourcemaps going right back to the original CoffeeScript source. Needless to say, it took some experimenting to get it right.

__ionicMaps Stack:__
* Gulp
* Bower
* Cordova
* Ionic Framework
* Sass

Currently the app loads with a GeoJSON layer of all of the parks reported by the City of Austin. As I continue with this project, I'd like to give the user the option to select from various data layers.

## Setup
Currently, the [.gitignore file](https://github.com/TempD/ionicMaps/blob/master/.gitignore) is setup so that no js or dependencies are included when you clone the project so there are some commands to run for setup: 

__Setup Node Dependencies:__
```bash
$ npm install
```

__Setup Bower Dependencies:__
```bash
& bower install
```

__Generate JS files from Gulp command 'scripts':__ (Lints CoffeeScript, Generates minified JS with sourcemaps)
```bash
$ gulp scripts
```

From here, if you just want to check the app out on your desktop browser...
```bash
$ ionic serve
```
Will create a server to host your project and enable live reloading. More information can be found at driftyco's [ionic-cli repo](https://github.com/driftyco/ionic-cli/blob/master/README.md)

## Emulation
Emulation depends on the platforms that you want to support. Currently ionic support iOS and Android. I'll give the steps for ios:

__Add iOS as supported platform:__

Before adding platform, I'd run ```$ gulp scripts ``` just in case.
```bash
$ ionic platform ios
```

__Build the application:__
```bash
$ gulp scripts
```

__Emulate on iOS simulator:__
```bash
$ ionic emulate ios -l
```
-l flag provides livereload support, and for some reason the app currently isn't displaying the map without livereload enabled.

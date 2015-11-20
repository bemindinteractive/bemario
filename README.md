# BeMario - A simple Theme for Ghost

## Demo

http://journal.bemind.me

**Get started making great Ghost themes with Bemario!**

This is a *starter theme* for Ghost, and is not intended to be used as-is on any site or blog.

Bemario is a sensible collection of default styles and templates that can be mixed, matched, removed or refactored to create a unique Ghost theme.

Bemario is created and maintained by *[Bemind](http://bemind.me/bemario)*

## Installation
npm install
bower install
sudo gem install bourbon

### Prerequisites

1. Node.js
2. Sass (libsass)
3. Grunt


### Setup

Clone (or fork) this repository into your /content/themes/ folder in Ghost.

Run `npm install` in the bemario directory to install grunt modules.

Run `grunt` to build the Sass files, or `grunt watch` when you are ready to start themeing.


### Build

To build a .zip file of your theme for distribution, run:

`grunt bundle --name=yourthemename`

The *build* folder will contain the necessary theme files, and the *dist* folder will contain a .zip file of your theme that you can distribute and use in other Ghost instances.

## Thanks To:

* Themble & Eddie Machado for the Bones framework
* HTML5 Boilerplate
* Mono Social Icon Font
* Ghost and Casper
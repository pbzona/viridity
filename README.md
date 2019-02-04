# Viridity

Viridity is a fork of the [Peep theme](https://github.com/pbzona/peep) for Ghost, using a lighter, more minimal style, but otherwise many of the same design elements. Viridity is mobile friendly, and is customizable from within the Ghost admin. I'll be developing it somewhat separately from Ghost, but if one gets a new feature that I really like, I'll go ahead and add it to the other. For now, Viridity is Peep's light themed cousin.

![Viridity desktop view](https://s3.amazonaws.com/peepthemesamples/viridity-desktop.png)

## Installation

To install Viridity on your own Ghost blog, clone the repository and upload it to the `<your ghost installation>/content/themes` directory on your server. Alternatively, you can upload the zip file via the Ghost admin panel for your site.

## Configuration

Viridity adheres to the [Ghost Theme Configuration Approach](https://github.com/unwitting/gtca), and contains a separate configuration object for options that fall outside the GTCA spec. GTCA defines a list of supported configuration properties in their project, but I've used their method to integrate a contact form into the theme via the `__vCfg` configuration object as well. Future configuration options will be added via both of these methods, depending on their scope.

### Contact Form

The Viridity contact form is powered by AWS Lambda, and it is optional. To add it, follow the steps [here](https://linuxacademy.com/blog/aws/how-to-build-a-serverless-contact-form-on-aws/) to create a serverless contact form, and add the following to the **Blog Header** section in your Ghost admin (under **Code injection**):

```
<script>window.__vCfg.contactForm = 'your API Gateway endpoint';</script>
```

The contact form is a static page that you can enable by creating a post with the slug `/contact` and setting it as a _page_. If you don't want to use it, simply do not set the `window.__vCfg.contactForm` script in your header and the page will display your content normally.

A confirmation message will be displayed below the contact form when the message is successfully sent (or if it isn't, an error will be shown). You can set custom messages for these by adding the following to your **Blog Header** in the Ghost admin:

```
<script>window.__vCfg.contactSuccess = 'Your custom success message';</script>
<script>window.__vCfg.contactError = 'Your custom error message';</script>
```

### Comments

Viridity also supports comments via Disqus. To add comments to your site, add the following into the **Blog Header** section in your Ghost admin:

    <script>window.__themeCfg.disqusUsername = 'your Disqus site shortname'</script>

Make sure to replace the value with your own Disqus shortname!

### Social Media Buttons

The Viridity theme comes with six social media and sharing buttons:

- Facebook
- Github
- Instagram
- LinkedIn
- Twitter
- RSS feed for your blog

To make these links display at the bottom of your blog, add some or all of the following to your code injection in the Ghost admin:

```
<script>window.__themeCfg.facebookUsername = 'your username';</script>
<script>window.__themeCfg.githubUsername = 'your username';</script>
<script>window.__themeCfg.instagramUsername = 'your username';</script>
<script>window.__themeCfg.linkedinUsername = 'your username';</script>
<script>window.__themeCfg.twitterUsername = 'your username';</script>
```

Be sure to change "your username" to your actual username for each platform. If you don't want a particular button to display, you can omit it from your code injection.

Want to add a social profile that's not included by default? Adding new buttons is straightforward if you're familiar with Handlebars and JavaScript - the files you'll want to modify are `partials/social.hbs` and `assets/js/scripts/social.js`. If you make changes to the JS file, be sure to run the bundler before installing on your site - instructions on how to do this can be found further down this page.

#### Disabling all social buttons

Not everyone uses social media or wants to share their account info - if you want to disable this section altogether, add the following into the code injection section within your Ghost admin:

    <script>window.__vCfg.socialButtonsEnabled = false</script>

When this setting is present (and set to false), the social buttons and RSS feed link will not be displayed on your site. If you have usernames already set in your code injection, this setting will override them. If you want to temporarily disable your social links, for example, you can add this line without deleting your social configuration.

### Color Scheme

While the color scheme is not configurable via the admin panel, I have added what I think is a fairly simple way to change the color palette across the theme with just one or two changes. If you're not fan of the green on white, you can modify the primary color by going to `sass/base/_variables.scss` and changing the `$color-primary` and `$color-secondary` values to whatever you want. When you're done, be sure to compile the SASS by running `npm run sass:build` from the root of the theme directory.

## Code Highlighting

This theme now includes [Prism](http://prismjs.com/) for code syntax highlighting, in addition to my basic styles for inline code.

To use inline code:

    `var here = 'your inline code'`

To use code blocks with the default style:

    ```
    var myCode = 'this is some code';
    console.log(myCode);
    return someValue;
    ```

To use Prism, which includes full syntax highlighting in the Tomorrow Night theme, add the language name after the opening set of backticks:

    ```javascript
    var myArray = arr.map(function(el) {
        return el * 2;
    });
    ```

Languages supported by this theme (with name to use after initial backticks):

- JavaScript (javascript)
- C-like (clike)
- CSS (css)
- Bash (bash)
- Nginx configuration (nginx)
- Python (python)
- React JSX (react)
- SCSS (scss)

I'm open to adding more as I have a need, but feel free to either change them up in your own version by downloading Prism with additional language selections, or make a PR.

Prism snippets also include a "copy-to-clipboard" feature, where if you hover on a code snippet, a copy button appears to its right. This button can be styled in the `_prism.scss` partial if you decide to use it.

If you want to cut down the bundle size, which is currently about 30kB, you can also download your own selection from the [PrismJS site](https://prismjs.com/download.html), choose only the ones you need, and replace the respective files in `assets/`.

## Development

I run my sites on Ghost because the theme system is just insanely fun to work with. If you want to mess with my theme (or create your own), I recommend starting [here](https://docs.ghost.org/docs/install-local). Viridity is compatible with Ghost v1.25, and will work with Ghost 2.x. Note that not all König image features are supported yet, but I'm working on that 😎.

### Styles

Viridity uses SCSS within the `sass/` directory, which gets compiled into a `style.css` file within `assets/css/`.

To run a development mode that watches for changes, compiles them, and applies them to your site in real time, run `npm run sass:watch`. If you make changes you want to keep, you can build a production ready stylesheet (compiled, prefixed, minified) by running `npm run css:build`.

### Scripts

JavaScript files are organized in two ways: sitewide and page-specific.

Sitewide files are run everywhere on the blog, and are added by creating a module within the `assets/jss/scripts/` directory, importing it into `assets/js/main.js`, and making it browser-compatible by running `npm run js:build`.

Page-specific scripts are only meant to run on one page, and they're included in the `assets/js/singles/` directory. These scripts should be included individually on their respective pages.

### Full Build

To run a full build (both CSS and JS):

    npm run build

This is the recommended method for creating production ready assets when creating a new version.

## TODO

Here are a few of my plans for the immediate future:

- Author pages?
- JS builds with source maps for larger bundles

import { titleCase } from "title-case";

/**
 * generate *.11tydata.js thing for an index page
 *
 * type is what that index is of (blog, lyrics, etc)
 * layoutname is what _includes/layouts/ to use
 * extraProps is any extra props to put in eleventyComputed
 */
export default (type, layoutname = "post.html", extraProps = {}) => ({
    layout: `layouts/${layoutname}`,
    tags: [
        type
    ],
    eleventyComputed: {
        title: data => data.title || titleCase(data.page.fileSlug),
        eleventyNavigation: {
            key: data => data.title,
            parent: data => data.index ? "Technically Competent" : titleCase(type),
        },
        ...extraProps,
    },
});

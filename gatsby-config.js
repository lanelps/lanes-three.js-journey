/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    author: `Lane Le Prevost-Smith`,
    description: `Bare bones boilerplate for Gatsby`,
    facebook: ``,
    instagram: ``,
    image: `/images/denada-share.jpg`,
    keywords: ``,
    siteLanguage: `en_AU`,
    siteUrl: `https://www.example.com`,
    title: `Gatsby Tinderbox`,
    titleTemplate: `%s - Gatsby Tinderbox`
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `${__dirname}/src/assets/images/favicon.jpg`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-emotion`
  ]
};

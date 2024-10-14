<template>
  
</template>
<script>
export default {
  // ...

  created() {
    this.generateSitemap();
  },

  methods: {
    generateSitemap() {
      const routes = this.$router.options.routes;
      const baseUrl = 'https://example.com'; // Replace with your actual base URL

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

     routes.forEach(route => {
        route['children'].forEach(childRoute => {
            if (childRoute.path !== '*') {
              const url = 'https://cultureinyourcity.com/'+childRoute.path;
              xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>2023-06-22</lastmod>\n</url>\n`;
            }
        })
      });


      xml += '</urlset>';

      // Create a download link for the sitemap
      const link = document.createElement('a');
      link.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xml);
      link.download = 'sitemap-latest.xml';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Sitemap generated successfully.');
    },

    interpolatePath(path, params) {
      // Replace dynamic segments in the path with corresponding values
      Object.keys(params).forEach(param => {
        const paramValue = params[param];
        path = path.replace(`:${param}`, paramValue);
      });

      return path;
    },
  },
};
</script>

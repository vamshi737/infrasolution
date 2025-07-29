# Use NGINX as base
FROM nginx:alpine

# Copy custom NGINX config if you have one (optional)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy HTML and JS files to the correct NGINX folder
COPY . /usr/share/nginx/html

# No need to expose port or CMD — nginx handles it
